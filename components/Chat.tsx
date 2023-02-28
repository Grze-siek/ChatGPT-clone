'use client';

import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesRef.current?.scrollHeight]);

  return (
    <div
      ref={messagesRef}
      className="scroller flex-1 overflow-y-scroll overflow-x-hidden"
    >
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message
          key={message.id}
          message={message.data()}
          chatId={chatId}
          messageId={message.id}
        />
      ))}
      <div id="anchor"></div>
    </div>
  );
}

export default Chat;
