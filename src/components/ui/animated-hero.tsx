"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/ui/auth-provider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const titles = useMemo(
    () => ["Hire Smarter", "Hire Faster", "Hire Better", "Hire Effeciently",],
    []
  );

  const handleGetStartedClick = () => {
    trackEvent('cta_clicked', {
      button_text: 'Get Started',
      location: 'hero_section',
      user_logged_in: !!user
    });
  };

  const handleResumeHiringClick = () => {
    trackEvent('cta_clicked', {
      button_text: 'Resume Hiring',
      location: 'hero_section',
      user_logged_in: true
    });
    router.push("/select-role");
  };

  const handleGetInTouchClick = () => {
    trackEvent('cta_clicked', {
      button_text: 'Get in touch',
      location: 'hero_section',
      user_logged_in: !!user
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full pt-20">
      <div className="container mx-auto">
        <div className="flex gap-6 sm:gap-8 py-8 sm:py-10 lg:py-15 items-center justify-center flex-col px-4">
          <div className="flex gap-3 sm:gap-4 flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span><span style={{ color: '#1d4ed8', fontWeight: 'bold' }}>Orbet AI</span> let&apos;s you</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center pb-2 sm:pb-4 pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center px-2">
            Streamline recruitment with AI automation. Reduce time-to-hire by 40% while improving candidate experience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md sm:max-w-none sm:w-auto">
            {user ? (
              <Button size="lg" className="gap-4 w-full sm:w-auto" onClick={handleResumeHiringClick}>
                Resume Hiring <MoveRight className="w-4 h-4" />
              </Button>
                ) : (
                  <Link href="/login">
                    <Button size="lg" className="gap-4 w-full sm:w-auto" onClick={handleGetStartedClick}>
                      Get Started <MoveRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
            <Button size="lg" className="gap-4 w-full sm:w-auto" variant="outline" onClick={handleGetInTouchClick}>
              Get in touch <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
