import { createSlice } from "@reduxjs/toolkit";


const likeSlice = createSlice({
    name:'likes',
    initialState:[],
    reducers:{
        toggleLike:(state,action)=>{
            const postId = action.payload;
            if(state.includes(postId)){
                return state.filter(id => id !==postId)
            }
            else{
                state.push(postId)
            }
        }
    }

})


export const {toggleLike} = likeSlice.actions
export default likeSlice.reducer