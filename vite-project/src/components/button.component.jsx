import { useCallback } from "react";

const ButtonComponent = ({ text, onClick, className, onKeyDown, type = "button" }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e) => {
      if (onKeyDown) {
        onKeyDown(e);
      } else if (e.key === "Enter") {
        onClick();
      }
    },
    [onKeyDown]
  );

  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      onKeyDown={handleKeyDown}
    >
      {text}
    </button>
  );
};

export { ButtonComponent };
