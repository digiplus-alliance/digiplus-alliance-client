import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json();
    const cookieHeader = req.headers.get("cookie") || "";

    const response = await fetch(`${apiUrl}profile/business`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({
          message: responseData?.message || "Profile update failed",
        }),
        { status: response.status }
      );
    }

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    const message = error instanceof Error ? error.message : "Profile update failed";
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
