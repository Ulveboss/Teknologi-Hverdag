//icl ts pmo
let scenarios = {}
let currentQuestionIndex = 0

fetch('scenarios.json')

  .then(response => response.json())

  .then(data => {


    scenarios = data.scenarios;

    console.log(scenarios)

    showQuestion()

  })

  .catch(error => {

    console.error('Fejl ved hentning af JSON:', error);

  });
  

  function showQuestion(id) {

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById('nextButton');

    const currentQuestion = scenarios[id]


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

  function Start() {
    
  }