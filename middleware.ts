import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return new NextResponse(
      `
      <html>
        <head>
          <title>Maintenance</title>
          <meta name="robots" content="noindex" />
        </head>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-align:center;background:#f8fafc">
          <div>
            <h1 style="font-size:32px;margin-bottom:16px;">🚧 กำลังปรับปรุงเว็บไซต์</h1>
            <p style="color:#555;">Prachinburi City จะกลับมาเร็ว ๆ นี้</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 503,
        headers: {
          "content-type": "text/html; charset= utf-8",
          "Retry-After": "3600",
        },
      }
    )
  }

  return NextResponse.next()
}