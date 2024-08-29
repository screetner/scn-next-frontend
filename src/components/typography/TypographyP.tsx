import { cn } from '@/lib/utils'; // Assuming you're using classnames utility
import React from 'react';

interface TypographyPProps {
  text: string;
  className?: string;
}

export function TypographyP({ className, text }: TypographyPProps) {
  return (
    <h1 className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {text}
    </h1>
  );
}
