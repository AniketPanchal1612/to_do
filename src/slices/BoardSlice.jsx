import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data";


const boardSlice  = createSlice({
    name: 'boards',
    initialState: data,
    reducers:{
        addBoard:(state,action)=>{
            // console.log(action)
            state.push(action.payload)
        },

        deleteBoard:(state,action)=>{
            const {id} = action.payload;
            const dbid = state.find(board=>board.id===id);
            if(dbid){
                return state.filter((find)=>find.id !==id)
            }
        },
        updateBoard:(state,action)=>{
            const {id,boardName,boardColor} = action.payload;
            const finder = state.find(board=>board.id===id);
            if(finder){
                finder.boardName = boardName
                finder.boardColor = boardColor
            }
        }
    }
})

export const {addBoard,deleteBoard,updateBoard} = boardSlice.actions;
export default boardSlice.reducer;