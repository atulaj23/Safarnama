import { AlertTriangle } from "lucide-react";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ title = "Something went wrong", message = "Please try again in a moment.", onRetry }: Props) {
  return (
    <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-xl text-white">{title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-2 text-sm text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}
