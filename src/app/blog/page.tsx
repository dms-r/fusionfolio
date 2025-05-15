
'use client';

import { useState, useEffect, useMemo } from 'react';
import { blogPosts as allBlogPostsInitial } from '@/lib/data';
import type { BlogPost } from '@/lib/types';
import { BlogPostCard } from '@/components/blog-post-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react'; // Removed Loader2

const DEBOUNCE_DELAY = 300; // Reduced debounce delay for faster client-side feedback

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const [allBlogPosts] = useState<BlogPost[]>(allBlogPostsInitial); // Keep initial posts immutable

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allBlogPosts.map(post => post.category)));
    uniqueCategories.sort(); // Sort categories alphabetically
    return uniqueCategories;
  }, [allBlogPosts]);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredPosts = useMemo(() => {
    let posts = [...allBlogPosts];

    // Apply search term filter
    if (debouncedSearchTerm.trim() !== '') {
      const lowerCaseQuery = debouncedSearchTerm.toLowerCase();
      posts = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(lowerCaseQuery);
        const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
        return titleMatch || excerptMatch || contentMatch;
      });
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Sort posts by date descending (newest first) as they might be from various sources/filters
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  }, [debouncedSearchTerm, selectedCategory, allBlogPosts]);


  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
          FusionFolio Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights, tutorials, and thoughts on web development and technology.
        </p>
      </header>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles by keyword..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search articles"
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
         (debouncedSearchTerm.trim() !== '' || selectedCategory !== 'all') ? (
          <p className="text-center text-muted-foreground text-lg py-10">No articles found matching your criteria.</p>
         ) : (
          allBlogPosts.length === 0 ? 
          <p className="text-center text-muted-foreground text-lg py-10">No blog posts yet. Check back soon!</p> :
          // This case should ideally not be hit if allBlogPosts has items and no filters are active
          // It means something is wrong or allBlogPosts is truly empty initially.
          // If allBlogPosts has items, this implies the default view shows nothing, which is unlikely.
          // The original code had a fallback to show allBlogPosts here, maintaining that for safety,
          // though with client-side filtering, filteredPosts should equal allBlogPosts if no filters.
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
         )
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
