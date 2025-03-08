import useModal from "./hooks/useModal";

function Button({ children }) {
  const { onClose } = useModal();
  return (
    <button className="button button--primary text-caption" onClick={onClose}>
      {children}
    </button>
  );
}
export default Button;
