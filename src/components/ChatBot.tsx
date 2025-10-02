import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;

    // Idle pulse animation
    gsap.to(bubble, {
      scale: 1.05,
      opacity: 0.9,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Entrance animation
    gsap.fromTo(
      bubble,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 3 }
    );
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    const bubble = bubbleRef.current;
    const panel = panelRef.current;
    if (!bubble || !panel) return;

    if (!isOpen) {
      // Morph from circle to rectangle
      gsap.to(bubble, {
        width: '400px',
        height: '600px',
        borderRadius: '24px',
        duration: 0.8,
        ease: 'back.inOut(1.5)',
      });

      gsap.to(panel, {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
      });
    } else {
      // Morph back to circle
      gsap.to(panel, {
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(bubble, {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        duration: 0.8,
        ease: 'back.inOut(1.5)',
        delay: 0.2,
      });
    }

    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: 'Thanks for your message! Our team will get back to you shortly.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        ref={bubbleRef}
        className="glass-heavy overflow-hidden relative"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
        }}
      >
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Open chat"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse-glow" />
          </button>
        )}

        {isOpen && (
          <div
            ref={panelRef}
            className="w-full h-full flex flex-col opacity-0 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">R2E Assistant</h3>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.2) transparent',
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-white text-black'
                        : 'glass border border-white/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass border border-white/20 px-4 py-2 rounded-2xl">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="glass border-white/10 focus:border-white/30"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="glass-heavy hover:bg-white/10 ripple"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
