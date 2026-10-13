import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-[var(--color-primary)]' : 'bg-[#353437]'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      {label && (
        <span className="text-xs font-mono text-[#bcc9cd]">{label}</span>
      )}
    </label>
  );
}
