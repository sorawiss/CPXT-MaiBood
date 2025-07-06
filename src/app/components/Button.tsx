interface ButtonProps {
    type: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
    className?: string;
}

function Button({ type, text, onClick, className }: ButtonProps) {
  return (
    <button 
      type={type} onClick={onClick}
      className={`bg-makro text-white rounded-[38px] h-[3rem] w-full ${className}`}
    >{text}</button>
  )
}
export default Button