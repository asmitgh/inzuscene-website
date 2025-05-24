// components/ui/use-toast.ts
type ToastVariant = "default" | "success" | "destructive" | "info";

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export const toast = (props: ToastProps) => {
  const event = new CustomEvent("custom-toast", { detail: props });
  window.dispatchEvent(event);
};
