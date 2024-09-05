import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className="tabs">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsList = ({ children }) => (
  <div className="tabs-list">{children}</div>
);

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    className={`tabs-trigger ${activeTab === value ? 'active' : ''}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, activeTab }) => (
  activeTab === value ? <div className="tabs-content">{children}</div> : null
);