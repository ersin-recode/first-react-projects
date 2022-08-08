import { createSlice } from '@reduxjs/toolkit'

//!all,  activeTasks, completedTasks
export const currListingTasksTypeSlice = createSlice({
    name: 'currListingTasksType',
    initialState: {
        type: {
            value: 'allTasks',
            force: true
        }
    },
    reducers: {
        setCurrListingTasksType: (state, newState) => {
            state.type = {
                value: newState.payload.value,
                force: newState.payload.force ? !state.type.force : state.type.force
            };
        }
    },
})

export const { setCurrListingTasksType } = currListingTasksTypeSlice.actions

export default currListingTasksTypeSlice.reducer