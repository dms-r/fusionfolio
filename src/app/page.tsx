
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <section className="pt-4 pb-16 sm:pt-6 sm:pb-20 md:pt-8 md:pb-24 lg:pt-16 lg:pb-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Image first in DOM, then Text. flex-col for mobile (image on top). lg:flex-row with orders for desktop. */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="flex justify-center lg:order-last"> {/* Image container, appears right on desktop */}
              <Image
                src="https://placehold.co/500x500.png"
                alt="Professional Photo"
                width={500}
                height={500}
                className="rounded-full object-cover shadow-2xl aspect-square w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]"
                data-ai-hint="professional portrait"
                priority
              />
            </div>
            <div className="space-y-6 text-center lg:text-left lg:order-first"> {/* Text container, appears left on desktop */}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Welcome to FusionFolio
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                I'm a passionate developer creating modern web experiences. Explore my work, read my thoughts, and get in touch.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  <Link href="/portfolio">
                    View My Work <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  <Link href="/blog">
                    Read My Blog
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">What I Do</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
              I specialize in building high-quality, scalable, and user-friendly web applications. My expertise spans across the full stack, from frontend development with modern JavaScript frameworks to backend architecture and database management.
            </p>
          </div>
          {/* Add more sections like "Featured Projects" or "Latest Blog Posts" here if desired */}
        </div>
      </section>
    </>
  );
}
