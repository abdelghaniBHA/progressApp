const swtch = document.querySelector(".switch");
const body = document.querySelector("body");
const img = document.getElementById("img");

swtch.onclick = ()=>{
    body.classList.toggle("active");
    swtch.classList.toggle("active");

    if(body.classList.contains("active")){
        img.src = "images/sun.png";
    }
    else{
        img.src = "images/moon.png";
    }
}

const q = document.querySelector(".q");
const p = document.querySelector(".p");
const n = document.querySelector(".n");
const sec2 = document.querySelector(".sec2");
const sec3 = document.querySelector(".sec3");
const sec4 = document.querySelector(".sec4");



function toggleSection2() {
    sec2.classList.toggle("active");
    sec3.classList.remove("active");
    sec4.classList.remove("active");
}

function toggleSection3() {
    sec3.classList.toggle("active");
    sec2.classList.remove("active");
    sec4.classList.remove("active");
}

function toggleSection4() {
    sec3.classList.remove("active");
    sec2.classList.remove("active");
    sec4.classList.toggle("active");
}


// Add event listeners to each button
q.addEventListener("click", function(e) {
    e.preventDefault(); 
    toggleSection2();    
});

p.addEventListener("click", function(e) {
    e.preventDefault(); 
    toggleSection3();    
});

n.addEventListener("click", function(e) {
    e.preventDefault(); 
    toggleSection4();   
});


const listcontainer = document.getElementById("listcontainer");
const inputbox = document.getElementById("inputbox");

function addtask(){
    if(inputbox.value === ""){
        alert("ypu write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let x = document.createElement("span");
        x.innerHTML = "\u00d7";
        li.appendChild(x);
    }
    inputbox.value = "";
    savedata();
}

listcontainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
    }
})

function savedata(){
    localStorage.setItem("data",listcontainer.innerHTML);
}

function showdata(){
    listcontainer.innerHTML = localStorage.getItem("data");
}

showdata();



const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach((input, index) => {
    const progress = input.closest('.block').querySelector('.progress-done');
    
    
    
    let finalvalue = 0;
    let max = 100;
    function changewidth() {
        progress.style.width = `${(finalvalue / max) * 100}%`;
        if (input.value > max) {
            alert("Enter a value between 0 and 100%");
            progress.style.width = 0;
            input.value="";
        } else if (input.value < 0) {
            alert("Enter a value between 0 and 100%");
            progress.style.width = 0;
            input.value = "";
        } else if (input.value === "") {
            progress.style.width = 0;
        }
        savedata2();
    }

    input.addEventListener("input", function () {
        finalvalue = parseInt(input.value, 10);
        changewidth();
        savedata2();
    });
   
    function savedata2() {
        localStorage.setItem(`d${index + 1}`, input.value);
        localStorage.setItem(`dd${index + 1}`, progress.style.width);
    }

    function showdata2() {
        input.value = localStorage.getItem(`d${index + 1}`);
        progress.style.width = localStorage.getItem(`dd${index + 1}`);

    }

    
    showdata2();
    
});


inputs.forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        
        const progress = this.closest('.block').querySelector('.progress-done');
        
        progress.style.width = value + '%';
        
        const tooltip = this.closest('.block').querySelector('#tooltip');
        tooltip.textContent = value + '%';
    });
});


function calcAverage() {
    const over = document.getElementById("overall");
    const inputs = document.querySelectorAll('input[type="number"]');
    let sum = 0;
    inputs.forEach(input => {
        sum += parseFloat(input.value || 0); 
    });

    let average = (sum / inputs.length);
    over.innerHTML = average + "%";
    circle(average);
    return average;
    
}

function circle(average) {
    let x = 472 - 472 * (average * 0.01);
    let y = x +13
    let circleElement = document.querySelector("circle");
    circleElement.style.strokeDashoffset = y + "px"; 
}



const notescontainer = document.querySelector(".notes-container");
const createbtn = document.querySelector("#btn");
let notes = document.querySelectorAll(".input-box");




createbtn.addEventListener("click", ()=>{
    let inputbox = document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable","true");
    img.src = "images/delete.png";
    notescontainer.appendChild(inputbox).appendChild(img);
    updatestorage();
})


notescontainer.addEventListener("click",function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updatestorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt =>{
            nt.onkeyup = function(){
                updatestorage();
            }
        })
    }
});

document.addEventListener("keydown",event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

function updatestorage(){
    localStorage.setItem("notes",notescontainer.innerHTML)
}
function shownotes(){
    notescontainer.innerHTML = localStorage.getItem("notes")
}

shownotes()