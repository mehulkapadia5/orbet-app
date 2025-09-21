"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { trackJobCreated, trackEvent } from "@/lib/analytics";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    name: "",
    department: "",
    jobDescription: "",
    experienceLevel: "",
    isActive: true,
  });

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Lead/Principal (10+ years)",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a unique job ID
      const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create job object
      const newJob = {
        id: jobId,
        ...jobData,
        createdAt: new Date().toISOString(),
        publicLink: `/apply?jobId=${jobId}`,
        applicants: [],
      };

      // Store in localStorage for now (in real app, this would be saved to database)
      const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      existingJobs.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(existingJobs));

      // Track job creation
      trackJobCreated({
        jobId: jobId,
        jobName: jobData.name,
        department: jobData.department,
        experienceLevel: jobData.experienceLevel
      });

      // Redirect to job roles page
      router.push('/dashboard/job-roles');
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/job-roles">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Job Role</h1>
          <p className="text-muted-foreground">
            Create a new job posting and generate a public application form
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill in the details for the new job role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Job Title *</Label>
              <Input
                id="name"
                placeholder="e.g., Senior Frontend Developer"
                value={jobData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                placeholder="e.g., Engineering, Marketing, Sales"
                value={jobData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                required
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select
                value={jobData.experienceLevel}
                onValueChange={(value) => handleInputChange('experienceLevel', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={jobData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                rows={6}
                required
              />
            </div>

            {/* Active/Inactive Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={jobData.isActive}
                onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              />
              <Label htmlFor="isActive">
                {jobData.isActive ? 'Active' : 'Inactive'} - 
                {jobData.isActive ? ' Job is accepting applications' : ' Job is not accepting applications'}
              </Label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Creating Job...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Job Role
                  </>
                )}
              </Button>
              <Link href="/dashboard/job-roles">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
