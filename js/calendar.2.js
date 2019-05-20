today = new Date();
currentDay = today.getDate();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildCalendar(currentMonth){
    let firstDayOfMonth = (new Date(currentMonth)).getDay();
    console.log(firstDayOfMonth);
}

buildCalendar(currentMonth);