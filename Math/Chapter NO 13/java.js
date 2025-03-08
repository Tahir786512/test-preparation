   
    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeRemaining = 20;
    let results = [];






    const questions = [

        
        { 
          question:  /*write Your Question*/"                                    The branch of physics dealing with ultimate particles?                ", 
                options: 
                    [
    /*option 0 */    "   Plasma   ",
    /*option 1 */    "   Atomic   ", 
    /*option 2 */    "   Nuclear  ",
    /*option 2 */    "   Particle "
                    ],
                correct: 3   
                 /*Correct option */
            },
        
        
        
        
   



    ];


















    function loadQuestion() {
        const question = questions[currentQuestion];
        document.getElementById('question').innerText = question.question;
        const options = document.querySelectorAll('.option');
        options.forEach((btn, index) => {
            btn.innerText = question.options[index];
            btn.classList.remove('correct', 'incorrect');
            btn.onclick = () => checkAnswer(index);
        });
        timeRemaining = 20;
        document.getElementById('timer').innerText = timeRemaining;
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeRemaining--;
            document.getElementById('timer').innerText = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function checkAnswer(option) {
        clearInterval(timer);
        const question = questions[currentQuestion];
        let isCorrect = option === question.correct;
        results.push({ question: question.question, options: question.options, selected: option, correct: question.correct, isCorrect });
        if (isCorrect) score++;
        document.getElementById('score').innerText = "Score: " + score;
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        document.getElementById('quiz-section').style.display = 'none';
        const resultContainer = document.getElementById('result-container');
        resultContainer.style.display = 'block';
        let resultHTML = `<h2>Quiz Over!</h2><p>Total Score: ${score}/${questions.length}</p>`;
        results.forEach((res, index) => {
            resultHTML += `<div><p><strong>${index + 1}. ${res.question}</strong></p>`;
            res.options.forEach((opt, i) => {
                let className = '';
                if (i === res.selected) className = res.isCorrect ? 'correct' : 'incorrect';
                if (i === res.correct && i !== res.selected) className = 'correct';
                resultHTML += `<p class="${className}">${opt}</p>`;
            });
       
        });
        resultContainer.innerHTML = resultHTML;
    }

    loadQuestion();
