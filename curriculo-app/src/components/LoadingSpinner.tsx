import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner({
  size = "medium",
}: LoadingSpinnerProps) {
  return <div className={`spinner ${size}`}></div>;
}
