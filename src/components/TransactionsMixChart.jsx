import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';


const TransactionsMixChart = ({ data }) => {
    // Fallback data - Transaction types
    const chartData = data || [
        { name: 'Add', value: 5400, color: '#10b981' },
        { name: 'Change', value: 3200, color: '#0ea5e9' },
        { name: 'Term', value: 1500, color: '#f59e0b' },
        { name: 'Can', value: 800, color: '#ef4444' },
        { name: 'Reinstate', value: 1990, color: '#6366f1' },
    ];

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            height: '400px' // Fixed height for alignment
        }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Transaction Mix</h3>

            <div style={{ flex: 1, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="40%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={95}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px'
                            }}
                            formatter={(value) => [value.toLocaleString(), 'Count']}
                        />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconType="circle"
                            wrapperStyle={{ paddingLeft: '20px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}>
                    {/* Approximate centering, easier with CSS grid but this works for basic overlay */}
                    {/* Not easy to center perfectly relative to just the donut without knowing legend size.
               Simpler to just leave it clean or put total volume. */}
                </div>
            </div>
        </div>
    );
};

export default TransactionsMixChart;
