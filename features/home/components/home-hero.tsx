import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constant/routes.constant';
import { MessageCircle } from 'lucide-react';

const HomeHero = () => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-12">
      <Button 
        onClick={() => router.push(ROUTES.CHAT)}
        className="flex items-center gap-2 px-6 py-6"
      >
        <MessageCircle className="w-5 h-5" />
        Start Chatting
      </Button>
    </div>
  );
};

export default HomeHero;
