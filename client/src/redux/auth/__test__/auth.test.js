import configureStore from 'redux-mock-store';
// import { login, logout, register } from '../authService';
import MockAdapter from 'axios-mock-adapter';

import { initialState, login } from '../../auth/authSlice';

const userData = {
    name: 'first',
    password: 'first'
}

describe('auth slice', () => {
    test('should initially set state to null user, false actions and empty string', () => {
        const mockStore = configureStore([]);
        const store = mockStore(initialState);
        const state = store.getState();


        expect(state.user).toEqual(null);
        expect(state.isError).toEqual(false);
        expect(state.isSuccess).toEqual(false);
        expect(state.isLoading).toEqual(false);
        expect(state.message).toEqual('');
    });

    test('should update state upon successful login', async () => {
        // const mockStore = configureStore([]);
        // const store = mockStore(initialState);

        // store.dispatch(login(userData))
        // const state = store.getState();

        // console.log(state)
    })
})
