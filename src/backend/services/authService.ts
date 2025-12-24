import { UserRepository } from '../repositories/userRepository'
import { hashPassword, comparePassword, generateToken } from '@/lib/auth'
import { ValidationError, NotFoundError } from '../errors'
import { z } from 'zod'

const userRepository = new UserRepository()

export class AuthService {
  async register(data: z.infer<typeof import('../validators').registerSchema>): Promise<{ user: any; token: string }> {
    const existingUser = await userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new ValidationError('User already exists')
    }

    const hashedPassword = await hashPassword(data.password)
    const user = await userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    })

    const token = generateToken({ userId: user.id, email: user.email })
    const { password, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  async login(data: z.infer<typeof import('../validators').loginSchema>): Promise<{ user: any; token: string }> {
    const user = await userRepository.findByEmail(data.email)
    if (!user) {
      throw new ValidationError('Invalid credentials')
    }

    const isValidPassword = await comparePassword(data.password, user.password)
    if (!isValidPassword) {
      throw new ValidationError('Invalid credentials')
    }

    const token = generateToken({ userId: user.id, email: user.email })
    const { password, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  async getProfile(userId: string): Promise<any> {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('User')
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async updateProfile(userId: string, data: z.infer<typeof import('../validators').updateProfileSchema>): Promise<any> {
    const user = await userRepository.update(userId, data)
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}