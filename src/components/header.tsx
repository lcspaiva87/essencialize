import { ModalCustom } from '@/components/modal-custom';
import type { FormField } from '@/types/form-filed-types';
import type React from 'react';
import type { JSX } from 'react';
import { Button } from './ui/button';

interface HeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isCreate: boolean;
  fields: FormField[];
  bgColor?: string;
}

export default function Header({
  title,
  description,
  buttonText,
  buttonIcon,
  onClick,
  disabled,
  isCreate,
  fields,
  bgColor,
}: HeaderProps) {
  let actionButton: JSX.Element | null = null;

  if (buttonText) {
    actionButton = isCreate ? (
      <ModalCustom
        bgColor={bgColor}
        buttonIcon={buttonIcon}
        buttonText={buttonText}
        fields={fields}
        onSubmit={() => {}}
      />
    ) : (
      <Button
        aria-label={buttonText}
        className="flex items-center gap-2 text-white"
        disabled={disabled}
        onClick={onClick}
      >
        {buttonIcon && <span>{buttonIcon}</span>}
        {buttonText}
      </Button>
    );
  }

  return (
    <header className=" flex items-center justify-between p-6">
      <div>
        <h1
          className="mb-2 font-bold text-3xl text-gray-900"
          id="main-header-title"
        >
          {title}
        </h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {actionButton} {/* Render the button if it was assigned */}
      </div>
    </header>
  );
}
