// import { shallow } from 'enzyme'

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore  from 'redux-mock-store';
// import { store } from '../../../app/store';
import { login, initialState } from '../../../redux/auth/authSlice';

import Header from '../Header';

const MockHeader = () => {
    const mockStore = configureStore([]);
    const store = mockStore(initialState);
    console.log(store.getState().user)
    // const state = store.getState();

    return (
        <Provider store={store}>
            <Router>
                <Header />
            </Router>
        </Provider>
    )
}

describe('Header Component', () => {
    // beforeEach(() => {});


    test('renders Header component without errors', () => {

        // render(<MockHeader />)

        // const headerComponent = screen.getByTestId('header-container');
        // expect(headerComponent ).toBeInTheDocument();
    })

})
