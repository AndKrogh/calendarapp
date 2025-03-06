import React from 'react';

interface Dayprops {
    day: {
        value: string;
        isCurrentDay?: boolean;
        event?: { name: string };
    }
    onClick: () => void;
}

export const Day = ({ day, onClick }: Dayprops) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    return (
        <div onClick={onClick} className={className}>
            {day.value !== 'padding' && day.value}
            {day.event && <div className="event">{day.event.name}</div>}
        </div>
    );
};