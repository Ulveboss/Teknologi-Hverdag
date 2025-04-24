//icl ts pmo
let allScenarios = {}
let currentScenario = {}
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById('nextButton');


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
    const currentQuestion = currentScenario[id]
    if (!currentQuestion) {
        questionElement.textContent = "Scenariet er slut lil bro"
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
}

function start() {
    questionElement.textContent = "Vælg et scenarie:";
    answersElement.innerHTML = "";

    const scenarioList = Object.entries(allScenarios);

    scenarioList.forEach(([scenarioName, scenarioContent]) => {
        const button = document.createElement('button');
        button.textContent = scenarioName;
        button.classList.add('answerButton');
        button.onclick = () => {
            currentScenario = scenarioContent;
            showQuestion("start");
        };
        answersElement.appendChild(button);
    });
}
function returner() {
    start()
}