import { unLogin } from "../Utils/utils";

const token = localStorage.getItem('token');

export const signUpOnCampusCourse = (id) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}

export const editCourseStatus = (id, status) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(status)
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}

export const editStatusStudent = (course, student, status) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${course}/student-status/${student}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "status": status
        })
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}


export const createNotification = (id, text, isImportant) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "text": text,
            "isImportant": true
        })
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}


export const editStudentMark = (campus, student, markType, mark) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${campus}/marks/${student}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "markType": markType,
            "mark": mark
        })
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}

export const editDetailsCourse = (id, requirements, annotations) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "requirements": requirements,
            "annotations": annotations
        })
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}

export const deleteCourse = (id) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => {
        if (data.ok) {
            return data;
        }
        else {
            return data
        }
    });
}