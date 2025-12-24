# ApniSec - Enhanced Cybersecurity Platform

A modern, full-stack Next.js application for comprehensive cybersecurity issue management and assessment services.

## 🚀 Features

### ✨ Enhanced UI/UX
- **Modern Design**: Beautiful gradient backgrounds, glass morphism effects, and smooth animations
- **Responsive Layout**: Fully responsive design that works perfectly on all devices
- **Interactive Elements**: Hover effects, smooth transitions, and engaging micro-interactions
- **Performance Optimized**: Custom CSS animations, optimized fonts, and efficient rendering

### 🔐 Authentication & Security
- JWT-based authentication system
- Secure password hashing with bcrypt
- Rate limiting for API endpoints
- Email notifications via Resend

### 📊 Dashboard Features
- **Statistics Overview**: Real-time stats showing total issues, status breakdown, and priority levels
- **Issue Management**: Create, view, and manage security issues with different types and priorities
- **Modern Cards**: Beautiful issue cards with status indicators and priority badges
- **Empty States**: Helpful empty state designs with call-to-action buttons

### 🎯 Issue Types Supported
- **Cloud Security**: Infrastructure vulnerability scanning and compliance checks
- **Reteam Assessment**: Team capability analysis and process optimization
- **VAPT (Vulnerability Assessment & Penetration Testing)**: Advanced security testing

### 📧 Email Integration
- Welcome emails for new users
- Issue creation notifications
- Password reset functionality
- Professional email templates

### 🎨 UI Improvements Made

#### Landing Page
- Hero section with animated elements and trust indicators
- Service cards with hover effects and pricing information
- Gradient backgrounds and modern typography
- Call-to-action sections with compelling copy

#### Dashboard
- Statistics cards with icons and real-time data
- Issue cards with status icons and priority indicators
- Modern navigation with glass morphism header
- Responsive grid layouts and smooth animations

#### Issue Creation Form
- Radio button selection for issue types with icons
- Priority dropdown with color-coded options
- Success animations and loading states
- Form validation with helpful error messages

#### Global Enhancements
- Custom CSS animations (fadeInUp, slideInFromBottom, float, glow)
- Improved typography with better font smoothing
- Custom scrollbar styling
- Accessibility improvements (reduced motion support)
- Performance optimizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Email**: Resend API
- **Icons**: Lucide React
- **Deployment**: Optimized for production deployment

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_jwt_secret"
   RESEND_API_KEY="your_resend_api_key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Landing Page**: Visit the homepage to see the enhanced landing page with service information
2. **Registration**: Create a new account to access the dashboard
3. **Dashboard**: View your issues, statistics, and create new security issues
4. **Issue Creation**: Use the modern form to submit security issues with proper categorization

## 🔧 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `GET /api/issues` - Get all issues (authenticated)
- `POST /api/issues` - Create new issue (authenticated)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🎨 Design System

### Colors
- Primary: Blue gradient (#3b82f6 to #8b5cf6)
- Success: Green (#10b981)
- Warning: Yellow/Orange (#f59e0b)
- Error: Red (#ef4444)
- Neutral: Gray scale

### Typography
- Primary Font: Geist Sans
- Monospace: Geist Mono
- Responsive text sizing
- Improved readability

### Animations
- Smooth transitions (0.3s ease)
- Hover effects with scale transforms
- Loading animations
- Staggered entrance animations

## 🚀 Performance Optimizations

- **CSS Optimizations**: Custom animations and efficient styles
- **Font Loading**: Optimized font loading with preconnect
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Automatic code splitting
- **Caching**: Proper cache headers and strategies

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection prevention with Prisma
- XSS protection with Next.js
- CSRF protection
- Rate limiting on API endpoints
- Secure password hashing

## 📈 Lighthouse Score Targets

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.
```env
DATABASE_URL="postgresql://username:password@localhost:5432/apnisec_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── issues/       # Issue management endpoints
│   │   └── users/        # User management endpoints
│   ├── dashboard/        # Dashboard page
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── profile/         # Profile page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── backend/              # Backend business logic
│   ├── handlers/        # Request handlers
│   ├── services/        # Business logic services
│   ├── repositories/    # Data access layer
│   ├── validators/      # Input validation
│   ├── middlewares/     # Custom middlewares
│   ├── utils/          # Utility functions
│   └── errors/         # Error classes
└── lib/                # Shared utilities
    ├── prisma.ts       # Prisma client
    └── auth.ts         # Auth utilities
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Issues
- `GET /api/issues` - Get all issues (authenticated users only)
- `POST /api/issues` - Create new issue
- `GET /api/issues/[id]` - Get issue by ID
- `PUT /api/issues/[id]` - Update issue
- `DELETE /api/issues/[id]` - Delete issue

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Database Schema

The application uses Prisma with PostgreSQL. The schema includes:

- **User**: id, email, password, name, timestamps
- **Issue**: id, title, description, status, userId, timestamps

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations

## Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Rate limiting on authentication endpoints
- Input validation and sanitization
- CORS protection
- SQL injection prevention via Prisma ORM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
#   a p n i - s e c w e b s i t e  
 