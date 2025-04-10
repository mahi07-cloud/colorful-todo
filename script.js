const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const music = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volumeSlider");

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">✖</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
    showConfetti();
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();

  saveTasks();
}

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function toggleMusic() {
  const btn = document.getElementById("music-btn");
  if (music.paused) {
    music.play();
    btn.textContent = "🔊";
  } else {
    music.pause();
    btn.textContent = "🔈";
  }
}

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// LocalStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(({ text, completed }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <button class="delete-btn">✖</button>
    `;
    if (completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
      showConfetti();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Simple Confetti
function showConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height / 2,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
  }));

  let frame = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y + frame, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    frame += 2;
    if (frame < canvas.height) requestAnimationFrame(draw);
  };
  draw();
}

loadTasks();
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("music-btn");
    if (music.paused) {
      music.play().then(() => {
        btn.textContent = "🔊";
      }).catch((e) => {
        console.log("Playback error:", e);
        alert("Browser blocked autoplay. Please click anywhere to start music.");
      });
    } else {
      music.pause();
      btn.textContent = "🔈";
    }
  }
  