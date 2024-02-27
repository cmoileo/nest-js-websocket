export function transformDateFunc(dateString: string): string {
    const dateObj = new Date(dateString);
    const heures = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const secondes = dateObj.getSeconds();

    const afficherDate = heures >= 24;

    const heureFormattee = `${heures % 24}:${minutes}:${secondes}`;

    const result = afficherDate
        ? `${dateObj.getDate()}/${dateObj.getMonth() + 1} ${heureFormattee}`
        : heureFormattee;

    return result;
}
