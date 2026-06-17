// ════════════════════════════════════════════════════
//  DRINKS KINGS — app.js
//  Lógica principal: age gate, cards, modal, datas
// ════════════════════════════════════════════════════

import { DRINKS, SPECIAL_DATES } from "./data.js";
import { currentUser, userFavorites } from "./auth.js";

// ══════════════════════════════════════════════════
//  AGE GATE
// ══════════════════════════════════════════════════
const AGE_KEY = "dk_age_verified";

function checkAgeGate() {
  if (sessionStorage.getItem(AGE_KEY) === "true") {
    showMainSite();
    return;
  }
  document.getElementById("age-gate").style.display = "flex";
}

document.getElementById("age-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const day   = parseInt(document.getElementById("age-day").value);
  const month = parseInt(document.getElementById("age-month").value);
  const year  = parseInt(document.getElementById("age-year").value);
  const errEl = document.getElementById("age-error");

  // Validação básica
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    return showAgeError(errEl, "Por favor, preencha todos os campos corretamente.");
  }
  if (month < 1 || month > 12) {
    return showAgeError(errEl, "Mês inválido.");
  }
  if (day < 1 || day > 31) {
    return showAgeError(errEl, "Dia inválido.");
  }
  if (year < 1900 || year > new Date().getFullYear()) {
    return showAgeError(errEl, "Ano inválido.");
  }

  // Calcula idade
  const birthDate = new Date(year, month - 1, day);
  const today     = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    showAgeError(
      errEl,
      "❌ Acesso negado. Este site é exclusivo para maiores de 18 anos."
    );
    document.getElementById("age-day").value   = "";
    document.getElementById("age-month").value = "";
    document.getElementById("age-year").value  = "";
    return;
  }

  // Aprovado
  sessionStorage.setItem(AGE_KEY, "true");
  document.getElementById("age-gate").style.animation = "fadeOut .3s ease forwards";
  setTimeout(() => {
    document.getElementById("age-gate").style.display = "none";
    showMainSite();
  }, 300);
});

function showAgeError(el, msg) {
  el.textContent = msg;
  el.classList.remove("hidden");
}

function showMainSite() {
  document.getElementById("main-site").classList.remove("hidden");
  renderDrinks();
  renderSpecialDates();
}

// ══════════════════════════════════════════════════
//  RENDER DRINKS GRID
// ══════════════════════════════════════════════════
function renderDrinks() {
  const grid = document.getElementById("drinks-grid");
  grid.innerHTML = DRINKS.map(drink => drinkCardHTML(drink)).join("");
}

function drinkCardHTML(drink) {
  return `
    <article class="drink-card" onclick="openDrinkModal('${drink.id}')" tabindex="0"
             onkeypress="if(event.key==='Enter') openDrinkModal('${drink.id}')">
      <span class="drink-card__emoji">${drink.emoji}</span>
      <div class="drink-card__body">
        <h3 class="drink-card__name">${drink.name}</h3>
        <p class="drink-card__desc">${drink.description}</p>
        <div class="drink-card__footer">
          <span class="alcohol-badge alcohol-badge--${drink.alcoholLevel}">${drink.alcoholLabel}</span>
          <span class="drink-card__cta">Ver receita →</span>
        </div>
      </div>
    </article>
  `;
}

// ══════════════════════════════════════════════════
//  RENDER SPECIAL DATES
// ══════════════════════════════════════════════════
function renderSpecialDates() {
  const grid = document.getElementById("dates-grid");
  grid.innerHTML = SPECIAL_DATES.map(date => `
    <div class="date-card">
      <span class="date-card__icon">${date.icon}</span>
      <h3 class="date-card__name">${date.name}</h3>
      <p class="date-card__date">📅 ${date.date}</p>
      <div class="date-card__drinks">
        ${date.drinks.map(d => `
          <div class="date-drink-item" onclick="openDrinkByName('${d.id}', '${d.name}', '${d.emoji}')">
            <span>${d.emoji}</span>
            <span>${d.name}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// ══════════════════════════════════════════════════
//  RENDER FAVORITES
// ══════════════════════════════════════════════════
export function renderFavorites() {
  const section  = document.getElementById("favorites-content");
  const grid     = document.getElementById("favorites-grid");

  const favDrinks = DRINKS.filter(d => userFavorites.includes(d.id));

  if (!currentUser) {
    section.innerHTML = `<p class="empty-state">Faça login para salvar seus drinks favoritos ✨</p>`;
    grid.innerHTML = "";
    return;
  }

  if (favDrinks.length === 0) {
    section.innerHTML = `<p class="empty-state">Você ainda não tem favoritos. Explore os drinks acima! 🍹</p>`;
    grid.innerHTML = "";
    return;
  }

  section.innerHTML = "";
  grid.innerHTML = favDrinks.map(drink => drinkCardHTML(drink)).join("");
}

// ══════════════════════════════════════════════════
//  DRINK MODAL
// ══════════════════════════════════════════════════
window.currentModalDrinkId = null;

window.openDrinkModal = function (drinkId) {
  const drink = DRINKS.find(d => d.id === drinkId);
  if (!drink) return;

  window.currentModalDrinkId = drinkId;

  document.getElementById("modal-emoji").textContent    = drink.emoji;
  document.getElementById("modal-title").textContent    = drink.name;
  document.getElementById("modal-alcohol").textContent  = drink.alcoholLabel;
  document.getElementById("modal-category").textContent = drink.category;
  document.getElementById("modal-tip").textContent      = drink.tip;

  document.getElementById("modal-ingredients").innerHTML =
    drink.ingredients.map(i => `<li>${i}</li>`).join("");

  document.getElementById("modal-steps").innerHTML =
    drink.steps.map(s => `<li>${s}</li>`).join("");

  // Botão de favorito
  const authActions = document.getElementById("modal-auth-actions");
  const favBtn      = document.getElementById("modal-fav-btn");

  if (currentUser) {
    authActions.classList.remove("hidden");
    const isFaved = userFavorites.includes(drinkId);
    favBtn.textContent = isFaved ? "♥ Favoritado!" : "♡ Salvar nos Favoritos";
  } else {
    authActions.classList.add("hidden");
  }

  document.getElementById("drink-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

// Para datas especiais onde o drink pode não existir na lista
window.openDrinkByName = function (drinkId, name, emoji) {
  const drink = DRINKS.find(d => d.id === drinkId);
  if (drink) {
    openDrinkModal(drinkId);
  } else {
    // Drink especial sem receita completa na base
    window.currentModalDrinkId = null;
    document.getElementById("modal-emoji").textContent    = emoji;
    document.getElementById("modal-title").textContent    = name;
    document.getElementById("modal-alcohol").textContent  = "Especial";
    document.getElementById("modal-category").textContent = "Data Especial";
    document.getElementById("modal-tip").textContent      = "🌟 Este drink é especial para a ocasião. Em breve teremos a receita completa!";
    document.getElementById("modal-ingredients").innerHTML = "<li>Receita em breve...</li>";
    document.getElementById("modal-steps").innerHTML       = "<li>Receita em breve...</li>";
    document.getElementById("modal-auth-actions").classList.add("hidden");
    document.getElementById("drink-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
};

window.closeModal = function () {
  document.getElementById("drink-modal").classList.add("hidden");
  document.body.style.overflow = "";
};

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    if (typeof closeAuthModal === "function") closeAuthModal();
  }
});

// ══════════════════════════════════════════════════
//  MOBILE NAV
// ══════════════════════════════════════════════════
document.getElementById("menu-btn").addEventListener("click", () => {
  const nav = document.getElementById("mobile-nav");
  nav.classList.toggle("hidden");
});

window.closeMobileNav = function () {
  document.getElementById("mobile-nav").classList.add("hidden");
};

// ══════════════════════════════════════════════════
//  INICIALIZA
// ══════════════════════════════════════════════════
checkAgeGate();

// Adiciona keyframe fadeOut dinamicamente
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
`;
document.head.appendChild(style);
