import { cn } from '@/lib/utils'; // Assuming you're using classnames utility
import React from 'react';

interface TypographyH2Props {
  text: string;
  className?: string;
}

export function TypographyH2({ className, text }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {text}
    </h2>
  );
}
