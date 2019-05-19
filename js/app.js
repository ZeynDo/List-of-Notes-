// CODE EXPLAINED channel
//select the elements, button
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [];
let id = 0;

//get item from locastorage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}
//load items to the users interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


//showing todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("de-GER", options);

//add a todo function

function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    //if there sth in done, we use the check class otherwise the uncheck class
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =
        `
        <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i> 
         <p class="text ${LINE}">${toDo}</p>
         <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
         </li>
         `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add an item to the list use the enter key for that

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;

        }
        input.value = "";
    }

});

//function to complete a to do task, when the user clicks on it

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do function
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynmaically

list.addEventListener("click", function(event) {
    const element = event.target; //returns the clicked element inside the list
    const elementJob = element.attributes.job.value;


    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});