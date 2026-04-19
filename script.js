function getParam(name, fallback = "") {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || fallback;
}

function splitList(value, fallback = []) {
  if (!value) return fallback;
  return value.split("|").map(x => x.trim()).filter(Boolean);
}

const data = {
  trunk: [
    "Compassion",
    "Reducing harm",
    "Sustainability",
    "Health",
    "Community",
    "Growth"
  ],
  roots: [
    "The word vegan was coined in 1944 by Donald Watson.",
    "Plant-based compassion traditions existed long before the modern word vegan.",
    "Shared roots can include nonviolence, mercy, justice, and care."
  ],
  branches: splitList(
    getParam("branches"),
    ["Budget Branch", "Creative Branch", "Friendship Branch"]
  ),
  leaves: splitList(
    getParam("leaves"),
    ["Tofu Wizard Leaf", "Cat Leaf", "Snack Goblin Leaf"]
  ),
  growth: splitList(
    getParam("growth"),
    ["Attended a vegan social", "Cooked a new recipe", "Did a vegan grocery haul"]
  )
};

const title = document.getElementById("panelTitle");
const content = document.getElementById("panelContent");

const buttons = {
  trunk: document.getElementById("trunkBtn"),
  roots: document.getElementById("rootsBtn"),
  branches: document.getElementById("branchesBtn"),
  leaves: document.getElementById("leavesBtn"),
  growth: document.getElementById("growthBtn")
};

function clearActive() {
  Object.values(buttons).forEach(btn => btn.classList.remove("active"));
}

function renderList(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function render(section) {
  clearActive();
  buttons[section].classList.add("active");

  if (section === "trunk") {
    title.textContent = "Trunk";
    content.innerHTML = `
      <div class="card">
        <strong>Shared Vegan Identity</strong>
        <p>The trunk represents the shared center of veganism: compassion, reducing harm, and growing with intention.</p>
      </div>
      ${renderList(data.trunk)}
    `;
  }

  if (section === "roots") {
    title.textContent = "Roots";
    content.innerHTML = `
      <div class="card">
        <strong>History & Principles</strong>
        <p>The roots hold history, philosophy, and the deeper reasons people connect to veganism.</p>
      </div>
      ${renderList(data.roots)}
    `;
  }

  if (section === "branches") {
    title.textContent = "Branches";
    content.innerHTML = `
      <div class="card">
        <strong>Your Branches</strong>
        <p>These grow from your profile setup questions and ongoing choices.</p>
      </div>
      ${renderList(data.branches)}
    `;
  }

  if (section === "leaves") {
    title.textContent = "Leaves";
    content.innerHTML = `
      <div class="card">
        <strong>Your Leaves</strong>
        <p>These come from daily questions, personality answers, and little pieces of your vegan identity.</p>
      </div>
      ${renderList(data.leaves)}
    `;
  }

  if (section === "growth") {
    title.textContent = "New Growth";
    content.innerHTML = `
      <div class="card">
        <strong>Accomplishments & Challenges</strong>
        <p>This is for things you’ve done: socials, recipes, grocery wins, volunteering, and other vegan milestones.</p>
      </div>
      ${renderList(data.growth)}
    `;
  }
}

buttons.trunk.addEventListener("click", () => render("trunk"));
buttons.roots.addEventListener("click", () => render("roots"));
buttons.branches.addEventListener("click", () => render("branches"));
buttons.leaves.addEventListener("click", () => render("leaves"));
buttons.growth.addEventListener("click", () => render("growth"));

render("trunk");