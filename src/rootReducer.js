import { combineReducers } from '@reduxjs/toolkit';
import coursesGroupsReducer from './Pages/Groups/CoursesGroups/CoursesGroupsSlice';
import appSliceReducer from './AppSlice'

const rootReducer = combineReducers({
  coursesGroups: coursesGroupsReducer,
  appSlice: appSliceReducer,
});

export default rootReducer;