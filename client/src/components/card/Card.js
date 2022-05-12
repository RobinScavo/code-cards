import  React  from 'react';

import './card.css'

const Card = ({ card }) => {
    return (
        <div className="card">
            <h1>{card.question}</h1>
            <h1>{card.answer}</h1>
        </div>
     );
}

export default Card;
