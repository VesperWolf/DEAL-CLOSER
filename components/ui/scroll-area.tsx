import React from 'react';

export const ScrollArea = ({ children, className }) => (
  <div className={`scroll-area ${className}`}>{children}</div>
);