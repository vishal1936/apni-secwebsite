import { NextRequest, NextResponse } from 'next/server'
import { AuthHandler } from '@/backend/handlers/AuthHandler'
import { RateLimiter } from '@/backend/middlewares/RateLimiter'

const authHandler = new AuthHandler()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await authHandler.login(body)

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: error.statusCode || 400 }
    )
  }
}