import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import decksService from './decksService';

const initialState = {
    decks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getPublicDecks = createAsyncThunk('decks/getAllPublic', async (_, thunkAPI) => {
    try {
        return await decksService.getPublicDecks()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// Protected routes
export const getPrivateDecks = createAsyncThunk('decks/getAllPrivate', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.getPrivateDecks(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const createDeck = createAsyncThunk('decks/create', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.createDeck(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteDeck = createAsyncThunk('decks/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.createDeck(id, token)
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
            .addCase(getPublicDecks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPublicDecks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks = action.payload
            })
            .addCase(getPublicDecks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPrivateDecks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPrivateDecks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks = action.payload
            })
            .addCase(getPrivateDecks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
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
            .addCase(deleteDeck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDeck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks = state.decks.filter((deck) => deck._id !== action.payload.id)
            })
            .addCase(deleteDeck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = decksSlice.actions
export default decksSlice.reducer
