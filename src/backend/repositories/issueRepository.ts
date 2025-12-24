import { prisma } from '@/lib/prisma'
import { Issue, IssueType, Priority, IssueStatus } from '@prisma/client'

export class IssueRepository {
  async findAll(userId?: string): Promise<Issue[]> {
    return prisma.issue.findMany({
      where: userId ? { userId } : undefined,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: string): Promise<Issue | null> {
    return prisma.issue.findUnique({
      where: { id },
      include: { user: true },
    })
  }

  async create(data: { type: IssueType; title: string; description?: string; priority?: Priority; status?: IssueStatus; userId: string }): Promise<Issue> {
    return prisma.issue.create({ data })
  }

  async update(id: string, data: Partial<{ type: IssueType; title: string; description?: string; priority: Priority; status: IssueStatus }>): Promise<Issue> {
    return prisma.issue.update({ where: { id }, data })
  }

  async delete(id: string): Promise<Issue> {
    return prisma.issue.delete({ where: { id } })
  }
}