import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Activity, Shield, Zap, Database, Building2, Smartphone } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [authMethod, setAuthMethod] = useState('password'); // 'password' or 'otp'
    const [otpSent, setOtpSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (authMethod === 'password') {
            if (!email || !password) {
                setError('Please enter your email and password.');
                return;
            }
            setIsLoading(true);
            setTimeout(() => {
                onLogin();
            }, 1200);
        } else {
            if (!email) {
                setError('Please enter your email address.');
                return;
            }
            if (!otpSent) {
                // Send OTP
                setIsLoading(true);
                setTimeout(() => {
                    setOtpSent(true);
                    setIsLoading(false);
                }, 1000);
            } else {
                // Verify OTP
                if (!otp || otp.length < 6) {
                    setError('Please enter the 6-digit OTP.');
                    return;
                }
                setIsLoading(true);
                setTimeout(() => {
                    onLogin();
                }, 1200);
            }
        }
    };

    const handleSSOLogin = (provider) => {
        setIsLoading(true);
        setTimeout(() => {
            onLogin();
        }, 1500);
    };

    // Microsoft icon as inline SVG (reliable)
    const MicrosoftIcon = () => (
        <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
            <rect x="0" y="0" width="11" height="11" fill="#F25022" />
            <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
            <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
            <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
        </svg>
    );

    return (
        <div style={{
            display: 'flex',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#f8fafc',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Left Panel - Branding & Trust Signals */}
            <div style={{
                flex: '0 0 45%',
                background: 'linear-gradient(160deg, #0f4c75 0%, #1b6b93 50%, #3ca0c5 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                position: 'relative',
                overflow: 'hidden'
            }} className="left-panel">
                {/* Subtle grid pattern overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.5
                }}></div>

                {/* Logo and Brand */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
                        <div style={{
                            width: '48px', height: '48px',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Activity size={28} color="white" />
                        </div>
                        <span style={{ fontSize: '28px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
                            WEM
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: '42px',
                        fontWeight: 700,
                        color: 'white',
                        lineHeight: 1.2,
                        marginBottom: '24px'
                    }}>
                        Secure Healthcare<br />Data Exchange
                    </h1>

                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.7,
                        marginBottom: '48px',
                        maxWidth: '400px'
                    }}>
                        Enterprise-grade EDI processing for healthcare payers, providers, and clearinghouses.
                    </p>

                    {/* Trust Badges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { icon: Shield, text: 'HIPAA Compliant & SOC 2 Certified' },
                            { icon: Database, text: 'Process 10M+ Transactions Daily' },
                            { icon: Zap, text: '99.99% Uptime SLA Guaranteed' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                color: 'rgba(255,255,255,0.9)', fontSize: '14px'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <item.icon size={16} />
                                </div>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div style={{
                    position: 'absolute',
                    bottom: '-100px', right: '-100px',
                    width: '400px', height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}></div>
            </div>

            {/* Right Panel - Login Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                        Sign in to your account
                    </h2>
                    <p style={{ color: '#64748b', marginBottom: '32px' }}>
                        Access your EDI dashboard and transaction monitoring.
                    </p>


                    {/* Credentials Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500, color: '#475569' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    disabled={authMethod === 'otp' && otpSent}
                                    style={{
                                        width: '100%', padding: '14px 14px 14px 44px',
                                        borderRadius: '10px', border: '1px solid #e2e8f0',
                                        fontSize: '15px', outline: 'none',
                                        backgroundColor: (authMethod === 'otp' && otpSent) ? '#e2e8f0' : '#f8fafc',
                                        transition: 'border-color 0.2s, box-shadow 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>

                        {authMethod === 'password' && (
                            <div>
                                {/* Auth Method Toggle */}
                                <div style={{
                                    display: 'flex',
                                    backgroundColor: '#f1f5f9',
                                    borderRadius: '8px',
                                    padding: '3px',
                                    marginBottom: '8px'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMethod('password'); setOtpSent(false); setError(''); }}
                                        style={{
                                            flex: 1,
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: authMethod === 'password' ? 'white' : 'transparent',
                                            color: authMethod === 'password' ? '#0f4c75' : '#64748b',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: authMethod === 'password' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Lock size={14} />
                                        Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMethod('otp'); setError(''); }}
                                        style={{
                                            flex: 1,
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: authMethod === 'otp' ? 'white' : 'transparent',
                                            color: authMethod === 'otp' ? '#0f4c75' : '#64748b',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: authMethod === 'otp' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Smartphone size={14} />
                                        OTP
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%', padding: '14px 44px 14px 44px',
                                            borderRadius: '10px', border: '1px solid #e2e8f0',
                                            fontSize: '15px', outline: 'none', backgroundColor: '#f8fafc',
                                            transition: 'border-color 0.2s, box-shadow 0.2s'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                                            background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {authMethod === 'otp' && (
                            <div>
                                {/* Auth Method Toggle */}
                                <div style={{
                                    display: 'flex',
                                    backgroundColor: '#f1f5f9',
                                    borderRadius: '8px',
                                    padding: '3px',
                                    marginBottom: '8px'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMethod('password'); setOtpSent(false); setError(''); }}
                                        style={{
                                            flex: 1,
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: authMethod === 'password' ? 'white' : 'transparent',
                                            color: authMethod === 'password' ? '#0f4c75' : '#64748b',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: authMethod === 'password' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Lock size={14} />
                                        Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setAuthMethod('otp'); setError(''); }}
                                        style={{
                                            flex: 1,
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: authMethod === 'otp' ? 'white' : 'transparent',
                                            color: authMethod === 'otp' ? '#0f4c75' : '#64748b',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            boxShadow: authMethod === 'otp' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Smartphone size={14} />
                                        OTP
                                    </button>
                                </div>
                                {otpSent ? (
                                    <>
                                        <div style={{ position: 'relative' }}>
                                            <Smartphone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="000000"
                                                maxLength={6}
                                                style={{
                                                    width: '100%', padding: '14px 14px 14px 44px',
                                                    borderRadius: '10px', border: '1px solid #e2e8f0',
                                                    fontSize: '18px', fontWeight: 600, letterSpacing: '8px',
                                                    outline: 'none', backgroundColor: '#f8fafc',
                                                    transition: 'border-color 0.2s, box-shadow 0.2s'
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = '#3ca0c5'; e.target.style.boxShadow = '0 0 0 3px rgba(60, 160, 197, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
                                            OTP sent to {email}. <button type="button" onClick={() => setOtpSent(false)} style={{ background: 'none', border: 'none', color: '#0f4c75', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Resend</button>
                                        </p>
                                    </>
                                ) : (
                                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '0' }}>
                                        We'll send a 6-digit code to your email.
                                    </p>
                                )}
                            </div>
                        )}

                        {authMethod === 'password' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                                    <input type="checkbox" style={{ accentColor: '#0f4c75', width: '16px', height: '16px' }} />
                                    Remember me
                                </label>
                                <a href="#" style={{ color: '#0f4c75', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {error && (
                            <div style={{
                                color: '#ef4444', fontSize: '14px', padding: '12px',
                                backgroundColor: '#fef2f2', borderRadius: '8px', textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                                background: 'linear-gradient(135deg, #0f4c75 0%, #1b6b93 100%)',
                                color: 'white', fontSize: '16px', fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 4px 12px rgba(15, 76, 117, 0.3)',
                                transition: 'transform 0.1s, box-shadow 0.2s',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseDown={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(0.98)')}
                            onMouseUp={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {isLoading ? (
                                <span className="spinner"></span>
                            ) : authMethod === 'otp' && !otpSent ? (
                                <>Send OTP <ArrowRight size={18} /></>
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>OR CONTINUE WITH</span>
                        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                    </div>

                    {/* SSO Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button onClick={() => handleSSOLogin('google')} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            padding: '14px', borderRadius: '10px',
                            border: '1px solid #e2e8f0', background: 'white',
                            fontSize: '15px', fontWeight: 600, color: '#1e293b', cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                            Continue with Google
                        </button>

                        <button onClick={() => handleSSOLogin('microsoft')} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            padding: '14px', borderRadius: '10px',
                            border: '1px solid #e2e8f0', background: 'white',
                            fontSize: '15px', fontWeight: 600, color: '#1e293b', cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <MicrosoftIcon />
                            Continue with Microsoft
                        </button>

                        <button onClick={() => handleSSOLogin('sso')} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            padding: '14px', borderRadius: '10px',
                            border: '1px solid #e2e8f0', background: 'white',
                            fontSize: '15px', fontWeight: 600, color: '#1e293b', cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <Building2 size={20} color="#64748b" />
                            Enterprise SSO (SAML)
                        </button>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: '#64748b', fontSize: '14px' }}>
                        Need access? <a href="#" style={{ color: '#0f4c75', fontWeight: 600, textDecoration: 'none' }}>Contact your administrator</a>
                    </p>
                </div>
            </div>

            <style>{`
                .spinner {
                    width: 20px; height: 20px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 900px) {
                    .left-panel { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
