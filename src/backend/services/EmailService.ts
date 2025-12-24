import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      await resend.emails.send({
        from: 'ApniSec <noreply@apnisec.com>',
        to: email,
        subject: 'Welcome to ApniSec!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to ApniSec, ${name}!</h1>
            <p>Thank you for registering with ApniSec. We're excited to have you on board.</p>
            <p>You can now access our platform to manage your security assessments and issues.</p>
            <div style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login"
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Login to Your Account
              </a>
            </div>
            <p>If you have any questions, feel free to reach out to our team.</p>
            <p>Best regards,<br>The ApniSec Team</p>
          </div>
        `,
      })
    } catch (error) {
      console.error('Failed to send welcome email:', error)
      throw new Error('Failed to send welcome email')
    }
  }

  static async sendIssueCreatedEmail(email: string, name: string, issue: any): Promise<void> {
    try {
      const issueTypeLabels = {
        CLOUD_SECURITY: 'Cloud Security',
        RETEAM_ASSESSMENT: 'Reteam Assessment',
        VAPT: 'Vulnerability Assessment and Penetration Testing'
      }

      await resend.emails.send({
        from: 'ApniSec <noreply@apnisec.com>',
        to: email,
        subject: `New Issue Created: ${issue.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">New Issue Created</h1>
            <p>Hello ${name},</p>
            <p>A new issue has been created in your ApniSec account:</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #1e293b;">${issue.title}</h3>
              <p style="margin: 5px 0; color: #64748b;"><strong>Type:</strong> ${issueTypeLabels[issue.type as keyof typeof issueTypeLabels]}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Priority:</strong> ${issue.priority || 'Medium'}</p>
              <p style="margin: 5px 0; color: #64748b;"><strong>Status:</strong> ${issue.status}</p>
              ${issue.description ? `<p style="margin: 10px 0; color: #475569;"><strong>Description:</strong> ${issue.description}</p>` : ''}
            </div>
            <div style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard"
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View in Dashboard
              </a>
            </div>
            <p>Best regards,<br>The ApniSec Team</p>
          </div>
        `,
      })
    } catch (error) {
      console.error('Failed to send issue created email:', error)
      throw new Error('Failed to send issue notification email')
    }
  }

  static async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    try {
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

      await resend.emails.send({
        from: 'ApniSec <noreply@apnisec.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Password Reset Request</h1>
            <p>You requested a password reset for your ApniSec account.</p>
            <p>Click the link below to reset your password:</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}"
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Reset Password
              </a>
            </div>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this reset, please ignore this email.</p>
            <p>Best regards,<br>The ApniSec Team</p>
          </div>
        `,
      })
    } catch (error) {
      console.error('Failed to send password reset email:', error)
      throw new Error('Failed to send password reset email')
    }
  }
}