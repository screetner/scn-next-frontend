'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { TNav } from '@/types/navList';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface NavIconProps {
  nav: TNav;
}

export default function NavIcon({ nav }: NavIconProps) {
  const pathname = usePathname();
  const active = pathname === nav.path;
  const { theme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={nav.path}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'bg-accent text-accent-foreground': active,
              'text-muted-foreground': !active,
              'bg-light-theme-color text-dark-icon-color':
                !active && theme === 'light',
              'bg-dark-theme-color text-light-icon-color':
                !active && theme === 'dark',
            },
          )}
        >
          {nav.icon}
          <span className="sr-only">{nav.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Dashboard</TooltipContent>
    </Tooltip>
  );
}
