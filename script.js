function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskText = taskInput.value.trim();
  
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }
  
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-btn">✖</button>
    `;
  
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.style.transform = "scale(0.9)";
      li.style.opacity = "0";
      setTimeout(() => li.remove(), 300);
    });
  
    taskList.appendChild(li);
    taskInput.value = "";
    taskInput.focus();
  }
  
  // Support Enter key
  document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
  