// ================= AUTH SYSTEM =================

// ===== REGISTER =====
function register() {

  let user = document.getElementById("regUser").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  let pass = document.getElementById("regPass").value.trim();
  let msg = document.getElementById("regMsg");

  if (user === "" || email === "" || pass === "") {
    msg.innerText = "⚠ Please fill all fields!";
    msg.style.color = "red";
    return;
  }

  let userData = {
    username: user,
    email: email,
    password: pass
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  msg.style.color = "green";
  msg.innerText = "✅ Registration Successful! Redirecting to login...";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}


// ===== LOGIN =====
function login() {

  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();
  let msg = document.getElementById("message");

  let savedData = JSON.parse(localStorage.getItem("userData"));

  if (!savedData) {
    msg.innerText = "⚠ Please register first!";
    return;
  }

  if (user === savedData.username && pass === savedData.password) {

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", savedData.username);

    msg.style.color = "green";
    msg.innerText = "✅ Login Successful!";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } else {
    msg.innerText = "❌ Invalid credentials!";
  }
}


// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("loggedIn");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}


// ===== PROTECT PAGES =====
function checkLogin() {
  let isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    alert("⚠ Please login first!");
    window.location.href = "login.html";
  }
}


// ===== SHOW USER =====
function showUser() {
  let user = localStorage.getItem("user");

  if (user && document.getElementById("userName")) {
    document.getElementById("userName").innerText = "Hi, " + user;
  }
}


// ================= JOB FEATURES =================

function setJobDetails(title, company, location, salary, exp, skills, desc) {
  let job = { title, company, location, salary, exp, skills, desc };
  localStorage.setItem("job", JSON.stringify(job));
  window.location.href = "job-details.html";
}


function loadJob() {
  let job = JSON.parse(localStorage.getItem("job"));

  if (job) {
    document.getElementById("title").innerText = job.title;
    document.getElementById("company").innerText = job.company;
    document.getElementById("location").innerText = job.location;
    document.getElementById("salary").innerText = job.salary;
    document.getElementById("experience").innerText = job.exp;
    document.getElementById("skills").innerText = job.skills;
    document.getElementById("description").innerText = job.desc;
  }
}


function postJob(e) {
  e.preventDefault();

  let job = {
    title: document.getElementById("jobTitle").value,
    company: document.getElementById("companyName").value,
    location: document.getElementById("location").value,
    salary: document.getElementById("salary").value
  };

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("✅ Job Posted Successfully!");

  e.target.reset();
}


function displayJobs() {
  let container = document.getElementById("jobContainer");

  if (!container) return;

  container.innerHTML = "";

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.forEach(job => {

    let div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>Company: ${job.company}</p>
      <p>Location: ${job.location}</p>
      <p>Salary: ${job.salary}</p>
      <button onclick="setJobDetails('${job.title}','${job.company}','${job.location}','${job.salary}','1-3 Years','HTML,CSS','Work')">
        View Details
      </button>
    `;

    container.appendChild(div);

  });
}


function searchJobs() {
  let input = document.getElementById("search").value.toLowerCase();
  let jobs = document.getElementsByClassName("job-card");

  for (let i = 0; i < jobs.length; i++) {
    jobs[i].style.display =
      jobs[i].innerText.toLowerCase().includes(input) ? "block" : "none";
  }
}


function saveProfile() {
  localStorage.setItem("name", document.getElementById("nameInput").value);
  localStorage.setItem("email", document.getElementById("emailInput").value);

  displayProfile();

  alert("✅ Profile Saved!");
}


function displayProfile() {
  if (document.getElementById("nameDisplay"))
    document.getElementById("nameDisplay").innerText = localStorage.getItem("name");

  if (document.getElementById("emailDisplay"))
    document.getElementById("emailDisplay").innerText = localStorage.getItem("email");
}


function applyJob(e) {
  e.preventDefault();
  alert("🎉 Application Submitted! Email sent (Demo)");
}


// ================= PAGE LOAD =================

window.onload = function () {

  let currentPage = window.location.pathname;

  // 🔥 IMPORTANT FIX
  if (
    !currentPage.includes("login.html") &&
    !currentPage.includes("register.html")
  ) {
    checkLogin();
  }

  showUser();

  if (typeof loadJob === "function") loadJob();
  if (typeof displayProfile === "function") displayProfile();

  displayJobs();
};