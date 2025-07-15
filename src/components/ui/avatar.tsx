'use client';

import {
  Root as AvatarRoot,
  AvatarFallback as RadixAvatarFallback,
  AvatarImage as RadixAvatarImage,
} from '@radix-ui/react-avatar';
import React from 'react';

import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarRoot>,
  React.ComponentPropsWithoutRef<typeof AvatarRoot>
>(({ className, ...props }, ref) => (
  <AvatarRoot
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    ref={ref}
    {...props}
  />
));
Avatar.displayName = AvatarRoot.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatarImage>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => (
  <RadixAvatarImage
    className={cn('aspect-square h-full w-full', className)}
    ref={ref}
    {...props}
  />
));
AvatarImage.displayName = RadixAvatarImage.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatarFallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarFallback>
>(({ className, ...props }, ref) => (
  <RadixAvatarFallback
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    ref={ref}
    {...props}
  />
));
AvatarFallback.displayName = RadixAvatarFallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
