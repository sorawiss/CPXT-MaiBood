export function dateFormate(date: Date) {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function safeDate(dateString: string | Date): Date {
    if (dateString instanceof Date) {
        return dateString;
    }
    // Replace spaces with 'T' to make it closer to ISO format, which is more reliable across browsers
    const formattedString = dateString.replace(" ", "T");
    const date = new Date(formattedString);

    if (isNaN(date.getTime())) {
        console.error("Invalid date provided:", dateString);
        // Return a default date or handle the error as appropriate
        return new Date(0); // Return epoch time as a fallback
    }
    
    return date;
}

