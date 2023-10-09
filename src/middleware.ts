import { verifyKey } from "discord-interactions";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  if (!signature || !timestamp) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const isValidRequest = verifyKey(
    body,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY!
  );
  if (!isValidRequest) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/interactions",
};
