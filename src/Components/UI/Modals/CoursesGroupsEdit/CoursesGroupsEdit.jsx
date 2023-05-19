import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const CoursesGroupsEdit = ({modal, editGroupName, handleClose, editGroupHandler}) => {
	return (
		<Modal className='edit' show={modal.show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование группы</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Название Группы</Form.Label>
					<Form.Control type="name" value={modal?.item?.name} onChange={editGroupName} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Отмена
				</Button>
				<Button variant="primary" onClick={editGroupHandler}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
