interface ToggleSwitchProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ToggleSwitch({ options, selected, onChange }: ToggleSwitchProps) {
  return (
    <div className="inline-flex rounded-full bg-gray-200 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-8 py-2 rounded-full font-semibold transition-all ${
            selected === option.value
              ? "bg-white text-[#008C15] shadow-md"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}