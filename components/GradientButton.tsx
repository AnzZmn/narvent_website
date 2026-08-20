type ButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function GradientButton({
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-[206px] h-[72px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${className}`}
    >
      <img
        src="/Button.svg"
        alt="Button"
        className="absolute inset-0 w-full h-full"
        draggable={false}
      />
    </button>
  );
}
