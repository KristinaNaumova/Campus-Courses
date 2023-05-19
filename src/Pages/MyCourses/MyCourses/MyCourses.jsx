import React, { useState, useEffect } from 'react';
import { NavBar } from '../../NavBar/NavBar';
import styles from './MyCourses.module.css'
import { CourseGroupList } from '../../../Components/CourseGroupList/CourseGroupList/CourseGroupList';
import { coursesMy } from '../../../API/user';
import { selectCoursesMy } from '../../../AppSlice';
import { useSelector } from 'react-redux';


export const MyCourses = (props) => {
	const { userRole } = props;
	//const [groups, setGroups] = useState(null);

	const groups = useSelector(state => state.appSlice.coursesMy);
	


	return (<>
		<NavBar {...props} />
		<div className="container text-right">
			<div className={styles.text}>Мои курсы</div>
			<CourseGroupList groups={groups} userRole={userRole} />
		</div >

	</>);
};

