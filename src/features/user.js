import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      allUsers: [],
      currentUser: null,
    },
  },
  reducers: {
    addUser: ({ value }, { payload }) => {
      const user = {
        email: payload.email,
        password: payload.passOne,
        role: payload.role,
        image:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      };
      value.allUsers.push(user);
    },
    deleteUser: ({ value }, { payload }) => {
      value.allUsers = value.allUsers.filter((user) => user.email !== payload);
    },
    setCurrentUser: ({ value }, { payload }) => {
      value.currentUser = payload;
    },
    updatePhoto: ({ value }, { payload }) => {
      const { index, current } = payload;
      value.allUsers[index] = current;
      value.currentUser = current;
    },
    updatePassword: ({ value }, { payload }) => {
      const { index, current } = payload;
      value.allUsers[index] = current;
      value.currentUser = current;
    },
  },
});

export const {
  addUser,
  deleteUser,
  setCurrentUser,
  updatePhoto,
  updatePassword,
} = userSlice.actions;
export default userSlice.reducer;
