import { LoaderCircle } from "lucide-react";



interface ButtonProps {
    type: "button" | "submit" | "reset";
    text: string | React.ReactNode;
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
}

function Button({ type, text, onClick, className, isLoading }: ButtonProps) {
  return (
    <button 
      type={type} onClick={onClick}
      disabled={isLoading}
      className={`bg-makro text-white rounded-[38px] h-[3.5rem] w-full text-[1.5rem] font-bold
        flex items-center justify-center cursor-pointer ${className}`}
    >{isLoading ? <LoaderCircle className="animate-spin" /> : text}</button>
  )
}
export default Button