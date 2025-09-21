"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Candidates",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Active Jobs",
      value: "28",
      change: "+3",
      changeType: "positive" as const,
      icon: Briefcase,
    },
    {
      title: "Interviews Scheduled",
      value: "156",
      change: "+8%",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Hired This Month",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "interview",
      title: "Interview scheduled for Software Engineer",
      candidate: "John Doe",
      time: "2 hours ago",
      status: "scheduled",
    },
    {
      id: 2,
      type: "application",
      title: "New application received",
      candidate: "Jane Smith",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "hired",
      title: "Candidate hired",
      candidate: "Mike Johnson",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "review",
      title: "Resume review completed",
      candidate: "Sarah Wilson",
      time: "2 days ago",
      status: "completed",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Alex Thompson",
      position: "Frontend Developer",
      time: "10:00 AM",
      date: "Today",
      type: "Technical Interview",
    },
    {
      id: 2,
      candidate: "Emily Davis",
      position: "Product Manager",
      time: "2:00 PM",
      date: "Today",
      type: "Final Interview",
    },
    {
      id: 3,
      candidate: "David Brown",
      position: "Backend Developer",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "HR Interview",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your recruitment.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Job Post
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={cn(
                  "inline-flex items-center gap-1",
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                )}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates on your recruitment process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === "scheduled" && (
                    <Calendar className="h-5 w-5 text-blue-500" />
                  )}
                  {activity.status === "pending" && (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  {activity.status === "completed" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.candidate} • {activity.time}
                  </p>
                </div>
                <Badge variant={
                  activity.status === "scheduled" ? "default" :
                  activity.status === "pending" ? "secondary" : "outline"
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>
              Your scheduled interviews for the next few days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{interview.candidate}</p>
                  <p className="text-sm text-muted-foreground">{interview.position}</p>
                  <p className="text-xs text-muted-foreground">{interview.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{interview.time}</p>
                  <p className="text-xs text-muted-foreground">{interview.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
