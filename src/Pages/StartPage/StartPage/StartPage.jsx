import React from 'react';
import { NavBar } from '../../NavBar/NavBar';
import styles from './StartPage.module.css';
export const StartPage = (props) => {
	return (
		<>
			<NavBar {...props}  />
			<div className={styles.text}>Добро пожаловать в систему Кампусных курсов</div>
		</>
	);
};
