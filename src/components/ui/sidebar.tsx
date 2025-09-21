"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Settings,
  Menu,
  LogOut,
  User,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/ui/auth-provider";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible = false, ...props }, ref) => {
    const [isCollapsed] = React.useState(collapsible);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const navigationItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Job Roles",
        url: "/dashboard/job-roles",
        icon: Briefcase,
        isActive: pathname === "/dashboard/job-roles",
      },
      {
        title: "Scheduling",
        url: "/dashboard/scheduling",
        icon: Calendar,
        isActive: pathname === "/dashboard/scheduling",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        isActive: pathname === "/dashboard/settings",
      },
    ];

    const SidebarContent = () => (
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">O</span>
            </div>
            <span className={cn("font-semibold", isCollapsed && "sr-only")}>
              Orbet
            </span>
          </Link>
        </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => trackEvent('navigation_clicked', {
                      page: item.title,
                      url: item.url
                    })}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      item.isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className={cn(isCollapsed && "sr-only")}>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </nav>
              
              {/* Quick Action Section */}
              <div className="px-2 py-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <span className={cn(isCollapsed && "sr-only")}>Quick Action</span>
                </div>
                <Button
                  className={cn(
                    "w-full justify-start gap-3 h-9",
                    isCollapsed && "justify-center px-2"
                  )}
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link 
                    href="/dashboard/create-job"
                    onClick={() => trackEvent('quick_action_clicked', {
                      action: 'Add Job Role',
                      location: 'sidebar'
                    })}
                  >
                    <Plus className="h-4 w-4" />
                    <span className={cn(isCollapsed && "sr-only")}>Add Job Role</span>
                  </Link>
                </Button>
              </div>
            </div>
        <div className="border-t p-2">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
            <div className={cn("flex-1", isCollapsed && "sr-only")}>
              <p className="text-sm font-medium">{user?.displayName || user?.email}</p>
              <p className="text-xs text-muted-foreground">Recruiter</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                trackEvent('user_logout', {
                  location: 'sidebar'
                });
                logout();
              }}
              className={cn("h-8 w-8", isCollapsed && "mx-auto")}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {/* Desktop Sidebar */}
        <div
          ref={ref}
          className={cn(
            "group relative lg:flex hidden h-screen w-64 flex-col border-r bg-background transition-all duration-300 ease-in-out",
            isCollapsed && "w-16",
            className
          )}
          {...props}
        >
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 lg:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </>
    );
  }
);
Sidebar.displayName = "Sidebar";

export { Sidebar };
