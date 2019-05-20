today = new Date();
currentDay = today.getDate();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildCalendar(currentMonth, currentYear){
    let firstDayOfMonth = (new Date(currentYear, currentMonth)).getDay();
    console.log(firstDayOfMonth);
    tbody = document.getElementById("calendar-tbody");
    console.log(tbody);
    tbody.innerHTML = "";
    monthYear.innerHTML = monthsOfYear[currentMonth] + " " + currentYear;
    let dateDay = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.classList.add("bg-day-off");
            }
            else if (dateDay > daysInMonth(currentMonth, currentYear)) {
                break;
            }
            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(dateDay);
                if (dateDay === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    cell.classList.add("bg-day");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                dateDay++;
            }
        }
        tbody.appendChild(row); 
    }
}

buildCalendar(currentMonth, currentYear);

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
