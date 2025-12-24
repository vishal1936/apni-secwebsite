import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
});

export class IssueValidator {
  static validateCreate(data: any) {
    return createIssueSchema.parse(data);
  }

  static validateUpdate(data: any) {
    return updateIssueSchema.parse(data);
  }
}