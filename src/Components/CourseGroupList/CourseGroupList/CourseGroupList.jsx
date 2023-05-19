import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from './CourseGroupList.module.css'
// import { useSelector } from "react-redux";

export const CourseGroupList = ({groups, deleteCourseHandler, userRole }) => {

	// const groups = useSelector(state => state.appSlice.coursesMy);

	return (
		<ListGroup as="ol" className='mt-4'>
			{groups && groups.map(item => (<ListGroup.Item
				key={item.id}
				as="li"
				className="d-flex justify-content-between align-items-start"
			>
				<div className="ms-2 me-auto">
					<Link to={`/courses/${item.id}`} className={styles.link}>{item.name}</Link>
					<div className="fw-bold">Учебный год - {item.startYear}</div>
					<div className="fw-bold">Семестр - {item.semester}</div>
					<div >Мест всего: {item.maximumStudentsCount}</div>
					<div >Мест свободно: {item.remainingSlotsCount}</div>
				</div>
				<div>
					<div className='mb-4' variant='danger'> {item.status}</div>
					{userRole.isAdmin && <><Button variant="warning" onClick={() => deleteCourseHandler(item.id)} className={styles.position}>
						Удалить
					</Button></>}
				</div>
			</ListGroup.Item>))}

		</ListGroup>
	);
};
