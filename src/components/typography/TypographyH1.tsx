import { cn } from '@/lib/utils'; // Assuming you're using classnames utility
import React from 'react';

interface TypographyH1Props {
    text: string;
    className?: string;
}

export function TypographyH1({ className, text }: TypographyH1Props) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {text}
        </h1>
    );
}
