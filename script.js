// Allows the navbar to toggle which section the user is looking at
document.getElementById("passengerInfo").classList.toggle("hidden");

var currentPage = 1;
function changeSection() {
    document.getElementById("passengerInfo").classList.toggle("hidden");
    document.getElementById("flightlist").classList.toggle("hidden");
    if(currentPage==1) {
        currentPage++;
        document.getElementsByTagName("a")[0].textContent="Submit Information";
    }else{
        currentPage--;
        document.getElementsByTagName("a")[0].textContent="Show Flightlist";
    }
}

//An array that stores all of the passengers
var passengerList = [];
var passengerID = 1;

//Object for storing information about the passengers in the list
class Passenger {
    constructor(firstName, lastName, birthday, startingCity, endingCity, leavingDate,returningDate, numBags, foodChoice, extraRequests) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = passengerID;
        this.birthday = birthday;
        this.startingCity = startingCity;
        this.endingCity = endingCity;
        this.leavingDate = leavingDate;
        this.returningDate = returningDate;
        this.numBags = parseInt(numBags);
        this.foodChoice = foodChoice;
        this.extraRequests = extraRequests;
        let currentDate = new Date();
        let pastDate = new Date(birthday);
        (currentDate.getFullYear() - pastDate.getFullYear()) >=21 ? this.canDrink=true : this.canDrink=false;
        this.cost = 300 + 10*extraRequests.length + 20*this.numBags;
        let dateLeaving = new Date(leavingDate);
        let dateReturning = new Date(returningDate);
        this.timeGone = (dateReturning.getTime() - dateLeaving.getTime())/(1000*60*60*24);
        passengerID++;
    }
}

//Adds three generic passengers to the list by default for testing purposes
passengerList.push(new Passenger("John","Devenney","2022-01-15","Phoenix","Orlando","2022-01-19","2022-01-27",0,"",""));
passengerList.push(new Passenger("Perry","Faust","1980-02-23","San Diego","Salt Lake City","2022-10-15","2022-11-30",13,"Chicken",["Headphones"]));
passengerList.push(new Passenger("Jane","Doe","1300-01-01","Roanoke","Naples","1588-01-01","1888-01-01",1,"",""));

//Function that adds the information entered by the user into the flightlist
function addToList() {
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let birthday = document.getElementById("bDay").value;
    let startingCity = document.getElementById("startingCity").value;
    let endingCity = document.getElementById("endingCity").value;
    let leavingDate = document.getElementById("leavingDate").value;
    let returningDate = document.getElementById("returningDate").value;
    let numBags = document.getElementById("numBags").value;
    let foodOptions = ["chicken","fish","veggie"];
    let foodChoice = "";
    for(let i of foodOptions) {
        if(document.getElementById(i).checked == true) {
            foodChoice = document.getElementById(i).value;
            break;
        }
    }
    let extraOptions = ["legRoom","window","headphones","extraFood"];
    let extraRequests = [];
    for(let i of extraOptions) {
        if(document.getElementById(i).checked== true) extraRequests.push(document.getElementById(i).value);
    }
    if(
        firstName!="" && 
        lastName!="" &&
        birthday!="" &&
        startingCity!="" &&
        endingCity!="" &&
        leavingDate!="" &&
        returningDate!=""
    ) {
        let temp = new Passenger(firstName, lastName, birthday, startingCity, endingCity, leavingDate, returningDate, numBags, foodChoice, extraRequests);
        passengerList.push(temp);
        document.getElementById("fName").value="";
        document.getElementById("lName").value="";
        document.getElementById("bDay").value="";
        document.getElementById("startingCity").value="";
        document.getElementById("endingCity").value="";
        document.getElementById("leavingDate").value="";
        document.getElementById("returningDate").value="";
        document.getElementById("numBags").value="";
        for(let i of foodOptions) document.getElementById(i).checked = false;
        for(let i of extraOptions) document.getElementById(i).checked = false;
    }
}

//Prints the full list of passengers on the page
function print() {
    let space="";
    for(let i=0; i<passengerList.length; i++) {
        space+=`<p>Passenger ${passengerList[i].id}: ${passengerList[i].firstName} ${passengerList[i].lastName}</p>`
    }
    document.getElementById("fullList").innerHTML = space;
}

//Allows the user to see the info of an individual passenger
function getInfo() {
    let info = document.getElementById("passengerSearch").value;
    let selectedPassenger;
    if(info.indexOf(" ")>-1) {
        info = info.split(" ");
        selectedPassenger = passengerList.filter(passenger => passenger.firstName==info[0] && passenger.lastName==info[1]);
        console.log(passengerList.filter(passenger => passenger.firstName==info[0] && passenger.lastName==info[1]));
    }else{
        selectedPassenger = passengerList.filter(passenger => passenger.id == info);
        console.log(selectedPassenger);
    }
    if(selectedPassenger.length==0) {
        document.getElementsByTagName("ul")[0].innerHTML = `<p>There are no passengers matching that search. Make sure you entered the full name or the correct ID</p>`
    }else{
        let extra="";
        for(let i of selectedPassenger[0].extraRequests) extra+= `${i}, `;
        extra = extra.substring(0, extra.length-2);
        document.getElementsByTagName("ul")[0].innerHTML= `<li>Name: ${selectedPassenger[0].firstName} ${selectedPassenger[0].lastName}</li>
        <li>ID: ${selectedPassenger[0].id}</li>
        <li>Birthday: ${selectedPassenger[0].birthday}</li>
        <li>Coming from: ${selectedPassenger[0].startingCity}</li>
        <li>Going to: ${selectedPassenger[0].endingCity}</li>
        <li>Leaving: ${selectedPassenger[0].leavingDate}</li>
        <li>Returning: ${selectedPassenger[0].returningDate}</li>
        <li>Number of Bags: ${selectedPassenger[0].numBags}</li>
        <li>Food Choice: ${selectedPassenger[0].foodChoice}</li>
        <li>Extra Requests: ${extra}</li>
        <li>Can Drink Alcohol: ${selectedPassenger[0].canDrink}</li>
        <li>Flight Cost: $${selectedPassenger[0].cost}</li>
        <li>Days Gone: ${selectedPassenger[0].timeGone}</li>`
        document.getElementById("passengerSearch").value="";
    }
}