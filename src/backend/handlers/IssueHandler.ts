import { IssueService } from '../services/IssueService'
import { AuthService } from '../services/authService'
import { EmailService } from '../services/EmailService'
import { ValidationError } from '../errors'
import { createIssueSchema, updateIssueSchema } from '../validators'

const issueService = new IssueService()
const authService = new AuthService()

export class IssueHandler {
  async getAllIssues(userId?: string) {
    return issueService.getAllIssues(userId)
  }

  async getIssueById(id: string) {
    return issueService.getIssueById(id)
  }

  async createIssue(data: any, userId: string) {
    try {
      const validatedData = createIssueSchema.parse(data)
      const issue = await issueService.createIssue({ ...validatedData, userId })

      // Send email notification (async, don't wait)
      try {
        const user = await authService.getProfile(userId)
        EmailService.sendIssueCreatedEmail(user.email, user.name || user.email, issue)
      } catch (emailError) {
        console.error('Failed to send issue created email:', emailError)
        // Don't fail the issue creation if email fails
      }

      return issue
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Failed to create issue')
    }
  }

  async updateIssue(id: string, data: any) {
    try {
      const validatedData = updateIssueSchema.parse(data)
      return await issueService.updateIssue(id, validatedData)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('Failed to update issue')
    }
  }

  async deleteIssue(id: string) {
    return issueService.deleteIssue(id)
  }
}