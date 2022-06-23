import React from 'react';

import './footer.scss';

const Footer = () => {
    return (
        <div className='footer'>
            <p className='footer-text'>~ Created by <a
                className='footer-link'
                href='https://robinscavo.github.io/portfolioSite/'
                target='blank'
            >Robin Scavo</a> ~</p>

            <p className="footer-text">View source code <a
                href='https://github.com/RobinScavo/OpenBook'
                className='footer-link'
                target='blank'
            >here</a></p>
        </div>
     );
}

export default Footer;
