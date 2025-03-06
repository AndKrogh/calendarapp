import React, { useState } from 'react';

interface newEventProps {
    onSave: (event: { name: string; date: string; }) => void;
    onClose: () => void;
    selectedDate: string;
}

export const NewEventModal = ({ onSave, onClose, selectedDate }: newEventProps) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

const handleSave = () => {
    if (!title) {
        setError(true);
        return;
    }

    const event = {
        name: title,
        date: selectedDate,
    };

    console.log("Event:", event); 

    onSave(event); 

    setTitle('');
    setError(false);
};


    return (
        <>
            <div id="newEventModal">
                <h2>New Event</h2>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="eventTitleInput"
                    placeholder="Event Title"
                />
                <button onClick={handleSave} id="saveButton">
                    Save
                </button>
                <button onClick={onClose} id="cancelButton">Cancel</button>
            </div>
            <div id="modalBackDrop"></div>
        </>
    );
};

export default NewEventModal;
