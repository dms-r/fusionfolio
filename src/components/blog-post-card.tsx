import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {post.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={post.imageHint || 'blog illustration'}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground pt-2">
          <CalendarDays className="mr-2 h-4 w-4" />
          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
        <div className="mt-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline flex items-center">
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
