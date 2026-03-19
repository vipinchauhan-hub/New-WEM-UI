import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const StatsCard = ({ title, value, change, trend = 'neutral', children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getTrendColor = () => {
        if (trend === 'up') return 'var(--status-success-text)';
        if (trend === 'down') return 'var(--status-warning-text)';
        return trend === 'up' ? 'var(--status-success-text)' : 'var(--status-error-text)';
    };

    const getTrendIcon = () => {
        if (trend === 'up') return <ArrowUpRight size={16} />;
        if (trend === 'down') return <ArrowDownRight size={16} />;
        return <Minus size={16} />;
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'all 0.3s ease',
            height: isExpanded ? 'auto' : '150px' // Initial height assumption, auto expands
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                        <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: getTrendColor(),
                            backgroundColor: trend === 'up' ? 'var(--status-success-bg)' : 'var(--status-error-bg)',
                            padding: '4px 8px',
                            borderRadius: '20px'
                        }}>
                            {getTrendIcon()}
                            <span>{change}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expand Toggle */}
            {children && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        background: 'none',
                        border: 'none',
                        borderTop: '1px solid var(--border-color)',
                        marginTop: '8px',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            )}

            {/* Detailed View */}
            {isExpanded && children && (
                <div style={{
                    marginTop: '8px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    {children}
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default StatsCard;
