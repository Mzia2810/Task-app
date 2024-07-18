import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk('user/fetchUser',async (userId,thunkAPI) =>{
    const response = await fetch('https://api.example.com/user/${userId}')
    return response.json()
})

const userSlice = createSlice({
    name : 'user',
    initialState:{
        user:'null',
        status:'idle',
        error:null,
        reducer:{

        },
        extraReducer: (builder) => {
            builder.addCase(fetchUser.pending,(state) =>{
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled,(state,action) =>{
                state.status= 'succeed';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected,(state ,action) =>{
                state.status = 'failed';
                state.error= action.error.message;
            })
        }
    }
})

export default userSlice.reducer