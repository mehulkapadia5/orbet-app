"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ClipboardCheck, 
  ArrowRight
} from "lucide-react";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles = [
    {
      id: "hiring-manager",
      title: "Hiring Manager",
      description: "Create jobs and manage the hiring process.",
      icon: ClipboardCheck,
    },
    {
      id: "interviewer",
      title: "Interviewer",
      description: "Conduct interviews and provide feedback.",
      icon: Users,
    }
  ];

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    // Here you would typically save the role to user profile/database
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-4">
                Select Your Role
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Please choose your role to continue. This helps us customize your experience.
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-2 gap-2 mb-6 max-w-md mx-auto">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                
                return (
                  <Card 
                    key={role.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isSelected 
                        ? "ring-2 ring-primary bg-primary/5" 
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => handleRoleSelection(role.id)}
                  >
                    <CardContent className="p-3 text-center aspect-square flex flex-col justify-center items-center">
                      <div className="flex justify-center mb-3">
                        <Icon className={`h-8 w-8 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <CardTitle className="text-lg mb-2 leading-tight text-center">{role.title}</CardTitle>
                      <CardDescription className="text-sm leading-tight text-center break-words text-muted-foreground">
                        {role.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="text-center">
              <Button 
                onClick={handleContinue}
                disabled={!selectedRole || isLoading}
                size="lg"
                className="gap-2 px-8"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Setting up your account...
                  </>
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                You can change your role later in settings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
