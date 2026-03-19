import React, { useState } from 'react';
import {
    Search, Filter, Download, Calendar, ChevronDown, CheckCircle,
    AlertCircle, FileText, ArrowLeftRight, MoreHorizontal, Eye,
    FileJson, RefreshCw, ChevronLeft, ChevronRight, CornerDownRight, Link2,
    UserPlus, ClipboardList, ShieldCheck, Banknote
} from 'lucide-react';

const FilesPage = () => {
    // Mock Data for Files Grid
    const [files] = useState([
        {
            id: '1000998096', name: 'VT_834_VTHBE_DELTA_834_2026', source: 'Vermont Exchange', dest: 'Delta Dental', type: 'Enrollment', subType: '834', received: '01/11/2026 07:01:01', status: 'Processed', txCount: 1, errorCount: 0, ack: '999',
            progress: 100, eta: 'Done', duration: '2m 15s',
            relatedFiles: [
                { id: '1000998101', name: 'DELTA_834_2026_Jan11_OUT.x12', source: 'WEM', dest: 'Delta Dental', type: 'Enrollment', subType: '834', received: '01/11/2026 07:05:22', status: 'Sent', txCount: 1, errorCount: 0, ack: 'Pending', isOutbound: true, progress: 100, eta: 'Done', sentTime: '07:05:25', duration: '8s' }
            ]
        },
        { id: '1000998092', name: 'EDI.270549481D.I834.D260111.T0', source: 'Federal Exchange', dest: 'WEM', type: 'Enrollment', subType: '834', received: '01/11/2026 06:05:32', status: 'Processed', txCount: 22, errorCount: 0, ack: '999', progress: 100, eta: 'Done', duration: '45s' },
        {
            id: '1000998121', name: 'IL_CO_834_L200_1000098121', source: 'WEM', dest: 'Delta Dental', type: 'Enrollment', subType: '834', received: '01/11/2026 05:15:00', status: 'Sent', txCount: 15, errorCount: 0, ack: 'Pending', progress: 100, eta: 'Done', sentTime: '05:16:10', duration: '1m 10s'
        },
        { id: '1000998055', name: 'NJ_837_Claims_Batch_112', source: 'Horizon BCBSNJ', dest: 'WEM', type: 'Claims', subType: '837', received: '01/10/2026 23:45:11', status: 'Failed', txCount: 120, errorCount: 5, ack: 'TA1', progress: 100, eta: 'Error', errorDetail: 'Segment SV1 missing' },
        { id: '1000998040', name: 'VA_270_Elig_Req_099', source: 'Anthem VA', dest: 'WEM', type: 'Eligibility', subType: '270', received: '01/10/2026 22:10:05', status: 'Processed', txCount: 1, errorCount: 0, ack: '271', progress: 100, eta: 'Done', duration: '5s' },
        { id: '1000998012', name: 'CO_820_Pay_Order_771', source: 'Colorado Access', dest: 'WEM', type: 'Financial', subType: '820', received: '01/10/2026 20:30:00', status: 'Processed', txCount: 50, errorCount: 0, ack: '999', progress: 100, eta: 'Done', duration: '20s' },
    ]);

    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const FilterButton = ({ label, icon: Icon, active }) => (
        <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '8px',
            border: active ? '1px solid var(--primary-brand)' : '1px solid var(--border-color)',
            backgroundColor: active ? 'var(--primary-brand-light)' : 'var(--bg-primary)',
            color: active ? 'var(--primary-brand)' : 'var(--text-secondary)',
            fontWeight: 500, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
            {Icon && <Icon size={14} />}
            {label}
            <ChevronDown size={14} style={{ opacity: 0.5 }} />
        </button>
    );

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Enrollment': return { icon: UserPlus, color: '#3b82f6', bg: '#eff6ff' };
            case 'Claims': return { icon: ClipboardList, color: '#8b5cf6', bg: '#f5f3ff' };
            case 'Eligibility': return { icon: ShieldCheck, color: '#10b981', bg: '#ecfdf5' };
            case 'Financial': return { icon: Banknote, color: '#f59e0b', bg: '#fffbeb' };
            default: return { icon: FileText, color: '#64748b', bg: '#f8fafc' };
        }
    };

    const StatusBadge = ({ row, compact = true }) => {
        const { status, sentTime, duration, errorDetail, received } = row;
        const styles = {
            'Processed': { bg: '#dcfce7', color: '#16a34a', icon: CheckCircle },
            'Sent': { bg: '#e0f2fe', color: '#0284c7', icon: ArrowLeftRight },
            'Failed': { bg: '#fee2e2', color: '#dc2626', icon: AlertCircle },
            'Pending': { bg: '#fef3c7', color: '#d97706', icon: RefreshCw },
        };
        const style = styles[status] || styles['Pending'];
        const Icon = style.icon;

        let title = '';
        if (status === 'Sent') {
            title = `Status: ${status}\nSent at: ${sentTime || 'N/A'}\nDuration: ${duration || 'N/A'}`;
        } else if (status === 'Processed') {
            title = `Status: ${status}\nReceived: ${received}\nProcessing Time: ${duration || 'N/A'}`;
        } else if (status === 'Failed') {
            title = `Status: ${status}\nFailed at: ${received}\nError: ${errorDetail || 'Unknown error'}`;
        } else {
            title = `Status: ${status}`;
        }

        return (
            <div
                title={title}
                style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: compact ? '32px' : '120px',
                    height: compact ? '32px' : 'auto',
                    padding: compact ? '0' : '6px 12px', borderRadius: compact ? '50%' : '6px',
                    backgroundColor: style.bg, color: style.color,
                    fontSize: '12px', fontWeight: 600,
                    cursor: 'help',
                    userSelect: 'none',
                    border: `1px solid ${style.color}20`
                }}>
                <Icon size={16} />
                {!compact && <span style={{ marginLeft: '8px' }}>{status}</span>}
            </div>
        );
    };

    return (
        <div style={{ paddingBottom: '40px' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>File Tracking</h1>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Dashboard &gt; File Tracking</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 16px', borderRadius: '8px',
                            border: '1px solid var(--border-color)', backgroundColor: 'white',
                            color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer'
                        }}>
                            <Download size={16} />
                            Export
                        </button>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 16px', borderRadius: '8px',
                            border: 'none', backgroundColor: 'var(--primary-brand)',
                            color: 'white', fontWeight: 600, cursor: 'pointer',
                            boxShadow: 'var(--shadow-custom)'
                        }}>
                            <Search size={16} />
                            Advanced Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{
                backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px',
                border: '1px solid var(--border-color)', marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'
            }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search by File Name, ID, or Source..."
                        style={{
                            width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px',
                            border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px'
                        }}
                    />
                </div>
                <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                <FilterButton label="Exchange: All" />
                <FilterButton label="Status: All" />
                <FilterButton label="Type: Enrollment" active />
                <FilterButton label="Date: Last 24 Hours" icon={Calendar} />

                <button style={{ marginLeft: 'auto', padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary-brand)', color: 'white', cursor: 'pointer' }}>
                    <Filter size={16} />
                </button>
            </div>

            {/* Data Grid */}
            <div style={{
                backgroundColor: 'var(--bg-secondary)', borderRadius: '16px',
                border: '1px solid var(--border-color)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '48px' }}>
                                <input type="checkbox" />
                            </th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '22%' }}>File Name / ID</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '12%' }}>Source & Destination</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '8%' }}>Type</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '12%' }}>Received</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '120px' }}>Status</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '15%' }}>Progress</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '60px' }}>ETA</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '80px' }}>Transactions</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '60px' }}>Ack</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)', width: '100px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <React.Fragment key={file.id}>
                                {/* Parent Row */}
                                <tr style={{ borderBottom: expandedRows[file.id] && file.relatedFiles ? 'none' : '1px solid var(--border-color)', transition: 'background-color 0.1s' }} className="hover-row">
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {file.relatedFiles ? (
                                                <button
                                                    onClick={() => toggleRow(file.id)}
                                                    style={{
                                                        border: '1px solid var(--primary-brand)',
                                                        background: expandedRows[file.id] ? 'var(--primary-brand)' : 'rgba(14, 165, 233, 0.1)',
                                                        cursor: 'pointer',
                                                        padding: '4px',
                                                        borderRadius: '6px',
                                                        color: expandedRows[file.id] ? 'white' : 'var(--primary-brand)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title={expandedRows[file.id] ? 'Collapse linked file' : 'View linked file'}
                                                >
                                                    {expandedRows[file.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                </button>
                                            ) : <div style={{ width: '24px' }}></div>}
                                            <input type="checkbox" />
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', overflow: 'hidden' }}>
                                            <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#e0f2fe', color: '#0284c7', flexShrink: 0 }}>
                                                <FileText size={16} />
                                            </div>
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={file.name}>{file.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ID: {file.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 500 }}>{file.source}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <ArrowLeftRight size={10} />
                                                to {file.dest}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        {(() => {
                                            const { icon: TypeIcon, color, bg } = getTypeIcon(file.type);
                                            return (
                                                <div title={`${file.type} - ${file.subType}`} style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    backgroundColor: bg, color: color
                                                }}>
                                                    <TypeIcon size={18} />
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top', color: 'var(--text-secondary)' }}>
                                        {file.received.split(' ')[0]} <br /> <span style={{ fontSize: '11px' }}>{file.received.split(' ')[1]}</span>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <StatusBadge row={file} />
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
                                                <div style={{
                                                    width: `${file.progress}%`,
                                                    height: '100%',
                                                    backgroundColor: file.status === 'Failed' ? '#ef4444' : file.progress === 100 ? '#10b981' : 'var(--primary-brand)',
                                                    borderRadius: '3px'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>{file.progress}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                        {file.eta === 'Error' ? <span style={{ color: '#ef4444' }}>Stopped</span> : file.eta}
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <div style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
                                                backgroundColor: '#dcfce7', padding: '6px 12px', borderRadius: '4px', width: '60px'
                                            }}>
                                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>{file.txCount}</span>
                                                <span style={{ fontSize: '10px', color: '#16a34a' }}>Total</span>
                                            </div>
                                            {file.errorCount > 0 && (
                                                <div style={{
                                                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
                                                    backgroundColor: '#fee2e2', padding: '6px 12px', borderRadius: '4px', width: '60px'
                                                }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>{file.errorCount}</span>
                                                    <span style={{ fontSize: '10px', color: '#dc2626' }}>Err</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', verticalAlign: 'top' }}>
                                        <span style={{
                                            color: file.ack === '999' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                                            fontWeight: 600, textDecoration: 'underline', cursor: 'pointer'
                                        }}>
                                            {file.ack}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right', verticalAlign: 'top' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button title="View Details" style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <Eye size={16} />
                                            </button>
                                            <button title="Download" style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <Download size={16} />
                                            </button>
                                            <button title="More" style={{ padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Linked Files Container */}
                                {expandedRows[file.id] && file.relatedFiles && (
                                    <tr>
                                        <td colSpan="11" style={{ padding: '0 0 16px 0', backgroundColor: 'var(--bg-primary)' }}>
                                            <div style={{
                                                border: '2px dashed var(--primary-brand)',
                                                borderLeft: 'none',
                                                borderRight: 'none',
                                                backgroundColor: 'rgba(14, 165, 233, 0.04)',
                                                position: 'relative',
                                                padding: '20px 0 12px 0'
                                            }}>
                                                {/* Linked File Label Badge */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '20px',
                                                    transform: 'translateY(-50%)',
                                                    backgroundColor: 'var(--bg-primary)',
                                                    padding: '4px 12px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    color: 'var(--primary-brand)',
                                                    borderRadius: '6px',
                                                    border: '2px solid var(--primary-brand)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    <Link2 size={12} />
                                                    Linked Output File
                                                </div>

                                                {/* Linked File Rows Table */}
                                                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                                    <colgroup>
                                                        <col style={{ width: '48px' }} />
                                                        <col style={{ width: '22%' }} />
                                                        <col style={{ width: '12%' }} />
                                                        <col style={{ width: '8%' }} />
                                                        <col style={{ width: '12%' }} />
                                                        <col style={{ width: '120px' }} />
                                                        <col style={{ width: '15%' }} />
                                                        <col style={{ width: '60px' }} />
                                                        <col style={{ width: '80px' }} />
                                                        <col style={{ width: '60px' }} />
                                                        <col style={{ width: '100px' }} />
                                                    </colgroup>
                                                    <tbody>
                                                        {file.relatedFiles.map(child => (
                                                            <tr key={child.id} style={{ borderBottom: 'none' }}>
                                                                {/* Link Arrow */}
                                                                <td style={{ padding: '10px 0', verticalAlign: 'middle' }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                        <CornerDownRight size={18} color="var(--primary-brand)" strokeWidth={2.5} />
                                                                    </div>
                                                                </td>

                                                                {/* File Name */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                                                                        <div style={{ padding: '5px', borderRadius: '6px', backgroundColor: '#f3e8ff', color: '#9333ea', flexShrink: 0 }}>
                                                                            <ArrowLeftRight size={14} />
                                                                        </div>
                                                                        <div style={{ minWidth: 0 }}>
                                                                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={child.name}>{child.name}</div>
                                                                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ID: {child.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                {/* Source/Dest */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ fontSize: '12px', fontWeight: 500 }}>{child.source}</div>
                                                                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                        <ArrowLeftRight size={9} /> to {child.dest}
                                                                    </div>
                                                                </td>

                                                                {/* Type */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    {(() => {
                                                                        const { icon: TypeIcon, color, bg } = getTypeIcon(child.type);
                                                                        return (
                                                                            <div title={`${child.type} - ${child.subType}`} style={{
                                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                width: '28px', height: '28px', borderRadius: '6px',
                                                                                backgroundColor: bg, color: color
                                                                            }}>
                                                                                <TypeIcon size={16} />
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </td>

                                                                {/* Received */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                                                                        {child.received.split(' ')[0]}<br /><span style={{ fontSize: '10px' }}>{child.received.split(' ')[1]}</span>
                                                                    </div>
                                                                </td>

                                                                {/* Status */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <StatusBadge row={child} />
                                                                </td>

                                                                {/* Progress */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <div style={{ flex: 1, height: '5px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', minWidth: '50px' }}>
                                                                            <div style={{
                                                                                width: `${child.progress}%`,
                                                                                height: '100%',
                                                                                backgroundColor: child.status === 'Failed' ? '#ef4444' : child.progress === 100 ? '#10b981' : 'var(--primary-brand)',
                                                                                borderRadius: '3px'
                                                                            }}></div>
                                                                        </div>
                                                                        <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)' }}>{child.progress}%</span>
                                                                    </div>
                                                                </td>

                                                                {/* ETA */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                                                                        {child.eta === 'Error' ? <span style={{ color: '#ef4444' }}>Stopped</span> : child.eta}
                                                                    </div>
                                                                </td>

                                                                {/* Transactions */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{
                                                                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                                                        backgroundColor: '#dcfce7', padding: '4px 8px', borderRadius: '4px', width: 'fit-content'
                                                                    }}>
                                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{child.txCount}</span>
                                                                        <span style={{ fontSize: '9px', color: '#16a34a' }}>Total</span>
                                                                    </div>
                                                                </td>

                                                                {/* Ack */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle' }}>
                                                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>-</div>
                                                                </td>

                                                                {/* Actions */}
                                                                <td style={{ padding: '10px 16px', verticalAlign: 'middle', textAlign: 'right' }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                                                        <button title="View Details" style={{ padding: '4px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                                            <Eye size={13} />
                                                                        </button>
                                                                        <button title="Download" style={{ padding: '4px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                                            <Download size={13} />
                                                                        </button>
                                                                        <button title="More" style={{ padding: '4px', borderRadius: '5px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                                            <MoreHorizontal size={13} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Footer */}
                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Showing <strong>1-6</strong> of <strong>1,240</strong> files
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button disabled style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-disabled)', cursor: 'not-allowed' }}>
                            <ChevronLeft size={16} />
                        </button>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--primary-brand)', backgroundColor: 'var(--primary-brand)', color: 'white', fontWeight: 600, fontSize: '13px' }}>1</button>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>2</button>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>3</button>
                        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>...</span>
                        <button style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-primary)', cursor: 'pointer' }}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .hover-row:hover {
                    background-color: var(--bg-hover) !important;
                }
            `}</style>
        </div>
    );
};

export default FilesPage;
