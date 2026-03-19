import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mic } from 'lucide-react';

const SUGGESTED_PROMPTS = [
    "Analyze EDI 837 error trends",
    "Show top 5 rejected claims",
    "Review SLA performance",
    "Summarize today's volume"
];

const ChatWidget = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I'm your WEM Assistant. I can help you analyze transactions, track files, or troubleshoot errors. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I've analyzed the recent data. It looks like there's a 5% increase in claim rejections from UnitedHealth Group due to 'Invalid Member ID'. Would you like to see the specific files?"
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header / Context */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Sparkles size={16} color="var(--primary-brand)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>AI Assistant Online</span>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                    }}>
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: msg.sender === 'user' ? 'var(--primary-brand)' : 'var(--bg-primary)',
                            border: msg.sender === 'ai' ? '1px solid var(--border-color)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {msg.sender === 'user' ? <User size={14} color="white" /> : <Bot size={16} color="var(--primary-brand)" />}
                        </div>
                        <div style={{
                            backgroundColor: msg.sender === 'user' ? 'var(--primary-brand)' : 'var(--bg-primary)',
                            color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                            padding: '12px',
                            borderRadius: '12px',
                            borderTopLeftRadius: msg.sender === 'ai' ? '0' : '12px',
                            borderTopRightRadius: msg.sender === 'user' ? '0' : '12px',
                            fontSize: '14px',
                            lineHeight: '1.4',
                            maxWidth: '85%',
                            boxShadow: msg.sender === 'ai' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bot size={16} color="var(--primary-brand)" />
                        </div>
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-primary)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length < 3 && !isTyping && (
                <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button key={i} onClick={() => setInputValue(prompt)} style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}>
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything..."
                        style={{
                            width: '100%',
                            padding: '12px 80px 12px 16px', // Increased padding for 2 buttons
                            borderRadius: '24px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        <button
                            onClick={() => console.log("Mic clicked")}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)'
                            }}
                            title="Voice Input"
                        >
                            <Mic size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'var(--primary-brand)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <Send size={14} color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
