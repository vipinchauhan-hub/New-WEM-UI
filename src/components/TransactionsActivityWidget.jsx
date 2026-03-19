import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Activity, ArrowUpRight, ArrowDownRight, Minus, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const TransactionsActivityWidget = ({ stats, details }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Transform disparate details arrays into a unified matrix
    // This logic assumes the mock data labels match (e.g. "Add", "Change")
    const types = ['Add', 'Change', 'Term', 'Cancel', 'Reinstate'];

    // Helper to find value by label safely
    const findVal = (arr, label) => arr?.find(i => i.label === label)?.value || 0;

    const matrixData = types.map(type => ({
        type,
        total: findVal(details.transTotal, type),
        processing: findVal(details.transProcessing, type),
        sent: findVal(details.transSent, type),
        errors: findVal(details.transError, type),
        // Mocking some "Avg Time" data since it's not in the main mock yet
        avgTime: type === 'Add' ? '0.4s' : type === 'Change' ? '0.2s' : type === 'Term' ? '0.3s' : '0.1s'
    }));

    const MetricBlock = ({ label, value, change, trend, isLast }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 16px', borderRight: isLast ? 'none' : '1px solid var(--border-color)' }}>
            {/* Added whiteSpace: 'nowrap' to prevent wrapping of labels like "Transaction Errors" */}
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px', whiteSpace: 'nowrap' }}>{label}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', fontWeight: 600,
                    color: trend === 'up' ? 'var(--status-success-text)' : trend === 'down' ? 'var(--status-warning-text)' : 'var(--text-secondary)'
                }}>
                    {trend === 'up' ? <ArrowUpRight size={14} /> : trend === 'down' ? <ArrowDownRight size={14} /> : <Minus size={14} />}
                    {change}
                </div>
            </div>
        </div>
    );

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-sm)'
        }}>
            {/* Summary Row */}
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-brand)' }}>
                        <Activity size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Transactions</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Volume & SLA Tracking</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, paddingLeft: '24px' }}>
                    <MetricBlock label="Total Transactions" value={stats.transTotal.value} change={stats.transTotal.change} trend={stats.transTotal.trend} />
                    <MetricBlock label="In Processing" value={stats.transProcessing.value} change={stats.transProcessing.change} trend={stats.transProcessing.trend} />
                    <MetricBlock label="Transactions Sent" value={stats.transSent.value} change={stats.transSent.change} trend={stats.transSent.trend} />
                    <MetricBlock label="Transaction Errors" value={stats.transError.value} change={stats.transError.change} trend={stats.transError.trend} isLast />
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ marginLeft: '24px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {/* Detailed Expanded View */}
            {isExpanded && (
                <div style={{
                    borderTop: '1px solid var(--border-color)',
                    padding: '24px',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Transaction Matrix</h4>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#ecfdf5', color: '#047857', padding: '4px 8px', borderRadius: '6px' }}>
                                <CheckCircle size={14} />
                                <strong>99.8%</strong> SLA Compliance
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#fff7ed', color: '#c2410c', padding: '4px 8px', borderRadius: '6px' }}>
                                <AlertTriangle size={14} />
                                Top Error: <strong>Validation</strong>
                            </div>
                        </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left', backgroundColor: 'var(--bg-primary)' }}>
                                <th style={{ padding: '10px 12px', fontWeight: 600 }}>Type</th>
                                <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Total</th>
                                <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Processing</th>
                                <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Sent</th>
                                <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Errors</th>
                                <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Avg Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matrixData.map((row) => (
                                <tr key={row.type} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.type}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-secondary)' }}>{row.total.toLocaleString()}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: row.processing > 0 ? '#d97706' : 'var(--text-secondary)', fontWeight: row.processing > 0 ? 600 : 400 }}>{row.processing.toLocaleString()}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>{row.sent.toLocaleString()}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: row.errors > 0 ? '#dc2626' : 'var(--text-secondary)', fontWeight: row.errors > 0 ? 600 : 400 }}>{row.errors.toLocaleString()}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                                        <Zap size={12} color="#f59e0b" fill="#f59e0b" />
                                        {row.avgTime}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionsActivityWidget;
