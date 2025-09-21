import { Lock } from "lucide-react";

function Feature() {
  return (
    <div className="w-full py-5 lg:py-10">
      <div className="container mx-auto">
        <div className="flex gap-4 py-5 lg:py-10 flex-col">
          <div className="flex gap-2 flex-col max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-regular">
              Enterprise Grade Secure
            </h2>
            <p className="text-lg max-w-2xl leading-relaxed tracking-tight text-muted-foreground">
              All your data is guarded with Enterprise grade encryption and compliance certifications.
            </p>
          </div>
          <div className="grid border rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 mt-12">
            <div className="flex gap-10 flex-col">
              <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
                <div className="flex flex-row gap-6 items-start">
                  <Lock className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>GDPR Compliant</p>
                    <p className="text-muted-foreground text-sm">
                      Full compliance with data protection regulations
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Lock className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>End-to-End Encryption</p>
                    <p className="text-muted-foreground text-sm">
                      Your candidate data is always protected
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6 items-start">
                  <Lock className="w-4 h-4 mt-2 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p>Bias Mitigation</p>
                    <p className="text-muted-foreground text-sm">
                      AI designed for fair and inclusive hiring
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-md flex items-center justify-center h-fit">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Enterprise Grade Secure</h3>
                <p className="text-muted-foreground text-sm">
                  All your data is guarded with Enterprise grade encryption and compliance certifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };