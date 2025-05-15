import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} FusionFolio. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
