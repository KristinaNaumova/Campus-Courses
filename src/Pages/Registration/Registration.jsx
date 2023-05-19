import { Input } from '../../Components/UI/Input/Input';
import React, { useState, useEffect } from "react";
import { Form } from '../../Components/UI/Form/Form';
import { NavBar } from '../NavBar/NavBar';
import styles from './Registration.module.css';
import { redirect } from 'react-router-dom';
import { registration } from '../../API/user';


export const Registration = ( props ) => {
	const [fullName, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [birth, setBirth] = useState('')
	const [email, setEmail] = useState('')


	const handlerSubmit = () => {
		const user = {
			fullName: fullName,
			birthDate: new Date(birth).toJSON(),
			email: email,
			password: password,
			confirmPassword: passwordCheck
		}
		registration(user)
		.then(data => {
			if (data !== 0) {
				localStorage.setItem('token', data.token)
				localStorage.setItem('email', email)
				window.location.href='/'
			}
		})
		.catch(error => console.error('handlerSubmit error', error));
	}
	return (<>
		<NavBar {...props }/>
		<Form className={styles.container} nameForm='Регистрация нового пользователя' btnText='Зарегистрироваться' handler={handlerSubmit} onSubmit={(e) => { e.preventDefault() }}>
			<Input className={styles.input} name='ФИО' type='fullName' placeholder='Иванов' value={fullName} onChange={(event) => setFullName(event.target.value)} />
			<Input className={styles.input} name='Дата рождения' type='date' placeholder='01.01.2001' value={birth} onChange={(event) => setBirth(event.target.value)} />
			<Input className={styles.input} name='Email' type='email' placeholder='email@example.com' value={email} onChange={(event) => setEmail(event.target.value)} />
			<Input className={styles.input} name='Пароль' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
			<Input className={styles.input} name='Повторите пароль' type='password' value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} />
		</Form>
	</>)
};

