import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  apiError: "",
  apiSuccess: "",
  sitesdata :  []
};

const sitesSlice = createSlice({
  name: "sites",
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

    setsuccesssitesdata ( state , action) {
      state.sitesdata = action.payload;
      state.loading = false;
    }
  },
});

export const { 
    setApiError, 
    setApiSuccess, setLoading , setsuccesssitesdata } = sitesSlice.actions;

export default sitesSlice.reducer;
