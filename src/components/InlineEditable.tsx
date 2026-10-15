import React, { useState, useEffect, useRef } from 'react';

interface InlineEditableProps {
  value: string;
  onChange: (val: string) => void;
  isEditing: boolean;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  placeholder = 'Kliknij, aby wpisać...',
  multiline = false,
  as: Component = 'span',
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (elementRef.current) {
      const text = elementRef.current.innerText.trim();
      onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  if (!isEditing) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  return (
    <Component
      ref={elementRef as unknown as React.RefObject<HTMLDivElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} cv-edit-active transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
      title="Kliknij, aby edytować ten tekst"
    >
      {internalValue}
    </Component>
  );
};
