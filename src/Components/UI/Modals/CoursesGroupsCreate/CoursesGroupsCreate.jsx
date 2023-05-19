import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const CoursesGroupsCreate = ({show, setShow, name, setName, createGroupHandler}) => {
	return (
		<Modal className='add' show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Создание группы</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Название Группы</Form.Label>
					<Form.Control type="name" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setShow(false)}>
					Отмена
				</Button>
				<Button variant="primary" onClick={createGroupHandler} >
					Создать
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
