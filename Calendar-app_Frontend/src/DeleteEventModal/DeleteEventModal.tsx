import React from 'react';

export const DeleteEventModal = ({ eventText, onClose, onDelete, eventId }) => {
    return (
        <>
            <div id="deleteEventModal">
                <h2>Delete Event</h2>
                <p>Are you sure you want to delete "{eventText}"?</p>
                <button
                    onClick={() => {
                        onDelete(eventId); 
                    }}
                    id="deleteButton"
                >
                    Delete
                </button>
                <button onClick={onClose} id="cancelButton">Cancel</button>
            </div>
            <div id="modalBackDrop"></div>
        </>
    );
};

export default DeleteEventModal;
