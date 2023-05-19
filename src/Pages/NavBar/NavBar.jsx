import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import { unLogin } from '../../Utils/utils';
export const NavBar = ({ token, email }) => {
	const [isLogin, setIsLogin] = useState(false)
	useEffect(() => {
		if (token?.length > 3) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	}, [token])

	const handlerLogout = (e) => {
		e.preventDefault();
		// setIsLogin(false)
		// setToken('')
		unLogin()
	}

	const menu = [{
		href: '',
		status: '',
		text: ''
	}]



	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Кампусные курсы</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 top-menu">
						{isLogin && <> <li className="nav-item">
							<Link className="nav-link" to="/groups">Группы курсов</Link>
						</li>

							<li className="nav-item">
								<Link className="nav-link" to="/my/">Мои курсы</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/teaching/">Преподаваемые курсы</Link>
							</li>
						</>}
					</ul>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{!isLogin && <li className="nav-item">
							<Link className="nav-link" to="/registration/">Регистрация</Link>
						</li>}
						{isLogin && <li className="nav-item">
							<Link className="nav-link" to="/profile">{email}</Link>
						</li>}
						{!isLogin && <li className="nav-item">
							<Link className="nav-link" to="/login/">Логин</Link>
						</li>}
						{isLogin && <li className="nav-item">
							<Link className="nav-link" to="/" onClick={handlerLogout}>Выход</Link>
						</li>}
					</ul>
				</div>
			</div>
		</nav>
	);
};
