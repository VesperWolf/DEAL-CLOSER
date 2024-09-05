import React from 'react';

export const Checkbox = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
);