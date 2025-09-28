// ======================
// Переключение темы
// ======================
const themeToggle = document.getElementById("themeToggle");

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Проверяем настройки при загрузке
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  setTheme(true);
} else {
  setTheme(false);
}

// Клик по кнопке
themeToggle?.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});

// ======================
// Анимация появления блоков
// ======================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Все элементы с классом .reveal
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ======================
// Модальное окно для кейсов
// ======================

// Создаём модальное окно в DOM
const modalHTML = `
<div id="caseModal" class="fixed inset-0 hidden items-center justify-center z-50">
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div class="relative bg-white dark:bg-neutral-900 max-w-2xl w-full rounded-2xl shadow-lg p-6 animate-fadeIn">
    <button id="closeModal" class="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">✖</button>
    <div id="modalContent">
      <!-- Контент будет подставляться -->
    </div>
  </div>
</div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("caseModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Данные кейсов (можно подгрузить с сервера)
const casesData = {
  case1: {
    title: "Финтех-приложение",
    desc: "Редизайн онбординга. Сократил шаги с 7 до 4, добавил прогресс-бар и подсказки.",
    results: ["KYC +18%", "Отказы -23%", "Время -32%"],
    img: "img/case1.jpg",
  },
  case2: {
    title: "Маркетплейс услуг",
    desc: "Ввел умные фильтры, закрепил сортировку, добавил чипы активных фильтров.",
    results: ["CTR +14%", "Конверсия +9%", "Возвраты -6%"],
    img: "img/case2.jpg",
  },
};

// Открытие модалки
document.querySelectorAll(".openModal").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const caseKey = `case${i + 1}`;
    const data = casesData[caseKey];

    modalContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">${data.title}</h2>
      <img src="${data.img}" class="w-full h-48 object-cover rounded-lg mb-4" />
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">${data.desc}</p>
      <ul class="grid grid-cols-3 gap-3">
        ${data.results
          .map(
            (r) =>
              `<li class="p-3 border rounded-lg dark:border-neutral-700 text-center">${r}</li>`
          )
          .join("")}
      </ul>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
});

// Закрытие модалки
closeModal?.addEventListener("click", () => {
  modal.classList.add("hidden");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// ======================
// Форма обратной связи (заглушка)
// ======================
const contactForm = document.querySelector("#contact form");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  alert(`Спасибо, ${data["name"] || "друг"}! Я свяжусь с вами по email: ${data["email"]}`);
  contactForm.reset();
});