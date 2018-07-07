//disclaimer: in no way would I have been able to do this without the help of a tutor, and without 
//using multiple examples. Plus the extra time to work on this was highly instrumental. Yikes, I am tired.
$(document).ready(function() {
    //keeps track of the number of questions.
    var questionCounter = 0;
    
    // timeout to answer a question.
    var answerTimeout = 2000;
    
    //score variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    
    //array of user's answers
    var userAnswer = [];
    
    //objects with the questions, answer options, and correct answer.
    var questions = [
        {
            question: "What is a mushroom?",
            choices: ["The reproductive part of fungus.", "Similar to a leaf, but for fungus.", "Fruit", "Root"],
            choicesAnswer: 0
        },
        {
            question: "What is the main vegetative growth of fungus?",
            choices: ["Xylem", "Hyphae", "Phloem", "Cellulose"],
            choicesAnswer: 1
        },
        {
            question: "How does fungus reproduce?",
            choices: ["Cloning", "Sexually", "Sporulation", "Conjugation"],
            choicesAnswer: 2
        },
        {
            question: "What kind of fungus are pigs and dogs used to find?",
            choices: ["Shittake", "Morel", "Psilocybes", "Truffles"],
            choicesAnswer: 3
        },
        {
            question: "What is the most poisonous fungus in the world?",
            choices: ["Death Cap", "Destroying Angel", "Stinkhorn", "Chanterelle",],
            choicesAnswer: 0
        },
        {
            question: "What is the most popular edible mushroom (not magic!)?",
            choices: ["Chanterelle", "Oyster", "Button", "Crimini"],
            choicesAnswer: 0
        }
    ];//closes the array of objects.
    
    //submit answers
    function submitAnswer() {
        $("#submit").on("click", function(e) {
            // e.preventDefault();
            userAnswer.length = 0;
                
            //users answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();//ask TA about this.
            userAnswer.push(userSelection);//moves the selected answer to the array of answers.
            //console.log(userAnswer);
            nextQuestion();
        });
    };
        
    //questions timer variables & functions below
    var timeLeft = 10;
    var increment;
    
    function runTimer() {
        increment = setInterval(decrement, 1000);//count down by 1 second.
    };
    
    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAnswer.length = 0;		
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAnswer.push(userSelection);
            //console.log(userAnswer);
            nextQuestion();
        };
    };
    
   
    
    // display the options with radio buttons
    function createRadios() {
        var responseOptions = $("#responses");//set the jquery code to a variable for easier use.
        //empty array for user answer
        responseOptions.empty();//clears all the child elements.
            
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="fungi-options">' + questions[questionCounter].choices[i] + '</div></input><br>');
        };
    };
    
    //Function to display the given question
    function displayQuestion() {
        clearQuestion();//clears last question
        resetTimer();//resets the questions timer.
        $(".questionX").html(questions[questionCounter].question);
        //calling the function to display the response options
        createRadios();
        //submit button used with preventDefault() to ignore its programmed behavior.
        $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
        runTimer()
        submitAnswer();
    };
    
    //start page
    function displayStart() {
        $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start" + '</a>');
            //the above creates the start button. When clicked the program starts.
        $("#start-button").on("click", function(event) {
            event.preventDefault();
            //shows the first question
            firstQuestion();
            resetTimer();//timer changes to 8 seconds left
        });
    };
    
    //reset, sets all var to 0 for the next game. 
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userAnswer = [];
        resetTimer();
    };
    
    //displays end of trivia game with scores
    function displayEnd() {
        clearQuestion();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        //restart game
        $("#restart-button").on("click", function(event) {
            event.preventDefault();
            reset();
            clearQuestion();
            displayStart();
        });
    };
    
    // clear the question
    function clearQuestion() {
        var questionDiv = $(".questionX");
        questionDiv.empty();
    
        var responsesDiv = $("#responses");
        responsesDiv.empty();
    
        var submitDiv = $("#submit-div");
        submitDiv.empty();
    
        var contentDiv = $("#content");
        contentDiv.empty();
    
        stopTimer();
    };
    
    // was answer right or wrong?
    function checkQuestion() {
        clearQuestion();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAnswer[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
            correct++;
            displayTimer();
        }
        else if (userAnswer[0] === undefined) {//if a selection is not made then assumption that answer not known. counts as missed question.
            $("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            missed++;
            displayTimer();
        }
        else {
            $("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
            incorrect++;
            displayTimer();
        };
    };
    
    //go to next question 
    function nextQuestion() {
        checkQuestion();
        
        questionCounter++;
        
        if (questionCounter === questions.length) {//questions is the array of objects.
            setTimeout(displayEnd, answerTimeout);
        } 
        else {
            setTimeout(displayQuestion, answerTimeout);
        };
    };
    
    //starts the series of questions
    function firstQuestion() {
        var startContent = $("#content");
        startContent.empty(); //removes the child elements from the div for questions.
        displayQuestion();
    };

    function resetTimer() {
        timeLeft = 8;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };
    
    function displayTimer() {
        $("#time-left").html("Your Review");
    };
    
    function stopTimer() {
        clearInterval(increment);
    };
    
    //start...daisy-chain the functions.
    displayStart();

    });    