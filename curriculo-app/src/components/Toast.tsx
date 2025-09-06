import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">
        ×
      </button>
    </div>
  );
}
