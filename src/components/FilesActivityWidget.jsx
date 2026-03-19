import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, ArrowUpRight, ArrowDownRight, Minus, Clock, AlertCircle, CheckCircle, RefreshCw, FileInput } from 'lucide-react';

const FilesActivityWidget = ({ stats, data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Mock data with 'Transaction Count' instead of 'Last Update'
    const activityLog = data || [
        { id: 1, source: 'FFM (Exchange)', file: '834_Enroll_20240108_A.x12', received: '10:30 AM', txCount: 845, status: 'Processing', progress: 45, eta: '2 mins' },
        { id: 2, source: 'UnitedHealth (Issuer)', file: '837_Claims_Batch_992.x12', received: '10:15 AM', txCount: 1250, status: 'Sent to Exchange', progress: 100, eta: 'Done', sentTime: '10:18 AM', duration: '3m 12s' },
        { id: 3, source: 'Anthem VA (Issuer)', file: '270_Elig_Req_001.x12', received: '09:55 AM', txCount: 1, status: 'Validation Failed', progress: 100, eta: 'Error', errorDetail: 'Segment AMT missing in loop 2300' },
        { id: 4, source: 'CMS (Exchange)', file: '820_Prem_Pay_B77.x12', received: '09:40 AM', txCount: 420, status: 'Sent to Issuer', progress: 100, eta: 'Done', sentTime: '09:45 AM', duration: '5m 00s' },
        { id: 5, source: 'Horizon BCBS (Issuer)', file: '834_Maint_Update.x12', received: '09:30 AM', txCount: 156, status: 'Processing', progress: 78, eta: '1 min' },
    ];

    const MetricBlock = ({ label, value, change, trend, isLast }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 16px', borderRight: isLast ? 'none' : '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</span>
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

    const getStatusBadge = (row) => {
        const { status, sentTime, duration, errorDetail } = row;

        // Base styles with whitespace-nowrap to fix alignment issues
        const baseStyle = {
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap', // Prevents wrapping for better alignment
            width: '180px',       // Fixed width for symmetry
            justifyContent: 'flex-start' // Left aligned
        };

        if (status.includes('Sent')) {
            return (
                <div
                    style={{ ...baseStyle, backgroundColor: '#dcfce7', color: '#16a34a', cursor: 'pointer', textDecoration: 'underline' }}
                    title={`Sent at: ${sentTime}\nDuration: ${duration}`}
                    onClick={() => alert(`Sent Details:\nTime: ${sentTime}\nProcessing Duration: ${duration}`)}
                >
                    <CheckCircle size={16} />
                    {status}
                </div>
            );
        } else if (status === 'Validation Failed' || status === 'Error') {
            return (
                <div
                    style={{ ...baseStyle, backgroundColor: '#fee2e2', color: '#dc2626', cursor: 'pointer', textDecoration: 'underline' }}
                    title={`Error: ${errorDetail}`}
                    onClick={() => alert(`Error Details:\n${errorDetail}`)}
                >
                    <AlertCircle size={16} />
                    {status}
                </div>
            );
        } else if (status === 'Processing') {
            return (
                <span style={{ ...baseStyle, backgroundColor: '#fef3c7', color: '#d97706' }}>
                    <RefreshCw size={16} className="spin-icon" />
                    {status}
                </span>
            );
        } else {
            return (
                <span style={{ ...baseStyle, backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                    <FileInput size={16} />
                    {status}
                </span>
            );
        }
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-sm)'
        }}>
            {/* Summary Row (Always Visible) */}
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-brand)' }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Files Activity</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Real-time file tracking</p>
                    </div>
                </div>

                {/* Metrics Blocks */}
                <div style={{ display: 'flex', flex: 1, paddingLeft: '24px' }}>
                    <MetricBlock label="Files Received" value={stats.filesReceived.value} change={stats.filesReceived.change} trend={stats.filesReceived.trend} />
                    <MetricBlock label="In Processing" value={stats.filesProcessing.value} change={stats.filesProcessing.change} trend={stats.filesProcessing.trend} />
                    <MetricBlock label="Files Sent" value={stats.filesSent.value} change={stats.filesSent.change} trend={stats.filesSent.trend} />
                    <MetricBlock label="File Errors" value={stats.filesError.value} change={stats.filesError.change} trend={stats.filesError.trend} isLast />
                </div>

                {/* Toggle Button */}
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
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Recent Live Activity</h4>
                        <button style={{ color: 'var(--primary-brand)', fontSize: '13px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>View Full Logs</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                                <th style={{ padding: '12px', fontWeight: 500 }}>Source</th>
                                <th style={{ padding: '12px', fontWeight: 500 }}>File Name</th>
                                <th style={{ padding: '12px', fontWeight: 500 }}>Received</th>
                                <th style={{ padding: '12px', fontWeight: 500 }}>Transactions</th>
                                <th style={{ padding: '12px', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '12px', fontWeight: 500, width: '25%' }}>Progress</th>
                                <th style={{ padding: '12px', fontWeight: 500 }}>ETA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityLog.map((row) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)', verticalAlign: 'middle' }}>{row.source}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>{row.file}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)', verticalAlign: 'middle' }}>{row.received}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 600, verticalAlign: 'middle' }}>{row.txCount.toLocaleString()}</td>
                                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>{getStatusBadge(row)}</td>
                                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${row.progress}%`,
                                                    height: '100%',
                                                    backgroundColor: row.status.includes('Failed') ? '#ef4444' : row.progress === 100 ? '#10b981' : 'var(--primary-brand)',
                                                    borderRadius: '3px'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>{row.progress}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500, verticalAlign: 'middle' }}>
                                        {row.eta.includes('Error') ? <span style={{ color: '#f87171' }}>Stopped</span> : row.eta}
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

export default FilesActivityWidget;
