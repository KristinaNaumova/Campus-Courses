import React, { useState, useEffect } from 'react';
import { NavBar } from '../../NavBar/NavBar';
import styles from './TeachingCourses.module.css';
import { coursesTeaching } from '../../../API/user';
import { deleteCourse } from '../../../API/apiCourse';
import { CourseGroupList } from '../../../Components/CourseGroupList/CourseGroupList/CourseGroupList';

export const TeachingCourses = (props) => {
	const { userRole } = props;
	const [groups, setGroups] = useState(null);


	useEffect(() => {
		coursesTeaching().then((data => {
			if (data !== 0) {
				setGroups(data)
			}
		  }))

	}, [])

	const deleteCourseHandler = (id) => {
		deleteCourse(id).then(data => {
			if (data != 0) {
				setGroups((prev) => prev.filter((el) => el.id !== id))
			}
		})
	}

	return (<>
		<NavBar {...props} />
		<div className="container text-right">
			<div className={styles.text}>Преподаваемые курсы</div>
			<CourseGroupList groups={groups} deleteCourseHandler={deleteCourseHandler} userRole={userRole}/>
		</div >

	</>);
};

