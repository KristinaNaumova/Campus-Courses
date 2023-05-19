import React, { useState, useEffect } from 'react';
import { NavBar } from '../../NavBar/NavBar';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './CourseGroups.module.css';
import Badge from 'react-bootstrap/Badge';
import swal from 'sweetalert';
import ListGroup from 'react-bootstrap/ListGroup';
import { createNewCourse, getGroups, getGroupsId } from '../../../API/api';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addTeachersRole } from '../../../API/user';
import { getId } from '../../../Utils/utils';
import { deleteCourse } from '../../../API/apiCourse';
import { CourseGroupsCreate } from '../../../Components/UI/Modals/CourseGroupsCreate/CourseGroupsCreate';
import { CourseGroupList } from '../../../Components/CourseGroupList/CourseGroupList/CourseGroupList';
import { fetchGroups } from '../CoursesGroups/CoursesGroupsSlice';
import { useSelector, useDispatch } from 'react-redux'; 

const courseInit = {
	"name": "",
	"startYear": 2000,
	"maximumStudentsCount": 0,
	"semester": "",
	"requirements": "",
	"annotations": "",
	"mainTeacherId": ""
}
export const CourseGroups = (props) => {
	const dispatch = useDispatch(); 
	const { userRole, email, users } = props;
	const [show, setShow] = useState(false);
	const [groups, setGroups] = useState(null);
	const [modal, setModal] = useState({ item: {}, show: false });
	const [editorState, setEditorState] = useState('');
	const [title, setTitle] = useState('');
	const [course, setCourse] = useState(courseInit)


	const handleClose = (item) => setModal({ item: {}, show: false });
	const handleShow = (item) => setModal({ item: item, show: true })
	// const path = document.location.pathname;
	const courseId = getId(document.location.pathname)
	const groupsName = useSelector(state => state.coursesGroups.groups); 

	// const getId = () => {
	// 	let url = document.location.pathname;
	// 	return (url.split('/')[2]);
	// }
	useEffect(() => {

		getGroupsId(courseId).then(data => {
			if (data != 0) {
				setGroups(data)
			}
		})
		if (groupsName.length < 1) {

			fetchGroups(dispatch);

			// getGroups().then(data => {
			// 	if (data !== 0) {
			// 		setGroupsName(data)
			// 	}
			// })
		}

	}, [])

	useEffect(() => {
		setTitle(groupsName.find(item => item.id === courseId)?.name)
	}, [groupsName])

	const createCourseHandler = () => {
		setShow(false)

		
		createNewCourse(courseId, course).then((data) => {
			if(data.ok === false){
				swal("Создание курса ", `Ошибка "${data.statusText}" `, "error");
			}else {
				swal("Создание курса ", `Курс "${course.name}" успешно создан!`, "success");
				setGroups(data)
				// addTeachersRole(data[data.length-1].id, course.mainTeacherId)
			}
		}).catch(error=>{
			console.error('createGroupHandler error', error )
		})
	}
	// {
	//     "name": "string",
	//     "startYear": 2029,
	//     "maximumStudentsCount": 200,
	//     "semester": "Autumn",
	//     "requirements": "string",
	//     "annotations": "string",
	//     "mainTeacherId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
	//   }

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
			<div className={styles.text}>Группы - {title}</div>
			{userRole.isAdmin && <Button variant="secondary" onClick={() => setShow(true)}>Создать</Button>}
			<CourseGroupsCreate show={show} setShow={setShow} course={course} setCourse={setCourse} users={users} createCourseHandler={createCourseHandler}/>
			<CourseGroupList groups={groups} deleteCourseHandler={deleteCourseHandler} userRole={userRole}/>
		</div >

	</>);
};
