import { NextRequest, NextResponse } from 'next/server'
import { IssueHandler } from '@/backend/handlers/IssueHandler'
import { verifyToken } from '@/lib/auth'

const issueHandler = new IssueHandler()

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    let userId: string | undefined

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)
      userId = decoded?.userId
    }

    const issues = await issueHandler.getAllIssues(userId)
    return NextResponse.json({ issues })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get issues' },
      { status: error.statusCode || 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const issue = await issueHandler.createIssue(body, decoded.userId)
    return NextResponse.json({ issue }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create issue' },
      { status: error.statusCode || 400 }
    )
  }
}