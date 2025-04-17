import React from 'react';

function ChatView({ initialText }: { initialText?: string }) {
	return <div>{initialText}</div>;
}

export default ChatView;


import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ChatHeader from './components/chat-header';
import MessageList from './components/message-list';
import { Button } from '@/components/ui/button';
import { Message } from './types';

export function ChatView({ initialText }: { initialText?: string }) {
  const router = useRouter();
  const [input, setInput] = useState(initialText || '');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How can I help you today?', role: 'assistant', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for your message! This is a placeholder response as the actual AI integration is not implemented yet.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="relative flex items-center max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={1}
            style={{
              height: Math.min(Math.max(input.split('\n').length, 1) * 24 + 24, 200) + 'px'
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-2"
            variant="ghost"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
