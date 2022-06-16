import { shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../Header';

const MockHeader = () => {
    return (
        <Router>
            <Header />
        </Router>
    )
}

const setUp = () => {
    const component = shallow(<MockHeader />);
    return component;
}

describe('Header Component', () => {
    let component;

    beforeEach(() => {
        component = setUp()
    })

    test('renders Header component without errors', () => {
        const wrapper = component.find('.header-container');
        expect(wrapper.length).toBe(1)
    })

})
