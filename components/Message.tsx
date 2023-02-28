import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Typewriter from 'typewriter-effect';
import { db } from '../firebase';

type Props = {
  message: DocumentData;
  chatId: string;
  messageId: string;
};

function Message({ message, chatId, messageId }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT';
  const { data: session } = useSession();

  async function onComplete() {
    try {
      await updateDoc(
        doc(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages',
          messageId
        ),
        {
          repeated: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8 " />
        {isChatGPT && !message.repeated ? (
          <>
            <Typewriter
              options={{
                delay: 20,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(message.text)
                  .callFunction(() => {
                    onComplete();
                  })
                  .start();
              }}
            />
          </>
        ) : (
          <p className="text-md">{message.text}</p>
        )}
      </div>
    </div>
  );
}

export default Message;
