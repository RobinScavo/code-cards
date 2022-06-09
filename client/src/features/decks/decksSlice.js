import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import decksService from './decksService';

const initialState = {
    decks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getDecks = createAsyncThunk('decks/getAll', async (_, thunkAPI) => {
    try {
        return await decksService.fetchDecks()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const createDeck = createAsyncThunk('decks/create', async (deckData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.createDeck(deckData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDeck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDeck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks.push(action.payload)
            })
            .addCase(createDeck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = decksSlice.actions
export default decksSlice.reducer
