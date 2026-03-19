import React from 'react';
import { Timer, Zap, Server, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PerformanceWidget = ({ data }) => {
    // Default data if none provided
    const hopData = data?.hops || [
        { name: 'HOP 1 (Ingest)', time: 120, color: '#0ea5e9' },
        { name: 'HOP 2 (Validate)', time: 85, color: '#6366f1' },
        { name: 'HOP 3 (Transform)', time: 240, color: '#8b5cf6' },
        { name: 'HOP 4 (Deliver)', time: 90, color: '#10b981' },
    ];

    const metrics = data?.metrics || [
        { label: 'Avg Latency', value: '535ms', icon: Timer, color: '#f59e0b' },
        { label: 'Throughput', value: '450 tps', icon: Zap, color: '#eab308' },
        { label: 'System Load', value: '42%', icon: Server, color: '#3b82f6' },
        { label: 'Success Rate', value: '99.98%', icon: Activity, color: '#10b981' },
    ];

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '100%'
        }}>
            <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>System Performance</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Processing stages duration and key health indicators.</p>
            </div>

            {/* HOPs Chart */}
            <div style={{ height: '180px', width: '100%' }}>
                <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Avg Processing Time (ms)</div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hopData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="time" radius={[0, 4, 4, 0]} barSize={20}>
                            {hopData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Key Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {metrics.map((metric, index) => (
                    <div key={index} style={{
                        backgroundColor: 'var(--bg-primary)',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: `${metric.color}20`, // 20% opacity
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: metric.color
                        }}>
                            <metric.icon size={16} />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{metric.label}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{metric.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceWidget;
