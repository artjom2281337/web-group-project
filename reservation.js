class Person {
    constructor(name, email, phone, date, time) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.date = date;
        this.time = time;
    }
}
class Table {
    constructor(id, capacity, time, date) {
        this.id = id;
        this.capacity = capacity;
        this.time = time;
        this.date = date;
    }
}
tableTimes = ["18:00", "19:00", "20:00", "21:00"];
function reserveTable() {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    date = document.getElementById("date").value;
    time = document.getElementById("time").value;

    let newPerson = new Person(name, email, phone, date, time);
}
function returnTimes() {
    for (let i = 0; i < tableTimes.length; i++) {
        document.getElementById("table").innerHTML += tableTimes[i] + " ";
    }
}