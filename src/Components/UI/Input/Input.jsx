export const Input = (props) => {
	const {name, type, placeholder, onChange, value, disabled } = props
  
  return (
    <div className="mb-3">
      <label className="form-label">{name}</label>
      <input
        type={type}
        className="form-control"
        name={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={!!disabled}
      />
    </div>
  );
};


