import { configureStore } from '@reduxjs/toolkit'
import currListingTasksTypeReducer from '../Components/Lister/currListingTasksTypeSlice'

export const store = configureStore({
    reducer: {
        currListingTasksType: currListingTasksTypeReducer,
    },
})
