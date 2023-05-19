import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';

export const AddTeacherModal = ({show, addTeacherHandler, setTeacher, users}) => {
	return (
		<Modal className='add' show={show.addTeacher} onHide={() => addTeacherHandler('cancel')}>
			<Modal.Header closeButton>
				<Modal.Title>Добавление преподавателя на курс</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Label>Выберите преподавателя</Form.Label>
					<Form.Select onChange={(event) => setTeacher(event.target.value)}>
						<option disabled>Основной преподаватель курса</option>
						{users && users.map((user) => (
							<React.Fragment key={user.id} >
								<option value={user.id}>{user.fullName}</option>
							</React.Fragment>
						))}
					</Form.Select>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => addTeacherHandler('cancel')}>
					Отмена
				</Button>
				<Button variant="primary" onClick={() => addTeacherHandler('save')}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
