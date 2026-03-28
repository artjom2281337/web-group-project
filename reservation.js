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
tableTimes = ["18:00", "19:00", "20:00", "21:00"];
function returnTimes() {
    if (document.getElementById("date").value == "") {
        alert("Please select a date!");
        return;
    }
    document.getElementById("table-h2").innerHTML = "Available Times";
    document.getElementById("table").innerHTML = "";
    for (let i = 0; i < tableTimes.length; i++) {
        document.getElementById("table").innerHTML += `<button onclick="reserveTable('${tableTimes[i]}')">${tableTimes[i]}</button>`;
    }
}
function reserveTable(time) {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    date = document.getElementById("date").value;
    guests = document.getElementById("guests").value;

    if (name == "" || email == "" || phone == "" || date == "" || guests == "") {
        alert("Please fill all the fields!");
        return;
    }

    let newPerson = new Person(name, email, phone, date, time, guests);
    document.getElementById("details").innerHTML = `<h3>Table Reservated!</h3><br>
                                                    <p>Name: ${newPerson.name}</p><br>
                                                    <p>Email: ${newPerson.email}</p><br>
                                                    <p>Phone: ${newPerson.phone}</p><br>
                                                    <p>Date: ${newPerson.date}</p><br>
                                                    <p>Time: ${newPerson.time}</p><br>
                                                    <p>Guests: ${newPerson.guests}</p><br>`;
    
    document.getElementById("name").value = "";                                                
    document.getElementById("email").value = "";                                                
    document.getElementById("phone").value = "";                                                
    document.getElementById("date").value = "";                                                
    document.getElementById("guests").value = "";                                                
}