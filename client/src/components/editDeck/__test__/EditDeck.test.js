import { render, screen } from '../../../../tools/test-utils';
import  userEvent from  "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom'
import EditDeck from '../EditDeck';
import { mockDeck } from '../../../../tools/utils';


describe('create deck page', () => {

    test('renders EditDeck component', () => {
        render(<Router><EditDeck deck={mockDeck} /></Router>)

        expect(screen.getByTestId('edit-author')).toBeInTheDocument();
        expect(screen.getByTestId('edit-title')).toBeInTheDocument();
        expect(screen.getByTestId('edit-subject')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /next/i})).toBeInTheDocument();
        expect(screen.getByDisplayValue(/test question/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/test answer/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /cancel/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /add card/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /save changes/i})).toBeInTheDocument();
    })

    test('next/previous buttons should change card, card index display text and buttons', async () => {
        const user = userEvent.setup()
        render(<Router><EditDeck deck={mockDeck} /></Router>)

        expect(screen.getByText(/card 1/i)).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: /next/i}));

        expect(screen.getByDisplayValue(/second test question/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/second test answer/i)).toBeInTheDocument();
        expect(screen.getByText(/card 2/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /previous/i})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /next/i})).toBeNull();

        await user.click(screen.getByRole('button', {name: /previous/i}));

        expect(screen.getByDisplayValue(/test question/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/test answer/i)).toBeInTheDocument();
        expect(screen.getByText(/card 1/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /next/i})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /previous/i})).toBeNull();
    })

    test('EditDeck can be edited', async () => {
        const user = userEvent.setup()

        render(<Router><EditDeck deck={mockDeck} /></Router>)

        const  authorInput = screen.getByTestId('edit-author')
        const  titleInput = screen.getByTestId('edit-title')
        const  subjectInput = screen.getByTestId('edit-subject')
        const  questionInput = screen.getByDisplayValue(/test question/i)
        const  answerInput = screen.getByDisplayValue(/test question/i)

        await user.type(authorInput, 'edit test author');
        await user.type(titleInput, 'edit test title');
        await user.selectOptions(subjectInput, 'React');
        await user.type(questionInput, 'edit test question');
        await user.type(answerInput, 'edit test answer');

        expect(screen.getByDisplayValue(/edit test author/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/edit test title/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/react/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/edit test question/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/edit test answer/i)).toBeInTheDocument();
    })

    test('add/remove buttons should change inputs and card index display', async () => {
        const user = userEvent.setup()

        render(<Router><EditDeck deck={mockDeck} /></Router>)

        await user.click(screen.getByRole('button', {name: /add card/i}));

        expect(screen.getByTestId('edit-question')).toHaveTextContent('');
        expect(screen.getByTestId('edit-answer')).toHaveTextContent('');
        expect(screen.getByText(/card 3/i)).toBeInTheDocument();
    })

    // test('add card button should clear question and answer inputs', async () => {
    //     const user = userEvent.setup()

    //     render(<Router><EditDeck/></Router>)

    //     const  questionInput = screen.getByTestId('question-input')
    //     const  answerInput = screen.getByTestId('answer-input')

    //     await user.type(questionInput, 'created test question');
    //     await user.type(answerInput, 'created test answer');

    //     user.click(screen.getByTestId('add-card-button'));

    //     expect(questionInput).toHaveTextContent('');
    //     expect(answerInput).toHaveTextContent('');
    // })

})
