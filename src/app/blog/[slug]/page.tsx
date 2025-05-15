
import { blogPosts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Tags, UserCircle, Share2, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SocialShareButtons } from '@/components/social-share-buttons';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found - FusionFolio',
    }
  }
  return {
    title: `${post.title} - FusionFolio Blog`,
    description: post.excerpt,
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
  const fullPostUrl = `${siteUrl}/blog/${post.slug}`;


  return (
    <article className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6">
        <Button asChild variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Blog
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-4 w-4" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center">
            <UserCircle className="mr-1.5 h-4 w-4" />
            <span>By FusionFolio Admin</span> {/* Placeholder author */}
          </div>
          <Badge variant="secondary" className="capitalize">{post.category}</Badge>
        </div>
        {post.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-8">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint || 'article illustration'}
              priority
            />
          </div>
        )}
      </header>

      <div
        className="prose dark:prose-invert lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/```([\s\S]*?)```/g, (match, p1) => `<pre><code>${p1.trim()}</code></pre>`).replace(/`([^`]+)`/g, '<code>$1</code>') }}
      />

      <Separator className="my-10" />

      <footer className="space-y-6">
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tags className="h-5 w-5 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <SocialShareButtons url={fullPostUrl} title={post.title} />

        <div className="mt-10 pt-6 border-t border-border">
          <Button asChild variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Blog
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}
