import React from 'react';

export const Select = ({ children, value, onChange, className }) => (
  <select className={`select ${className}`} value={value} onChange={onChange}>
    {children}
  </select>
);

export const SelectTrigger = ({ children, className }) => (
  <div className={`select-trigger ${className}`}>{children}</div>
);

export const SelectValue = ({ children, className }) => (
  <div className={`select-value ${className}`}>{children}</div>
);

export const SelectContent = ({ children, className }) => (
  <div className={`select-content ${className}`}>{children}</div>
);

export const SelectItem = ({ children, value, className }) => (
  <option className={`select-item ${className}`} value={value}>
    {children}
  </option>
);