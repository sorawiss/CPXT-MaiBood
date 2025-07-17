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

export function formatDateToRelative(date: Date | string) {
    const targetDate = safeDate(date);
    const now = new Date();

    // Reset time to start of the day for accurate day difference calculation
    targetDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "วันนี้";
    } else if (diffDays > 0) {
        return `${diffDays} วันข้างหน้า`;
    } else {
        return `${Math.abs(diffDays)} วันที่ผ่านมา`;
    }
}

