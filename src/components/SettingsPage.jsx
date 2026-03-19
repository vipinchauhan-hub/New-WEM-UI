import React, { useState } from 'react';
import { Settings, User, Lock, Mail, Save, CheckCircle2, Shield } from 'lucide-react';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3 seconds
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '400px' }}>
      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          backgroundColor: '#f8fafc',
          outline: 'none',
          fontSize: '14px',
          color: 'var(--text-primary)',
          transition: 'all 0.2s',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#0ea5e9';
          e.target.style.backgroundColor = 'white';
          e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-color)';
          e.target.style.backgroundColor = '#f8fafc';
          e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)';
        }}
        required
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.3s ease-out', paddingBottom: '40px' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '8px' }}>Global Settings</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Manage your application preferences and security settings.</p>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* Settings Navigation */}
        <div style={{ 
          width: '240px', backgroundColor: 'white', borderRadius: '12px', 
          border: '1px solid var(--border-color)', overflow: 'hidden', flexShrink: 0,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <button style={{ width: '100%', textAlign: 'left', padding: '16px 20px', border: 'none', borderBottom: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontWeight: 500, transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
            <User size={18} /> My Profile
          </button>
          <button style={{ width: '100%', textAlign: 'left', padding: '16px 20px', border: 'none', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f0f9ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: '#0ea5e9', fontWeight: 600 }}>
            <Lock size={18} /> Password & Security
          </button>
          <button style={{ width: '100%', textAlign: 'left', padding: '16px 20px', border: 'none', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontWeight: 500, transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
            <Mail size={18} /> Notifications
          </button>
        </div>

        {/* Security Content Panel */}
        <div style={{ 
          flex: 1, backgroundColor: 'white', borderRadius: '12px', 
          border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#10b981' }}>
              <Shield size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Change Password</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Update your password to keep your account secure.</p>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ padding: '32px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <InputField 
                label="Current Password" 
                type="password" 
                placeholder="Enter current password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9', margin: '8px 0' }}></div>

              <InputField 
                label="New Password" 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              
              <InputField 
                label="Confirm New Password" 
                type="password" 
                placeholder="Confirm new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <button 
                  type="submit"
                  disabled={!newPassword || newPassword !== confirmPassword || !currentPassword}
                  style={{ 
                    padding: '12px 24px', borderRadius: '8px', border: 'none', 
                    backgroundColor: (!newPassword || newPassword !== confirmPassword || !currentPassword) ? '#cbd5e1' : 'var(--primary-brand)', 
                    color: 'white', fontSize: '14px', fontWeight: 600, cursor: (!newPassword || newPassword !== confirmPassword || !currentPassword) ? 'not-allowed' : 'pointer', 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    boxShadow: (!newPassword || newPassword !== confirmPassword || !currentPassword) ? 'none' : 'var(--shadow-custom)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Save size={16} /> Update Password
                </button>

                {isSaved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '14px', fontWeight: 500, animation: 'fadeIn 0.2s ease-out' }}>
                    <CheckCircle2 size={18} /> Password updated successfully!
                  </div>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
