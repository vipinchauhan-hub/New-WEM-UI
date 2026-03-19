import React, { useState } from 'react';
import { Search, Bell, HelpCircle, FileText, User, Hash } from 'lucide-react';

const SUGGESTIONS = [
    { type: 'partner', label: 'UnitedHealth Group' },
    { type: 'file', label: '837_Claims_Batch_001.x12' },
    { type: 'id', label: 'TRX-99882211' },
    { type: 'partner', label: 'CVS Health' },
    { type: 'file', label: '835_Remit_Feb2025.x12' },
    { type: 'id', label: 'TRX-77441122' },
];

const Header = ({ onToggleRightPanel }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = SUGGESTIONS.filter(item =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    const getIcon = (type) => {
        switch (type) {
            case 'partner': return <User size={14} />;
            case 'file': return <FileText size={14} />;
            case 'id': return <Hash size={14} />;
            default: return <Search size={14} />;
        }
    };

    return (
        <header style={{
            height: '80px',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr', // Left spacer, Center search, Right actions
            alignItems: 'center',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            {/* Left Spacer (empty to balance the grid and keep search centered) */}
            <div></div>

            {/* Center Search Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', justifySelf: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Search files, partners, or transactions..."
                    style={{
                        width: '100%',
                        padding: '12px 16px 12px 40px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        outline: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease'
                    }}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && inputValue.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        right: 0,
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                        padding: '8px',
                        zIndex: 101,
                        overflow: 'hidden'
                    }}>
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((suggestion, index) => (
                                <div key={index} style={{
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    transition: 'background 0.1s',
                                    fontSize: '14px',
                                    color: 'var(--text-primary)',
                                    ':hover': { backgroundColor: 'var(--bg-primary)' } // Inline hover not supported, relying on simple structure
                                }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-primary)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ color: 'var(--text-secondary)' }}>
                                        {getIcon(suggestion.type)}
                                    </div>
                                    <span>{suggestion.label}</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifySelf: 'end' }}>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <HelpCircle size={20} color="var(--text-secondary)" />
                </button>
                {/* Right Panel Toggle Button - NEW */}
                <button
                    onClick={onToggleRightPanel}
                    style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Toggle Side Panel"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary)' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
