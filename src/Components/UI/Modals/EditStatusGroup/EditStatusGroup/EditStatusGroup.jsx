import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const EditStatusGroup = ({show, editStatusGroupHandler, detailCourse, setEditStatusCourse}) => {
	return (
		<Modal className='add' show={show.statusGroup} onHide={() => editStatusGroupHandler('cancel')}>
			<Modal.Header closeButton>
				<Modal.Title>Изменение статуса курса</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<div className="mb-3">
						{(detailCourse.status === 'Created') &&
							<Form.Check
								type='radio'
								name='semester'
								value='OpenForAssigning'
								label='Открыт для записи'
								onClick={(event) => { setEditStatusCourse((prev) => ({ ...prev, status: event.target.value })) }}

							/>}

						{(detailCourse.status === 'Created' || detailCourse.status === 'OpenForAssigning') && <Form.Check
							type='radio'
							name='semester'
							value='Started'
							label='В процессе'
							onClick={(event) => { setEditStatusCourse((prev) => ({ ...prev, status: event.target.value })) }}

						/>}
						{(detailCourse.status === 'Created' || detailCourse.status === 'OpenForAssigning' || detailCourse.status === 'Started') && <Form.Check
							type='radio'
							name='semester'
							value='Finished'
							label='Завершен'
							onClick={(event) => { setEditStatusCourse((prev) => ({ ...prev, status: event.target.value })) }}
						/>}
					</div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => editStatusGroupHandler('cancel')}>
					Отмена
				</Button>
				<Button variant="primary" onClick={() => editStatusGroupHandler('save')}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
