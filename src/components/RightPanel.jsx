import React, { useState } from 'react';
import AlertsWidget from './AlertsWidget';
import ChatWidget from './ChatWidget';
import { Bell, MessageSquare } from 'lucide-react';

const RightPanel = () => {
    const [activeTab, setActiveTab] = useState('chat'); // Default to AI Assistant

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Tab Header */}
            <div style={{
                display: 'flex',
                padding: '0 16px',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '16px'
            }}>
                <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                        flex: 1,
                        padding: '16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'chat' ? '2px solid var(--primary-brand)' : '2px solid transparent',
                        color: activeTab === 'chat' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                    }}
                >
                    <MessageSquare size={16} />
                    Assistant
                </button>
                <button
                    onClick={() => setActiveTab('alerts')}
                    style={{
                        flex: 1,
                        padding: '16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'alerts' ? '2px solid var(--primary-brand)' : '2px solid transparent',
                        color: activeTab === 'alerts' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        position: 'relative'
                    }}
                >
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Bell size={16} color={activeTab === 'alerts' ? 'var(--primary-brand)' : 'var(--status-error-text)'} />
                        {/* Red dot badge logic or literal count as requested */}
                        <div style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-8px',
                            backgroundColor: 'var(--status-error-text)',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 700,
                            borderRadius: '50%',
                            width: '14px', // Small dot
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid var(--bg-secondary)'
                        }}>3</div>
                    </div>
                    Alerts
                </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: activeTab === 'alerts' ? 'auto' : 'hidden' }}>
                {activeTab === 'alerts' ? (
                    <AlertsWidget />
                ) : (
                    <ChatWidget />
                )}
            </div>
        </div>
    );
};

export default RightPanel;
