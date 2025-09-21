"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Users,
  MapPin,
  ExternalLink
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface ApplicationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentCtc: string;
  expectedCtc: string;
  resume: string;
  submittedAt: string;
  status: string;
}

interface JobRole {
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

export default function JobRolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJobRoles(savedJobs);
  }, []);

  // Filter job roles based on search term
  const filteredJobRoles = useMemo(() => {
    if (!searchTerm.trim()) {
      return jobRoles;
    }
    
    return jobRoles.filter(job => 
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobRoles, searchTerm]);

  const toggleJobStatus = (jobId: string) => {
    setJobRoles(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, isActive: !job.isActive }
          : job
      )
    );
    
    // Update localStorage
    const updatedJobs = jobRoles.map(job => 
      job.id === jobId 
        ? { ...job, isActive: !job.isActive }
        : job
    );
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Roles</h1>
          <p className="text-muted-foreground">
            Manage your open positions and track applications
          </p>
        </div>
        <Link href="/dashboard/create-job">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Job Role
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search job roles..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      {/* Job Roles Grid */}
      {filteredJobRoles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobRoles.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{job.name}</CardTitle>
                    <CardDescription className="mt-1">{job.department}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={job.isActive} 
                      onCheckedChange={() => toggleJobStatus(job.id)}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={job.isActive ? "default" : "secondary"}>
                    {job.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(job.createdAt)}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.experienceLevel}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {job.applicants.length} applicants
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Link href={job.publicLink} target="_blank">
                      <Button size="sm" variant="outline" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        View Form
                      </Button>
                    </Link>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No job roles found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? `No job roles match "${searchTerm}". Try adjusting your search terms.` : "No job roles available."}
            </p>
            {!searchTerm && (
              <Link href="/dashboard/create-job">
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Job Role
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
