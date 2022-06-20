import { rest } from 'msw';
import { mockDeck, secondMockDeck, thirdMockDeck} from '../../tools/utils'

export const handlers = [
    rest.get('http://localhost:8080/decks/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([ mockDeck, secondMockDeck, thirdMockDeck ])
        )
    }),
    // rest.post('http://localhost:8080/decks/', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({mockDeck})
    //     )
    // })
]
