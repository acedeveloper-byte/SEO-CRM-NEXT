import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  apiError: "",
  apiSuccess: "",
  articulosdata :  []
};

const articulosSlice = createSlice({
  name: "articulos",
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

    setsuccessarticulosdata ( state , action) {
      state.articulosdata = action.payload;
      state.loading = false;
    }
  },
});

export const { 
    setApiError, 
    setApiSuccess, setLoading , setsuccessarticulosdata } = articulosSlice.actions;

export default articulosSlice.reducer;
