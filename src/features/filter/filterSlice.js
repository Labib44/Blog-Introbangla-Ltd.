import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: 'all',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleFilters: (state, action) => {
            // if(!state.filters.includes(action.payload)){
            //     state.filters.push(action.payload);
            // }else{
            //     state.filters = state.filters.filter(brand => brand !== action.payload);
            // }
            state.filters = action.payload;
        }
    },
});

export const { toggleFilters } = filterSlice.actions;

export default filterSlice.reducer;