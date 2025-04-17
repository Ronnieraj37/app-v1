import React from 'react';

function ChatView({ initialText }: { initialText?: string }) {
	return <div>{initialText}</div>;
}

export default ChatView;


import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export function ChatView({ initialText }: { initialText?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialText || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a simulated response from the AI assistant.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/90 relative">
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-10 border-b border-border/10">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">New Chat</Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-24">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-4">Welcome to the AI Assistant</h2>
              <p className="text-muted-foreground mb-8">
                Start a conversation with the AI assistant by typing a message below.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="p-4 h-auto flex flex-col items-start text-left">
                  <span className="font-medium">Explain blockchain</span>
                  <span className="text-xs text-muted-foreground">How does blockchain technology work?</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-start text-left">
                  <span className="font-medium">Smart contracts</span>
                  <span className="text-xs text-muted-foreground">What are smart contracts?</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-start text-left">
                  <span className="font-medium">DeFi explained</span>
                  <span className="text-xs text-muted-foreground">What is decentralized finance?</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col items-start text-left">
                  <span className="font-medium">NFT basics</span>
                  <span className="text-xs text-muted-foreground">What are NFTs and how do they work?</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-xl p-4 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-xl p-4 space-x-2 flex items-center">
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/10 p-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                className="pr-12 py-6 bg-background resize-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="icon"
                className="absolute right-2 bottom-1/2 transform translate-y-1/2"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            AI responses are simulated and for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}