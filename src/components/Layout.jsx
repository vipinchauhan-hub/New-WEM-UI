import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, rightPanel, activeTab, onNavigate, onLogout }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Starts expanded

    useEffect(() => {
        // Auto-collapse after 2.5 seconds to save string space
        const timer = setTimeout(() => {
            setIsSidebarCollapsed(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleToggleRightPanel = () => {
        const newState = !isPanelOpen;
        setIsPanelOpen(newState);
        // Auto-collapse left sidebar when opening the right panel to maximize content room
        if (newState) {
            setIsSidebarCollapsed(true);
        }
    };

    const handleSidebarEnter = () => {
        setIsSidebarCollapsed(false);
        // Ensure only one panel is open at a time
        if (isPanelOpen) {
            setIsPanelOpen(false);
        }
    };

    const handleSidebarLeave = () => {
        setIsSidebarCollapsed(true);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <Sidebar 
                activeTab={activeTab} 
                onNavigate={onNavigate} 
                onLogout={onLogout} 
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                onMouseEnter={handleSidebarEnter}
                onMouseLeave={handleSidebarLeave}
            />
            <div style={{
                flex: 1,
                marginLeft: isSidebarCollapsed ? '80px' : '260px',
                display: 'flex',
                flexDirection: 'column',
                marginRight: rightPanel && isPanelOpen ? '350px' : '0', // Dynamic margin
                transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
                minWidth: 0 // Crucial for flex items to shrink below content size (e.g. wide tables)
            }}>
                <Header onToggleRightPanel={handleToggleRightPanel} />
                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
            {rightPanel && (
                <aside style={{
                    width: '350px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '1px solid var(--border-color)',
                    bottom: 0,
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
