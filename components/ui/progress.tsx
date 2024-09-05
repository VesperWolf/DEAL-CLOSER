import React from 'react';

export const Progress = ({ value, max, className }) => (
  <progress className={`progress ${className}`} value={value} max={max} />
);