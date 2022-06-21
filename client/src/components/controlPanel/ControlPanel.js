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
    user,
    decks,
    handleDelete,
    handleEdit,
    handlePublish,
    handleUpload
}) => {

    return (
        <div className="control-panel" data-test='control-panel'>
            {/* HOME */}
            {showHomeButton  &&
                <Link
                    className='btn control-button'
                    to='/decks'
                    data-test='home-button'
                >Home</Link>
            }

            {/* CREATE DECK */}
            {showCreateButton &&
                <Link
                    className='btn control-button'
                    to='/createDeck'
                    data-test='create-button'
                >Create Deck</Link>
            }

            {/* DELETE DECK */}
            {showDeleteButton &&
                <button
                    className='btn control-button'
                    onClick={handleDelete}
                    data-test='delete-button'
                >Delete Deck</button>
            }

            {/* EDIT DECK */}
            {showEditButton  &&
                <button
                    className="btn control-button"
                    onClick={handleEdit}
                    data-test='edit-button'
                >Edit Deck</button>
            }

            {/* PRIVATE DECKS */}
            {user && showYourDecksButton &&
                <Link
                    className='btn control-button'
                    to='/decks/privateDecks'
                    data-test='your-decks-button'
                >Your Decks</Link>
            }

            {/* PUBLISH */}
            {decks && !decks.published && showPublishButton &&
                <button
                    className="btn control-button"
                    onClick={handlePublish}
                    data-test='publish-button'
                >Publish</button>
            }

            {/* UPLOAD DECK */}
            {showUploadButton &&
                <button
                    className="btn control-button"
                    onClick={handleUpload}
                    data-test='upload-button'
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
