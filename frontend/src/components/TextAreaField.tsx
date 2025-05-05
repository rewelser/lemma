import React from "react";

interface TextAreaFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  showCharCount?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  placeholder,
  value,
  onChange,
  maxLength,
  showCharCount,
}) => {
  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-(length:--input-border-width) text-[var(--input-colors)] border-[var(--input-colors)] rounded-(--border-radii) p-2 my-2"
      />
      {showCharCount && maxLength && (
        <div className="text-xs text-right text-gray-500 -mt-1 mr-1">
          {value.length} / {maxLength}
        </div>
      )}
    </div>

  );
};

export default TextAreaField;
