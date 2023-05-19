import React, { useState, useEffect } from 'react';
import { NavBar } from '../../NavBar/NavBar';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import styles from './DetailsAboutGroup.module.css';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { getCourseDetails, getGroupsId } from '../../../API/api';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabPane from 'react-bootstrap/TabPane'
import { TabContent } from 'react-bootstrap';
import { getId } from '../../../Utils/utils'
import { createNotification, editCourseStatus, editDetailsCourse, editStatusStudent, editStudentMark, signUpOnCampusCourse } from '../../../API/apiCourse';
import { addTeachersRole } from '../../../API/user';
import { AttestationModal } from '../../../Components/UI/Modals/AttestationModal/AttestationModal/AttestationModal';
import { DetailsAboutGroupEdit } from '../../../Components/UI/Modals/DetailsAboutGroupEdit/DetailsAboutGroupEdit/DetailsAboutGroupEdit';
import { EditStatusGroup } from '../../../Components/UI/Modals/EditStatusGroup/EditStatusGroup/EditStatusGroup';
import { NotificationModal } from '../../../Components/UI/Modals/NotificationModal/NotificationModal/NotificationModal';
import { AddTeacherModal } from '../../../Components/UI/Modals/AddTeacherModal/AddTeacherModal/AddTeacherModal';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchCoursesMy, selectCoursesMy } from '../../../AppSlice';


export const DetailsAboutGroup = (props) => {
	const dispatch = useDispatch(); 
	const courseDetailsId = getId(document.location.pathname)
	const { userRole, email, users } = props;
	const [show, setShow] = useState({ detailGroup: false, statusGroup: false, notification: false, addTeacher: false, intermediateAttestation: false, finalAttestation: false });
	// const [groups, setGroups] = useState(null);
	// const [modal, setModal] = useState({ item: {}, show: false });
	const [keyInfo, setKeyInfo] = useState('Требования к курсу');
	const [keyPeople, setKeyPeople] = useState('Преподаватели');
	const [detailCourse, setDetailCourse] = useState(null)
	const [student, setStudent] = useState({})
	const [editCourse, setEditCourse] = useState({})
	const [editStatusCourse, setEditStatusCourse] = useState({})
	const [notificationCourse, setNotificationCourse] = useState({})
	const [teacher, setTeacher] = useState({})


	const myCourses = useSelector(selectCoursesMy);





	useEffect(() => {
		getCourseDetails(courseDetailsId).then(data => {
			if (data != 0) {
				setDetailCourse(data)
			}
		})

	}, [])

	// useEffect(() => {
	// 	console.log('detailCourse ', detailCourse)

	// }, [detailCourse])

	const signUp = (e) => {
		// console.log('signUp', e)
		
		signUpOnCampusCourse(courseDetailsId).then(data => {
			if (data != 0) {
				// console.log('signUpOnCampusCourse',data);
				fetchCoursesMy(dispatch);
				const status = data.status;
				e.target.classList.add(`${styles.hidden}`);
				// console.log('signUp', data)
				if (status === 401 || status === 404 || status === 500) {
					e.target.classList.remove(`${styles.hidden}`)
				}
			}
		})
	}


	const editDetailGroupHandler = (key) => {
		setShow((prev) => ({ ...prev, detailGroup: !prev.detailGroup }));

		if (key === 'save') {

			editDetailsCourse(courseDetailsId, detailCourse.requirements, detailCourse.annotations).then(data => {
				if (data != 0) {
					console.log('editDetailsCourse', data)
				}
			})
		} else if (key === 'cancel') {
			// setEditStatusCourse({})
		}
	}

	const editStatusGroupHandler = (key) => {
		setShow((prev) => ({ ...prev, statusGroup: !prev.statusGroup }))
		if (key === 'save') {
			// setEditStatusCourse(editStatusCourse)
			editCourseStatus(courseDetailsId, editStatusCourse).then(data => {
				if (data != 0) {
					// console.log('editCourseStatus', data)
					// console.log('editCourseStatus setDetailCourse', detailCourse)
					// console.log('editCourseStatus editStatusCourse', editStatusCourse)
					setDetailCourse(prev => ({ ...prev, status: editStatusCourse.status }))
				}
			})
		} else if (key === 'cancel') {
			setEditStatusCourse({})
		}
	}

	const createNotificationHandler = (key) => {
		setShow((prev) => ({ ...prev, notification: !prev.notification }))
		if (key === 'save') {
			createNotification(courseDetailsId, notificationCourse).then(data => {
				if (data != 0) {
					const notification = { text: notificationCourse, isImportant: true }
					setDetailCourse(prev => ({ ...prev, notifications: [...prev.notifications, notification] }))
				}
			})
		} else if (key === 'cancel') {
			setNotificationCourse({})
		}
	}

	const addTeacherHandler = (key) => {
		setShow((prev) => ({ ...prev, addTeacher: !prev.addTeacher }))
		if (key === 'save') {
			setTeacher(teacher)
			addTeachersRole(courseDetailsId, teacher).then(data => {
				if (data != 0) {
					// console.log('addTeachersRole', data)
					setDetailCourse(data)
				}
			})
		} else if (key === 'cancel') {
			setTeacher({})
		}
	}

	const intermediateAttestationHandler = (key) => {
		// student.markType = type;
		setShow((prev) => ({ ...prev, intermediateAttestation: !prev.intermediateAttestation }))
		if (key === 'save') {
			editStudentMark(courseDetailsId, student.id, student.markType, student.mark).then(data => {
				if (data != 0) {
					const name = student.markType === 'Final' ? 'finalResult' : 'midtermResult';
					setDetailCourse(prev => ({
						...prev, students: prev.students.map(item => {
							if (item.id === student.id) {
								item[name] = student.mark;
							}
							return item
						})
					}))

				}
			})
		} else if (key === 'cancel') {
			setStudent({})
		}
	}

	const editStudentStatus = (status, id) => {
		return (e) => {
			e.target.closest('.studentStatusBtn').classList.add(`${styles.hidden}`);
			editStatusStudent(courseDetailsId, id, status).then(data => {
				if (data != 0) {
					console.log('editStatusStudent', data)
				}
			})
		}
	}

	if (detailCourse === null) return <></>;
	const {
		name,
		startYear,
		maximumStudentsCount,
		studentsEnrolledCount,
		studentsInQueueCount,
		requirements,
		annotations,
		status,
		semester,
		students,
		teachers,
		notifications } = detailCourse;

	const isMainTeacher = teachers.some(teacher => teacher.isMain && (teacher.email === email))
	const isNotStudentYet = !(myCourses.length > 0 && myCourses.some(course => course.id === courseDetailsId))

	const AcceptedStudent = students.some(student => student.status === 'Accepted' && (student.email === email))
	const isTeacher = teachers.some(teacher => (teacher.email === email))

	//const studentAcceptedLength = students.filter(studetn=>studetn.status === 'Accepted').length

	return (<>
		<NavBar {...props} />
		<div className="container text-right">
			<div className={styles.text}>{name}</div>
			{(userRole.isAdmin || userRole.isTeacher) && <>
				<Button variant="warning" onClick={editDetailGroupHandler}>РЕДАКТИРОВАТЬ</Button></>}
			<ListGroup as="ol" className='mt-4'>
				<ListGroup.Item

					as="li"
					className="d-flex justify-content-between align-items-start"
				>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Статус курса</div>
						<div >{status}</div>
					</div>
					{console.log('isNotStudentYet', isNotStudentYet, !userRole.isAdmin, status)}
					{(isNotStudentYet && !isTeacher && !userRole.isAdmin && status === 'OpenForAssigning') && <Button variant="warning" onClick={signUp}>ЗАПИСАТЬСЯ НА КУРС</Button>}
					{(userRole.isAdmin || userRole.isTeacher) && <Button variant="warning" onClick={editStatusGroupHandler}>ИЗМЕНИТЬ</Button>}
				</ListGroup.Item>
				<ListGroup.Item
					as="li"
					className="d-flex justify-content-between align-items-start"
				>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Учебный год</div>
						<div >{startYear}</div>
					</div>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Семестр</div>
						<div >{semester}</div>
					</div>
				</ListGroup.Item>
				<ListGroup.Item

					as="li"
					className="d-flex justify-content-between align-items-start"
				>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Всего мест</div>
						<div >{maximumStudentsCount}</div>
					</div>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Студентов зачисленно</div>
						<div >{studentsEnrolledCount}</div>
					</div>
				</ListGroup.Item>
				<ListGroup.Item

					as="li"
					className="d-flex justify-content-between align-items-start"
				>
					<div className="ms-2 me-auto">
						<div className="fw-bold">Заявок на рассмотрении</div>
						<div >{studentsInQueueCount}</div>
					</div>
				</ListGroup.Item>
			</ListGroup>

			<Tabs
				id="controlled-tab-example"
				activeKey={keyInfo}
				onSelect={(k) => setKeyInfo(k)}
				className="mt-4 mb-3"
				justify
			>
				<Tab eventKey="Требования к курсу" title="Требования к курсу" >
					<TabContent dangerouslySetInnerHTML={{ __html: requirements }} />

				</Tab>
				<Tab eventKey="Аннотации" title="Аннотации">
					{/* <TabContent>{annotations}</TabContent> */}
					<TabContent dangerouslySetInnerHTML={{ __html: annotations }} />
				</Tab>
				<Tab eventKey="Уведомления" title="Уведомления">
					<TabContent>
						{(userRole.isAdmin || userRole.isTeacher) && <Button variant="primary" onClick={createNotificationHandler}>СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>}
						<ListGroup as="ol" className='mt-2'>
							{notifications && notifications.map(({
								text,
								isImportant
							}, index) => {

								return <ListGroup.Item
									key={index}
									as="li"
									className="d-flex justify-content-between align-items-start"
								>
									<div className="ms-2 me-auto">
										<div >{text}</div>
									</div>

								</ListGroup.Item>
							})}
						</ListGroup>
					</TabContent>
				</Tab>
			</Tabs>

			<Tabs
				id="controlled-tab-example-"
				activeKey={keyPeople}
				onSelect={(k) => setKeyPeople(k)}
				className="mt-4 mb-3"
				justify
			>
				<Tab eventKey="Преподаватели" title="Преподаватели" >
					<TabContent>
						{<>
							{(isMainTeacher || userRole.isAdmin) && <Button variant="primary" className='ms-3' onClick={addTeacherHandler}>ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button>}
						</>}
						<ListGroup as="ol" className='mt-2'>
							{teachers && teachers.map(({
								name,
								email,
								isMain
							}) => {

								return <ListGroup.Item
									key={email}
									as="li"
									className="d-flex justify-content-between align-items-start"
								>
									<div className="ms-2 me-auto">
										<div className='fw-bold' >{name}
											{isMain && <Badge bg="success">Основной</Badge>}
										</div>
										<div>{email}</div>
									</div>

								</ListGroup.Item>
							})}
						</ListGroup>
					</TabContent>

				</Tab>
				<Tab eventKey="Студенты" title="Студенты" className='mb-4'>
					<TabContent>
						<ListGroup as="ol" className='mt-4'>
							{students && students.map((student) => {
								const {
									id,
									name,
									email: studentEmail,
									status,
									midtermResult,
									finalResult
								} = student;
								return <ListGroup.Item
									key={id}

									as="li"
									className="d-flex justify-content-between align-items-start"
								>
									<div className="ms-2 me-auto">
										<div >{name}</div>
										<div >Статус - {status} </div>
										<div>{studentEmail}</div>
									</div>
									{(userRole.isAdmin || userRole.isTeacher || studentEmail === email) && <>
										{(status === 'Accepted') && <>
											<div className="ms-2 me-auto">
												<span onClick={() => {
													// setStudent(student)
													setStudent({ ...student, markType: 'Midterm' })
													intermediateAttestationHandler()

												}}> Промежуточная аттестация - </span><br></br>
												<Badge bg="success">
													{midtermResult}
												</Badge>

											</div>
											<div className="ms-2 me-auto">
												<span onClick={() => {
													setStudent({ ...student, markType: 'Final' })
													intermediateAttestationHandler()
												}}> Финальная аттестация - </span><br></br>
												<Badge bg="secondary">
													{finalResult}
												</Badge>
											</div>
										</>}
										{(status === 'InQueue') && <>
											<span className='studentStatusBtn'>
												<Button variant="primary" className='me-2 mt-3' onClick={editStudentStatus('Accepted', id)}>
													Принять
												</Button>
												<Button variant="danger" className='mt-3' onClick={editStudentStatus('Declined', id)}>Отклонить заявку</Button>
											</span>

										</>}
									</>}
								</ListGroup.Item>
							})}
						</ListGroup>
					</TabContent>
				</Tab>

			</Tabs>

		</div >
		<AttestationModal show={show} intermediateAttestationHandler={intermediateAttestationHandler} student={student} setStudent={setStudent}/>
		<DetailsAboutGroupEdit show={show} editDetailGroupHandler={editDetailGroupHandler} requirements={requirements} annotations={annotations} setDetailCourse={setDetailCourse} />
		<EditStatusGroup show={show} editStatusGroupHandler={editStatusGroupHandler} detailCourse={detailCourse} setEditStatusCourse={setEditStatusCourse} />
		<NotificationModal show={show} createNotificationHandler={createNotificationHandler} setNotificationCourse={setNotificationCourse} />
		<AddTeacherModal show={show} addTeacherHandler={addTeacherHandler} setTeacher={setTeacher} users={users} />
	</>);


};
