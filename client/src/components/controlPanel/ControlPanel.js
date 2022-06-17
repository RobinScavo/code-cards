import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './controlPanel.scss';

const ControlPanel = ({
    showHomeButton,
    showCreateButton,
    showEditButton,
    showUploadButton,
    showYourDecksButton,
    showDeleteButton,
    showPublishButton,
    handleDelete,
    handleEdit,
    handlePublish,
    handleUpload
}) => {

    return (
        <div className="control-panel" role='navigation'>
            {/* HOME */}
            {showHomeButton  &&
                <Link
                    className='btn control-button'
                    to='/decks'
                >Home</Link>
            }

            {/* CREATE DECK */}
            {showCreateButton &&
                <Link
                    className='btn control-button'
                    to='/createDeck'
                >Create Deck</Link>
            }

            {/* DELETE DECK */}
            {showDeleteButton &&
                <button
                    className='btn control-button'
                    onClick={handleDelete}
                >Delete Deck</button>
            }

            {/* EDIT DECK */}
            {showEditButton  &&
                <button
                    className='btn control-button'
                    onClick={handleEdit}
                >Edit Deck</button>
            }

            {/* PRIVATE DECKS */}
            {showYourDecksButton &&
                <Link
                    className='btn control-button'
                    to='/decks/privateDecks'
                >Your Decks</Link>
            }

            {/* PUBLISH */}
            {showPublishButton &&
                <button
                    className="btn control-button"
                    onClick={handlePublish}
                >Publish</button>
            }

            {/* UPLOAD DECK */}
            {showUploadButton &&
                <button
                    className="btn control-button"
                    onClick={handleUpload}
                >Upload</button>
            }

        </div>
     );
}

ControlPanel.propTypes = {
    showHomeButton: PropTypes.bool,
    showCreateButton: PropTypes.bool,
    showEditButton: PropTypes.bool,
    showUploadButton: PropTypes.bool,
    showYourDecksButton: PropTypes.bool,
    showDeleteButton: PropTypes.bool,
    showPublishButton: PropTypes.bool,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    handlePublish: PropTypes.func,
    handleUpload: PropTypes.func
}

export default ControlPanel;
