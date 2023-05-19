import { unLogin } from "../Utils/utils";

const token = localStorage.getItem('token');

export const Login = (user) => {
    return fetch('https://camp-courses.api.kreosoft.space/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return 0
        }
    })
}

export const getProfile = (token) => {
    return fetch('https://camp-courses.api.kreosoft.space/profile', {
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
    })
}

export const editProfile = (token, user) => {
    return fetch('https://camp-courses.api.kreosoft.space/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then((data) => {
        console.log('handlerSubmit data', data)
        if (data.ok) {
            return data.json();
        }
        else {
            return 0
        }
    })
}

export const registration = (user) => {
    return fetch('https://camp-courses.api.kreosoft.space/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return 0
        }
    })
}

export const getUsers = () => {
    let url = 'https://camp-courses.api.kreosoft.space/users';
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

export const getRole = () => {
    let url = 'https://camp-courses.api.kreosoft.space/roles';
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

export const addTeachersRole = (id, userId) => {
    return fetch(`https://camp-courses.api.kreosoft.space/courses/${id}/teachers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "userId": userId
          })
    }).then((data) => {
        if (data.ok) {
            return data.json();
        }
        else {
            return 0
        }
    })
}


export const coursesMy = () => {
    let url = 'https://camp-courses.api.kreosoft.space/courses/my';
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


export const coursesTeaching = () => {
    let url = 'https://camp-courses.api.kreosoft.space/courses/teaching';
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