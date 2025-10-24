import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_STAGING_API_URL;

export async function POST(req: NextRequest) {
  console.log("Refreshing access token");
  try {
    // Get the accessToken from cookies
    const accessToken = req.cookies.get("accessToken")?.value;
    console.log("Access Token from cookie:", accessToken);

    if (!accessToken  ) {
      return new NextResponse(
        JSON.stringify({ message: "No access token found" }),
        { status: 401 }
      );
    }

    // Call the backend refresh endpoint
    const response = await fetch(`${apiUrl}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (response.ok) {
      const { accessToken } = responseData;

      const res = new NextResponse(JSON.stringify({ accessToken }), {
        status: 200,
      });

      // Set new accessToken cookie
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

      // Set new refreshToken cookie if provided
      // if (newRefreshToken) {
      //   res.cookies.set({
      //     name: "refreshToken",
      //     value: newRefreshToken ?? "",
      //     secure:
      //       process.env.NODE_ENV === "production" ||
      //       (process.env.NODE_ENV as string) === "staging",
      //     httpOnly: true,
      //     maxAge: newRefreshToken?.expires,
      //     path: "/",
      //     sameSite: "strict",
      //   });
      // }

      return res;
    }

    // Refresh failed
    return new NextResponse(
      JSON.stringify({
        message: responseData.message || "Token refresh failed",
      }),
      { status: response.status }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Token refresh failed";
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
