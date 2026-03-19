import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                minWidth: '150px'
            }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
                    {data.fullDate}
                </p>
                <div style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-brand)', lineHeight: 1 }}>
                        {data.files.toLocaleString()}
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '4px' }}>files</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.successRate}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Avg:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.avgTime}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const VolumeChart = ({ data }) => {
    // Richer mock data with dates and insights
    const chartData = data || [
        { name: 'Day 1', fullDate: 'Jan 01, 2024', files: 400, successRate: 99.5, avgTime: '0.8s' },
        { name: 'Day 5', fullDate: 'Jan 05, 2024', files: 1398, successRate: 98.2, avgTime: '1.1s' },
        { name: 'Day 10', fullDate: 'Jan 10, 2024', files: 2800, successRate: 99.1, avgTime: '0.9s' },
        { name: 'Day 15', fullDate: 'Jan 15, 2024', files: 3908, successRate: 97.8, avgTime: '1.4s' },
        { name: 'Day 20', fullDate: 'Jan 20, 2024', files: 4800, successRate: 99.9, avgTime: '0.6s' },
        { name: 'Day 25', fullDate: 'Jan 25, 2024', files: 3800, successRate: 98.5, avgTime: '1.2s' },
        { name: 'Day 30', fullDate: 'Jan 30, 2024', files: 4300, successRate: 99.4, avgTime: '0.7s' },
    ];

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            height: '400px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Transaction Volume</h3>
            </div>

            <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--primary-brand)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Area
                            type="monotone"
                            dataKey="files"
                            stroke="var(--primary-brand)"
                            fillOpacity={1}
                            fill="url(#colorFiles)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VolumeChart;
