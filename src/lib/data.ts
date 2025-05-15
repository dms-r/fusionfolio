import type { BlogPost, PortfolioItem } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    date: '2024-05-15T10:00:00.000Z',
    excerpt: 'A comprehensive guide to setting up your first Next.js 14 project with App Router.',
    category: 'Tutorials',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract code',
    content: `
# My First Next.js Adventure

Welcome to this exploration of Next.js! It's a fantastic framework.

## Why Next.js?

Next.js offers several advantages:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- File-system routing
- API Routes

Here's a simple code snippet:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Developer');
\`\`\`

> This is a blockquote. Isn't it cool?

Explore more and build amazing things!
    `,
  },
  {
    id: '2',
    slug: 'tailwindcss-deep-dive',
    title: 'Tailwind CSS: A Deep Dive',
    date: '2024-04-20T14:30:00.000Z',
    excerpt: 'Understanding the utility-first approach of Tailwind CSS and how to customize it.',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Frontend'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'design tools',
    content: `
# Styling with Tailwind CSS

Tailwind CSS has revolutionized how I approach styling.

## Core Concepts
- Utility-first
- Responsive design
- Dark mode support

### Example Class
\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
\`\`\`

It's incredibly powerful for rapid UI development.
    `,
  },
  {
    id: '3',
    slug: 'mastering-typescript-generics',
    title: 'Mastering TypeScript Generics',
    date: '2024-03-10T09:00:00.000Z',
    excerpt: 'Unlock the power of reusable components and functions with TypeScript generics.',
    category: 'TypeScript',
    tags: ['TypeScript', 'Programming', 'Generics'],
    // No image for this one to test fallback
    content: `
# TypeScript Generics Explained

Generics are a cornerstone of strongly-typed programming.

## What are Generics?
Generics allow you to write reusable code that can work over a variety of types rather than a single one.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString"); 
let numOutput = identity<number>(123);
\`\`\`

They enhance type safety and code reusability.
    `,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL.',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'online shopping',
    projectUrl: '#',
    repoUrl: '#',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application using React, Firebase, and Material UI.',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'productivity app',
    projectUrl: '#',
    technologies: ['React', 'Firebase', 'Material UI'],
  },
  {
    id: '3',
    title: 'Personal Blog Engine',
    description: 'A custom blog engine developed with Node.js, Express, and MongoDB, featuring Markdown support.',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'writing technology',
    repoUrl: '#',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Markdown'],
  },
];

// Sort blog posts by date in descending order (newest first)
blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
