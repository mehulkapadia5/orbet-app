# Orbet App

A comprehensive job creation and application management system built with Next.js, Firebase, and shadcn/ui.

## 🚀 Features

- **Job Creation & Management**: Create job roles with detailed descriptions, departments, and experience levels
- **Public Application Forms**: Each job role generates a unique public application form
- **Authentication System**: Secure login/signup with Firebase Authentication
- **Role-Based Onboarding**: Choose between Hiring Manager and Interviewer roles
- **Responsive Dashboard**: Modern UI with job roles, scheduling, and settings
- **Application Tracking**: Track applications and manage job status (active/inactive)
- **File Upload Support**: Resume upload functionality for applicants
- **Static Export Ready**: Optimized for Firebase Hosting deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Firebase Authentication
- **Analytics**: PostHog for user behavior tracking
- **UI Components**: shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting with static export
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project setup
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mehulkapadia5/orbet-app.git
cd orbet-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. PostHog Setup (Optional)

To enable analytics tracking:

1. Create a PostHog account at [posthog.com](https://posthog.com)
2. Get your project API key from PostHog dashboard
3. Add the PostHog key to your `.env.local` file
4. Analytics will automatically track user behavior and events

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   ├── apply/            # Public application form
│   ├── login/            # Authentication pages
│   ├── signup/
│   └── select-role/      # Role selection onboarding
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── providers/       # Context providers (PostHog, Auth)
└── lib/                 # Utility functions, Firebase config, and analytics
```

## 🎯 Key Pages

- **`/`** - Landing page with hero section
- **`/login`** - User authentication (defaults to login)
- **`/signup`** - User registration
- **`/select-role`** - Role selection (Hiring Manager/Interviewer)
- **`/dashboard`** - Main dashboard with job management
- **`/dashboard/create-job`** - Create new job roles
- **`/dashboard/job-roles`** - Manage existing job roles
- **`/apply?jobId=xxx`** - Public application form for specific jobs

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Firebase Hosting

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

The app is configured for static export and optimized for Firebase Hosting.

## 📱 Features Overview

### For Hiring Managers:
- Create and manage job roles
- Set job descriptions, departments, and experience levels
- Toggle job status (active/inactive)
- Generate public application links
- Track applications and applicants

### For Applicants:
- Access public application forms via unique links
- Submit applications with resume upload
- Receive confirmation with application ID
- View job details and company information

## 🔐 Authentication Flow

1. **Landing Page** → Click "Get Started" → **Login Page**
2. **Login/Signup** → **Role Selection** → **Dashboard**
3. **Role Selection**: Choose between Hiring Manager or Interviewer
4. **Dashboard Access**: Full job management capabilities

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern Components**: shadcn/ui component library
- **Consistent Styling**: Tailwind CSS for styling
- **Interactive Elements**: Smooth transitions and hover effects
- **Form Validation**: Client-side validation with error handling
- **File Upload**: Drag-and-drop resume upload interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://orbet-ai.web.app](https://orbet-ai.web.app)
- **Repository**: [https://github.com/mehulkapadia5/orbet-app](https://github.com/mehulkapadia5/orbet-app)

## 📞 Support

For support, email support@orbet.ai or create an issue in the repository.

---

Built with ❤️ by the Orbet team