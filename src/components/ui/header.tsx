"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function Header1() {
    const navigationItems = [
        {
            title: "Features",
            href: "#features",
            description: "",
        },
        {
            title: "How It Works",
            href: "#how-it-works",
            description: "",
        },
        {
            title: "Pricing",
            href: "#pricing",
            description: "",
        },
        {
            title: "Contact",
            href: "#contact",
            description: "",
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b">
            <div className="container relative mx-auto min-h-16 sm:min-h-20 flex gap-2 sm:gap-4 flex-row items-center justify-between px-4">
                {/* Left: Orbet Branding */}
                <div className="flex items-center">
                    <p className="font-semibold text-lg sm:text-xl">Orbet</p>
                </div>
                
                {/* Center: Navigation Menu */}
                <div className="justify-center items-center gap-2 sm:gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-center items-center">
                        <NavigationMenuList className="flex justify-center gap-1 sm:gap-2 lg:gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink asChild>
                                        <Link href={item.href}>
                                            <Button variant="ghost" size="sm" className="text-sm sm:text-base">{item.title}</Button>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                
                {/* Right: Get Started Button & Mobile Menu */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/signup">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hidden lg:inline-flex text-sm sm:text-base">Get Started</Button>
                    </Link>
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)} className="lg:hidden p-2">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
                {isOpen && (
                    <div className="absolute top-16 sm:top-20 left-0 right-0 border-t flex flex-col w-full bg-background/95 backdrop-blur-sm shadow-lg py-4 px-4 gap-6">
                        {navigationItems.map((item) => (
                            <div key={item.title}>
                                <Link
                                    href={item.href}
                                    className="flex justify-between items-center py-2"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="text-lg">{item.title}</span>
                                    <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                </Link>
                            </div>
                        ))}
                        <div className="pt-2">
                            <Link href="/signup">
                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export { Header1 };
