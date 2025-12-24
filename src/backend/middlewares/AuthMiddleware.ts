import { NextRequest, NextResponse } from 'next/server';
import { JwtUtil } from '../utils/JwtUtil';

export class AuthMiddleware {
  static async authenticate(request: NextRequest): Promise<{ userId: string } | null> {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    try {
      const decoded = JwtUtil.verifyToken(token);
      return { userId: decoded.userId };
    } catch (error) {
      return null;
    }
  }

  static requireAuth(handler: (request: NextRequest, context: { userId: string }) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
      const auth = await AuthMiddleware.authenticate(request);
      if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return handler(request, auth);
    };
  }
}