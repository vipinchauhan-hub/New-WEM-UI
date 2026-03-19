import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, rightPanel, activeTab, onNavigate, onLogout }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <Sidebar activeTab={activeTab} onNavigate={onNavigate} onLogout={onLogout} />
            <div style={{
                flex: 1,
                marginLeft: '260px',
                display: 'flex',
                flexDirection: 'column',
                marginRight: rightPanel && isPanelOpen ? '350px' : '0', // Dynamic margin
                transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
                minWidth: 0 // Crucial for flex items to shrink below content size (e.g. wide tables)
            }}>
                <Header onToggleRightPanel={() => setIsPanelOpen(!isPanelOpen)} />
                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
            {rightPanel && (
                <aside style={{
                    width: '350px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '1px solid var(--border-color)',
                    height: '100vh',
                    position: 'fixed',
                    right: isPanelOpen ? 0 : '-360px', // Slide out logic
                    top: 0,
                    zIndex: 10,
                    padding: '32px 24px',
                    overflowY: 'auto',
                    boxShadow: isPanelOpen ? '-4px 0 24px rgba(0,0,0,0.02)' : 'none',
                    transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    {rightPanel}
                </aside>
            )}
        </div>
    );
};

export default Layout;
