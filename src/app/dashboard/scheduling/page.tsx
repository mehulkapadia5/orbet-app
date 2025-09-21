"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Video,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function SchedulingPage() {
  const scheduledInterviews = [
    {
      id: 1,
      candidate: "John Smith",
      position: "Frontend Developer",
      interviewer: "Sarah Johnson",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "60 min",
      type: "Technical",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      candidate: "Emily Davis",
      position: "Product Manager",
      interviewer: "Mike Wilson",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "45 min",
      type: "HR",
      status: "pending",
      meetingLink: "https://meet.google.com/xyz-1234-567",
    },
    {
      id: 3,
      candidate: "David Brown",
      position: "Backend Developer",
      interviewer: "Lisa Chen",
      date: "2024-01-16",
      time: "11:00 AM",
      duration: "90 min",
      type: "Technical",
      status: "confirmed",
      meetingLink: "https://meet.google.com/mno-pqrs-tuv",
    },
    {
      id: 4,
      candidate: "Alex Thompson",
      position: "UX Designer",
      interviewer: "Tom Rodriguez",
      date: "2024-01-16",
      time: "3:00 PM",
      duration: "60 min",
      type: "Portfolio Review",
      status: "cancelled",
      meetingLink: null,
    },
  ];

  const upcomingSlots = [
    {
      id: 1,
      date: "2024-01-17",
      time: "9:00 AM",
      duration: "60 min",
      type: "Technical Interview",
      available: true,
    },
    {
      id: 2,
      date: "2024-01-17",
      time: "1:00 PM",
      duration: "45 min",
      type: "HR Interview",
      available: true,
    },
    {
      id: 3,
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "90 min",
      type: "Technical Interview",
      available: false,
    },
    {
      id: 4,
      date: "2024-01-18",
      time: "2:00 PM",
      duration: "60 min",
      type: "Final Interview",
      available: true,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scheduling</h1>
          <p className="text-muted-foreground">
            Manage interviews and schedule new sessions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scheduled Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
            <CardDescription>
              Upcoming and recent interview sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledInterviews.map((interview) => (
              <div key={interview.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{interview.candidate}</h3>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <p className="text-sm text-muted-foreground">
                      Interviewer: {interview.interviewer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(interview.status)}
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {interview.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {interview.time} ({interview.duration})
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {interview.type}
                  </div>
                </div>

                {interview.meetingLink && (
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-500" />
                    <a 
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>
              Book these slots for new interviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSlots.map((slot) => (
              <div key={slot.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{slot.type}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {slot.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {slot.time} ({slot.duration})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {slot.available ? (
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Booked</Badge>
                    )}
                  </div>
                </div>
                {slot.available && (
                  <Button size="sm" className="mt-3 w-full">
                    Book This Slot
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
