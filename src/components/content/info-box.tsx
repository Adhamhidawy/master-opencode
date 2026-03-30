import { cn } from "@/lib/utils";

interface InfoBoxProps {
  variant: "tip" | "warning" | "success";
  label: string;
  content: string;
}

const variantStyles = {
  tip: "border-blue/20 bg-blue/10 text-blue-2",
  warning: "border-orange/20 bg-orange/10 text-orange",
  success: "border-green/20 bg-green/10 text-green-2",
};

export function InfoBox({ variant, label, content }: InfoBoxProps) {
  return (
    <div className={cn("my-5 rounded-xl border p-5 text-[.88rem] leading-relaxed", variantStyles[variant])}>
      <div className="mb-1.5 text-[.75rem] font-bold uppercase tracking-wider">{label}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
