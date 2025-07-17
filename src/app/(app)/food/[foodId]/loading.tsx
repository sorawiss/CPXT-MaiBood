"use client"
import Image from "next/image";

function BouncingEgg() {
  return (
    <div className="flex flex-col items-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce-cartoon"
        style={{ display: 'block' }}
      >
        {/* Egg white */}
        <ellipse cx="50" cy="60" rx="32" ry="32" fill="#fff" stroke="#e5e5e5" strokeWidth="3" />
        {/* Yolk */}
        <ellipse cx="50" cy="65" rx="12" ry="12" fill="#FFE066" stroke="#FFD700" strokeWidth="2" />
        {/* Smile */}
        <path d="M43 75 Q50 80 57 75" stroke="#7C3F00" strokeWidth="2.5" fill="none" />
        {/* Eyes */}
        <ellipse cx="44" cy="68" rx="2.2" ry="3" fill="#7C3F00" />
        <ellipse cx="56" cy="68" rx="2.2" ry="3" fill="#7C3F00" />
      </svg>
      <style jsx>{`
        .animate-bounce-cartoon {
          animation: cartoon-bounce 1.2s infinite cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes cartoon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center bg-makro">
      <Image src="/maibood-logo.svg" alt="logo" width={106} height={134} className="mb-8" />
      <BouncingEgg />
      <p className="mt-4 text-lg text-background">กำลังเปิดข้อมูลอาหาร...</p>
    </div>
  );
} 