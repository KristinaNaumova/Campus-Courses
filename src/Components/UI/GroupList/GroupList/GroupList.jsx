import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import styles from './GroupList.module.css'

export const GroupList = ({ groupsName, userRole, handleShow, deleteGroupHandler }) => {
	return (
		<ul className="list-group mt-4">
			{groupsName && groupsName.map(item => (
				<li key={item.id} className="list-group-item d-flex justify-content-between align-items-center col-12">
					<Link className={`${styles.link} group-link col-9 col-sm-6 col-md-7 col-lg-9`} to={`/groups/${item.id}`}>{item.name}</Link>
					{userRole.isAdmin && <>
						<Button variant="warning" onClick={() => handleShow(item)}>
							Редактировать
						</Button>
						<Button variant="danger" onClick={() => deleteGroupHandler(item.id)}>Удалить</Button>
					</>}
				</li>))
			}
		</ul>
	);
};
