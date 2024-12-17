import React, { InputHTMLAttributes } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { FaTriangleExclamation } from "react-icons/fa6";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  completed?: boolean;
  onClear?: () => void; // Function to clear input
}

const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  errorMessage,
  completed,
  disabled,
  onClear,
  value,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1 w-[540px]">
      {/* Label */}
      {label && (
        <label
          className={`text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          {...props}
          value={value}
          disabled={disabled}
          className={`
            w-full h-[56px] 
            p-[14px_12px] 
            rounded-t-[8px] rounded-b-[8px]
            border border-gray-300 
            outline-none transition 
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "focus:ring-2 focus:ring-blue-500"
            }
            ${completed ? "border-green-500" : ""}
            ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
          `}
        />

        {/* Cancel Icon - Right Corner */}
        {value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <MdCancel size={20} />
          </button>
        )}

        {/* Completed State Indicator */}
        {completed && !error && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-blue-500">
            <span className="text-sm">Available</span>
            <MdCheckCircle size={20} />
          </div>
        )}
      </div>

      {/* Hint and Error Message */}
      {error ? (
        <div className="flex items-center space-x-1 text-xs text-red-500">
          <FaTriangleExclamation size={14} />
          <span>{errorMessage || "Error"}</span>
        </div>
      ) : (
        hint && <span className="text-xs text-gray-500">{hint}</span>
      )}
    </div>
  );
};

export default Input;
