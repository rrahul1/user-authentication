import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   users: [],
   status: "idle",
   error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
   const response = await axios.get("http://localhost:5000/api/user/get-user");
   return response.data;
});

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUsers.pending, (state) => {
            state.status = "loading";
         })
         .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.users = action.payload;
         })
         .addCase(fetchUsers.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default userSlice.reducer;
