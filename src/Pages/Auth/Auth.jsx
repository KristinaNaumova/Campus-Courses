import React, { useState } from "react";
import { Input } from '../../Components/UI/Input/Input';
import { Form } from '../../Components/UI/Form/Form';
import styles from './Auth.module.css';
import { NavBar } from '../NavBar/NavBar';
import { Login } from "../../API/user";

export const Auth = (props) => {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	const onSubmit = (e) => {
		const user = { email: email, password: password }
		Login(user).then(data => {
			if (data !== 0) {
				console.log('Auth ', data)
				localStorage.setItem('token', data.token)
				localStorage.setItem('email', email)
				window.location.href='/'
			}
		})
	}

	return (
		<>
			<NavBar {...props} />
			<Form className={styles.container} nameForm='Авторизация' btnText='Войти' handler={onSubmit}>
				<Input className={styles.inputEmail} name='Email' type='email' placeholder='email@example.com' value={email} onChange={(event) => setEmail(event.target.value)} />
				<Input className={styles.inputPassword} name='Пароль' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
			</Form>
		</>
	)
};

