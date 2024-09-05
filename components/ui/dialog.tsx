import React, { useState } from 'react';

export const Dialog = ({ children, open, onOpenChange }) => (
  open ? <div className="dialog">{children}</div> : null
);

export const DialogContent = ({ children }) => (
  <div className="dialog-content">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="dialog-header">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <div className="dialog-title">{children}</div>
);

export const DialogTrigger = ({ children, onClick }) => (
  <button className="dialog-trigger" onClick={onClick}>{children}</button>
);