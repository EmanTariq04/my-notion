function stringToColor(str: string) {
    let hash = 0

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase() //making it hex like and making it in capital letters
    return "#" + "00000".substring(0, 6 - c.length) + c
}
export default stringToColor