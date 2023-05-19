import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AttestationModal = ({show,intermediateAttestationHandler, student, setStudent}) => {
	return (
		<Modal className='add' show={show.intermediateAttestation} onHide={() => intermediateAttestationHandler('cancel')} >
			<Modal.Header closeButton>
				<Modal.Title>Изменение отметки для {student.markType === 'Final' ? 'Финальная аттестация' : 'Промежуточная аттестация'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label> Студент - {student.name}</Form.Label>
					<Form>
						<div className="mb-3">
							<Form.Check
								type='radio'
								name='semester'
								value='Passed'
								label='Успешно сдана'
								onClick={(event) => { setStudent((prev) => ({ ...prev, mark: event.target.value })) }}
							/>

							<Form.Check
								type='radio'
								name='semester'
								value='NotDefined'
								label='В процессе'
								onClick={(event) => { setStudent((prev) => ({ ...prev, mark: event.target.value })) }}
							/>
							<Form.Check
								type='radio'
								name='semester'
								value='Failed '
								label='Не сдано'
								onClick={(event) => { setStudent((prev) => ({ ...prev, mark: event.target.value })) }}
							/>
						</div>
					</Form>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => intermediateAttestationHandler('cancel')} >
					Отмена
				</Button>
				<Button variant="primary" onClick={() => intermediateAttestationHandler('save')}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
