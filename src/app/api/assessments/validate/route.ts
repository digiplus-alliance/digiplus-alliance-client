import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    const response = await fetch(`${apiUrl}validation/validate-batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
        Authorization: 'Bearer ' + req.cookies.get('accessToken')?.value,
      },
      body: JSON.stringify(payload),
    });

    console.log(response);
    const responseData = await response.json();

    console.log(responseData);

    if (response.ok) {
      return new NextResponse(JSON.stringify(responseData), { status: 200 });
    }

    // Non-OK response
    return new NextResponse(
      JSON.stringify({
        message: (responseData && responseData.message) || 'Validation failed',
      }),
      { status: response.status }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Validation failed';
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
