import { unLogin } from "../Utils/utils";

const token = localStorage.getItem('token');

export const getGroups = () => {
    return fetch('https://camp-courses.api.kreosoft.space/groups', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            unLogin()
            return 0

        }
    });
}
export const getGroupsId = (id) => {

    // let url = 'https://camp-courses.api.kreosoft.space/groups/' + id;
    let url = `https://camp-courses.api.kreosoft.space/groups/${id}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            //unLogin()
            return 0
        }
    });
}

export const createGroups = (name) => {
    return fetch('https://camp-courses.api.kreosoft.space/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return data
        }
    });
}

export const deleteGroupsId = (id) => {
    let url = `https://camp-courses.api.kreosoft.space/groups/${id}`;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((data) => {
        if (data.ok) {
            return data;

        }
        else {
            //unLogin()
            return 0
        }
    });
}

export const editGroups = (name, id) => {
    let url = `https://camp-courses.api.kreosoft.space/groups/${id}`;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return 0
        }
    });
}


export const createNewCourse = (id, course) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(course)
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return data
        }
    });
}


export const getCourseDetails = (id) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return 0

        }
    });
}
