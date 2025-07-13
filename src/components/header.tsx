import { Button } from "./ui/button";

interface HeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Header({
  title,
  description,
  buttonText,
  buttonIcon,
  onClick,
  disabled,
}: HeaderProps) {
  let actionButton = null; // Initialize a variable to hold the button

  if (buttonText) { // Check if buttonText exists
    actionButton = (
      <Button
        onClick={onClick}
        aria-label={buttonText}
        disabled={disabled}
        variant="outline"
        className="flex items-center gap-2 bg-gray-100 text-gray-900"
      >
        {buttonIcon && <span>{buttonIcon}</span>}
        {buttonText}
      </Button>
    );
  }

  return (
    <header className=" flex items-center justify-between p-6" aria-labelledby="main-header-title">
      <div>
        <h1 id="main-header-title" className="text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {actionButton} {/* Render the button if it was assigned */}
      </div>
    </header>
  );
}