'use server';
/**
 * @fileOverview A flow for searching blog posts.
 *
 * - searchBlogPosts - A function that searches blog posts based on a query.
 * - SearchBlogPostsInput - The input type for the searchBlogPosts function.
 * - SearchBlogPostsOutput - The return type for the searchBlogPosts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { blogPosts } from '@/lib/data';
import type { BlogPost } from '@/lib/types';

const SearchBlogPostsInputSchema = z.object({
  query: z.string().describe('The search query to filter blog posts.'),
});
export type SearchBlogPostsInput = z.infer<typeof SearchBlogPostsInputSchema>;

// Define a Zod schema that matches the BlogPost type for the output
const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string().optional(),
  imageHint: z.string().optional(),
  content: z.string(),
});

const SearchBlogPostsOutputSchema = z.object({
  posts: z.array(BlogPostSchema).describe('A list of blog posts matching the search query.'),
});
export type SearchBlogPostsOutput = z.infer<typeof SearchBlogPostsOutputSchema>;

// This function will be called by the client component
export async function searchBlogPosts(input: SearchBlogPostsInput): Promise<SearchBlogPostsOutput> {
  return searchBlogPostsFlow(input);
}

const searchBlogPostsFlow = ai.defineFlow(
  {
    name: 'searchBlogPostsFlow',
    inputSchema: SearchBlogPostsInputSchema,
    outputSchema: SearchBlogPostsOutputSchema,
  },
  async (input) => {
    const { query } = input;
    const lowerCaseQuery = query.toLowerCase();

    if (!query.trim()) {
      return { posts: [] }; // Return empty if query is blank
    }

    const filteredPosts = blogPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      return titleMatch || excerptMatch || contentMatch;
    });

    // Ensure the returned posts match the BlogPost type structure
    return { posts: filteredPosts as BlogPost[] };
  }
);
