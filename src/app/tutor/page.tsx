'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getAIChatResponse } from '@/lib/ai-service';
import styles from './tutor.module.css';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      text: "Hello! 👋 I'm your AI tutor. I'm here to help you learn and understand — not just give answers.\n\nYou can ask me to explain a topic, give you practice questions, or check your answers.\n\nWhat would you like to learn today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('Math');
  const [language, setLanguage] = useState('English');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIChatResponse(text, subject, difficulty, language);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const quickActions = [
    { label: '💡 Explain simply', text: 'Can you explain this topic in simple words with examples?' },
    { label: '📝 Give me practice', text: 'Give me a practice question to test my understanding.' },
    { label: '✅ Check my answer', text: 'Can you check my answer and tell me if it\'s correct?' },
    { label: '🔢 Help with fractions', text: 'I don\'t understand fractions. Can you help me?' },
    { label: '📐 Help with equations', text: 'I need help solving equations.' },
    { label: '🔬 Explain photosynthesis', text: 'What is photosynthesis? Explain simply.' },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>📚 Subject</h3>
              <div className={styles.optionGroup}>
                {['Math', 'English', 'Science', 'History'].map(s => (
                  <button key={s} className={`${styles.optionBtn} ${subject === s ? styles.optionActive : ''}`}
                    onClick={() => setSubject(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>🌐 Language</h3>
              <div className={styles.optionGroup}>
                {['English', 'Русский', 'Қазақша'].map(l => (
                  <button key={l} className={`${styles.optionBtn} ${language === l ? styles.optionActive : ''}`}
                    onClick={() => setLanguage(l)}>{l}</button>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>📊 Difficulty</h3>
              <div className={styles.optionGroup}>
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <button key={d} className={`${styles.optionBtn} ${difficulty === d ? styles.optionActive : ''}`}
                    onClick={() => setDifficulty(d)}>{d}</button>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>⚡ Quick Actions</h3>
              <div className={styles.quickActions}>
                {quickActions.map((qa, i) => (
                  <button key={i} className={styles.quickBtn} onClick={() => sendMessage(qa.text)}>
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Chat */}
          <div className={styles.chatArea}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.tutorAvatar}>🤖</div>
                <div>
                  <h2 className={styles.chatTitle}>AI Tutor</h2>
                  <span className={styles.chatStatus}>
                    <span className={styles.statusDot} /> {subject} • {difficulty} • {language}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.chatMessages} id="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.messageUser : styles.messageAI}`}>
                  {msg.role === 'ai' && <div className={styles.msgAvatar}>🤖</div>}
                  <div className={styles.msgBubble}>
                    <p className={styles.msgText}>{msg.text}</p>
                    <span className={styles.msgTime}>{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.messageAI}`}>
                  <div className={styles.msgAvatar}>🤖</div>
                  <div className={styles.msgBubble}>
                    <div className={styles.typing}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                className={`input-field ${styles.inputField}`}
                placeholder="Ask a question or type your answer..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                id="tutor-input"
              />
              <button className="btn btn-primary" onClick={() => sendMessage(input)} id="send-button">
                Send ↑
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
