import React from 'react';
import Image from 'next/image';

export const Avatar = ({ src, alt }) => (
  <Image src={src} alt={alt} width={50} height={50} />
);

export const AvatarImage = ({ src, alt }) => (
  <Image src={src} alt={alt} width={50} height={50} />
);

export const AvatarFallback = ({ children }) => (
  <div>{children}</div>
);