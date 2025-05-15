'use client';

import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast is available

type SocialShareButtonsProps = {
  url: string;
  title: string;
};

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast({ title: "Link Copied!", description: "The article link has been copied to your clipboard." });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({ title: "Copy Failed", description: "Could not copy link to clipboard.", variant: "destructive" });
      });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      {platforms.map((platform) => (
        <Button
          key={platform.name}
          variant="outline"
          size="icon"
          asChild
          className="transition-transform hover:scale-110"
          aria-label={`Share on ${platform.name}`}
        >
          <a href={platform.href} target="_blank" rel="noopener noreferrer">
            {platform.icon}
          </a>
        </Button>
      ))}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={copyLink} 
        className="transition-transform hover:scale-110"
        aria-label="Copy link"
      >
        <LinkIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
