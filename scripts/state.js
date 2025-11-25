// Shared state helpers
(function () {
  const STORAGE_KEY = "ccmhub_state";

  const defaultState = {
    user: { name: "Guest", email: "guest@example.com" },
    outlets: [],
    theme: "light",
    calculations: [
      { id: "CALC-001", createdAt: "2024-11-05", articles: 12 },
      { id: "CALC-002", createdAt: "2024-11-08", articles: 8 },
      { id: "CALC-003", createdAt: "2024-11-10", articles: 15 },
    ],
    alertsEnabled: true,
  };

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultState };
      const parsed = JSON.parse(stored);
      return {
        ...defaultState,
        ...parsed,
        outlets: parsed.outlets || [],
        calculations: Array.isArray(parsed.calculations) ? parsed.calculations : defaultState.calculations,
        theme: parsed.theme || defaultState.theme,
      };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function seedOutlets(state) {
    if (state.outlets.length) return state;
    return {
      ...state,
      outlets: [{ id: crypto.randomUUID(), name: "Campari", address: "Hans im Glück, Munich", campaign: "Campari" }],
    };
  }

  function updateUserLabels(state) {
    const nameEl = document.getElementById("user-name-label");
    const emailEl = document.getElementById("user-email-label");
    if (nameEl) nameEl.textContent = state.user.name;
    if (emailEl) emailEl.textContent = state.user.email;
    const settingsName = document.getElementById("settings-name");
    const settingsEmail = document.getElementById("settings-email");
    if (settingsName) settingsName.textContent = state.user.name;
    if (settingsEmail) settingsEmail.textContent = state.user.email;
  }

  window.CCMState = { defaultState, loadState, saveState, seedOutlets, updateUserLabels };
})();
