export const Form = (props) => {
	const { className, nameForm, btnText, handler, children } = props
	return (<div className="container text-center">
		<form className={className} onSubmit={(e) => { e.preventDefault(); handler(e) }}>
			<div className="container">
				<h1>{nameForm}</h1>
				{children}
				<button type="submit" className="btn btn-secondary">{btnText} </button>
			</div>
		</form>
	</div>);
};
