interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    value?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    readOnly?: boolean;
    defaultValue?: string;
    error?: string[];
}


function Input({ type, name, placeholder, value, label, onChange, className,
    required, readOnly, defaultValue, error }: InputProps) {
    return (
        <div className="Input flex flex-col w-full ">
            <label className="text-textprimary font-medium  text-[1rem] " htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`bg-backgroundsecondary w-full rounded-2xl border h-[2.5rem] px-[1rem] border-textsecondary 
                    ${className} placeholder:text-textsecondary placeholder:text-[1rem] placeholder:font-light `}
                required={required}
                id={name}
                readOnly={readOnly}
                defaultValue={defaultValue}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
export default Input