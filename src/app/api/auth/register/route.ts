import { NextRequest, NextResponse } from 'next/server'
import { AuthHandler } from '@/backend/handlers/AuthHandler'
import { EmailService } from '@/backend/services/EmailService'
import { RateLimiter } from '@/backend/middlewares/RateLimiter'

const authHandler = new AuthHandler()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await authHandler.register(body)

    // Send welcome email (async, don't wait)
    EmailService.sendWelcomeEmail(result.user.email, result.user.name || 'User')

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: error.statusCode || 400 }
    )
  }
}