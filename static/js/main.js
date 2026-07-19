const toast = document.querySelector("#toast");
const startButton = document.querySelector("#startButton");
const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const modalClose = document.querySelector("#modalClose");

let toastTimer;

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

document.querySelectorAll(".copy-trigger").forEach((button) => {
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
