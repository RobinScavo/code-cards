import { render, screen } from '@testing-library/react';
import  userEvent from  "@testing-library/user-event"
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

import EditModal from '../EditModal';

const MockEditModal = () => {
    const deck = {
        "_id":{"$oid":"62a48da7d4bc59a6a9e4b218"},
        "user":{"$oid":"62a3e29355b141644ea07f31"},
        "author":"third",
        "subject":"Javascript",
        "title":"WE",
        "likes":{"$numberInt":"6"},
        "published":true,
        "cards":[{"question":"WE","answer":"WE"},
        {"question":"22","answer":"22"}],
        "createdAt":{"$date":{"$numberLong":"1654951335406"}},
        "updatedAt":{"$date":{"$numberLong":"1655066831282"}},
        "__v":{"$numberInt":"0"}
    }

    return (
        <Provider store={store}>
            <Router>
                <EditModal deck={deck}/>
            </Router>
        </Provider>
    )
}

describe("EditModal", () => {
    test('renders Cancel button', () => {
        render(<MockEditModal />)
        const cancelButton = screen.getByRole('button', {name: /cancel/i});
        expect(cancelButton).toBeInTheDocument();
    })

    test('renders author input', () => {
        render(<MockEditModal />)
        const authorInput = screen.getByRole('textbox', {name: /author/i});
        expect(authorInput).toBeInTheDocument();
    })

    test('user can type in author input', () => {
        render(<MockEditModal />)
        userEvent.type(screen.getByRole('textbox', {name: /author/i}), 'BOB')
    })
});
