import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Deck from '../Deck';

let deck;
// const deck = {
//     _id: "62a48da7d4bc59a6a9e4b218",
//     user:"62a3e29355b141644ea07f31",
//     author:"test author",
//     subject:"test subject",
//     title:"test title",
//     likes:6,
//     published:true,
//     cards:[{question:"WE",answer:"WE"},{question0:"22",answer:"22"}],
//     createdAt:{"$date":{"$numberLong":"1654951335406"}},
//     updatedAt:{"$date":{"$numberLong":"1655066831282"}},
//     __v:{"$numberInt":"0"}
// }

const MockDeck = () => {
    return(
        <Router>
            <Deck />
        </Router>
    )
}

describe('Deck renders text and can be edited', () => {
    beforeEach(() => {
       deck =  jest.mock('../../../__mocks__/axios')
    });
    console.log('%%%%%%%', deck)

    test('renders Deck component', () => {
        render(< MockDeck deck={deck}/>)

        const subjectText  = screen.getByText(/test subject/i);
        const titleText  = screen.getByText(/test title/i);
        const authorText = screen.getByText(/test author/i);
        const uploadText = screen.getByText(/uploads: 6/i);

        expect(subjectText).toBeInTheDocument();
        expect(titleText).toBeInTheDocument();
        expect(authorText).toBeInTheDocument();
        expect(uploadText).toBeInTheDocument();
    })

    //TODO test link on test
})
