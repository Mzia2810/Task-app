import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserVisit = createAsyncThunk ('visit/fetchVisits',async(_,thunkAPI) =>{
    const postdata = {practice_id:'17'} ;
    const response = await fetch('https://api.maxremind.technology/api/v1/mxchvisit/visitlist',{
        method:'post',
        headers:{
            'content-type':'application/json',
             'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMjQ3MDMxLCJpYXQiOjE3MjEyMTgyMzEsImp0aSI6ImNkMDRjMDUyZGZjODQ3YjU5NmIwM2I2MDBkNDkzOTQ0IiwidXNlcl9pZCI6MTYxfQ.J_FB4xV2HJ9Lxxna6H0RlFe56ZmyQjlt8RsL3Gj8u5M"
        },
        body: JSON.stringify(postdata)
    })
    const data = await response.json();
    return data.map(item => ({...item}))
})


const visitSlice = createSlice({
    name :'visit',
    initialState:{
        data:[],
        status:'idle',
        error :null,
    },
    reducer:{},
    extraReducers : (builder) =>{
        builder.addCase(fetchUserVisit.pending, state =>{
            state.status = 'loading';
        })
        .addCase(fetchUserVisit.fulfilled, (state,action) => {
            state.status = 'succeed';
            state.data = action.payload;
        })
        .addCase(fetchUserVisit.rejected,(state,action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export  const userVisitData = state => state.visit.data;
export const userStatus = state => state.visit.status;
export const userError = state => state.visit.error;
// export const fetchedData = {fetchUserVisit}
export default visitSlice.reducer