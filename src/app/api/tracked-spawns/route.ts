import { MONSTER_SPAWN_DATA } from "@/constants/monster.constants";
import SupabaseDataAccessLayer, { TrackedSpawnId } from "@/lib/supabase";
import { sendMessage } from "@/utils/discord.utils";
import { createSuperUserClient } from "@/utils/supbase-server.utils";
import { getUnixTime, parse } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { trackedSpawnIds: ids } = body;

  if (!ids || !Array.isArray(ids)) {
    console.warn("Invalid tracked spawn ids", ids);
    return NextResponse.json({}, { status: 400 });
  }

  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);

  const getResponse = await db.getTrackedSpawns(ids);
  if (getResponse.error || !getResponse.data) {
    console.error("Error getting tracked spawns", getResponse.error);
    return NextResponse.json({}, { status: 500 });
  }

  const successfulAlerts: TrackedSpawnId[] = [];
  getResponse.data.forEach(async (spawn) => {
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
    const spawnTime = parse(
      spawn.Spawn_Time,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );
    const success = await sendMessage(
      spawn.Discord_Channel_Id,
      `${
        MONSTER_SPAWN_DATA[spawn.Monster_Spawn_Id].name
      } is spawning soon: <t:${getUnixTime(spawnTime)}:R>. ${mentions}}`
    );
    if (success) {
      successfulAlerts.push(spawn.Tracked_Spawn_Id);
    }
  });

  const updateResponse = await db.updateTrackedSpawnAlertedAt(successfulAlerts);
  if (updateResponse.error) {
    console.error("Error updating tracked spawns", updateResponse.error);
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({}, { status: 200 });
}
