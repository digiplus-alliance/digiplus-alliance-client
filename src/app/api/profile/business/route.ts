import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_STAGING_API_URL;
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const cookieHeader = req.headers.get("cookie") || "";

    let body: FormData | string;
    const headers: Record<string, string> = {
      Cookie: cookieHeader,
      Authorization: "Bearer " + req.cookies.get("accessToken")?.value,
    };

    // Handle both JSON and FormData
    if (contentType.includes("multipart/form-data")) {
      // For multipart/form-data, pass the body as-is and let fetch handle the content-type
      body = await req.formData();
    } else {
      // For JSON data
      const payload = await req.json();
      body = JSON.stringify(payload);
      headers["Content-Type"] = "application/json";
    }

    console.log("Content-Type:", contentType);
    console.log("Cookie Header:", cookieHeader);

    const response = await fetch(`${apiUrl}profile/business`, {
      method: "PATCH",
      headers,
      body,
    });

    const responseData = await response.json().catch(() => ({}));

    console.log(responseData);

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
    const message =
      error instanceof Error ? error.message : "Profile update failed";
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
