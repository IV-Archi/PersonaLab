'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr, { type Lang } from '@/lib/translations';
import { addXP } from '@/lib/user-store';
import styles from './tutor.module.css';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

export default function TutorPage() {
  const { lang, setLang } = useApp();
  const tt = tr.tutor;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('Math');
  const [difficulty, setDifficulty] = useState('Medium');
  const [guidedMode, setGuidedMode] = useState(true);
  const [explainSteps, setExplainSteps] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Disclosure Generator Tool State
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [disclosureOptions, setDisclosureOptions] = useState({
    concepts: true,
    practice: false,
    feedback: false,
    outline: false,
  });
  const [generatedStatement, setGeneratedStatement] = useState('');
  const [copied, setCopied] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize first greeting in correct language
  useEffect(() => {
    const isKz = lang === 'kz';
    const isRu = lang === 'ru';
    const initialText = isKz
      ? "Сәлем! 👋 Мен сіздің оқу көмекшіңізбін. Мен сізге дайын жауаптарды бермей, тақырыпты түсінуге көмектесемін.\n\nҚандай тақырыпты талқылаймыз?"
      : isRu
        ? "Привет! 👋 Я твой ИИ-наставник. Моя цель — помочь тебе понять тему, а не просто списать готовый ответ.\n\nКакую тему хочешь разобрать сегодня?"
        : "Hello! 👋 I'm your AI tutor. I'm here to help you learn and understand — not just copy answers.\n\nWhat topic would you like to explore today?";

    setMessages([
      {
        id: 1,
        role: 'ai',
        text: initialText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle generating statement
  useEffect(() => {
    let parts: string[] = [];
    if (disclosureOptions.concepts) parts.push(tt.useCases.concepts[lang]);
    if (disclosureOptions.practice) parts.push(tt.useCases.practice[lang]);
    if (disclosureOptions.feedback) parts.push(tt.useCases.feedback[lang]);
    if (disclosureOptions.outline) parts.push(tt.useCases.outline[lang]);

    const intro = lang === 'kz' ? 'Мен Persona Lab ЖИ көмекшісін келесі мақсаттарда пайдаландым:\n' :
                  lang === 'ru' ? 'Я использовал ИИ-помощника Persona Lab для следующих задач:\n' :
                  'I utilized the Persona Lab AI assistant for the following tasks:\n';
    
    const statement = parts.length > 0
      ? `${intro}${parts.map(p => `- ${p}`).join('\n')}\n\n${tr.trust.academicHonesty[lang]}`
      : '';

    setGeneratedStatement(statement);
  }, [disclosureOptions, lang, tt.useCases]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStatement);
    setCopied(true);
    addXP(10); // Reward XP for ethical disclosure generation!
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setErrorMsg('');

    try {
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      const activeLangLabel = lang === 'kz' ? 'Kazakh' : lang === 'ru' ? 'Russian' : 'English';

      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          subject,
          language: activeLangLabel,
          difficulty,
          guidedMode,
          explainSteps
        })
      });

      if (!response.ok) {
        throw new Error("Tutor backend failed to respond");
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.text || "Sorry, I encountered an issue.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      addXP(15); // Reward XP for asking educational questions!
    } catch (e: any) {
      console.error(e);
      setErrorMsg(lang === 'kz' ? "Қосылу қатесі орын алды." : lang === 'ru' ? "Ошибка соединения с ИИ." : "Connection failed with AI service.");
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: lang === 'kz' ? '💡 Оңай түсіндір' : lang === 'ru' ? '💡 Объясни просто' : '💡 Explain simply', text: lang === 'kz' ? 'Осы тақырыпты қарапайым мысалдармен түсіндіре аласыз ба?' : lang === 'ru' ? 'Можешь объяснить эту тему простыми словами с примерами?' : 'Can you explain this topic in simple words with examples?' },
    { label: lang === 'kz' ? '📝 Жаттығу бер' : lang === 'ru' ? '📝 Дай задание' : '📝 Give me practice', text: lang === 'kz' ? 'Менің түсінігімді тексеру үшін маған жаттығу сұрағын беріңіз.' : lang === 'ru' ? 'Дай мне практическое задание для проверки понимания.' : 'Give me a practice question to test my understanding.' },
    { label: lang === 'kz' ? '✅ Жауабымды тексер' : lang === 'ru' ? '✅ Проверь ответ' : '✅ Check my answer', text: lang === 'kz' ? 'Жауабымды тексеріп, дұрыстығын айта аласыз ба?' : lang === 'ru' ? 'Можешь проверить мой ответ и дать обратную связь?' : 'Can you check my answer and tell me if it\'s correct?' },
    { label: lang === 'kz' ? '📐 Теңдеулерге көмек' : lang === 'ru' ? '📐 Помощь с уравнениями' : '📐 Help with equations', text: lang === 'kz' ? 'Маған теңдеулерді шешуді үйретіңіз.' : lang === 'ru' ? 'Мне нужна помощь с решением уравнений.' : 'I need help solving equations.' },
  ];

  const sidebarSubjectLabels: Record<string, string> = {
    Math: lang === 'kz' ? 'Математика' : lang === 'ru' ? 'Математика' : 'Math',
    English: lang === 'kz' ? 'Ағылшын тілі' : lang === 'ru' ? 'Английский' : 'English',
    Science: lang === 'kz' ? 'Жаратылыстану' : lang === 'ru' ? 'Наука' : 'Science',
    History: lang === 'kz' ? 'Тарих' : lang === 'ru' ? 'История' : 'History',
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.layout}>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>📚 {tr.practice.subject[lang]}</h3>
              <div className={styles.optionGroup}>
                {['Math', 'English', 'Science', 'History'].map(s => (
                  <button key={s} className={`${styles.optionBtn} ${subject === s ? styles.optionActive : ''}`}
                    onClick={() => setSubject(s)}>{sidebarSubjectLabels[s]}</button>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>🌐 {tr.footer.languages[lang]}</h3>
              <div className={styles.optionGroup}>
                {(['en', 'ru', 'kz'] as Lang[]).map(l => (
                  <button key={l} className={`${styles.optionBtn} ${lang === l ? styles.optionActive : ''}`}
                    onClick={() => setLang(l)}>{l === 'en' ? 'English' : l === 'ru' ? 'Русский' : 'Қазақша'}</button>
                ))}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>📊 {tr.practice.difficulty[lang]}</h3>
              <div className={styles.optionGroup}>
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <button key={d} className={`${styles.optionBtn} ${difficulty === d ? styles.optionActive : ''}`}
                    onClick={() => setDifficulty(d)}>{d === 'Easy' ? tr.practice.easy[lang] : d === 'Medium' ? tr.practice.medium[lang] : tr.practice.hard[lang]}</button>
                ))}
              </div>
            </div>

            {/* Guided study guards */}
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>🛡️ Guardrails</h3>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={guidedMode}
                  onChange={e => setGuidedMode(e.target.checked)}
                />
                <span>{tt.guidedMode[lang]}</span>
              </label>
              <label className={styles.checkboxLabel} style={{ marginTop: '8px' }}>
                <input
                  type="checkbox"
                  checked={explainSteps}
                  onChange={e => setExplainSteps(e.target.checked)}
                />
                <span>{tt.showSteps[lang]}</span>
              </label>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>⚡ {tt.quickActions[lang]}</h3>
              <div className={styles.quickActions}>
                {quickActions.map((qa, i) => (
                  <button key={i} className={styles.quickBtn} onClick={() => sendMessage(qa.text)}>
                    {qa.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ethical AI Disclosure Trigger */}
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '16px' }} onClick={() => setShowDisclosure(true)}>
              🛡️ {tt.disclosureBtn[lang]}
            </button>
          </aside>

          {/* Chat Container */}
          <div className={styles.chatArea}>
            
            {/* Ms Nurlan notice warning */}
            <div className={styles.warningBanner}>
              <div className={styles.warningIcon}>📢</div>
              <div>
                <strong>{tt.warningTitle[lang]}</strong>
                <p>{tt.warningText[lang]}</p>
              </div>
            </div>

            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.tutorAvatar}>🤖</div>
                <div>
                  <h2 className={styles.chatTitle}>{tt.title[lang]}</h2>
                  <span className={styles.chatStatus}>
                    <span className={styles.statusDot} /> {sidebarSubjectLabels[subject]} • {difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.chatMessages}>
              {messages.map(msg => (
                <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.messageUser : styles.messageAI}`}>
                  {msg.role === 'ai' && <div className={styles.msgAvatar}>🤖</div>}
                  <div className={styles.msgBubble}>
                    {/* Render verification warnings if [Verify] is found */}
                    <p className={styles.msgText}>
                      {msg.text.split('[Verify]').map((chunk, idx) => (
                        <span key={idx}>
                          {chunk}
                          {idx < msg.text.split('[Verify]').length - 1 && (
                            <span className={styles.verifyTag}>
                              ⚠️ {tr.trust.verifyLabel[lang]}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
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

              {errorMsg && (
                <div className={styles.errorBanner}>
                  <span>⚠️</span> {errorMsg}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                className={`input-field ${styles.inputField}`}
                placeholder={tt.placeholder[lang]}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                disabled={isTyping}
              />
              <button className="btn btn-primary" onClick={() => sendMessage(input)} disabled={isTyping}>
                {tt.send[lang]} ↑
              </button>
            </div>
          </div>
        </div>

        {/* AI Use Disclosure Generator Modal */}
        {showDisclosure && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{tt.disclosureTitle[lang]}</h3>
                <button className={styles.closeBtn} onClick={() => setShowDisclosure(false)}>×</button>
              </div>
              <p className={styles.modalDesc}>{tt.disclosureDesc[lang]}</p>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.modalCheckbox}>
                  <input
                    type="checkbox"
                    checked={disclosureOptions.concepts}
                    onChange={e => setDisclosureOptions(prev => ({ ...prev, concepts: e.target.checked }))}
                  />
                  <span>{tt.useCases.concepts[lang]}</span>
                </label>
                <label className={styles.modalCheckbox}>
                  <input
                    type="checkbox"
                    checked={disclosureOptions.practice}
                    onChange={e => setDisclosureOptions(prev => ({ ...prev, practice: e.target.checked }))}
                  />
                  <span>{tt.useCases.practice[lang]}</span>
                </label>
                <label className={styles.modalCheckbox}>
                  <input
                    type="checkbox"
                    checked={disclosureOptions.feedback}
                    onChange={e => setDisclosureOptions(prev => ({ ...prev, feedback: e.target.checked }))}
                  />
                  <span>{tt.useCases.feedback[lang]}</span>
                </label>
                <label className={styles.modalCheckbox}>
                  <input
                    type="checkbox"
                    checked={disclosureOptions.outline}
                    onChange={e => setDisclosureOptions(prev => ({ ...prev, outline: e.target.checked }))}
                  />
                  <span>{tt.useCases.outline[lang]}</span>
                </label>
              </div>

              {generatedStatement && (
                <div className={styles.statementBox}>
                  <strong>{tt.generatedText[lang]}:</strong>
                  <pre className={styles.statementText}>{generatedStatement}</pre>
                  <button className="btn btn-primary btn-sm" onClick={copyToClipboard}>
                    {copied ? tt.copied[lang] : tt.copyBtn[lang]}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
