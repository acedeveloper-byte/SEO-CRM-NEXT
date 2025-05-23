import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  apiError: "",
  apiSuccess: "",
  blogdata :  []
};

const blogSlice = createSlice({
  name: "blog",
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

    setsuccessblogdata ( state , action) {
      state.blogdata = action.payload;
      state.loading = false;
    }
  },
});

export const { 
    setApiError, 
    setApiSuccess, setLoading , setsuccessblogdata } = blogSlice.actions;

export default blogSlice.reducer;
