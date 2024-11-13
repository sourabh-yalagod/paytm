interface InputBoxProps {
  label: string;
  onChange: () => void;
}
export default function InputBox({ label, onChange }: InputBoxProps) {
  return (
    <div className="w-full border-[2px] rounded-md outline-none">
      <label htmlFor="">{label}</label>
      <input onChange={onChange} type="text" />
    </div>
  );
}
