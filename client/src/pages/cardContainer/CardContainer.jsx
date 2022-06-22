import  React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    getPublicDeck,
    getPrivateDeck,
    editDeck,
    createDeck,
    deleteDeck,
    reset
} from '../../redux/decks/decksSlice';

import Card from '../../components/card/Card';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import Spinner from '../../components/spinner/Spinner';
import EditDeck from '../../components/editDeck/EditDeck'

import './cardContainer.scss';

const DeckDetails = ({
    showHomeButton,
    showCreateButton,
    showEditButton,
    showUploadButton,
    showYourDecksButton,
    showDeleteButton,
    showPublishButton
}) => {

    const [editDeckVisible, setEditDeckVisible] =  useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const deckID = useParams().id;

    const {user} = useSelector((state) => state.auth);
    const userLocation = location.pathname.split('/')[2];

    const {decks, isLoading, isError, message} = useSelector((state) => state.decks);

    useEffect(() => {
        if (isError) {
            toast.error('Deck retrieval failed.');
        }

        // if (!user) {
        //     navigate('/login');
        // }

        if (userLocation !== 'privateDecks') {
          dispatch(getPublicDeck(deckID));
        } else if (userLocation === 'privateDecks') {
          dispatch(getPrivateDeck(deckID));
        }

        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch, userLocation]);

    const handleDelete = () => {
        dispatch(deleteDeck(deckID));
        navigate('/decks/privateDecks')
      }

      const handleEdit = () => {
        setEditDeckVisible(true)
      }

      const handleUpload = () => {
        const uploadsPojo = {id: deckID, data: {likes: decks.likes + 1}};

        const myCopy = {...decks};
        delete myCopy._id;
        myCopy.likes = 0;
        myCopy.published = false;
        myCopy.user = user;

        navigate('/decks');
        try {
            dispatch(editDeck(uploadsPojo));
            dispatch(reset());

            dispatch(createDeck(myCopy));
            dispatch(reset());

            toast.success('This deck now exists in your library!');
        } catch {
            toast.error('Upload failed.');
        }
      }

      const handlePublish = () => {
        const pojo = { id: decks._id, data: {published: true}}

        try {
            navigate('/decks/privateDecks')
            dispatch(editDeck(pojo))
            dispatch(reset())
            toast.success('This deck has been published!')
        } catch {
            toast.error('Publishing failed.')
        }
      }

      const toggleEditDeck = () => setEditDeckVisible(!editDeckVisible);


    const handleQuickEdit = ({ editQuestionValue, editAnswerValue, index }) => {
        const newCard = {'question': editQuestionValue, 'answer': editAnswerValue};
        const newCards = [...decks.cards];
        newCards.splice(index, 1, newCard);
        const pojo = {id: deckID, data: {cards: newCards}};

        dispatch(editDeck(pojo));
        dispatch(reset());

        window.location.reload();

        //TODO dispatch on window location change
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="deck-detail">

            <ControlPanel
                showHomeButton={showHomeButton}
                showCreateButton={showCreateButton}
                showEditButton={showEditButton}
                showUploadButton={showUploadButton}
                showYourDecksButton={showYourDecksButton}
                showDeleteButton={showDeleteButton}
                showPublishButton={showPublishButton}
                user={user}
                decks={decks}
                handleDelete={handleDelete}
                toggleEditDeck={toggleEditDeck}
                handleUpload={handleUpload}
                handlePublish={handlePublish}
                handleEdit={handleEdit}
            />

            {editDeckVisible &&
                <EditDeck
                    toggleEditDeck={toggleEditDeck}
                    deck={decks}
                />
            }

            {!editDeckVisible &&
                <div className="card-container">
                    <section className='deck-container-heading'>
                        {user && <p className='deck-container-title'
                            >Private Library</p>
                        }

                        {!user && <p className='deck-container-title'
                            >Public Library</p>
                        }
                    </section>

                    {decks.cards && decks.cards.map((card, index) => (
                        <Card
                            index={index}
                            key={`${decks._id}index${index}`}
                            card={card}
                            userLocation={userLocation}
                            handleQuickEdit={handleQuickEdit}
                        />
                    ))}
                </div>
            }
        </div>
     );
}

export default DeckDetails;
