import React from "react";
import { shallow } from 'enzyme';
import Deck from '../Deck';
import { mockDeck } from "../../../../tools/utils";
import { findByTestAtrr } from "../../../../tools/utils";

const setUp = (props={}) => {
    const component = shallow(<Deck {...props} />);
    return component;
}

describe('Private Deck Component', () => {
    describe('Have correct props: Private', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                deck: {
                    subject: mockDeck.subject,
                    title: mockDeck.title,
                    author: mockDeck.author,
                    likes: mockDeck.likes
                },
                userLocation: 'privateDecks'
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const deck = wrapper.find('.deck');
            expect(deck.length).toBe(1)
        })

        test('Should render a subject', () => {
            const subjectText = findByTestAtrr(wrapper, 'subjectText')
            expect(subjectText.length).toBe(1);
        })

        test('Should render a title', () => {
            const titleText = findByTestAtrr(wrapper, 'titleText')
            expect(titleText.length).toBe(1);
        })

        test('Should render a author', () => {
            const authorText = findByTestAtrr(wrapper, 'authorText')
            expect(authorText.length).toBe(1);
        })

        test('Should render uploads', () => {
            const uploadText = findByTestAtrr(wrapper, 'uploadText')
            expect(uploadText.length).toBe(1);
        })

        test('Should NOT render "published" prop for private deck', () => {
            const publishedText = findByTestAtrr(wrapper, 'publishedText')
            expect(publishedText.length).toBe(0);
        })
    })
})

describe('Public Deck Component', () => {
    describe('Have correct props: Public', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                deck: {
                    subject: mockDeck.subject,
                    title: mockDeck.title,
                    author: mockDeck.author,
                    likes: mockDeck.likes
                },
                userLocation: ''
            }
            wrapper = setUp(props)
        });

        test('Should render without errors', () => {
            const deck = wrapper.find('.deck');
            expect(deck.length).toBe(1)
        })

        test('Should render "published" prop for private deck', () => {
            const publishedText = findByTestAtrr(wrapper, 'publishedText')
            expect(publishedText.length).toBe(1);
        })
    })
})
