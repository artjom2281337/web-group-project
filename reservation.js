// class with constructor with person details for reservation
class Person {
    constructor(name, email, phone, date, time, guests) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.date = date;
        this.time = time;
        this.guests = guests;
    }
}
// available table times for reservation
tableTimes = ["18:00", "19:00", "20:00", "21:00"];
let form = document.getElementById("form");
// function returnTimes() - iterates over the available times and returns the table times
function returnTimes() {
    // if values are empty, it alerts the user that user needs to fill all fields
    if (document.getElementById("name").value == "" || document.getElementById("email").value == "" || document.getElementById("phone").value == "" || document.getElementById("date").value == "" || document.getElementById("guests").value == "") {
        alert("Please fill all the fields!");
        return;
    }
    // if number of guests equals 0 or less, user will be notified
    if (document.getElementById("guests").value <= 0) {
        alert("Please fill a valid number of guests");
        return;
    }
    // https://dev.to/sanchithasr/3-ways-to-check-if-variable-is-a-number-in-javascript-5731
    // if value of phone number is not a number, then user will be required to fill the valid phone number
    if (isNaN(document.getElementById("phone").value)) {
        alert("Please fill a valid phone number");
        return;
    }
    // available times are appearing
    document.getElementById("table-h2").innerHTML = "Available Times";
    // times needs to be dissapeared before actual loop iteration in case if user can see the times, so times will not repeating
    document.getElementById("table").innerHTML = "";
    // for loop to iterate over table times
    for (let i = 0; i < tableTimes.length; i++) {
        // returns button, that uses the time parameter for next function
        document.getElementById("table").innerHTML += `<button onclick="reserveTable('${tableTimes[i]}')">${tableTimes[i]}</button>`;
    }
}
// function reserveTable() with time parameter assigns input values to variables, checks if there's an input data, creates newPerson object with input values, returns input data of user and makes input data dissapeared after user can see own input values
function reserveTable(time) {
    // assigning input values to variables
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    date = document.getElementById("date").value;
    guests = document.getElementById("guests").value;
    // checks if values are empty, if they are empty, user will be alerted that user need to input own data
    if (name == "" || email == "" || phone == "" || date == "" || guests == "") {
        alert("Please fill all the fields!");
        return;
    }
    // creating newPerson object with input variables
    let newPerson = new Person(name, email, phone, date, time, guests);
    // returns the confirmation of reservation, user can see own input data
    document.getElementById("details").innerHTML = `<h3>Table Reserved!</h3><br>
                                                    <p>Name: ${newPerson.name}</p><br>
                                                    <p>Email: ${newPerson.email}</p><br>
                                                    <p>Phone: ${newPerson.phone}</p><br>
                                                    <p>Date: ${newPerson.date}</p><br>
                                                    <p>Time: ${newPerson.time}</p><br>
                                                    <p>Guests: ${newPerson.guests}</p><br>`;
    // cleans the input data after user can see own data
    document.getElementById("name").value = "";                                                
    document.getElementById("email").value = "";                                                
    document.getElementById("phone").value = "";                                                
    document.getElementById("date").value = "";                                                
    document.getElementById("guests").value = "";                                                
}
// https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
// prevents a form from refreshing after submission
function handeForm(event) {
    event.preventDefault(); 
}
// will call a function when form got submitted
form.addEventListener('submit', handeForm);