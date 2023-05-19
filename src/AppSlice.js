import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { coursesMy } from './API/user';

const initialState = {
  coursesMy: [],
  isLoading: false,
  error: null,
};

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCoursesMy: (state, action) => {
      state.coursesMy = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setCoursesMy, setError} = AppSlice.actions;

export const fetchCoursesMy= async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await coursesMy();
    //
    dispatch(setCoursesMy(data));
    // dispatch(setAddGroup(newGroup));
  } catch (error) {

    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export const selectCoursesMy = (state) => state.appSlice.coursesMy;
export const selectIsLoading = (state) => state.appSlice.isLoading;
export const selectError = (state) => state.appSlice.error;

export default AppSlice.reducer;
