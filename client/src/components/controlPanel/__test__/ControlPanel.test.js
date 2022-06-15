import { render, screen } from '@testing-library/react';
import ControlPanel from '../ControlPanel';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

const MockControlPanel = () => {
    return (
        <Provider store={store}>
            <Router>
                <ControlPanel />
            </Router>
        </Provider>
    )
}

describe("control panel operation", () => {
    test('renders login button when no user', () => {
        render(<MockControlPanel user={null}/>)

        const logInButton = screen.getByRole('link', /log in/i)
        expect(logInButton).toBeInTheDocument();
    })
});
