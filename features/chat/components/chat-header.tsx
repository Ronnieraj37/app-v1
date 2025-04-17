import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ChatHeader: React.FC = () => {
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between h-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => router.push('/')}
            variant="ghost" 
            size="icon"
            className="text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">Chat Assistant</h1>
        </div>
        
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="text-sm text-foreground/80">Online</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
