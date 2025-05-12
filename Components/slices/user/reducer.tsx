import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  apiError: "",
  apiSuccess: "",
  inSideUserdata :  []
};

const inSideUserSlice = createSlice({
  name: "inSideUser",
  initialState,
  reducers: {
    setApiError(state, action) {
      state.apiError = action.payload;
      state.loading = false;
    },
    setApiSuccess(state, action) {
      state.apiSuccess = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setsuccessinSideUserdata ( state , action) {
      state.inSideUserdata = action.payload;
      state.loading = false;
    }
  },
});

export const { 
    setApiError, 
    setApiSuccess, setLoading , setsuccessinSideUserdata } = inSideUserSlice.actions;

export default inSideUserSlice.reducer;


