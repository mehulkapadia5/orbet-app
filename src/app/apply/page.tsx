"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Upload
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackJobApplication, trackEvent } from "@/lib/analytics";

interface JobData {
  id: string;
  name: string;
  department: string;
  jobDescription: string;
  experienceLevel: string;
  isActive: boolean;
  createdAt: string;
  publicLink: string;
  applicants: ApplicationData[];
}

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  currentCtc: string;
  expectedCtc: string;
  resume: File | null;
}

function ApplyPageContent() {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    name: "",
    email: "",
    phone: "",
    currentCtc: "",
    expectedCtc: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicantId, setApplicantId] = useState("");
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');

  // Load job data
  useEffect(() => {
    if (jobId) {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const job = jobs.find((j: JobData) => j.id === jobId);
      setJobData(job);
    }
  }, [jobId]);

  const handleInputChange = (field: keyof ApplicationData, value: string | File | null) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange('resume', file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;
    
    setLoading(true);

    try {
      // Generate applicant ID
      const newApplicantId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setApplicantId(newApplicantId);

      // Create application object
      const application = {
        id: newApplicantId,
        jobId: jobId,
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        currentCtc: applicationData.currentCtc,
        expectedCtc: applicationData.expectedCtc,
        resume: applicationData.resume?.name || 'No file uploaded',
        submittedAt: new Date().toISOString(),
        status: "submitted",
      };

      // Update job with new applicant
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = jobs.map((job: JobData) => 
        job.id === jobId 
          ? { ...job, applicants: [...job.applicants, application] }
          : job
      );
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));

      // Track job application
      trackJobApplication({
        jobId: jobId,
        jobName: jobData?.name || 'Unknown',
        applicantId: newApplicantId
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!jobId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Invalid Application Link</h2>
            <p className="text-muted-foreground mb-4">
              Please use a valid application link.
            </p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The job you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!jobData.isActive) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Application Closed</h2>
            <p className="text-muted-foreground mb-4">
              This position is no longer accepting applications.
            </p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

      if (submitted) {
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                {/* Custom Green Checkmark */}
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
                <p className="text-muted-foreground mb-4">
                  Thank you for your interest in the {jobData.name} position at Orbet.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm font-medium">Your Application ID:</p>
                  <p className="text-lg font-mono">{applicantId}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll review your application and get back to you soon.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      }

  return (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Combined Job Details and Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Building2 className="h-6 w-6" />
                  Orbet
                </CardTitle>
                <CardDescription className="text-lg">
                  {jobData.name} - {jobData.department}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Information */}
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Position:</span>
                      <span>{jobData.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Experience:</span>
                      <span>{jobData.experienceLevel}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Job Description</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {jobData.jobDescription}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Application Form</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill out the form below to apply for this position
                  </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={applicationData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={applicationData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={applicationData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleInputChange('phone', value);
                    }}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>

              {/* CTC Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentCtc">Current CTC (₹)</Label>
                  <Input
                    id="currentCtc"
                    type="number"
                    placeholder="500000"
                    value={applicationData.currentCtc}
                    onChange={(e) => handleInputChange('currentCtc', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedCtc">Expected CTC (₹) *</Label>
                  <Input
                    id="expectedCtc"
                    type="number"
                    placeholder="700000"
                    value={applicationData.expectedCtc}
                    onChange={(e) => handleInputChange('expectedCtc', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume">Resume/CV *</Label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your resume here</p>
                      <p className="text-sm text-gray-500">or click to browse files</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      Supports PDF, DOC, DOCX (Max 10MB)
                    </div>
                  </div>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>
              {applicationData.resume && (
                <p className="text-sm text-green-600">✓ {applicationData.resume.name}</p>
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Loading Application...</h2>
            <p className="text-muted-foreground">
              Please wait while we load the job details.
            </p>
          </CardContent>
        </Card>
      </div>
    }>
      <ApplyPageContent />
    </Suspense>
  );
}
