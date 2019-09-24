'use strict';
// create a variable called store which contains an array of objects with all questions and answers
const STORE = [
  {
    question: 'What is the purpose of the <!DOCTYPE html> declaration?'
    , choices: [
      'To open a new paragraph.',
      'To stylize text and images with a wrapper.',
      'To declare the language of the document.',
      'To modify the width and height of an HTML element.'
    ],
    answer: 'To declare the language of the document.'
  },
  {
    question: 'Why is it important to add alternate text to images?'
    , choices: [
      'It looks good.',
      'It helps the visually impaired understand images via screen reader.',
      'It is morally correct.'
    ],
    answer: 'It helps the visually impaired understand images via screen reader.'
  },
  {
    question: 'Is HTML a full-fledged programming language?'
    , choices: [
      'Yes',
      'No'
    ],
    answer: 'No'
  },
  {
    question: 'Which tag would be most appropriate for adding a navigation bar to your website?'
    , choices: [
      'header',
      'div',
      'section',
      'nav'
    ],
    answer: 'nav'
  }, {
    question: 'Which attribute would you use to denote the source of an image?'
    , choices: [
      'alt',
      'height',
      'src',
      'img'
    ],
    answer: 'src'
  },
  {
    question: 'Which tag would you use to attach a CSS stylesheet to your HTML file?'
    , choices: [
      'link',
      'ref',
      'img',
      'title'
    ],
    answer: 'link'
  },
  {
    question: 'What is the purpose of an anchor tag?'
    , choices: [
      'Attaching the web page to the viewport',
      'Holding digital boats in place',
      'Creating a hyperlink on your webpage'
    ],
    answer: 'Creating a hyperlink on your webpage'   
  },
  {
    question: 'Is it important to use HTML tags that match the semantic intent of your design?'
    , choices: [
      'Yes',
      'No'
    ],
    answer: 'Yes'   
  },
  {
    question: 'How many h1 tags should you have on each webpage?'
    , choices: [
      'Three',
      'Two',
      'One',
      'As many as necessary',
    ],
    answer: 'One'   
  },
  {
    question: 'Is "responsive design" an important part of making accessible websites?'
    , choices: [
      'Yes',
      'No'
    ],
    answer: 'Yes'   
  }
];

//counters for number of remaining questions and current score
let questionCounter = 0;
let scoreCounter = 0;

//generates new questions in order based on the data from STORE
function generateQuestion() {
  if (questionCounter < STORE.length) {
    return createBox(questionCounter);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionCounter').text(10);
  }
}

//adds one point to scoreCounter based on each correct answer
//updates scoreCounter in the quiz window
function updateScore() {
  scoreCounter = scoreCounter + 1;
  $('.scoreCounter').text(scoreCounter);
}

//iterates through questions by adding one unit to questionCounter
//updates questionCounter in the quiz window
function updateQuestionCounter() {
  questionCounter = questionCounter + 1;
  $('.questionCounter').text(questionCounter + 1);
}
  

//starts the quiz
//hides altBox, shows questionCounter in the quiz window  
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionCounter').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//compares submitted answer to correct answer
// if correct, runs correctAnswer function
// if incorrect, runs wrongAnswer function
function submitAnswer() {
  $('.middle').on('submit', function(event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionCounter].answer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates HTML code for each question
function createBox(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`);

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].choices.forEach(function (answerValue, answerIndex) {
    $(`<label for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      <br>
      `).appendTo(fieldSelector);
  });
  $('<button type="submit" class="submitButton button"> Submit</button > ').appendTo(fieldSelector);
  return formMaker;
}

// returns text when triggered by function signaling correct answer
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

// returns text when triggered by function signaling wrong answer
function wrongAnswer() {
  $('.response').html(
    `<h3>Sorry, that answer is incorrect</h3>
    <p>The correct answer is: ${STORE[questionCounter].answer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//moves onto the next question
function nextQuestion() {
  
  $('.middle').on('click', '.nextButton', function(event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionCounter();
    $('.questionBox form').replaceWith(generateQuestion());
  }); 
  
}

//returns final score 
function finalScore() {
  $('.final').show();

  const great = [
    'Nice work!',
    'You scored 8 or more points'
  ];

  const good = [
    'Pretty good',
    'You scored between 5 and 8 points'
  ];

  const bad = [
    'Better luck next time',
    'You scored lower than 5 points.'
  ];

  if (scoreCounter >= 8) {
    array = 'great';
  } else if (scoreCounter < 8 && scoreCounter >= 5) {
    array = 'okay';
  } else {
    array = 'poorly';
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
    <p>${array[1]}</p>
    <button type="submit" class="restartButton button">Restart</button>`
  );
}

//resets scoreCounter and questionCounter variables when restarting quiz
function resetStats() {
    scoreCounter = 0;
    questionCounter = 0;
    $('.scoreCounter').text(0);
    $('.questionCounter').text(0);
  }

//starts the quiz all over again when user clicks restart
function restartQuiz() {
  $('.middle').on('click', '.restartButton',
    function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
} 

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
