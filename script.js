const yearEl = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light" || savedTheme === "dark") {
  document.body.setAttribute("data-theme", savedTheme);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

function setThemeLabel(mode) {
  if (!themeToggle) return;
  themeToggle.textContent = mode === "light" ? "🌞 Light" : "🌙 Dark";
}

setThemeLabel(document.body.getAttribute("data-theme") || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setThemeLabel(next);
  });
}

if (window.location.hash === "#projects") {
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    // Force landing at projects when returning from project pages.
    projectsSection.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

const profilePhoto = document.getElementById("profilePhoto");
const profileFallback = document.getElementById("profileFallback");

if (profilePhoto && profileFallback) {
  const photoCandidates = [
    "./profile-photo.jpg",
    "./assets/profile-photo.jpg",
    "profile-photo.jpg",
    "assets/profile-photo.jpg",
  ];
  let photoTryIndex = 0;

  profilePhoto.addEventListener("error", () => {
    photoTryIndex += 1;
    if (photoTryIndex < photoCandidates.length) {
      profilePhoto.src = photoCandidates[photoTryIndex];
      return;
    }

    profilePhoto.classList.add("hide");
    profileFallback.classList.add("show");
  });
}

const projectData = {
  task1: {
    title: "Analytics Midterm Task 1",
    files: [
      { label: "Analytics Midterm Task 1 (.zip)", href: "./analytics-midterm-task-1.zip" },
    ],
  },
  task2: {
    title: "Analytics Midterm Task 2",
    files: [
      { label: "Analytics Midterm Task 2 (.zip)", href: "./analytics-midterm-task-2.zip" },
    ],
  },
  task3: {
    title: "Analytics Midterm Task 3",
    files: [
      { label: "Analytics Midterm Task 3 (.zip)", href: "./analytics-midterm-task-3.zip" },
    ],
  },
  inventory: {
    title: "Inventory Management System",
    files: [
      { label: "Inventory Management System (.zip)", href: "./inventory-management-system.zip" },
    ],
  },
};

const projectModal = document.getElementById("projectModal");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalList = document.getElementById("projectModalList");
const projectModalClose = document.getElementById("projectModalClose");
const viewButtons = document.querySelectorAll(".view-project-btn");

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.add("hidden");
  projectModal.setAttribute("aria-hidden", "true");
}

if (projectModal && projectModalTitle && projectModalList && projectModalClose) {
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.dataset.project;
      const project = projectData[projectId];
      if (!project) return;

      projectModalTitle.textContent = project.title;
      projectModalList.innerHTML = project.files
        .map((file) => `<li><a href="${file.href}" target="_blank" rel="noopener">${file.label}</a></li>`)
        .join("");

      projectModal.classList.remove("hidden");
      projectModal.setAttribute("aria-hidden", "false");
    });
  });

  projectModalClose.addEventListener("click", closeProjectModal);

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) closeProjectModal();
  });
}
