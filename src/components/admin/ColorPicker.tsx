import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-md border border-border cursor-pointer bg-transparent"
      />
      <div className="flex-1 space-y-1">
        <Label className="text-xs">{label}</Label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm h-8 font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
