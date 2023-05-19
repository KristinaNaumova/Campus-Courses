import React, { useEffect, useState } from 'react';
import { NavBar } from '../../NavBar/NavBar';
import Button from 'react-bootstrap/Button';
import styles from './CoursesGroups.module.css';
import { CoursesGroupsCreate } from '../../../Components/UI/Modals/CoursesGroupsCreate/CoursesGroupsCreate';
import { GroupList } from '../../../Components/UI/GroupList/GroupList/GroupList';
import { CoursesGroupsEdit } from '../../../Components/UI/Modals/CoursesGroupsEdit/CoursesGroupsEdit';
import { useSelector, useDispatch } from 'react-redux'; 
import { addGroup, deleteGroups, fetchGroups, setGroups, editGroup } from './CoursesGroupsSlice';

export const CoursesGroups = (props) => {
	const dispatch = useDispatch(); 
	const { userRole } = props;
	const [show, setShow] = useState(false);
	const [modal, setModal] = useState({ item: {}, show: false });
	const [name, setName] = useState('')

	const groupsName = useSelector(state => state.coursesGroups.groups); 

	const isLoading = useSelector(state => state.coursesGroups.isLoading); 

	const handleClose = (item) => setModal({ item: {}, show: false });
	const handleShow = (item) => setModal({ item: item, show: true })

	useEffect(() => {
		fetchGroups(dispatch);
	}, [])

	const createGroupHandler = () => {
		setShow(false)
		addGroup(dispatch, name);
	}

	const deleteGroupHandler = (id) => {
		deleteGroups(dispatch, id);
	}

	const editGroupHandler = () => {
		const { id, name } = modal.item;
		editGroup(dispatch, id, name);

			// setGroupsName(prev => prev.map(item => {
			// 	if (item.id === id) item.name = name
			// 	return item
			// }))
			handleClose();
	}
	

	const editGroupName = (e) => {
		// { item: {name< id ...}, show: false }
		setModal(prev => ({
			...prev, item: {
				...prev.item, name: e.target.value
			}
		}))
	}


	return (<>
		<NavBar {...props} />
		<div className="container text-right">
			<div className={styles.text}>Группы кампусных курсов</div>
			{userRole.isAdmin && <Button variant="secondary" onClick={() => setShow(true)}>Создать</Button>}
			<CoursesGroupsCreate show={show} setShow={setShow} name={name} setName={setName} createGroupHandler={createGroupHandler}/>
			<GroupList groupsName={groupsName} userRole={userRole} handleShow={handleShow} deleteGroupHandler={deleteGroupHandler}/>
			<CoursesGroupsEdit modal={modal} handleClose={handleClose} editGroupName={editGroupName} editGroupHandler={editGroupHandler}/>
		</div>

	</>);
};
