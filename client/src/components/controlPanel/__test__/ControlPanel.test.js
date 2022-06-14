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

describe("ControlPanel", () => {
    test('renders ControlPanel component', () => {
        render(<MockControlPanel />)
        const cardElement = screen.getByRole('navigation')
        expect(cardElement).toBeInTheDocument();
    })
});
