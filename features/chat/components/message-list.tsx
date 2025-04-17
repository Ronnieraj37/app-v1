import React from 'react';
import { Message } from '../types';
import { motion } from 'framer-motion';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user' 
              ? 'bg-primary text-primary-foreground rounded-tr-sm' 
              : 'bg-muted rounded-tl-sm'}`}
          >
            <div className="text-sm">{message.content}</div>
            <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MessageList;
