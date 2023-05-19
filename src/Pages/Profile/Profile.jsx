import styles from './Profile.module.css';
import { Form } from '../../Components/UI/Form/Form';
import { NavBar } from '../NavBar/NavBar';
import { Input } from '../../Components/UI/Input/Input';
import { useState, useEffect } from 'react';
import { unLogin } from '../../Utils/utils';
import { editProfile, getProfile } from '../../API/user';
export const Profile = (props) => {
	const { token } = props;
	const [user, setUser] = useState('')

	const change = (value) => {
		let newDate = '';
		if (value === undefined) {
			return undefined;
		}

		for (let i = 0; i < 10; i++) {
			newDate += value[i];
		}
		return newDate;
	}

	useEffect(() => {
		console.log('token', token)
		//Кидаю запрос на данные профиля
		if (!!token) {
			getProfile(token).then(data => {
				if (data !== 0) {
					setUser(data)
				}
			});
		}
	}, [token])

	const handlerChangeName = (e) => {
		const name = e.target.value;
		setUser(prev => {
			return { ...prev, fullName: name }
		})
	}

	const handlerChangeBirthDate = (e) => {
		const data = e.target.value;
		setUser(prev => {
			return { ...prev, birthDate: data }
		})
	}

	const handlerSubmit = () => {
		const userFullName = {
			fullName: user.fullName,
			birthDate: new Date(user.birthDate).toJSON(),
		}
		editProfile(token, user).then(data => {
			if (data !== 0) {
				console.log('handlerSubmit data json', data)
			}
		}).catch(error => console.error('handlerSubmit error', error));
	}

	return (
		<>
			<NavBar {...props} />
			<Form className={styles.container} nameForm='Профиль' btnText='Изменить' handler={handlerSubmit}>
				<Input className={`${styles.formTr} ${styles.input} ${styles.formLabel} ${styles.formControl}`} name='ФИО' type='fullName' placeholder='Иванов' value={user.fullName} onChange={handlerChangeName} />
				<Input className={`${styles.formTr} ${styles.input} ${styles.formLabel} ${styles.formControl}`} name='Дата рождения' type='date' placeholder='01.01.2001' value={change(user.birthDate)} onChange={handlerChangeBirthDate} />
				<Input className={`${styles.formTr} ${styles.input} ${styles.formLabel} ${styles.formControl}`} name='Email' type='email' placeholder='email@example.com' value={user.email} disabled />
			</Form>
		</>)
};


