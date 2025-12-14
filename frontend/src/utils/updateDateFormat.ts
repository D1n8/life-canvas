export function updateDateFormat(date: string){
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
}