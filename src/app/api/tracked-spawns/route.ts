import { MONSTER_SPAWN_DATA } from "@/constants/monster.constants";
import SupabaseDataAccessLayer, { TrackedSpawnId } from "@/lib/supabase";
import { sendMessage } from "@/utils/discord.utils";
import { createSuperUserClient } from "@/utils/supbase-server.utils";
import { getUnixTime, parse, parseISO } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import analytics from "@/lib/analytics";

export async function POST(req: NextRequest) {
  const headerList = headers();
  const body = await req.json();
  const { ids: trackedSpawnIds } = body;
  const token = headerList.get("Authorization");

  if (token !== process.env.TRACKED_SPAWNS_KEY) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!trackedSpawnIds || !Array.isArray(trackedSpawnIds)) {
    console.warn("Invalid tracked spawn ids", trackedSpawnIds);
    return NextResponse.json({}, { status: 400 });
  } else if (trackedSpawnIds.length === 0) {
    console.info("No tracked spawn ids");
    return NextResponse.json({}, { status: 200 });
  }

  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);

  const getResponse = await db.getTrackedSpawns(trackedSpawnIds);
  if (getResponse.error || !getResponse.data) {
    console.error("Error getting tracked spawns", getResponse.error);
    return NextResponse.json({}, { status: 500 });
  } else if (getResponse.data.length === 0) {
    console.warn(
      `No tracked spawns found in the database (expected ${trackedSpawnIds.length})`
    );
    return NextResponse.json({}, { status: 500 });
  }

  const successfulAlerts: TrackedSpawnId[] = [];
  for (const spawn of getResponse.data) {
    const alertRecipientResponse = await db.getAllAlertRecipients(
      spawn.Monster_Spawn_Id,
      spawn.Discord_Guild_Id
    );
    if (alertRecipientResponse.error || !alertRecipientResponse.data) {
      console.error(
        `Error getting alert recipients for spawn ${spawn.Tracked_Spawn_Id}`,
        alertRecipientResponse.error
      );
      return;
    } else if (alertRecipientResponse.data.length === 0) {
      console.info(`No alert recipients for spawn ${spawn.Tracked_Spawn_Id}`);
      return;
    }
    const mentions =
      alertRecipientResponse.data
        .map((recipient) => `<@${recipient.Discord_User_Id}>`)
        .join(" ") ?? "";
    const spawnTime = parseISO(spawn.Spawn_Time);
    const success = await sendMessage(
      spawn.Discord_Channel_Id,
      `${
        MONSTER_SPAWN_DATA[spawn.Monster_Spawn_Id].name
      } is spawning soon: <t:${getUnixTime(spawnTime)}:R>. ${mentions}`
    );
    if (success) {
      const recipients = alertRecipientResponse.data.map(
        (recipient) => recipient.Discord_User_Id
      );
      analytics.sentAlert(
        spawn.Discord_Guild_Id,
        spawn.Monster_Spawn_Id,
        recipients
      );
      successfulAlerts.push(spawn.Tracked_Spawn_Id);
    }
  }

  const updateResponse = await db.updateTrackedSpawnAlertedAt(successfulAlerts);
  if (updateResponse.error) {
    console.error("Error updating tracked spawns", updateResponse.error);
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({}, { status: 200 });
}
