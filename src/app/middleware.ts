import { verifyKey } from "discord-interactions";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const headerList = headers();
  const signature = headerList.get("X-Signature-Ed25519");
  const timestamp = headerList.get("X-Signature-Timestamp");

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
