'use client'

import { posthog } from '@/lib/posthog'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties)
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.identify(userId, properties)
  }
}

export const resetUser = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.reset()
  }
}

// Common events for the Orbet app
export const trackJobCreated = (jobData: {
  jobId: string
  jobName: string
  department: string
  experienceLevel: string
}) => {
  trackEvent('job_created', jobData)
}

export const trackJobApplication = (applicationData: {
  jobId: string
  jobName: string
  applicantId: string
}) => {
  trackEvent('job_application_submitted', applicationData)
}

export const trackUserSignup = (userData: {
  userId: string
  email: string
  role: string
}) => {
  trackEvent('user_signed_up', userData)
  identifyUser(userData.userId, {
    email: userData.email,
    role: userData.role
  })
}

export const trackUserLogin = (userData: {
  userId: string
  email: string
  method: 'email' | 'google'
}) => {
  trackEvent('user_logged_in', userData)
  identifyUser(userData.userId, {
    email: userData.email
  })
}

export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  trackEvent('page_viewed', {
    page: pageName,
    ...properties
  })
}
