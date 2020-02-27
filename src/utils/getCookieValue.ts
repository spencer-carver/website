function getCookieValue(puzzleName: string): string | null {
    const cookies = document.cookie.split("; ");
    return cookies.reduce((answer: string | null, kvp: string) => {
        const [ key, value ] = kvp.split("=");

        return answer || (key === puzzleName ? value : null);
    }, null);
}

export default getCookieValue;
