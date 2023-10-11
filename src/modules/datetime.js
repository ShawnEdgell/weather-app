export function setCurrentDate() {
    const now = new Date();
    // Formatting for date: Weekday, Month Day, Year
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', dateOptions);
}

export function setCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'); // This will include only hours and minutes
}


