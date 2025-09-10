import { useCallback } from "react";

const InputComponent = ({ value, onChange, className }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  return <input value={value} onChange={handleChange} className={className} />;
};

export { InputComponent };
