import { Check } from "lucide-react";

function Feature() {
  return (
    <div className="w-full py-5 lg:py-10 px-4">
      <div className="container mx-auto">
        <div className="flex gap-4 py-5 lg:py-10 flex-col">
          <div className="flex gap-2 flex-col max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              Why Choose Orbet?
            </h2>
            <p className="text-base sm:text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Powerful AI-driven features that transform your entire recruitment process
            </p>
          </div>
          <div className="flex gap-6 sm:gap-10 pt-8 sm:pt-12 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-start lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              <div className="flex flex-row gap-4 sm:gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">Application Collection</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Automatically collect and parse resumes from various sources, extracting skills and experience instantly.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">AI Resume Evaluation</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Machine learning scores and shortlists candidates based on job criteria with bias mitigation.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">AI Voice Scheduling</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Automate interview scheduling with AI-powered voice calls to confirm candidate availability.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">Smart Calendar Sync</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Seamless calendar integration prevents conflicts and adds video conferencing links automatically.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">Smart Reminders</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Automated reminders ensure interviewers never miss scheduled interviews with push notifications.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 items-start">
                <Check className="w-4 h-4 mt-1 sm:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-medium">Chrome Extension</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Submit rubric-based feedback during interviews for consistent, structured evaluations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
