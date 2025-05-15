import { portfolioItems } from '@/lib/data';
import { PortfolioItemCard } from '@/components/portfolio-item-card';

export const metadata = {
  title: 'Portfolio - FusionFolio',
  description: 'Explore a selection of projects by FusionFolio.',
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          My Portfolio
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A showcase of my skills and projects. Dive in to see what I can build.
        </p>
      </header>

      {portfolioItems.length === 0 ? (
         <p className="text-center text-muted-foreground text-lg">No portfolio items yet. Check back soon!</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
