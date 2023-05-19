import './App.css';
import { Registration } from './Pages/Registration/Registration';
import { Auth } from './Pages/Auth/Auth';
import { Profile } from './Pages/Profile/Profile';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartPage } from './Pages/StartPage/StartPage';
import { CoursesGroups } from './Pages/Groups/CoursesGroups/CoursesGroups';
import { CourseGroups } from './Pages/Groups/CourseGroups/CourseGroups';
import { DetailsAboutGroup } from './Pages/DetailsAboutCourse/DetailsAboutGroup/DetailsAboutGroup';
import { coursesMy, coursesTeaching, getRole, getUsers } from './API/user';
import { MyCourses } from './Pages/MyCourses/MyCourses/MyCourses';
import { TeachingCourses } from './Pages/TeachingCourses/TeachingCourses/TeachingCourses';
import { fetchCoursesMy } from './AppSlice';
import { useSelector, useDispatch } from 'react-redux'; 



function App() {
  const dispatch = useDispatch(); 
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [groupsName, setGroupsName] = useState([])
  const [users, setUsers] = useState([])
  const [userRole, setUserRole] = useState({})
  const [myCourses, setMyCourses] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    if (token?.length > 3) {
      setToken(token);
    }
    if (email?.length > 3) {
      setEmail(email);
    }
  }, [])


  useEffect(() => {
    if (token) {
      const getUserFunc = () => {
        getUsers().then((data => {
          if (data !== 0) {
            setUsers(data)
          }
        }))
      }

      getRole().then((data => {
        if (data !== 0) {
          setUserRole(data)
          if (data.isAdmin || data.isTeacher) {
            getUserFunc()
          }
        }
      }))
      fetchCoursesMy(dispatch);
      // coursesMy().then((data => {
      //   if (data !== 0) {
      //     setMyCourses(data)
      //   }
      // }))
      coursesTeaching().then((data => {
        if (data !== 0) {
          setMyCourses(data)
        }
      }))
    }
  }, [token])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<StartPage token={token} setToken={setToken} email={email} />} />
          <Route exact path="/profile" element={<Profile token={token} setToken={setToken} email={email} />} />
          <Route exact path="/login" element={<Auth token={token} setToken={setToken} email={email} />} />
          <Route exact path="/registration" element={<Registration token={token} setToken={setToken} email={email} />} />
          <Route exact path="/groups" element={<CoursesGroups token={token} setToken={setToken} userRole={userRole} email={email} groupsName={groupsName} setGroupsName={setGroupsName} />} />
          <Route exact path="/groups/:id" element={<CourseGroups token={token} setToken={setToken} email={email} userRole={userRole} groupsName={groupsName} setGroupsName={setGroupsName} users={users} />} />
          <Route exact path="/courses/:id" element={<DetailsAboutGroup token={token} setToken={setToken} email={email} userRole={userRole} myCourses={myCourses} users={users}/>} />
          <Route exact path="/my/" element={<MyCourses token={token} setToken={setToken} email={email} userRole={userRole} users={users}/>} />
          <Route exact path="/teaching/" element={<TeachingCourses token={token} setToken={setToken} email={email} userRole={userRole} myCourses={myCourses} users={users}/>} />

          {/* <Route exact path="*" element={<Page404 />} /> */}


        </Routes>
      </BrowserRouter>


      {/* 
      <Auth /> */}
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
