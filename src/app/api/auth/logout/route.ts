import { NextRequest, NextResponse } from 'next/server'
import { AuthHandler } from '@/backend/handlers/AuthHandler'

const authHandler = new AuthHandler()

export async function POST(request: NextRequest) {
  try {
    const result = await authHandler.logout()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Logout failed' },
      { status: error.statusCode || 500 }
    )
  }
}