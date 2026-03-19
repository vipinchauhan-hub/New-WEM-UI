import React from 'react';
import { Building2, TrendingUp, Activity } from 'lucide-react';


const TopPartnersWidget = ({ data }) => {
    const partners = data || [
        { name: 'UnitedHealth Group', volume: '12.5k', change: '+5%', status: 'good' },
        { name: 'CVS Health', volume: '10.2k', change: '+2.1%', status: 'good' },
        { name: 'Elevance Health (Anthem)', volume: '8.4k', change: '-1.5%', status: 'warning' },
        { name: 'Cigna', volume: '6.1k', change: '+8%', status: 'good' },
        { name: 'Humana', volume: '5.9k', change: '-0.4%', status: 'good' },
        { name: 'Centene', volume: '4.2k', change: '-5.2%', status: 'warning' },
    ];

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Top Trading Partners</h3>
                <button style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-brand)', border: 'none', background: 'none', cursor: 'pointer' }}>View All</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {partners.map((partner, index) => (
                    <div key={partner.name + index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: index !== partners.length - 1 ? '16px' : '0',
                        borderBottom: index !== partners.length - 1 ? '1px solid var(--border-color)' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--bg-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)'
                            }}>
                                <Building2 size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{partner.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Vol: {partner.volume}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: partner.change.startsWith('+') ? 'var(--status-success-text)' : 'var(--status-error-text)'
                            }}>
                                {partner.change}
                            </span>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: partner.status === 'good' ? 'var(--status-success-text)' : 'var(--status-warning-text)'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPartnersWidget;
