"use client"
import { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

export default function SuccessMessage({ 
  message, 
  onClose, 
  autoHideDuration = 3000 
}: SuccessMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [onClose, autoHideDuration]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-backgroundsecondary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-textprimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">เพิ่มสำเร็จ!</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="transition-colors bg-textprimary text-white px-6 py-2 rounded-lg hover:bg-textprimary/80 duration-200"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
}
