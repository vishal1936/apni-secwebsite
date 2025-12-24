import { IssueRepository } from '../repositories/issueRepository'
import { NotFoundError, ValidationError } from '../errors'
import { z } from 'zod'

const issueRepository = new IssueRepository()

export class IssueService {
  async getAllIssues(userId?: string) {
    return issueRepository.findAll(userId)
  }

  async getIssueById(id: string) {
    const issue = await issueRepository.findById(id)
    if (!issue) {
      throw new NotFoundError('Issue')
    }
    return issue
  }

  async createIssue(data: z.infer<typeof import('../validators').createIssueSchema> & { userId: string }) {
    return issueRepository.create(data)
  }

  async updateIssue(id: string, data: z.infer<typeof import('../validators').updateIssueSchema>) {
    const issue = await issueRepository.findById(id)
    if (!issue) {
      throw new NotFoundError('Issue')
    }
    return issueRepository.update(id, data)
  }

  async deleteIssue(id: string) {
    const issue = await issueRepository.findById(id)
    if (!issue) {
      throw new NotFoundError('Issue')
    }
    return issueRepository.delete(id)
  }
}