import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';

export const CourseGroupsCreate = ({show, setShow, course, setCourse, users, createCourseHandler}) => {
	return (
		<Modal className='add' show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Создание группы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Название курса</Form.Label>
						<Form.Control type="name" placeholder="Название" value={course.name} onChange={(event) => setCourse((prev) => ({ ...prev, name: event.target.value }))} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Год начала курса</Form.Label>
						<Form.Control type="year" placeholder="2022" value={course.startYear} onChange={(event) => setCourse((prev) => ({ ...prev, startYear: event.target.value }))} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Общее количество мест</Form.Label>
						<Form.Control type="size" placeholder="100" value={course.maximumStudentsCount} onChange={(event) => setCourse((prev) => ({ ...prev, maximumStudentsCount: event.target.value }))} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Семестр</Form.Label>
						<div className="mb-3">
							<Form.Check
								type='radio'
								name='semester'
								value='Autumn'
								label='Осенний'
								onClick={(event) => { setCourse((prev) => ({ ...prev, semester: event.target.value })) }}
							/>

							<Form.Check
								type='radio'
								name='semester'
								value='Spring'
								label='Весенний'
								onClick={(event) => { setCourse((prev) => ({ ...prev, semester: event.target.value })) }}
							/>
						</div>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Требования</Form.Label>
						{/* <Editor
							editorState={editorState}
							toolbarClassName="toolbarClassName"
							wrapperClassName="wrapperClassName"
							editorClassName="editorClassName"
							onEditorStateChange={setEditorState}
						/> */}
						<Form.Control type="name" placeholder="2022" value={course.requirements} onChange={(event) => setCourse((prev) => ({ ...prev, requirements: event.target.value }))} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Аннотации</Form.Label>
						{/* <Editor
							editorState={editorState}
							toolbarClassName="toolbarClassName"
							wrapperClassName="wrapperClassName"
							editorClassName="editorClassName"
							onEditorStateChange={setEditorState}
						/> */}
						<Form.Control type="name" placeholder="2022" value={course.annotations} onChange={(event) => setCourse((prev) => ({ ...prev, annotations: event.target.value }))} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Основной преподаватель курса</Form.Label>
						<Form.Select aria-label="Default select example" onChange={(event) => setCourse((prev) => ({ ...prev, mainTeacherId: event.target.value }))}>
							<option disabled>Основной преподаватель курса</option>
							{users && users.map((user)=>(
								<React.Fragment  key={user.id} >
								<option value={user.id}>{user.fullName}</option>
								</React.Fragment>
							))}
						</Form.Select>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Отмена
					</Button>
					<Button variant="primary" onClick={createCourseHandler}>
						Сохранить
					</Button>
				</Modal.Footer>
			</Modal>
	);
};
