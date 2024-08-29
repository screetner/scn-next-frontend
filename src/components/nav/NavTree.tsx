'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function NavTree() {
  const path = usePathname();
  const pathArray = path.split('/').filter(Boolean);

  return (
    <Breadcrumb className="hidden sm:flex">
      <BreadcrumbList>
        <BreadcrumbSeparator />
        {pathArray.map((segment, index) => {
          const href = `/${pathArray.slice(0, index + 1).join('/')}`;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {index === pathArray.length - 1 ? (
                    <BreadcrumbPage>{segment.toUpperCase()}</BreadcrumbPage>
                  ) : (
                    <Link href={href}>{segment.toUpperCase()}</Link>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== pathArray.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
