import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const alerts = [
    {
        id: 1,
        type: 'warning',
        icon: Clock,
        title: '2 files breaching inbound SLA (>25m)',
        action: 'View',
        theme: { bg: '#fffbe6', border: '#ffe58f', iconColor: '#faad14' } // Light Orange/Yellow
    },
    {
        id: 2,
        type: 'critical',
        icon: AlertTriangle,
        title: 'Recon_NV_311 failed checksum x2',
        action: 'View',
        theme: { bg: '#fff1f0', border: '#ffccc7', iconColor: '#ff4d4f' } // Light Red
    },
    {
        id: 3,
        type: 'success',
        icon: CheckCircle,
        title: 'Scheduled certification window tonight 11pm–1am PT',
        action: 'View',
        theme: { bg: '#f6ffed', border: '#d9f7be', iconColor: '#52c41a' } // Light Green
    }
];

const savedViews = ['Today', 'Last 7 days', 'SLA watchlist'];

const AlertsWidget = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* User Profile / Top Section of Right Panel (optional filler) */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                {/* Could put extra controls here */}
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Actions</h3>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Alerts & tasks</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {alerts.map((alert) => (
                        <div key={alert.id} style={{
                            backgroundColor: alert.theme.bg,
                            border: `1px solid ${alert.theme.border}`,
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}>
                            <alert.icon size={20} color={alert.theme.iconColor} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: '1.4', flex: 1 }}>{alert.title}</span>
                            <button style={{
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '4px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}>
                                {alert.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Saved Views</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {savedViews.map((view) => (
                        <button key={view} style={{
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}>
                            {view}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AlertsWidget;
