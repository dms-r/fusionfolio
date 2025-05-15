import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

export const metadata = {
  title: 'Archive - FusionFolio',
  description: 'A chronological list of all articles published on FusionFolio.',
};

export default function ArchivePage() {
  // Group posts by year
  const postsByYear: Record<string, typeof blogPosts> = {};
  blogPosts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          Article Archive
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse all published articles, sorted chronologically.
        </p>
      </header>

      {sortedYears.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg">No articles in the archive yet.</p>
      ) : (
        <div className="space-y-12">
          {sortedYears.map(year => (
            <section key={year}>
              <h2 className="text-3xl font-semibold mb-6 pb-2 border-b border-border text-foreground">{year}</h2>
              <div className="space-y-4">
                {postsByYear[year].map(post => (
                  <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
