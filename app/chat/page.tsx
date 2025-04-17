import ChatView from '@/features/chat/chat.view';
import React from 'react';

async function page({ searchParams }: { searchParams: { q?: string } }) {
	const { q = '' } = await searchParams;
	return <ChatView initialText={decodeURIComponent(q)} />;
}

export default page;


import { ChatView } from '@/features/chat/chat.view';

export const metadata = {
  title: 'Chat Assistant',
  description: 'Chat with our AI assistant to get help with your queries',
};

export default function Page() {
  return <ChatView />;
}

export const dynamic = 'force-dynamic';
