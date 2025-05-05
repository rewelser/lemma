import React from "react";

interface InputFieldProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    type = "text",
    placeholder,
    value,
    onChange,
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border-(length:--input-border-width) text-[var(--input-colors)] border-[var(--input-colors)] rounded-(--border-radii) p-2 my-2"
        />
    );
};

export default InputField;
