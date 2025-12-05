// Shared state helpers
(function () {
  const STORAGE_KEY = "ccmhub_state";

  const sampleOutlets = [
    { id: crypto.randomUUID(), name: "Campari", address: "Hans im Glück, Munich", campaign: "Campari" },
  ];

  const sampleCalcs = [
    { id: "CALC-001", createdAt: "2024-11-05", articles: 12 },
    { id: "CALC-002", createdAt: "2024-11-08", articles: 8 },
    { id: "CALC-003", createdAt: "2024-11-10", articles: 15 },
  ];

  const defaultState = {
    user: { name: "Guest", email: "guest@example.com" },
    outlets: [],
    calculations: [],
    theme: "light",
    seededSample: false,
    onboardingSeen: false,
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
        seededSample: !!parsed.seededSample,
        onboardingSeen: !!parsed.onboardingSeen,
      };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function seedSampleData(state) {
    if (state.seededSample) return state;
    const next = { ...state, seededSample: true };
    if (!next.outlets.length) {
      next.outlets = sampleOutlets;
    }
    if (!next.calculations.length) {
      next.calculations = sampleCalcs;
    }
    return next;
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

  window.CCMState = { defaultState, loadState, saveState, seedSampleData, updateUserLabels };
})();
