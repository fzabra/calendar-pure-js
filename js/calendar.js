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
                var eClass = document.createElement("p");
                eClass.className = 'evText';
                eClass.setAttribute("id", "evday"+dateDay);
                cell.appendChild(eClass);
                cell.addEventListener("click", function () {
                    addEvent(this.id);
                });
                for (var f = 0; f < localStorage.length; f++){
                    if(dateDay == localStorage.key(f)){
                        eClass.innerHTML = localStorage.getItem(localStorage.key(f))
                    }              
                }
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

function addEvent(e) {
    eventDataModal = document.getElementById("evday"+e).textContent;
    var formEvent = "<div class='modal-header'>";
    formEvent +="<h3 class='display-4' id='exampleModalLabel'>Create Event</h3>";
    formEvent +="<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
    formEvent +="<span aria-hidden='true'>&times;</span>";
    formEvent +="</button>";
    formEvent +="</div>";
    formEvent +="<div class='modal-body'>";
    formEvent +="<p>Add event to " + e + " "+ monthsOfYear[currentMonth] + " " + currentYear +"</p>" ;
    formEvent +="<textarea class='evField' id='evt-details' onfocusin='disableSendButton()'>"+ eventDataModal +"</textarea>";
    formEvent +="</div>";
    formEvent +="<div class='modal-footer'>";
    formEvent +="<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
    formEvent +="<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='deleteEvent(" + e + ");'>Delete</button>";
    formEvent +="<button type='button' class='btn btn-primary' onclick='save(" + (e ? e : "") + ")' data-dismiss='modal' id='btSend'>Add</button>";
    formEvent +="</div>";
    dayClick = document.getElementById("formAddEvent");
    dayClick.innerHTML = formEvent;
}

function disableSendButton(){
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
    buildCalendar(currentMonth, currentYear);
}

function deleteEvent(e){
    eventData = document.getElementById("evt-details").value;
    localStorage.removeItem(e, JSON.stringify(eventData));
    buildCalendar(currentMonth, currentYear);
}