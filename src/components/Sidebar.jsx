import React, { useState } from 'react';
import { LayoutDashboard, FileText, Settings, Activity, ArrowLeftRight, UserPlus, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab = 'Dashboard', onNavigate, onLogout }) => {
  const [showLogout, setShowLogout] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'Dashboard' },
    { icon: FileText, label: 'Files', id: 'Files' },
    { icon: ArrowLeftRight, label: 'Transactions', id: 'Transactions' },
    { icon: UserPlus, label: 'Enrollment', id: 'Enrollment' },
    { icon: Settings, label: 'Settings', id: 'Settings' },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10
    }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'var(--primary-brand)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Activity size={20} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>WEM</span>
      </div>

      <nav style={{ flex: 1, padding: '24px 16px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate && onNavigate(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: activeTab === item.id ? 'var(--primary-brand)' : 'transparent',
                  color: activeTab === item.id ? 'white' : 'var(--text-secondary)',
                  fontWeight: activeTab === item.id ? 600 : 500,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}>
                <item.icon size={20} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
        {/* Logout Popup */}
        {showLogout && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '24px',
            right: '24px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <button
              onClick={() => { onLogout && onLogout(); setShowLogout(false); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: 'var(--status-error-text)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        <div
          onClick={() => setShowLogout(!showLogout)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff" alt="User" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Admin User</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>admin@health.com</span>
          </div>
        </div>
      </div>
      <style>{`
          @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
      `}</style>
    </aside>
  );
};

export default Sidebar;
