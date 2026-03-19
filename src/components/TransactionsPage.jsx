import React, { useState } from 'react';
import {
    Search, Filter, Download, ChevronRight, Settings, ChevronDown,
    FileText, Eye, CornerDownRight, X, Calendar, RefreshCcw
} from 'lucide-react';

const TransactionsPage = () => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Mock Data based on screenshot
    const [transactions] = useState([
        { id: '1', batchId: '1001025219', transactionId: 'VT2026117949458', source: 'Vermont Exchange', destination: 'WEM', market: 'Individual', subscriberName: '-', exchangeSubId: '1-24VEQHS', dob: '12/24/1988', maintType: 'CHANGE', maintReason: '25', status: 'Hold', outboundStatus: 'NA', wemCode: 'WEM_1170', queue: '-', receivedDate: '03/18/2026 07:33:17', lastUpdated: '03/18/2026 22:48:11' },
        { id: '2', batchId: '1001025543', transactionId: 'WI2026117350378', source: 'WEM', destination: 'Wisconsin Exchange', market: 'Individual', subscriberName: '-', exchangeSubId: '0003318830', dob: '12/31/1993', maintType: 'TERMINATION', maintReason: '-', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:25:45', lastUpdated: '03/18/2026 22:00:22' },
        { id: '3', batchId: '1001025543', transactionId: 'WI2026117350381', source: 'WEM', destination: 'Wisconsin Exchange', market: 'Individual', subscriberName: '-', exchangeSubId: '0002854988', dob: '02/22/2001', maintType: 'ADDITION', maintReason: 'EC', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:25:46', lastUpdated: '03/18/2026 22:00:22' },
        { id: '4', batchId: '1001025543', transactionId: 'WI2026117350387', source: 'WEM', destination: 'Wisconsin Exchange', market: 'Individual', subscriberName: 'Pamela Jean Wiersma', exchangeSubId: '0004123785', dob: '01/20/1965', maintType: 'ADDITION', maintReason: 'EC', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:25:49', lastUpdated: '03/18/2026 22:00:22' },
        { id: '5', batchId: '1001025543', transactionId: 'WI2026117350390', source: 'WEM', destination: 'Wisconsin Exchange', market: 'Individual', subscriberName: '-', exchangeSubId: '0004174352', dob: '12/28/1995', maintType: 'ADDITION', maintReason: 'EC', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:25:50', lastUpdated: '03/18/2026 22:00:22' },
        { id: '6', batchId: '1001025543', transactionId: 'NC2026117350471', source: 'WEM', destination: 'North Carolina Exchange', market: 'Individual', subscriberName: 'Roxanne Marie Karla', exchangeSubId: '0002250223', dob: '08/28/1962', maintType: 'ADDITION', maintReason: 'EC', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:26:41', lastUpdated: '03/18/2026 22:00:22' },
        { id: '7', batchId: '1001025543', transactionId: 'NC2026117350521', source: 'WEM', destination: 'North Carolina Exchange', market: 'Individual', subscriberName: '-', exchangeSubId: '0009314000', dob: '08/04/1991', maintType: 'ADDITION', maintReason: 'EC', status: 'WIC Sent to BPM', outboundStatus: 'NA', wemCode: '-', queue: '-', receivedDate: '03/18/2026 20:32:19', lastUpdated: '03/18/2026 22:00:22' }
    ]);

    const ActionButton = ({ icon: Icon, title }) => (
        <button title={title} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'all 0.2s', ':hover': { backgroundColor: 'white' } }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#0ea5e9'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
            <Icon size={14} />
        </button>
    );

    const BaseSelect = ({ label, options, multiline = false }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '140px' }}>
            {label && <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>}
            {multiline ? (
                <div style={{ 
                    border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'white', 
                    height: '80px', overflowY: 'auto', padding: '4px 0', fontSize: '12px', color: 'var(--text-primary)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
                }}>
                    {options.map((opt, i) => (
                        <div key={i} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: i === 0 ? '#f0f9ff' : 'transparent', color: i === 0 ? '#0284c7' : 'inherit', fontWeight: i === 0 ? 500 : 400 }}>
                            {opt}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <select style={{ 
                        width: '100%', padding: '10px 32px 10px 14px', borderRadius: '8px', 
                        border: '1px solid var(--border-color)', backgroundColor: 'white', 
                        fontSize: '13px', outline: 'none', appearance: 'none', color: 'var(--text-primary)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)', cursor: 'pointer', transition: 'border-color 0.2s'
                    }} onFocus={(e) => e.target.style.borderColor = '#0ea5e9'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}>
                        {options.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                </div>
            )}
        </div>
    );

    const ModernInput = ({ label, type = "text", placeholder = "", icon: Icon }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                {Icon && <Icon size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />}
                <input type={type} placeholder={placeholder} style={{ 
                    width: '100%', padding: Icon ? '10px 14px 10px 34px' : '10px 14px', 
                    borderRadius: '8px', border: '1px solid var(--border-color)', 
                    backgroundColor: 'white', fontSize: '13px', outline: 'none', color: 'var(--text-primary)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)', transition: 'all 0.2s',
                }} 
                onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)'; }} />
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease-out' }}>
            
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '12px', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: 600 }}>
                        <span style={{ cursor: 'pointer', opacity: 0.8 }}>Enrollment Dashboard</span> 
                        <ChevronRight size={12} style={{ opacity: 0.5 }} /> 
                        <span style={{ color: 'var(--text-secondary)' }}>Enrollment Transactions</span>
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Enrollment Transactions</h1>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor='#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor='white'}>
                        EXPORT <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button 
                        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                        style={{ 
                            padding: '10px 16px', borderRadius: '8px', border: 'none', 
                            backgroundColor: showAdvancedSearch ? '#f1f5f9' : 'var(--primary-brand)', 
                            color: showAdvancedSearch ? 'var(--text-primary)' : 'white', 
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', 
                            alignItems: 'center', gap: '8px', boxShadow: showAdvancedSearch ? 'none' : '0 4px 6px -1px rgba(2, 132, 199, 0.2)',
                            transition: 'all 0.2s'
                    }}>
                        <Search size={16} /> 
                        Advanced Search 
                        <ChevronDown size={16} style={{ transform: showAdvancedSearch ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    </button>
                </div>
            </div>

            {/* Premium Advanced Search Panel */}
            <div style={{ 
                backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', 
                padding: showAdvancedSearch ? '24px' : '0 24px', overflow: 'hidden',
                maxHeight: showAdvancedSearch ? '800px' : '0', opacity: showAdvancedSearch ? 1 : 0,
                visibility: showAdvancedSearch ? 'visible' : 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'var(--shadow-md)',
                marginTop: showAdvancedSearch ? '0' : '-16px' // subtle slide effect
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <Filter size={18} color="var(--primary-brand)" />
                    <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f4c75' }}>Transaction History Info</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', rowGap: '24px' }}>
                    {/* Row 1 */}
                    <ModernInput label="EDI Group Control No." />
                    <ModernInput label="Interchange Control Number" />
                    <ModernInput label="From Last Updated Date" icon={Calendar} placeholder="MM/DD/YYYY" />
                    <ModernInput label="To Last Updated Date" icon={Calendar} placeholder="MM/DD/YYYY" />

                    {/* Row 2 */}
                    <ModernInput label="First Name" />
                    <ModernInput label="Middle Name" />
                    <ModernInput label="Last Name" />
                    <ModernInput label="Group ID / Employer TIN" />

                    {/* Row 3 */}
                    <ModernInput label="Subscriber's ID" />
                    <ModernInput label="WEM Code" />
                    <ModernInput label="EDI Transaction Control Number" />
                    <BaseSelect label="Maintenance Type" options={['ALL', 'ADDITION', 'CHANGE', 'TERMINATION']} />

                    {/* Row 4 */}
                    <BaseSelect label="Pruned By" options={['ALL', 'Delta Dental of Wisconsin', 'WEM']} multiline={true} />
                    <div style={{ gridColumn: 'span 2' }}>{/* Empty space filler for layout matching */}</div>
                    <ModernInput label="Transaction ID" />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                    <button style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'white', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor='#f8fafc'; e.currentTarget.style.color='var(--text-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor='white'; e.currentTarget.style.color='var(--text-secondary)'; }}>
                        <RefreshCcw size={14} /> Reset
                    </button>
                    <button style={{ padding: '10px 32px', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-1px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
                        <Search size={14} /> Search
                    </button>
                </div>
            </div>

            {/* Streamlined Basic Filter Bar (Always visible) */}
            <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input type="text" placeholder="Search Batch ID, Transaction ID..." style={{ 
                        padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-color)', 
                        width: '100%', outline: 'none', fontSize: '13px', color: 'var(--text-primary)', 
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)', transition: 'all 0.2s' 
                    }} 
                    onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)'; }} />
                </div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect options={['Source: ALL', 'Vermont Exchange', 'WEM']} />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect options={['Destination: ALL', 'WEM', 'Wisconsin Exchange']} />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect options={['Market: ALL', 'Individual']} />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect options={['Status: ALL', 'Archive', 'Awaiting payment']} />
                <div style={{ flex: 1 }}></div>
                <button style={{ backgroundColor: '#f1f5f9', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor='#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor='#f1f5f9'}>
                    Apply Filters
                </button>
            </div>

            {/* Classy Data Grid Container */}
            <div style={{ 
                backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', 
                boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' 
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                                {[
                                    'Batch ID', 'Transaction ID', 'Source', 'Destination', 'Market', 
                                    'Subscriber Name', 'Exchange Sub ID', "DOB", 
                                    'Maint. Type', 'Maint. Reason', 'Status', 'Outbound Status', 
                                    'WEM Code', 'Queue', 'Received Date', 'Last Updated', 'Actions'
                                ].map((header, i) => (
                                    <th key={i} style={{ 
                                        padding: '16px 20px', fontSize: '11px', fontWeight: 600, 
                                        color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, idx) => (
                                <tr key={tx.id} style={{ 
                                    borderBottom: idx === transactions.length - 1 ? 'none' : '1px solid var(--border-color)',
                                    transition: 'background-color 0.1s', cursor: 'default'
                                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    
                                    <td style={{ padding: '16px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontWeight: 600, cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f0f9ff' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}>
                                            <FileText size={14} /> {tx.batchId}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', fontWeight: 500 }}>{tx.transactionId}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.source}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.destination}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', textTransform: 'capitalize' }}>{tx.market}</span>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', fontWeight: 500 }}>{tx.subscriberName !== '-' ? tx.subscriberName : <span style={{opacity: 0.3}}>-</span>}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{tx.exchangeSubId}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>{tx.dob}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '12px', color: 'var(--text-primary)' }}>
                                        <span style={{ 
                                            padding: '4px 8px', borderRadius: '4px', fontWeight: 600,
                                            backgroundColor: tx.maintType === 'ADDITION' ? '#dcfce7' : tx.maintType === 'TERMINATION' ? '#fee2e2' : '#fef3c7',
                                            color: tx.maintType === 'ADDITION' ? '#166534' : tx.maintType === 'TERMINATION' ? '#991b1b' : '#92400e'
                                        }}>
                                            {tx.maintType}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.maintReason}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)', maxWidth: '120px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: tx.status.includes('Hold') ? '#f59e0b' : '#3ca0c5' }}></div>
                                            {tx.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.outboundStatus}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.wemCode}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{tx.queue}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{tx.receivedDate.split(' ')[0]}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{tx.receivedDate.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{tx.lastUpdated.split(' ')[0]}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{tx.lastUpdated.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 20px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <ActionButton icon={FileText} title="View Details" />
                                            <ActionButton icon={Eye} title="Preview Data" />
                                            <ActionButton icon={CornerDownRight} title="Process Transaction" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Clean Pagination Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <div>Showing <b style={{color: 'var(--text-primary)'}}>1</b> to <b style={{color: 'var(--text-primary)'}}>7</b> of <b style={{color: 'var(--text-primary)'}}>{transactions.length}</b> entries</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', cursor: 'not-allowed', opacity: 0.5, fontWeight: 500 }}>Previous</button>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--primary-brand)', borderRadius: '8px', background: 'var(--primary-brand)', color: 'white', cursor: 'pointer', fontWeight: 600, boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)' }}>1</button>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor='#f8fafc'} onMouseLeave={(e) => e.target.style.backgroundColor='white'}>Next</button>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default TransactionsPage;
