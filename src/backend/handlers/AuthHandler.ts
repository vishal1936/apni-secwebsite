import { AuthService } from '../services/authService'
import { ValidationError } from '../errors'
import { registerSchema, loginSchema } from '../validators'

const authService = new AuthService()

export class AuthHandler {
  async register(data: any) {
    try {
      const validatedData = registerSchema.parse(data)
      return await authService.register(validatedData)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Registration failed')
    }
  }

  async login(data: any) {
    try {
      const validatedData = loginSchema.parse(data)
      return await authService.login(validatedData)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Login failed')
    }
  }

  async getProfile(userId: string) {
    return authService.getProfile(userId)
  }

  async logout() {
    // In a stateless JWT system, logout is handled client-side by removing the token
    return { message: 'Logged out successfully' }
  }
}