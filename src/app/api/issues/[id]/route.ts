import { NextRequest, NextResponse } from 'next/server'
import { IssueHandler } from '@/backend/handlers/IssueHandler'
import { verifyToken } from '@/lib/auth'

const issueHandler = new IssueHandler()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const issue = await issueHandler.getIssueById(id);
    return NextResponse.json({ issue })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get issue' },
      { status: error.statusCode || 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
    const issue = await issueHandler.updateIssue(id, body)
    return NextResponse.json({ issue })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update issue' },
      { status: error.statusCode || 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

    await issueHandler.deleteIssue(id)
    return NextResponse.json({ message: 'Issue deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete issue' },
      { status: error.statusCode || 400 }
    )
  }
}