import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.STAGING_API_URL;
// const apiUrl = process.env.API_URL;

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const year = searchParams.get("year");

    if (!id || !year) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required parameters" }),
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      Cookie: cookieHeader,
      Authorization: "Bearer " + req.cookies.get("accessToken")?.value,
    };

    const response = await fetch(
      `${apiUrl}api/assessments/stats/${id}?year=${year}`,
      {
        method: "GET",
        headers,
      }
    );

    const responseData = await response.json().catch(() => ({}));

    console.log(responseData);

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({
          message: responseData?.message || "assessments stats failed",
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
    const message =
      error instanceof Error
        ? error.message
        : "assessment stats fetching failed";
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
