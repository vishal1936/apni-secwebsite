import { AuthService } from '../services/authService'
import { ValidationError } from '../errors'
import { updateProfileSchema } from '../validators'

const authService = new AuthService()

export class UserHandler {
  async getProfile(userId: string) {
    return authService.getProfile(userId)
  }

  async updateProfile(userId: string, data: any) {
    try {
      const validatedData = updateProfileSchema.parse(data)
      return await authService.updateProfile(userId, validatedData)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Failed to update profile')
    }
  }
}