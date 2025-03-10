import React, { useEffect, useState } from 'react';

interface Event {
    date: string;
    [key: string]: any; 
}

interface Day {
    value: number;
    event?: Event;
    isCurrentDay: boolean;
    date: string;
}

interface UseDateResult {
    days: Day[];
    dateDisplay: string;
}

export const useDate = (events: Event[], nav: number): UseDateResult => {
    const [dateDisplay, setDateDisplay] = useState<string>('');
    const [days, setDays] = useState<Day[]>([]);

    const formatDate = (dateString:Date): string => {
        if (isNaN(dateString.getTime())) return 'Invalid Date';

        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(dateString);
    };

    const eventForDate = (date:string): Event | undefined => {

        return events.find(e => {
            if (!e.date) return false;

            const eventDate = new Date(e.date);
            if (isNaN(eventDate.getTime())) return false;

            const formattedEventDate = eventDate.toISOString().split('T')[0];
            const formattedCalendarDate = new Date(date).toISOString().split('T')[0];

            return formattedEventDate === formattedCalendarDate;
        });
    };

    useEffect(() => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr: Day[] = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dateObj = new Date(year, month, i - paddingDays);
            const formattedDate = formatDate(dateObj);

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(formattedDate),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: formattedDate,
                });
            }
        }

        setDays(daysArr);
    }, [events, nav]);

    return {
        days,
        dateDisplay,
    };
};