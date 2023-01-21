import dayjs from "dayjs";

export function generateDates() {
    const startDay = dayjs().startOf('year');
    const today = new Date();
    const dates = [];

    let dateIndex = startDay;
    while (dateIndex.isBefore(today)) {
        dates.push(dateIndex.toDate());
        dateIndex = dateIndex.add(1, 'day');
    }

    return dates;
}