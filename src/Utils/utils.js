export const unLogin = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    window.location.href = '/'
}

export const getId = (path) => {
    // let url = path;
    // console.log('path', path)
    if (path !== undefined){
        return path.split('/')[2]
    }
}
