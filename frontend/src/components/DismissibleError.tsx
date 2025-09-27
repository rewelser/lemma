import React from "react";

interface DismissableErrorProps {
    message: string | null;
    onDismiss: () => void;
}

    const DismissableError : React.FC<DismissableErrorProps> = ({ message, onDismiss }) => {
        if (!message) return null;

        return (
            <div className="flex items-center justify-between bg-red-100/30 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-2">
            <span>{message}</span>
            <button
                onClick={onDismiss}
                className="top-1 right-2 text-red-700 hover:text-red-900 !p-0"
                aria-label="Dismiss"
            >
                ✕
            </button>
            </div>

        );

    };

    export default DismissableError;