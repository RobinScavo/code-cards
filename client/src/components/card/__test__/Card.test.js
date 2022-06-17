import { render, screen } from '@testing-library/react';
import  userEvent from  "@testing-library/user-event"
import Card from '../Card';

describe('card renders text and can be edited', () => {
    const card = { question: 'test question', answer: 'test answer'}

    test('renders Card component', () => {
        render(<Card card={card} userLocation='privateDecks'/>)

        const questionText = screen.getByText(/test question/i);
        const answerText  = screen.getByText(/test answer/i);

        expect(questionText).toBeInTheDocument();
        expect(answerText).toBeInTheDocument();
    })

    test('card can be edited', async () => {
        const user = userEvent.setup()

        render(<Card card={card} userLocation='privateDecks'/>)

        const editButton = screen.getByRole('button', {name: /edit card/i});
        await user.click(editButton)

        const  questionInput = screen.getByDisplayValue(/test question/i)
        const  answerInput = screen.getByDisplayValue(/test answer/i)

        expect(questionInput).toBeInTheDocument();
        expect(answerInput).toBeInTheDocument();

        await user.type(questionInput, 'edit test question');
        await user.type(answerInput, 'edit test answer');

        const  editedQuestionInput = screen.getByDisplayValue(/edit test question/i)
        const  editedAnswerInput = screen.getByDisplayValue(/edit test answer/i)

        expect(editedQuestionInput).toBeInTheDocument();
        expect(editedAnswerInput).toBeInTheDocument();

        // TODO test POST request
    })

})
