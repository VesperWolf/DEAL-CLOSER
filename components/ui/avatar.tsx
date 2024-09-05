import React from 'react';

export const Avatar = ({ src, alt }) => (
  <img className="avatar" src={src} alt={alt} />
);

export const AvatarImage = ({ src, alt }) => (
  <img className="avatar-image" src={src} alt={alt} />
);

export const AvatarFallback = ({ children }) => (
  <div className="avatar-fallback">{children}</div>
);