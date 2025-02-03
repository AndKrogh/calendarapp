export const fetchEvents = async () => {
    try {
        const response = await fetch("http://localhost:3001/getDataFromFireStore", {
            method: "GET",
            headers: {
                "Authorization": "Bearer your-hardcoded-token-here",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};
