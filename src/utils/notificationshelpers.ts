import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

function isSameWeek(date1: Date, date2: Date): boolean {
    const startOfWeek = (date: Date): Date => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // ajusta quando o dia é domingo
        const start = new Date(date);
        start.setDate(diff);
        start.setHours(0, 0, 0, 0); // Zera as horas
        return start;
    };

    const endOfWeek = (date: Date): Date => {
        const start = startOfWeek(date);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999); // Último milissegundo do dia
        return end;
    };

    return date1 >= startOfWeek(date2) && date1 <= endOfWeek(date2);
}

export function countItemsInSameWeek(arr: HistoryByDayDTO[]): number {
    const now = new Date();
    let count = 0;

    arr.forEach(item => {
        const [day, month, year] = item.title.split('.').map(Number);
        const itemDate = new Date(year, month - 1, day);
        const countExercisesByDay = item.data.length
        if (isSameWeek(now, itemDate)) {
            count = count + countExercisesByDay;
        }
    });

    return count;
}