import React, { useState } from 'react';
import {
    Search, Filter, Download, ChevronRight, Settings, ChevronDown,
    FileText, Eye, RefreshCcw, UserPlus, RefreshCw, Calendar, FileEdit, Archive, CheckCircle
} from 'lucide-react';

const EnrollmentPage = () => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Mock Data based on Enrollment screenshot
    const [enrollments] = useState([
        { id: '1', source: 'Wisconsin Exchange', exchangeSubId: '0004174352', issuerSubId: '7744494896', name: 'Evan Kettenhager', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '03/10/2026 03:47:02', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '2', source: 'Wisconsin Exchange', exchangeSubId: '0004123785', issuerSubId: '7720140037', name: 'Pamela Jean Wiersma', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '03/13/2026 20:03:05', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '3', source: 'Wisconsin Exchange', exchangeSubId: '0003054900', issuerSubId: '7705452109', name: 'Armatta Hese', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '03/18/2026 20:05:15', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '4', source: 'Wisconsin Exchange', exchangeSubId: '0008272279', issuerSubId: '7700662066', name: 'Mark D Lund', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '02/01/2026 20:20:04', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '5', source: 'Wisconsin Exchange', exchangeSubId: '0003184789', issuerSubId: '7732954907', name: 'Teresa A Kranz', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '02/10/2026 19:59:17', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '6', source: 'Wisconsin Exchange', exchangeSubId: '0003318830', issuerSubId: '7730697909', name: 'Nicole Lumley', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '10/27/2025 01:10:00', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '7', source: 'Wisconsin Exchange', exchangeSubId: '0003049981', issuerSubId: '7701511565', name: 'Haleigh Dunke', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '03/11/2026 05:58:54', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '8', source: 'Wisconsin Exchange', exchangeSubId: '0002250223', issuerSubId: '7775360115', name: 'Roxanne Marie Karla', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '02/28/2026 19:58:32', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '9', source: 'New Hampshire Exchange', exchangeSubId: '0002363789', issuerSubId: '7707363655', name: 'Emily Heigle', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '10/25/2025 22:57:18', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
        { id: '10', source: 'North Carolina Exchange', exchangeSubId: '0009314000', issuerSubId: '7734052860', name: 'Briana Cosedey', market: 'Individual', status: 'Effectuation Received and Processed', caseNo: '-', receivedDate: '03/10/2026 20:17:16', lastUpdated: '03/18/2026 22:00:22', year: '2026' },
    ]);

    const ActionButton = ({ icon: Icon, title }) => (
        <button title={title} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#f8fafc', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'all 0.2s', ':hover': { backgroundColor: 'white' } }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#0ea5e9'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
            <Icon size={14} />
        </button>
    );

    const BaseSelect = ({ label, options, multiline = false, width = 'auto' }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: width === 'auto' ? 1 : 'none', width: width !== 'auto' ? width : 'auto', minWidth: '140px' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease-out', paddingBottom: '40px' }}>
            
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '12px', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: 600 }}>
                        <span style={{ cursor: 'pointer', opacity: 0.8 }}>Enrollment Dashboard</span> 
                        <ChevronRight size={12} style={{ opacity: 0.5 }} /> 
                        <span style={{ cursor: 'pointer', opacity: 0.8 }}>Enrollment Transactions</span>
                        <ChevronRight size={12} style={{ opacity: 0.5 }} /> 
                        <span style={{ color: 'var(--text-secondary)' }}>Enrollment</span>
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Enrollment</h1>
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
                marginTop: showAdvancedSearch ? '0' : '-16px',
                visibility: showAdvancedSearch ? 'visible' : 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'var(--shadow-md)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <UserPlus size={18} color="var(--primary-brand)" />
                    <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f4c75' }}>Subscriber/Member Info</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', rowGap: '24px' }}>
                    {/* Row 1 */}
                    <ModernInput label="First Name" />
                    <ModernInput label="Middle Name" />
                    <ModernInput label="Last Name" />
                    <ModernInput label="Issuer Subscriber ID" />

                    {/* Row 2 */}
                    <ModernInput label="Exchange Member ID" />
                    <ModernInput label="Issuer Member ID" />
                    <ModernInput label="Last Updated From Date" icon={Calendar} placeholder="MM/DD/YYYY" />
                    <ModernInput label="Last Updated To Date" icon={Calendar} placeholder="MM/DD/YYYY" />

                    {/* Row 3 */}
                    <ModernInput label="Subscriber's Date of Birth" icon={Calendar} placeholder="MM/DD/YYYY" />
                    <ModernInput label="Member's Date of Birth" icon={Calendar} placeholder="MM/DD/YYYY" />
                    <ModernInput label="Case Number" />
                    <ModernInput label="QHP ID" />

                    {/* Row 4 */}
                    <BaseSelect label="Pruned By" options={['ALL', 'Delta Dental of Wisconsin', 'WEM']} multiline={true} />
                    <ModernInput label="Application ID" />
                    <div style={{ gridColumn: 'span 2' }}>{/* Empty space filler for strict grid matching */}</div>
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
                    <input type="text" placeholder="Search Names, Sub IDs..." style={{ 
                        padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-color)', 
                        width: '100%', outline: 'none', fontSize: '13px', color: 'var(--text-primary)', 
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)', transition: 'all 0.2s' 
                    }} 
                    onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)'; }} />
                </div>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect label="Exchange" options={['Exchange: ALL']} width="160px" />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect label="Market" options={['Market: ALL', 'Individual']} width="160px" />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect label="Enrollment Status" options={['Status: ALL', 'Effectuation Pending', 'Effectuation Received', 'Received & Processed']} width="220px" />
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
                <BaseSelect label="Renewal Status" options={['Renewal: ALL']} width="160px" />
                <BaseSelect label="Year" options={['Year: ALL']} width="120px" />
                <div style={{ flex: 1 }}></div>
                <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-1px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
                    Apply
                </button>
            </div>

            {/* Classy Data Grid Container */}
            <div style={{ 
                backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', 
                boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' 
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                                {[
                                    'Source', 'Exchange Subscriber ID', 'Issuer Subscriber ID', 'Subscriber Name', 
                                    'Market', 'Enrollment Status', 'Case Number', 'Received Date', 'Last Updated Date', 
                                    'Year', 'Actions'
                                ].map((header, i) => (
                                    <th key={i} style={{ 
                                        padding: '16px 20px', fontSize: '11px', fontWeight: 600, 
                                        color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {header}
                                            <div style={{ display: 'flex', flexDirection: 'column', opacity: 0.4 }}>
                                                <ChevronDown size={8} style={{ transform: 'rotate(180deg)', marginBottom: '-3px' }}/>
                                                <ChevronDown size={8} />
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map((env, idx) => (
                                <tr key={env.id} style={{ 
                                    borderBottom: idx === enrollments.length - 1 ? 'none' : '1px solid var(--border-color)',
                                    transition: 'background-color 0.1s', cursor: 'default'
                                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{env.source}</td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', color: '#0ea5e9', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                                            {env.exchangeSubId}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{env.issuerSubId}</td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', color: '#0ea5e9', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                                            {env.name}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', textTransform: 'capitalize' }}>{env.market}</span>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CheckCircle size={14} color="#10b981" />
                                            <span style={{ color: '#0f766e', fontWeight: 500 }}>{env.status}</span>
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{env.caseNo}</td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{env.receivedDate.split(' ')[0]}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{env.receivedDate.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{env.lastUpdated.split(' ')[0]}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{env.lastUpdated.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{env.year}</td>
                                    
                                    <td style={{ padding: '12px 20px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <ActionButton icon={FileText} title="View Record" />
                                            <ActionButton icon={FileEdit} title="Edit Record" />
                                            <ActionButton icon={Archive} title="Archive" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Clean Pagination Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <div>
                        <b>731,879</b> Enrollment(s) found, displaying <b>1-10</b> items.<br />
                        <span style={{ fontSize: '11px', opacity: 0.8 }}>search results for <b>Pruned By: All, Market: All, Enrollment: All</b></span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', cursor: 'not-allowed', opacity: 0.5, fontWeight: 500 }}>Previous</button>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--primary-brand)', borderRadius: '8px', background: 'var(--primary-brand)', color: 'white', cursor: 'pointer', fontWeight: 600, boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)' }}>1</button>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor='#f8fafc'} onMouseLeave={(e) => e.target.style.backgroundColor='white'}>2</button>
                        <button style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor='#f8fafc'} onMouseLeave={(e) => e.target.style.backgroundColor='white'}>3</button>
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

export default EnrollmentPage;
