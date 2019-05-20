today = new Date();
currentDay = today.getDate();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildCalendar(currentMonth, currentYear) {
    let firstDayOfMonth = (new Date(currentYear, currentMonth)).getDay();
    thead = document.getElementById("calendar-thead");
    tbody = document.getElementById("calendar-tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";
    monthYear.innerHTML = monthsOfYear[currentMonth] + " " + currentYear;

    var daysWeekRow = document.createElement("tr"),
        daysWeekCell = null,
        daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    daysWeek.push(daysWeek.shift());
    for (var d of daysWeek) {
        daysWeekCell = document.createElement("th");
        daysWeekCell.innerHTML = d;
        daysWeekRow.appendChild(daysWeekCell);
    }
    daysWeekRow.classList.add("head");
    thead.appendChild(daysWeekRow);

    let dateDay = 1;
    for (let i = 0; i < 6; i++) {

        let row = document.createElement("tr");

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
                cell.setAttribute("data-toggle", "modal");
                cell.setAttribute("data-target", "#exampleModal");
                cellText = document.createTextNode(dateDay);
                cell.setAttribute("id", dateDay);
                if (dateDay === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    cell.classList.add("bg-day");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                dateDay++;
                var eClass = document.createElement("p");
                eClass.className = 'evText';
                cell.appendChild(eClass);
                var getData = localStorage.getItem("8")
                eClass.innerHTML = getData;
                cell.addEventListener("click", function () {
                    addEvent(this.id);
                });
            }
        }
        tbody.appendChild(row);
    }
}

buildCalendar(currentMonth, currentYear);

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function addEvent(e) {
    var formEvent = "<div class='modal-header'>";
    formEvent +="<h5 class='modal-title' id='exampleModalLabel'>Create Event</h5>";
    formEvent +="<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    formEvent +="<span aria-hidden='true'>&times;</span>";
    formEvent +="</button>";
    formEvent +="</div>";
    formEvent +="<div class='modal-body'>";
    formEvent +="<h3>Add event to " + e + " "+ monthsOfYear[currentMonth] + " " + currentYear; ;
    formEvent +="<textarea id='evt-details' onfocusin='disableSendButton("+ e +")'></textarea>";
    formEvent +="</div>";
    formEvent +="<div class='modal-footer'>";
    formEvent +="<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
    formEvent +="<button type='button' class='btn btn-primary' onclick='save(" + (e ? e : "") + ")' data-dismiss='modal' id='btSend'>Add</button>";
    formEvent +="</div>";
    dayClick = document.getElementById("formAddEvent");
    dayClick.innerHTML = formEvent;
}

function disableSendButton(e){
    eventData = document.getElementById("evt-details").value;
    console.log(eventData);
    if(eventData == ""){
        document.getElementById("btSend").disabled = true;
    }else{
        document.getElementById("btSend").disabled = false;
    }
}

function save(e){
    eventData = document.getElementById("evt-details").value;
    localStorage.setItem(e, JSON.stringify(eventData));
}