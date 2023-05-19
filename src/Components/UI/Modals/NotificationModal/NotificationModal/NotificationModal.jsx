import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const NotificationModal = ({show, createNotificationHandler, setNotificationCourse}) => {
	return (
		<Modal className='add' show={show.notification} onHide={() => createNotificationHandler('cancel')} >
			<Modal.Header closeButton>
				<Modal.Title>Создание уведомления</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Control as="textarea" rows={3} onChange={(event) => setNotificationCourse(event.target.value)} />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => createNotificationHandler('cancel')}>
					Отмена
				</Button>
				<Button variant="primary" onClick={() => createNotificationHandler('save')}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
