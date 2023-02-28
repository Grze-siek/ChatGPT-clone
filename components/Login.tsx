'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center space-y-10">
      <Image
        src="https://assets.stickpng.com/thumbs/63c52af590250dd34bd6a9ab.png"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        onClick={() => signIn('google')}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
