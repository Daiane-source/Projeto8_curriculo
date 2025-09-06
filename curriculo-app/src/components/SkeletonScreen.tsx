import "./SkeletonScreen.css";

interface SkeletonScreenProps {
  type?: "text" | "button" | "image";
  width?: string;
  height?: string;
}

export default function SkeletonScreen({
  type = "text",
  width = "100%",
  height = "1em",
}: SkeletonScreenProps) {
  return <div className={`skeleton ${type}`} style={{ width, height }}></div>;
}
