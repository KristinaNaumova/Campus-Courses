import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const DetailsAboutGroupEdit = ({show, editDetailGroupHandler, requirements, annotations, setDetailCourse}) => {
	return (
		<Modal className='add' show={show.detailGroup} onHide={() => editDetailGroupHandler('cancel')}>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование курса</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Требования</Form.Label>
					<Form.Control as="textarea" value={requirements} rows={3} onChange={(event) => setDetailCourse((prev => ({ ...prev, requirements: event.target.value })))} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Аннотации</Form.Label>
					<Form.Control as="textarea" value={annotations} rows={3} onChange={(event) => setDetailCourse((prev => ({ ...prev, annotations: event.target.value })))} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => editDetailGroupHandler('cancel')}>
					Отмена
				</Button>
				<Button variant="primary" onClick={() => editDetailGroupHandler('save')}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
