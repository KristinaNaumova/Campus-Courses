import { createSlice } from '@reduxjs/toolkit';
import { createGroups, deleteGroupsId, editGroups, getGroups } from '../../../API/api';
import swal from 'sweetalert';

const initialState = {
  groups: [],
  isLoading: false,
  error: null,
};

const coursesGroupsSlice = createSlice({
  name: 'coursesGroups',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setAddGroup: (state, action) => {
      state.groups = [...state.groups, action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDeleteGroup: (state, action) => {
      state.groups = state.groups.filter((el) => el.id !== action.payload);
    },
    setEditGroup: (state, action) => {

// console.log('setEditGroup temp ', temp, state.groups, action.payload);
      state.groups = state.groups.map(item=> {
        if(item.id === action.payload.id){
          item.name = action.payload.name
        }
        return item
      });
    },
  },
});

export const { setLoading, setGroups, setAddGroup, setError, setDeleteGroup, setEditGroup} = coursesGroupsSlice.actions;

export const fetchGroups = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const groups = await getGroups();
    //
    dispatch(setGroups(groups));
    // dispatch(setAddGroup(newGroup));
  } catch (error) {

    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
export const addGroup = async (dispatch, name) => {
  //  const dispatch  = useDispatch()
  // console.log('fetchGroups', dispatch);
  dispatch(setLoading(true));
  try {
    const data = await createGroups({ name });
    if (data.ok === false) {
      swal("Создание группы ", `Ошибка "${data.statusText}" `, "error");
    } else {
      swal("Создание группы ", `Группа "${name}" успешно создана!`, "success");
      // setGroupsName(prev => [...prev, data])
      // dispatch(setGroups([...groupsName, data]));
    }
    //
    // dispatch(setGroups(groups));
    dispatch(setAddGroup(data));
  } catch (error) {
    
    dispatch(setError(error.message));
    // swal("Создание группы ", `Ошибка "${data.statusText}" `, "error");
  } finally {
    dispatch(setLoading(false));
  }
};
export const deleteGroups = async (dispatch, id) => {
  //  const dispatch  = useDispatch()
  //console.log('fetchGroups', dispatch);
  dispatch(setLoading(true));
  try {
    const groups = await deleteGroupsId(id);
    dispatch(setDeleteGroup(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
export const editGroup = async (dispatch, id, name) => {
  //  const dispatch  = useDispatch()
  //console.log('fetchGroups', dispatch);
  dispatch(setLoading(true));
  try {
    const groups = await editGroups({ name }, id);
    dispatch(setEditGroup(groups));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectGroups = (state) => state.coursesGroups.groups;
export const selectIsLoading = (state) => state.coursesGroups.isLoading;
export const selectError = (state) => state.coursesGroups.error;

export default coursesGroupsSlice.reducer;
