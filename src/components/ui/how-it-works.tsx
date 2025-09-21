import { FileText, Brain, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FileText,
      title: "Collect Resumes",
      description: "Collect and parse candidate applications automatically"
    },
    {
      number: "2", 
      icon: Brain,
      title: "Evaluate with AI",
      description: "Let AI score and rank candidates based on your specific job requirements"
    },
    {
      number: "3",
      icon: Calendar,
      title: "Schedule Interviews", 
      description: "AI voice calls handle scheduling while syncing with your calendar"
    },
    {
      number: "4",
      icon: Users,
      title: "Hire Top Talent",
      description: "Make data-driven decisions with structured feedback and candidate insights"
    }
  ];

  return (
    <div className="w-full py-5 lg:py-10">
      <div className="container mx-auto">
        <div className="flex gap-4 py-5 lg:py-10 flex-col items-center text-center">
          <div className="flex gap-2 flex-col max-w-3xl">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-regular">
              Hiring Made Simple
            </h2>
            <p className="text-lg max-w-2xl leading-relaxed tracking-tight text-muted-foreground">
              Four simple steps to transform your recruitment process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Button size="lg" className="gap-4">
              See It in Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HowItWorks };
