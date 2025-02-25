import React from 'react';

interface CalendarHeaderProps {
    onBack: () => void;
    onNext: () => void;
    dateDisplay: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onNext, onBack, dateDisplay }) => {
  return (
    <div id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={onBack} id="backButton">Back</button>
        <button onClick={onNext} id="nextButton">Next</button>
      </div>
    </div>
  );
};