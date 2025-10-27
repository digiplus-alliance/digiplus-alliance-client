import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.STAGING_API_URL;
// const apiUrl = process.env.API_URL;

export async function POST(req: NextRequest) {
  try {
    // Try to read refreshToken from cookies if present
    const cookieHeader = req.headers.get("cookie") || "";

    // Forward the logout request to upstream API (if it exists)
    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      // If the upstream expects a body, forward the request body
      body: await req.text().catch(() => null),
    }).catch(() => null);

    const res = new NextResponse(JSON.stringify({ message: "Logged out" }), {
      status: 200,
    });

    // Clear cookies by setting empty values and maxAge=0
    res.cookies.set({ name: "accessToken", value: "", maxAge: 0, path: "/" });
    res.cookies.set({ name: "refreshToken", value: "", maxAge: 0, path: "/" });

    return res;
  } catch (error) {
    console.error("Logout handler error:", error);

    return new NextResponse(JSON.stringify({ message: "Logout failed" }), {
      status: 500,
    });
  }
}
