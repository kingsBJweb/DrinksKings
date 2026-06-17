// ════════════════════════════════════════════════════
//  DRINKS KINGS — auth.js
//  Autenticação Firebase + Gerenciamento de Favoritos
// ════════════════════════════════════════════════════

import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Estado global do usuário atual
export let currentUser = null;
export let userFavorites = [];

// ── Observador de estado de autenticação ─────────── 
onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    // Usuário logado: atualiza UI e carrega favoritos
    document.getElementById("auth-logged-out").classList.add("hidden");
    document.getElementById("auth-logged-in").classList.remove("hidden");

    const displayName = user.displayName || user.email.split("@")[0];
    document.getElementById("user-name-display").textContent = `Olá, ${displayName}`;

    await loadFavorites();
    renderFavoritesSection();

  } else {
    // Usuário deslogado: reseta UI
    document.getElementById("auth-logged-out").classList.remove("hidden");
    document.getElementById("auth-logged-in").classList.add("hidden");

    userFavorites = [];
    renderFavoritesSection();
  }
});

// ════════════════════════════════════════════════════
//  CADASTRO
// ════════════════════════════════════════════════════
window.registerUser = async function () {
  const name     = document.getElementById("reg-name").value.trim();
  const email    = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const errEl    = document.getElementById("reg-error");

  errEl.classList.add("hidden");

  if (!name || !email || !password) {
    return showAuthError(errEl, "Preencha todos os campos.");
  }
  if (password.length < 6) {
    return showAuthError(errEl, "A senha deve ter pelo menos 6 caracteres.");
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Salva o nome no perfil do Auth
    await updateProfile(cred.user, { displayName: name });

    // Cria documento do usuário no Firestore
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      favorites: [],
      createdAt: new Date().toISOString()
    });

    closeAuthModal();
  } catch (err) {
    showAuthError(errEl, translateFirebaseError(err.code));
  }
};

// ════════════════════════════════════════════════════
//  LOGIN
// ════════════════════════════════════════════════════
window.loginUser = async function () {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl    = document.getElementById("login-error");

  errEl.classList.add("hidden");

  if (!email || !password) {
    return showAuthError(errEl, "Preencha e-mail e senha.");
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeAuthModal();
  } catch (err) {
    showAuthError(errEl, translateFirebaseError(err.code));
  }
};

// ════════════════════════════════════════════════════
//  LOGOUT
// ════════════════════════════════════════════════════
window.logoutUser = async function () {
  await signOut(auth);
};

// ════════════════════════════════════════════════════
//  FAVORITOS — Carregar do Firestore
// ════════════════════════════════════════════════════
async function loadFavorites() {
  if (!currentUser) return;

  try {
    const snap = await getDoc(doc(db, "users", currentUser.uid));
    if (snap.exists()) {
      userFavorites = snap.data().favorites || [];
    }
  } catch (err) {
    console.error("Erro ao carregar favoritos:", err);
  }
}

// ════════════════════════════════════════════════════
//  FAVORITOS — Adicionar / Remover
// ════════════════════════════════════════════════════
window.toggleFavorite = async function () {
  if (!currentUser) {
    openAuthModal("login");
    return;
  }

  const drinkId = window.currentModalDrinkId;
  if (!drinkId) return;

  const btn     = document.getElementById("modal-fav-btn");
  const isFaved = userFavorites.includes(drinkId);
  const userRef = doc(db, "users", currentUser.uid);

  try {
    if (isFaved) {
      await updateDoc(userRef, { favorites: arrayRemove(drinkId) });
      userFavorites = userFavorites.filter(id => id !== drinkId);
      btn.textContent = "♡ Salvar nos Favoritos";
    } else {
      await updateDoc(userRef, { favorites: arrayUnion(drinkId) });
      userFavorites = [...userFavorites, drinkId];
      btn.textContent = "♥ Favoritado!";
    }
    renderFavoritesSection();
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
  }
};

// ════════════════════════════════════════════════════
//  Renderiza seção de favoritos
// ════════════════════════════════════════════════════
function renderFavoritesSection() {
  // Importação dinâmica para evitar dependência circular
  import("./app.js").then(({ renderFavorites }) => {
    renderFavorites();
  });
}

// ════════════════════════════════════════════════════
//  UTILITÁRIOS
// ════════════════════════════════════════════════════
function showAuthError(el, message) {
  el.textContent = message;
  el.classList.remove("hidden");
}

function translateFirebaseError(code) {
  const messages = {
    "auth/email-already-in-use":   "Este e-mail já está cadastrado.",
    "auth/invalid-email":          "E-mail inválido.",
    "auth/weak-password":          "Senha muito fraca. Use no mínimo 6 caracteres.",
    "auth/user-not-found":         "Usuário não encontrado.",
    "auth/wrong-password":         "Senha incorreta.",
    "auth/invalid-credential":     "E-mail ou senha incorretos.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "auth/too-many-requests":      "Muitas tentativas. Tente novamente em breve."
  };
  return messages[code] || "Ocorreu um erro. Tente novamente.";
}

// ── Controles do modal de Auth ────────────────────
window.openAuthModal = function (tab = "login") {
  document.getElementById("auth-modal").classList.remove("hidden");
  switchTab(tab);
};

window.closeAuthModal = function () {
  document.getElementById("auth-modal").classList.add("hidden");
};

window.switchTab = function (tab) {
  document.getElementById("form-login").classList.toggle("hidden",    tab !== "login");
  document.getElementById("form-register").classList.toggle("hidden", tab !== "register");
  document.getElementById("tab-login").classList.toggle("active",     tab === "login");
  document.getElementById("tab-register").classList.toggle("active",  tab === "register");
};
