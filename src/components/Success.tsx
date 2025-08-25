type SuccessPopupProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

export default function Success({ message, show, onClose }: SuccessPopupProps) {
  if (!show) return null;

  return (
  <div className="fixed h-20 w-70 top-4 right-4 z-50 rounded-lg bg-zinc-300/40 text-green-900 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white font-bold hover:text-zinc-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}
