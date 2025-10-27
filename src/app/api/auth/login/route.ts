import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.API_URL : process.env.STAGING_API_URL;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  try {
    const response = await fetch(`${apiUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json().catch(() => ({}));

    if (response.ok) {
      const { accessToken, refreshToken, message, user } = responseData;

      // Return message, user, and accessToken in the response body
      const res = new NextResponse(
        JSON.stringify({ message, user, accessToken }),
        {
          status: 200,
        }
      );

      // Set accessToken cookie on the response
      res.cookies.set({
        name: "accessToken",
        value: accessToken ?? "",
        secure:
          process.env.NODE_ENV === "production" ||
          (process.env.NODE_ENV as string) === "staging",
        httpOnly: true,
        maxAge: accessToken?.expires,
        path: "/",
        sameSite: "strict",
      });

      // Set refreshToken cookie on the response
      res.cookies.set({
        name: "refreshToken",
        value: refreshToken ?? "",
        secure:
          process.env.NODE_ENV === "production" ||
          (process.env.NODE_ENV as string) === "staging",
        httpOnly: true,
        maxAge: refreshToken?.expires,
        path: "/",
        sameSite: "strict",
      });

      return res;
    }

    // Non-OK response
    return new NextResponse(
      JSON.stringify({
        message: (responseData && responseData.message) || "Login failed",
      }),
      { status: response.status }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
