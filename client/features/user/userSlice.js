import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {}

export const fetchSingleUser = createAsyncThunk('users/fetchSingleUser', async (id) => {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
})

export const editUser = createAsyncThunk('users/editUser', async (editedUser) => {
    const { id, username, email, address } = editedUser
    const { data } = await axios.put(`/api/users/${id}/edit`, {
        username,
        email,
        address
    })
    return data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            return action.payload
        }),
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.user = action.payload
            return state
        })
    }
})

export const selectUser = (state) => state.user
export default userSlice.reducer