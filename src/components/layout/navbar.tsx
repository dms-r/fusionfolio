
import Link from 'next/link';
import { MountainIcon, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import type { NavItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/archive', label: 'Archive' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">FusionFolio</span>
        </Link>
        
        {/* Desktop Navigation: flex-1 and justify-center to center the links */}
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right aligned group: ThemeToggle and Mobile Menu Trigger */}
        <div className="flex items-center gap-2"> 
          <ThemeToggle /> {/* ThemeToggle will be at the far right on desktop (within this group) as mobile menu is hidden */}
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden"> {/* Hidden on medium screens and up */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="flex items-center gap-2 mb-6" prefetch={false}>
                    <MountainIcon className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold tracking-tight">FusionFolio</span>
                  </Link>
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                          prefetch={false}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
