const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
document.head.appendChild(confettiScript);

// one question at a time
let currentStep = 0;

function showStep(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, i) => {
        q.classList.toggle('active', i === index);
    });

    const total = questions.length;
    document.getElementById('nextBtn').style.display = index < total - 1 ? 'inline-block' : 'none';
    document.getElementById('submitBtn').style.display = index === total - 1 ? 'inline-block' : 'none';
}


function nextQuestion() {
    const questions = document.querySelectorAll('.question');
    if (currentStep < questions.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevQuestion() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function randomizeQ1() {
    const container = document.getElementById('qBlock1');
    const labels = Array.from(container.querySelectorAll('label'));
    for (let i = labels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [labels[i], labels[j]] = [labels[j], labels[i]];
    }
    container.querySelectorAll('label, br').forEach(el => el.remove());
    const feedback = document.getElementById('f1');
    labels.forEach(label => {
        container.insertBefore(label, feedback);
        container.insertBefore(document.createElement('br'), feedback);
    });
}

window.onload = function() {
    localStorage.setItem("quizCount", 0);
    randomizeQ1();
    showStep(currentStep);
};

function showFeedback(id, correct) {
    let div = document.getElementById(id);
    if (!div) return;

    if (correct) {
        div.innerHTML = 'Correct <img src = "https://cdn-icons-png.flaticon.com/512/190/190411.png" width = "20">';
    } else {
        div.innerHTML = 'Incorrect <img src = "https://cdn-icons-png.flaticon.com/512/1828/1828665.png" width = "20">';
    }
}

function checkQuiz() {
    let score = 0;

    // q1-q5 radio
    for (let i = 1; i <= 5; i++) {
        let ans = document.querySelector(`input[name="q${i}"]:checked`);

        if (ans && ans.value === "correct") {
            score += 10;
            showFeedback("f" + i, true);
        } else {
            showFeedback("f" + i, false);
        }
    }

    // q6 number
    let q6 = document.getElementById("q6").value == 50;
    if (q6) score += 10;
    showFeedback("f6", q6);

    // q7 dropdown
    let q7 = document.getElementById("q7").value === "correct";
    if (q7) score += 10;
    showFeedback("f7", q7);

    // q8 text
    let q8 = document.getElementById("q8").value.toLowerCase() === "austin";
    if (q8) score += 10;
    showFeedback("f8", q8);

    // q9 checkbox
    let checks = document.querySelectorAll("input[name=q9]:checked");
    let values = Array.from(checks).map(c => c.value);

    let correct9 = values.includes("CA") && values.includes("OR") && values.includes("WA") && values.length === 3;

    if (correct9) score += 10;
    showFeedback("f9", correct9);

    // q10 (number)
    let q10 = document.getElementById("q10").value == 6;
    if (q10) score += 10;
    showFeedback("f10", q10);

    // show all questions after submit
    document.querySelectorAll('.question').forEach(q => {
        q.classList.add('active');
    });

    const prevBtn = document.getElementById('prevBtn');
    prevBtn.innerText = 'Retry';
    prevBtn.onclick = function() { location.reload(); };

    document.getElementById('prevBtn').style.dislay = 'none';
    document.getElementById('submitBtn').style.display = 'none';

    // score
    document.getElementById("score").innerText = "Score: " + score + "/100";
    // message
    document.getElementById("message").innerText = score >= 80 ? "Great job!" : "Keep practicing!";
    if (score >= 80) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    // local storage
    let times = localStorage.getItem("quizCount") || 0;
    times++;
    localStorage.setItem("quizCount", times);

    document.getElementById("times").innerText = "Quiz taken: " + times + " times";
}