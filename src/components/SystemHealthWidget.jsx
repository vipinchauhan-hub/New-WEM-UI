import React from 'react';
import { Server, Database, Globe, Archive, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const systems = [
    { name: 'SFTP Gateway (Inbound)', status: 'online', uptime: '99.9%', icon: Server },
    { name: 'SFTP Gateway (Outbound)', status: 'online', uptime: '99.9%', icon: Server },
    { name: 'Core Database', status: 'online', uptime: '100%', icon: Database },
    { name: 'API Services', status: 'degraded', uptime: '98.5%', message: 'High latency detected', icon: Globe },
    { name: 'Archival Storage', status: 'online', uptime: '99.99%', icon: Archive },
];

const SystemHealthWidget = () => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'var(--status-success-text)';
            case 'degraded': return 'var(--status-warning-text)';
            case 'offline': return 'var(--status-error-text)';
            default: return 'var(--text-secondary)';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return <CheckCircle size={16} />;
            case 'degraded': return <AlertTriangle size={16} />;
            case 'offline': return <XCircle size={16} />;
            default: return null;
        }
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
        }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>System Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {systems.map((sys) => (
                    <div key={sys.name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ padding: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                <sys.icon size={18} color="var(--text-secondary)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{sys.name}</div>
                                {sys.message && <div style={{ fontSize: '11px', color: 'var(--status-warning-text)' }}>{sys.message}</div>}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: getStatusColor(sys.status),
                                fontSize: '13px',
                                fontWeight: 600,
                                justifyContent: 'flex-end'
                            }}>
                                {getStatusIcon(sys.status)}
                                <span style={{ textTransform: 'capitalize' }}>{sys.status}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{sys.uptime} uptime</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemHealthWidget;
