import React from 'react';
import { FileCode, MoreHorizontal, Download, Eye } from 'lucide-react';

const files = [
    { id: 'EDI-834-001', partner: 'BlueCross BlueShield', type: '834 Benefit Enrollment', date: 'Oct 24, 2024 - 10:30 AM', status: 'Processed' },
    { id: 'EDI-837-042', partner: 'Aetna Healthcare', type: '837 Health Care Claim', date: 'Oct 24, 2024 - 09:15 AM', status: 'Pending' },
    { id: 'EDI-820-112', partner: 'UnitedHealth Group', type: '820 Payment Order', date: 'Oct 23, 2024 - 04:45 PM', status: 'Error' },
    { id: 'EDI-270-884', partner: 'Cigna', type: '270 Eligibility Inquiry', date: 'Oct 23, 2024 - 02:20 PM', status: 'Processed' },
    { id: 'EDI-834-005', partner: 'Humana', type: '834 Benefit Enrollment', date: 'Oct 23, 2024 - 11:00 AM', status: 'Processed' },
];

const StatusBadge = ({ status }) => {
    let bg = 'var(--status-pending-bg)';
    let color = 'var(--status-pending-text)';

    if (status === 'Processed') {
        bg = 'var(--status-success-bg)';
        color = 'var(--status-success-text)';
    } else if (status === 'Error') {
        bg = 'var(--status-error-bg)';
        color = 'var(--status-error-text)';
    }

    return (
        <span style={{
            backgroundColor: bg,
            color: color,
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-block'
        }}>
            {status}
        </span>
    );
};

const RecentFilesTable = () => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Recent Files</h3>
                <button style={{ color: 'var(--primary-brand)', background: 'none', border: 'none', fontWeight: 600 }}>View All</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>File ID</th>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Partner</th>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Type</th>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Date</th>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Status</th>
                            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ padding: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                                        <FileCode size={16} color="var(--primary-brand)" />
                                    </div>
                                    {file.id}
                                </td>
                                <td style={{ padding: '16px', color: 'var(--text-primary)' }}>{file.partner}</td>
                                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{file.type}</td>
                                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{file.date}</td>
                                <td style={{ padding: '16px' }}><StatusBadge status={file.status} /></td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}><Eye size={18} /></button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}><Download size={18} /></button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}><MoreHorizontal size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentFilesTable;
