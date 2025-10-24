import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_STAGING_API_URL;
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    const headers: Record<string, string> = {
      Cookie: cookieHeader,
      Authorization: 'Bearer ' + req.cookies.get('accessToken')?.value,
    };

    const response = await fetch(`${apiUrl}user/applications/submissions`, {
      method: 'GET',
      headers,
    });

    const responseData = await response.json().catch(() => ({}));

    console.log(responseData);

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({
          message: responseData?.message || 'fetching submissions failed',
        }),
        { status: response.status }
      );
    }

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'submissions fetching failed';
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
