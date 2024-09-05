import React from 'react';

export const Label = ({ children, htmlFor, className }) => (
  <label className={`label ${className}`} htmlFor={htmlFor}>
    {children}
  </label>
);