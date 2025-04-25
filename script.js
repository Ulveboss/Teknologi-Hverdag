//icl ts pmo
let allScenarios = {}
let currentScenario = {}
const headerElement = document.getElementById('header');
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById('nextButton');
let currentId;
let scenarioName;


fetch('scenarios.json')
    .then(response => response.json())
    .then(data => {
        allScenarios = data;
        console.log(allScenarios)
        start()
    })
    .catch(error => {
        console.error('Fejl ved hentning af JSON:', error);
    });


function showQuestion(id) {
    currentId = id
    headerElement.textContent = scenarioNavn;
    console.log(currentId, currentScenario)
    const currentQuestion = currentScenario[currentId]
    if (!currentQuestion) {
        questionElement.textContent = "Fejl, returner til starten"
        answersElement.innerHTML = ""
    }
    questionElement.textContent = currentQuestion.text
    answersElement.innerHTML = ""

    if (currentQuestion.answers) {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('answerButton')
            button.onclick = () => showQuestion(answer.next)
            answersElement.appendChild(button)
        })
    }
    
    forklaring(currentQuestion.forklaring);
}

function start() {
    if(currentId){
        showQuestion(currentId)
        return
    }
    headerElement.textContent = 'Velkommen til vores sociale træner'
    questionElement.textContent = "Vælg et scenarie:";
    answersElement.innerHTML = "";

    const scenarioList = Object.entries(allScenarios);

    scenarioList.forEach(([scenarioName, scenarioContent]) => {
        const button = document.createElement('button');
        button.textContent = scenarioName;
        button.classList.add('answerButton');
        button.onclick = () => {
            currentScenario = scenarioContent;
            scenarioNavn = scenarioName;
            showQuestion("start");
        };
        answersElement.appendChild(button);
    });

    forklaring(false)
}

function forklaring(forklaring) {
    const coll = document.querySelector(".collapsible");
    const forklaringBox = document.querySelector(".forklaring");

    if (forklaring) {
        coll.style.display = "block";
        forklaringBox.innerHTML = forklaring;
    } else {
        coll.style.display = "none";
        forklaringBox.innerHTML = "";
        coll.classList.remove("active");
        forklaringBox.style.maxHeight = null;
    }
}

function returner() {
    currentId = undefined;
    currentScenario = {};
    localStorage.setItem('scenario', undefined) 
    start()
}

window.addEventListener('beforeunload', () =>{
    const obj = {
        id: currentId,
        curr: currentScenario, 
        name: scenarioNavn
    }
    localStorage.setItem('scenario', JSON.stringify(obj))
})

window.addEventListener('load', () => {
    if(localStorage.getItem('scenario')) {
        const obj = JSON.parse(localStorage.getItem('scenario'))
        currentId = obj.id;
        currentScenario = obj.curr;
        scenarioNavn = obj.name;
        console.log(obj)
    }
    start()
})

document.querySelector(".collapsible").addEventListener("click", function () {
    this.classList.toggle("active");
    const forklaring = this.nextElementSibling;
    if (forklaring.style.maxHeight) {
        forklaring.style.maxHeight = null;
    } else {
        forklaring.style.maxHeight = forklaring.scrollHeight + "px";
    }
});