import { verifyKey } from "discord-interactions";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { verifyDiscordMessage } from "./utils/api.utils";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isValidRequest = await verifyDiscordMessage(request);
  if (!isValidRequest) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/interactions",
};
