import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PortfolioItem } from '@/lib/types';
import { ExternalLink, Github } from 'lucide-react';

type PortfolioItemCardProps = {
  item: PortfolioItem;
};

export function PortfolioItemCard({ item }: PortfolioItemCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-56">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={item.imageHint || 'project showcase'}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <CardDescription className="line-clamp-4">{item.description}</CardDescription>
        {item.technologies && item.technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1 text-foreground">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {item.projectUrl && (
          <Button asChild variant="default" size="sm" className="shadow hover:shadow-md">
            <Link href={item.projectUrl} target="_blank" rel="noopener noreferrer">
              Live Project <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
        {item.repoUrl && (
          <Button asChild variant="outline" size="sm" className="shadow hover:shadow-md">
            <Link href={item.repoUrl} target="_blank" rel="noopener noreferrer">
              View Code <Github className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
