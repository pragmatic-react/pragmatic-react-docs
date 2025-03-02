function Button({ children, onClick }) {
  return (
    <button className="button button--primary text-caption" onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
