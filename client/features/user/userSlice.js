import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {}

export const fetchSingleUser = createAsyncThunk('users/fetchSingleUser', async (id) => {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectUser = (state) => state.user
export default userSlice.reducer
