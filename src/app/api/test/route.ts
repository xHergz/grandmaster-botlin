import SupabaseDataAccessLayer from "@/lib/supabase";
import { createSuperUserClient } from "@/utils/supbase-server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);
  const { error, data } = await db.getGuildData("598157729499971584");
  console.log(error, data);

  return NextResponse.json({}, { status: 200 });
}
