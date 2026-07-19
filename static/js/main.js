const toast = document.querySelector("#toast");
const taskCards = [...document.querySelectorAll(".task-card")];
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const stickyCount = document.querySelector("#stickyCount");
const startButton = document.querySelector("#startButton");
const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const modalClose = document.querySelector("#modalClose");

const storageKey = "xianyu-task-progress-v2";
let completedSteps = new Set();
let toastTimer;

try {
  const savedSteps = JSON.parse(localStorage.getItem(storageKey) || "[]");
  completedSteps = new Set(savedSteps.map(Number));
} catch (error) {
  completedSteps = new Set();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2100);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy failed");
}

async function handleCopy(button) {
  try {
    await copyText(button.dataset.copy);
    showToast("闲鱼口令已复制");
    return true;
  } catch (error) {
    showToast("复制失败，请长按口令手动复制");
    return false;
  }
}

function renderProgress() {
  taskCards.forEach((card) => {
    const step = Number(card.dataset.step);
    const completed = completedSteps.has(step);
    card.classList.toggle("completed", completed);
    const button = card.querySelector(".complete-button");
    button.innerHTML = completed
      ? "<span>✓</span> 已完成，点击撤销"
      : "<span>✓</span> 标记为已完成";
  });

  const count = completedSteps.size;
  progressText.textContent = `${count} / 5`;
  stickyCount.textContent = String(count);
  progressBar.style.width = `${count * 20}%`;
  localStorage.setItem(storageKey, JSON.stringify([...completedSteps]));

  if (count === 5) showToast("全部步骤已完成");
}

document.querySelectorAll(".copy-trigger, #shareText").forEach((button) => {
  button.addEventListener("click", () => handleCopy(button));
});

startButton.addEventListener("click", async () => {
  const copied = await handleCopy(startButton);
  if (copied) {
    window.setTimeout(() => {
      window.location.href = startButton.dataset.url;
    }, 420);
  }
});

taskCards.forEach((card) => {
  card.querySelector(".complete-button").addEventListener("click", () => {
    const step = Number(card.dataset.step);
    if (completedSteps.has(step)) completedSteps.delete(step);
    else completedSteps.add(step);
    renderProgress();
  });
});

document.querySelectorAll(".image-preview").forEach((button) => {
  button.addEventListener("click", () => {
    modalImage.src = button.dataset.image;
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  modalImage.removeAttribute("src");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal || event.target.classList.contains("modal-scroll")) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("open")) closeModal();
});

renderProgress();
