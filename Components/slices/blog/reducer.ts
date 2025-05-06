import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  apiError: "",
  apiSuccess: "",
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
    }
  },
});

export const { 
    setApiError, 
    setApiSuccess, setLoading } = blogSlice.actions;

export default blogSlice.reducer;
