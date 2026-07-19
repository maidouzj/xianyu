const copyButton = document.querySelector("#copyButton");
const copyButtonText = document.querySelector("#copyButtonText");
const toast = document.querySelector("#toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
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

copyButton.addEventListener("click", async () => {
  try {
    await copyText(copyButton.dataset.copy);
    copyButton.classList.add("copied");
    copyButtonText.textContent = "复制成功";
    showToast("口令已复制到剪贴板");
    window.setTimeout(() => {
      copyButton.classList.remove("copied");
      copyButtonText.textContent = "复制口令";
    }, 1800);
  } catch (error) {
    showToast("复制失败，请手动选择口令");
  }
});
