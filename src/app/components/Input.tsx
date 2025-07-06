interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function Input({ type, name, placeholder, value, label, onChange }: InputProps) {
    return (
        <div className="Input flex flex-col w-full ">
            <label className="text-textprimary  text-[1.25rem] " htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-backgroundsecondary rounded-2xl border h-[2.2rem] px-[1rem] border-textsecondary "
            />
        </div>
    )
}
export default Input