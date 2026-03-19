import React, { useState } from 'react';
import StatsCard from './StatsCard';
import VolumeChart from './VolumeChart';
import RecentFilesTable from './RecentFilesTable';
import SystemHealthWidget from './SystemHealthWidget';
import TransactionsMixChart from './TransactionsMixChart';
import PerformanceWidget from './PerformanceWidget';
import FilesActivityWidget from './FilesActivityWidget';
import TransactionsActivityWidget from './TransactionsActivityWidget';

const MOCK_DATA = {
    'All': {
        stats: {
            filesReceived: { value: '2,450', change: '+12%', trend: 'up' },
            filesProcessing: { value: '56', change: '-2%', trend: 'down' },
            filesSent: { value: '2,300', change: '+10%', trend: 'up' }, // New
            filesError: { value: '12', change: '-5%', trend: 'down' },

            transTotal: { value: '12,890', change: '+8.5%', trend: 'up' },
            transProcessing: { value: '450', change: '+1%', trend: 'neutral' }, // New
            transSent: { value: '12,300', change: '+9%', trend: 'up' }, // New
            transError: { value: '140', change: '-1.2%', trend: 'down' } // New (was merged with errors before?)
        },
        details: {
            filesReceived: [{ label: '834 Benefit Enrollment', value: 1200 }, { label: '820 Payment Order', value: 450 }, { label: 'Reconciliation', value: 300 }, { label: 'Other', value: 500 }],
            filesProcessing: [{ label: '834 Benefit Enrollment', value: 30 }, { label: '820 Payment Order', value: 10 }, { label: 'Reconciliation', value: 10 }, { label: 'Other', value: 6 }],
            filesSent: [{ label: '834 Acknowledged', value: 1150 }, { label: '820 Processed', value: 440 }, { label: 'Reconciliation', value: 290 }, { label: 'Other', value: 420 }],
            filesError: [{ label: 'Format Error', value: 5 }, { label: 'Invalid Sender', value: 3 }, { label: 'Duplicate', value: 2 }, { label: 'Other', value: 2 }],

            transTotal: [{ label: 'Add', value: 5400 }, { label: 'Change', value: 3200 }, { label: 'Term', value: 1500 }, { label: 'Cancel', value: 800 }, { label: 'Reinstate', value: 1990 }],
            transProcessing: [{ label: 'Add', value: 200 }, { label: 'Change', value: 150 }, { label: 'Term', value: 50 }, { label: 'Cancel', value: 30 }, { label: 'Reinstate', value: 20 }],
            transSent: [{ label: 'Add', value: 5100 }, { label: 'Change', value: 3000 }, { label: 'Term', value: 1400 }, { label: 'Cancel', value: 750 }, { label: 'Reinstate', value: 1950 }],
            transError: [{ label: 'Add', value: 100 }, { label: 'Change', value: 20 }, { label: 'Term', value: 10 }, { label: 'Cancel', value: 5 }, { label: 'Reinstate', value: 5 }]
        },
        volume: [
            { name: 'Day 1', fullDate: 'Jan 01, 2024', files: 400, successRate: 99.5, avgTime: '0.8s' },
            { name: 'Day 5', fullDate: 'Jan 05, 2024', files: 1398, successRate: 98.2, avgTime: '1.1s' },
            { name: 'Day 10', fullDate: 'Jan 10, 2024', files: 2800, successRate: 99.1, avgTime: '0.9s' },
            { name: 'Day 15', fullDate: 'Jan 15, 2024', files: 3908, successRate: 97.8, avgTime: '1.4s' },
            { name: 'Day 20', fullDate: 'Jan 20, 2024', files: 4800, successRate: 99.9, avgTime: '0.6s' },
            { name: 'Day 25', fullDate: 'Jan 25, 2024', files: 3800, successRate: 98.5, avgTime: '1.2s' },
            { name: 'Day 30', fullDate: 'Jan 30, 2024', files: 4300, successRate: 99.4, avgTime: '0.7s' },
        ],
        mix: [
            { name: 'Add', value: 5400, color: '#10b981' },
            { name: 'Change', value: 3200, color: '#0ea5e9' },
            { name: 'Term', value: 1500, color: '#f59e0b' },
            { name: 'Can', value: 800, color: '#ef4444' },
            { name: 'Reinstate', value: 1990, color: '#6366f1' },
        ],
        partners: [
            { name: 'UnitedHealth', volume: '12.5k', change: '+5%', status: 'good' },
            { name: 'CVS Health', volume: '10.2k', change: '+2.1%', status: 'good' },
            { name: 'Anthem', volume: '8.4k', change: '-1.5%', status: 'warning' },
        ]
    },
    'FFM': {
        stats: {
            filesReceived: { value: '850', change: '+15%', trend: 'up' },
            filesProcessing: { value: '12', change: '-5%', trend: 'down' },
            filesSent: { value: '830', change: '+14%', trend: 'up' },
            filesError: { value: '4', change: '-20%', trend: 'down' },

            transTotal: { value: '4,200', change: '+10%', trend: 'up' },
            transProcessing: { value: '50', change: '0%', trend: 'neutral' },
            transSent: { value: '4,100', change: '+11%', trend: 'up' },
            transError: { value: '50', change: '-5%', trend: 'down' }
        },
        details: {
            filesReceived: [{ label: '834 Benefit Enrollment', value: 800 }, { label: '820 Payment Order', value: 0 }, { label: 'Reconciliation', value: 50 }, { label: 'Other', value: 0 }],
            filesProcessing: [{ label: '834 Benefit Enrollment', value: 12 }, { label: 'Other', value: 0 }],
            filesSent: [{ label: '834 Ack', value: 780 }, { label: 'Recon Ack', value: 50 }],
            filesError: [{ label: 'Format Error', value: 4 }],

            transTotal: [{ label: 'Add', value: 3000 }, { label: 'Change', value: 1000 }, { label: 'Term', value: 200 }, { label: 'Cancel', value: 0 }, { label: 'Reinstate', value: 0 }],
            transProcessing: [{ label: 'Add', value: 30 }, { label: 'Change', value: 20 }],
            transSent: [{ label: 'Add', value: 2950 }, { label: 'Change', value: 970 }, { label: 'Term', value: 180 }],
            transError: [{ label: 'Add', value: 20 }, { label: 'Change', value: 10 }, { label: 'Term', value: 20 }]
        },
        volume: [
            { name: 'Day 1', fullDate: 'Jan 01, 2024', files: 100, successRate: 99.0, avgTime: '1.0s' },
            { name: 'Day 5', fullDate: 'Jan 05, 2024', files: 300, successRate: 98.5, avgTime: '1.2s' },
            { name: 'Day 10', fullDate: 'Jan 10, 2024', files: 800, successRate: 99.2, avgTime: '0.9s' },
            { name: 'Day 15', fullDate: 'Jan 15, 2024', files: 1200, successRate: 98.8, avgTime: '1.1s' },
            { name: 'Day 20', fullDate: 'Jan 20, 2024', files: 1500, successRate: 99.5, avgTime: '0.8s' },
            { name: 'Day 25', fullDate: 'Jan 25, 2024', files: 1400, successRate: 99.0, avgTime: '1.0s' },
            { name: 'Day 30', fullDate: 'Jan 30, 2024', files: 1600, successRate: 99.3, avgTime: '0.9s' },
        ],
        mix: [
            { name: '834 Enroll', value: 3000, color: '#10b981' },
            { name: '999 Acks', value: 500, color: '#94a3b8' },
        ],
        partners: [
            { name: 'CMS (FFM)', volume: '4.2k', change: '+10%', status: 'good' }
        ]
    },
    'NJ': {
        stats: {
            filesReceived: { value: '320', change: '+2%', trend: 'up' },
            filesProcessing: { value: '25', change: '+12%', trend: 'up', isBad: true },
            filesSent: { value: '290', change: '0%', trend: 'neutral' },
            filesError: { value: '8', change: '+5%', trend: 'up', isBad: true },

            transTotal: { value: '1,500', change: '-1%', trend: 'down' },
            transProcessing: { value: '100', change: '+20%', trend: 'up', isBad: true },
            transSent: { value: '1,350', change: '-5%', trend: 'down' },
            transError: { value: '50', change: '+10%', trend: 'up', isBad: true }
        },
        details: {
            filesReceived: [{ label: '834 Benefit Enrollment', value: 100 }, { label: '820 Payment Order', value: 200 }, { label: 'Reconciliation', value: 20 }, { label: 'Other', value: 0 }],
            filesProcessing: [{ label: '834 Benefit Enrollment', value: 5 }, { label: '820 Payment Order', value: 20 }],
            filesSent: [{ label: 'All Types', value: 290 }],
            filesError: [{ label: 'Validation Failed', value: 8 }],

            transTotal: [{ label: 'Add', value: 500 }, { label: 'Change', value: 800 }, { label: 'Term', value: 100 }, { label: 'Cancel', value: 50 }, { label: 'Reinstate', value: 50 }],
            transProcessing: [{ label: 'Change', value: 80 }, { label: 'Term', value: 20 }],
            transSent: [{ label: 'Add', value: 480 }, { label: 'Change', value: 700 }],
            transError: [{ label: 'Change', value: 20 }, { label: 'Term', value: 30 }]
        },
        volume: [
            { name: 'Day 1', files: 50 }, { name: 'Day 10', files: 200 }, { name: 'Day 20', files: 400 }, { name: 'Day 30', files: 550 }
        ],
        mix: [
            { name: '837 Claims', value: 1000, color: '#0ea5e9' },
            { name: '835 Remits', value: 500, color: '#6366f1' }
        ],
        partners: [
            { name: 'Horizon BCBSNJ', volume: '1.2k', change: '-2%', status: 'warning' }
        ]
    },
    'VA': {
        stats: {
            filesReceived: { value: '150', change: '0%', trend: 'neutral' },
            filesProcessing: { value: '2', change: '0%', trend: 'neutral' },
            filesSent: { value: '148', change: '0%', trend: 'neutral' },
            filesError: { value: '0', change: '0%', trend: 'neutral' },

            transTotal: { value: '800', change: '+5%', trend: 'up' },
            transProcessing: { value: '10', change: '0%', trend: 'neutral' },
            transSent: { value: '790', change: '+5%', trend: 'up' },
            transError: { value: '0', change: '0%', trend: 'neutral' }
        },
        details: {
            filesReceived: [{ label: '834 Benefit Enrollment', value: 150 }, { label: 'Other', value: 0 }],
            filesProcessing: [{ label: '834 Benefit Enrollment', value: 2 }],
            filesSent: [{ label: '834 Benefit Enrollment', value: 148 }],
            filesError: [{ label: 'None', value: 0 }],

            transTotal: [{ label: 'Add', value: 800 }],
            transProcessing: [{ label: 'Add', value: 10 }],
            transSent: [{ label: 'Add', value: 790 }],
            transError: [{ label: 'None', value: 0 }]
        },
        volume: [{ name: 'Day 1', files: 20 }, { name: 'Day 30', files: 250 }],
        mix: [{ name: '834 Enroll', value: 800, color: '#10b981' }],
        partners: [{ name: 'Anthem VA', volume: '800', change: '+5%', status: 'good' }]
    },
    'CO': {
        stats: {
            filesReceived: { value: '600', change: '+25%', trend: 'up' },
            filesProcessing: { value: '0', change: '-100%', trend: 'down' },
            filesSent: { value: '599', change: '+25%', trend: 'up' },
            filesError: { value: '1', change: '-50%', trend: 'down' },

            transTotal: { value: '2,100', change: '+30%', trend: 'up' },
            transProcessing: { value: '0', change: '0%', trend: 'neutral' },
            transSent: { value: '2,095', change: '+30%', trend: 'up' },
            transError: { value: '5', change: '-50%', trend: 'down' }
        },
        details: {
            filesReceived: [{ label: '837 Claims', value: 600 }],
            filesProcessing: [{ label: 'None', value: 0 }],
            filesSent: [{ label: '837 Claims', value: 599 }],
            filesError: [{ label: 'Format Error', value: 1 }],

            transTotal: [{ label: 'Original', value: 2100 }],
            transProcessing: [{ label: 'None', value: 0 }],
            transSent: [{ label: 'Original', value: 2095 }],
            transError: [{ label: 'Validation', value: 5 }]
        },
        volume: [{ name: 'Day 1', files: 100 }, { name: 'Day 30', files: 900 }],
        mix: [{ name: '837 Claims', value: 1500, color: '#0ea5e9' }, { name: '270 Elig', value: 600, color: '#f59e0b' }],
        partners: [{ name: 'Colorado Access', volume: '2.1k', change: '+30%', status: 'good' }]
    }
};

import { Calendar } from 'lucide-react';

const Dashboard = () => {
    const [selectedExchange, setSelectedExchange] = useState('All');
    const [selectedPeriod, setSelectedPeriod] = useState('Last Week');
    const [showCustomDates, setShowCustomDates] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const currentData = MOCK_DATA[selectedExchange] || MOCK_DATA['All'];

    const periodOptions = ['Last Day', 'Last Week', 'Last Month', 'Custom'];

    const handlePeriodChange = (value) => {
        setSelectedPeriod(value);
        if (value === 'Custom') {
            setShowCustomDates(true);
        } else {
            setShowCustomDates(false);
        }
    };

    const getDisplayPeriod = () => {
        if (selectedPeriod === 'Custom' && customStartDate && customEndDate) {
            return `${customStartDate} - ${customEndDate}`;
        }
        return selectedPeriod;
    };

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {/* Dashboard Header with Filters */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Overview of your EDI transactions and clearinghouse activity.</p>
                </div>

                {/* Filters Container */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                    {/* Period Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} style={{ color: 'var(--text-secondary)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Period:</span>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => handlePeriodChange(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none',
                                minWidth: '130px'
                            }}
                        >
                            {periodOptions.map(period => (
                                <option key={period} value={period}>{period}</option>
                            ))}
                        </select>
                        {showCustomDates && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="date"
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '13px',
                                        outline: 'none'
                                    }}
                                />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>to</span>
                                <input
                                    type="date"
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '13px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Exchange Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Exchange:</span>
                        <select
                            value={selectedExchange}
                            onChange={(e) => setSelectedExchange(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none',
                                minWidth: '120px'
                            }}
                        >
                            {Object.keys(MOCK_DATA).map(ex => (
                                <option key={ex} value={ex}>{ex}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Row 1: Files & Transactions Activity */}
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Files & Transactions Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                <FilesActivityWidget stats={currentData.stats} />
                <TransactionsActivityWidget stats={currentData.stats} details={currentData.details} />
            </div>

            {/* Row 2: Visuals & Trends (Charts) */}
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Analytics & Trends</h3>
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px'
            }}>
                <VolumeChart data={currentData.volume} />
                <TransactionsMixChart data={currentData.mix} />
            </div>

            {/* Row 3: Operational Status (Lists) */}
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>System Metrics</h3>
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px'
            }}>
                <SystemHealthWidget />
                <PerformanceWidget />
            </div>
        </div>
    );
};

export default Dashboard;
