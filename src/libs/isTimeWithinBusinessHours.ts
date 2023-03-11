export function isTimeWithinBusinessHours(time: string | Date) {
    const currentTime = new Date(`2000-01-01T${time}`);
    const businessHoursStart = new Date(`2000-01-01T08:00:00`);
    const businessHoursEnd = new Date(`2000-01-01T18:00:00`);

    return currentTime >= businessHoursStart && currentTime <= businessHoursEnd;
}
