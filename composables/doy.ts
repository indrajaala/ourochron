import {ref} from 'vue';
import {isLeapYear} from "@/utils/isLeapYear";
import {daysInAYear} from "@/utils/daysInAYear";

const daysInAMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

// dayOfTheYear takes input 'date' in the format 'YYYY/MM/DD'
export function useDayOfTheYear() {

    let doy = ref();
    let progress = ref();
    let date = new Date().toISOString().split('T')[0];

    const makeDoy = () => {
        doy.value = null;
        progress.value = null;
        const [selectedYear, selectedMonth, selectedDay] = Array.from(date.split('-'), Number);

        for (let i = 1; i <= selectedMonth; i++) {
            if (i === selectedMonth) {
                doy.value += selectedDay
            } else {
                doy.value += daysInAMonth(selectedYear, i);
            }
        }

        progress.value = doy.value / (daysInAYear(selectedYear));
    }

    makeDoy();

    return {doy: doy.value, progress: progress.value};
}


// console.log(daysInAMonth(currentYear,currentMonth))
// console.log(dayOfTheYear());