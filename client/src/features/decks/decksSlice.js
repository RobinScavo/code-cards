import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import decksService from './decksService';

const initialState = {
    decks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getPublicDecks = createAsyncThunk('decks/getPublicDecks', async (_, thunkAPI) => {
    try {
        const allDecks = await decksService.getPublicDecks()
        const publicDecks = allDecks.filter(deck => deck.published)
        return publicDecks
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getPublicDeck = createAsyncThunk('decks/getPublicDeck', async (id, thunkAPI) => {
    try {
        return await decksService.getPublicDeck(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// Protected routes
export const getPrivateDecks = createAsyncThunk('decks/getPrivateDecks', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.getPrivateDecks(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getPrivateDeck = createAsyncThunk('decks/getPrivateDeck', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.getPrivateDeck(id, token)
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
        return await decksService.deleteDeck(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const editDeck = createAsyncThunk('decks/edit', async (newDeck, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.editDeck(newDeck, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// export const incrementUpload = createAsyncThunk('decks/increment', async (newDeck, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await decksService.incrementUpload(newDeck, token)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const publishDeck = createAsyncThunk('decks/publish', async (newDeck, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token
        return await decksService.editDeck(newDeck, token)
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
            // GET PUBLIC DECKS
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

            // GET PRIVATE DECKS
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

            // GET PRIVATE DECK
            .addCase(getPrivateDeck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPrivateDeck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks = action.payload
            })
            .addCase(getPrivateDeck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // GET Public DECK
            .addCase(getPublicDeck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPublicDeck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.decks = action.payload
            })
            .addCase(getPublicDeck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // CREATE DECK
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

            // DELETE DECK
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

            // EDIT DECK
            .addCase(editDeck.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editDeck.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.decks.push(action.payload)
            })
            .addCase(editDeck.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // INCREMENT UPLOAD
            // .addCase(incrementUpload.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(incrementUpload.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            // })
            // .addCase(incrementUpload.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
    }
})

export const { reset } = decksSlice.actions
export default decksSlice.reducer
