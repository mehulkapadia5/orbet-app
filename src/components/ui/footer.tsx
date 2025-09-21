import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <div className="w-full py-8 sm:py-10 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">Orbet</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Transform your recruitment process with AI automation.
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-fit text-sm">
                Contact Us
              </Button>
            </div>

            {/* Product Section */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Product</h4>
              <div className="flex flex-col gap-2">
                <a href="#features" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Pricing
                </a>
                <a href="/integration" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Integration
                </a>
                <a href="/api-docs" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  API Docs
                </a>
              </div>
            </div>

            {/* Company Section */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Company</h4>
              <div className="flex flex-col gap-2">
                <a href="/about" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  About
                </a>
                <a href="/blog" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Blog
                </a>
                <a href="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Terms
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">Get Started</h4>
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">
                  Ready to transform your hiring process?
                </p>
                <Button size="sm" className="w-fit text-sm">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2024 Orbet. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Footer };
