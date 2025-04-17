import React from 'react';

const MessageSkeleton: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-muted rounded-tl-sm">
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
