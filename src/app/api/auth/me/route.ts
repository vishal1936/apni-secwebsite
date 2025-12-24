import { NextRequest, NextResponse } from 'next/server'
import { AuthHandler } from '@/backend/handlers/AuthHandler'
import { verifyToken } from '@/lib/auth'

const authHandler = new AuthHandler()

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await authHandler.getProfile(decoded.userId)
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get user' },
      { status: error.statusCode || 500 }
    )
  }
}