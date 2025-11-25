// Page wiring for CCM HUB static prototype
(function () {
  const { loadState, saveState, seedOutlets, updateUserLabels, defaultState } = window.CCMState;
  const { renderDashboard, renderOutletsGrid, renderOutletDetails, renderCalculations, renderPerformance, renderHelpFaq } = window.CCMRender;
  const { init: initNotifications } = window.CCMNotifications;

  function wireSearch(state, page) {
    const headerInput = document.getElementById("search-input");
    const outletSearch = document.getElementById("outlet-search");
    const calcSearch = document.getElementById("calc-search");

    const handleOutletsFilter = () => {
      const term = (outletSearch?.value || headerInput?.value || "").toLowerCase();
      renderOutletsGrid(state, term);
    };

    const handleCalculationsFilter = () => {
      const term = (calcSearch?.value || headerInput?.value || "").toLowerCase();
      renderCalculations(state, term);
    };

    if (page === "outlets") {
      [headerInput, outletSearch].forEach((input) => {
        if (input) input.addEventListener("input", handleOutletsFilter);
      });
    }

    if (page === "calculations") {
      [headerInput, calcSearch].forEach((input) => {
        if (input) input.addEventListener("input", handleCalculationsFilter);
      });
    }
  }

  function wireModal(state) {
    const modal = document.getElementById("create-outlet-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.style.display = "none";
    const openButtons = document.querySelectorAll("[data-open-modal]");
    openButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
      })
    );
    const closeButtons = [document.getElementById("close-create-outlet"), document.getElementById("cancel-create-outlet")];
    closeButtons.forEach((btn) => {
      if (btn)
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          modal.classList.add("hidden");
          modal.style.display = "none";
        });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
      }
    });
    const form = document.getElementById("create-outlet-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("outlet-name").value.trim();
        const address = document.getElementById("outlet-address").value.trim();
        const campaign = document.getElementById("outlet-campaign").value.trim();
        if (!name || !address || !campaign) return;
        state.outlets.push({ id: crypto.randomUUID(), name, address, campaign });
        saveState(state);
        modal.classList.add("hidden");
        modal.style.display = "none";
        form.reset();
        const filterTerm = (document.getElementById("outlet-search")?.value || document.getElementById("search-input")?.value || "").toLowerCase();
        renderDashboard(state);
        renderOutletsGrid(state, filterTerm);
        renderCalculations(state);
        renderPerformance(state);
      });
    }
  }

  function wireCalculationActions(state) {
    const table = document.getElementById("calc-table-body");
    const searchField = document.getElementById("calc-search");
    if (!table) return;

    const applyFilter = () => {
      const term = (searchField?.value || document.getElementById("search-input")?.value || "").toLowerCase();
      renderCalculations(state, term);
    };

    table.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest("[data-delete-calc]");
      if (deleteBtn) {
        const id = deleteBtn.dataset.deleteCalc;
        state.calculations = state.calculations.filter((calc) => calc.id !== id);
        saveState(state);
        applyFilter();
      }
    });
  }

  function wireLogout(state) {
    const btn = document.getElementById("logout-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      saveState({ ...defaultState });
      window.location.href = "index.html";
    });
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  function wireSettings(state) {
    const alertsBtn = document.getElementById("settings-alerts");
    if (alertsBtn) {
      alertsBtn.addEventListener("click", () => {
        state.alertsEnabled = !state.alertsEnabled;
        saveState(state);
        alertsBtn.textContent = state.alertsEnabled ? "Enabled" : "Disabled";
        alertsBtn.classList.toggle("bg-gray-200", state.alertsEnabled);
        alertsBtn.classList.toggle("bg-gray-300", !state.alertsEnabled);
      });
    }

    const themeToggle = document.getElementById("theme-toggle");
    const themeTrack = themeToggle ? themeToggle.nextElementSibling : null;
    if (themeToggle) {
      const syncToggle = () => {
        themeToggle.checked = state.theme === "dark";
        if (themeTrack) {
          themeTrack.classList.toggle("is-on", themeToggle.checked);
        }
      };
      syncToggle();
      themeToggle.addEventListener("change", () => {
        state.theme = themeToggle.checked ? "dark" : "light";
        applyTheme(state.theme);
        saveState(state);
        syncToggle();
      });
      themeToggle.addEventListener("click", () => {
        themeToggle.blur();
      });
    }

    document.querySelectorAll("[data-toggle-track]").forEach((input) => {
      const track = input.nextElementSibling;
      const sync = () => track?.classList.toggle("is-on", input.checked);
      sync();
      input.addEventListener("change", sync);
      input.addEventListener("click", () => input.blur());
    });

    const tabButtons = Array.from(document.querySelectorAll("[data-tab-btn]"));
    const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
    if (tabButtons.length && panels.length) {
      const setActiveTab = (key) => {
        tabButtons.forEach((btn) => {
          const isActive = btn.dataset.tabBtn === key;
          btn.classList.toggle("text-gray-900", isActive);
          btn.classList.toggle("text-gray-500", !isActive);
          btn.classList.toggle("border-b-2", isActive);
          btn.classList.toggle("border-[#FDD42B]", isActive);
          btn.classList.toggle("border-transparent", !isActive);
        });
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.tabPanel !== key;
        });
      };
      setActiveTab("general");
      tabButtons.forEach((btn) =>
        btn.addEventListener("click", () => setActiveTab(btn.dataset.tabBtn))
      );
    }
  }

  function initLogin() {
    const form = document.getElementById("login-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value || "user@ccmhub.com";
      let state = loadState();
      state.user = { name: "Operator", email };
      state = seedOutlets(state);
      saveState(state);
      window.location.href = "dashboard.html";
    });
    document.getElementById("goto-register")?.addEventListener("click", () => {
      window.location.href = "register.html";
    });
    document.querySelectorAll("[data-auth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        let state = seedOutlets(loadState());
        state.user = { name: "Operator", email: "user@ccmhub.com" };
        saveState(state);
        window.location.href = "dashboard.html";
      });
    });
  }

  function wirePerformanceView(state) {
    const cardsBtn = document.getElementById("performance-cards-btn");
    const tableBtn = document.getElementById("performance-table-btn");
    if (!cardsBtn || !tableBtn) return;

    const setActive = (mode) => {
      const activeClasses = ["bg-[#FDD42B]", "text-gray-900", "border", "border-[#e6c11f]"];
      const inactiveClasses = ["bg-white", "text-gray-800", "border", "border-gray-200"];

      if (mode === "cards") {
        cardsBtn.classList.add(...activeClasses);
        cardsBtn.classList.remove(...inactiveClasses);
        tableBtn.classList.add(...inactiveClasses);
        tableBtn.classList.remove(...activeClasses);
      } else {
        tableBtn.classList.add(...activeClasses);
        tableBtn.classList.remove(...inactiveClasses);
        cardsBtn.classList.add(...inactiveClasses);
        cardsBtn.classList.remove(...activeClasses);
      }
      renderPerformance(state, mode);
    };

    cardsBtn.addEventListener("click", () => setActive("cards"));
    tableBtn.addEventListener("click", () => setActive("table"));
  }

  function initRegister() {
    const form = document.getElementById("register-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("register-name").value || "New User";
      const email = document.getElementById("register-email").value || "new@ccmhub.com";
      let state = loadState();
      state.user = { name, email };
      saveState(state);
      window.location.href = "verification.html";
    });
    document.getElementById("goto-login-from-register")?.addEventListener("click", () => {
      window.location.href = "index.html";
    });
    document.querySelectorAll("[data-auth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        let state = seedOutlets(loadState());
        state.user = { name: "Operator", email: "user@ccmhub.com" };
        saveState(state);
        window.location.href = "dashboard.html";
      });
    });
  }

  function initVerification() {
    const form = document.getElementById("verification-form");
    if (!form) return;
    const label = document.getElementById("verification-email-label");
    const verifyBtn = document.getElementById("verify-btn");
    const otpInputs = Array.from(document.querySelectorAll(".otp-box"));
    const state = loadState();
    if (label) label.textContent = state.user.email || "your email";

    const updateButtonState = () => {
      const code = otpInputs.map((i) => i.value.trim()).join("");
      if (code.length >= 4) {
        verifyBtn?.classList.remove("bg-gray-200", "text-gray-500", "cursor-not-allowed");
        verifyBtn?.classList.add("bg-gray-900", "text-white");
        if (verifyBtn) verifyBtn.disabled = false;
      } else {
        verifyBtn?.classList.add("bg-gray-200", "text-gray-500", "cursor-not-allowed");
        verifyBtn?.classList.remove("bg-gray-900", "text-white");
        if (verifyBtn) verifyBtn.disabled = true;
      }
    };

    otpInputs.forEach((input, idx) => {
      input.addEventListener("input", (e) => {
        const target = e.target;
        target.value = target.value.replace(/[^0-9]/g, "").slice(0, 1);
        if (target.value && idx < otpInputs.length - 1) {
          otpInputs[idx + 1].focus();
        }
        updateButtonState();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && idx > 0) {
          otpInputs[idx - 1].focus();
        }
      });
    });

    updateButtonState();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = otpInputs.map((i) => i.value.trim()).join("");
      if (code.length < 4) return;
      let nextState = seedOutlets(state);
      saveState(nextState);
      window.location.href = "dashboard.html";
    });
    document.getElementById("back-to-register")?.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  function initAppPages(page) {
    const state = seedOutlets(loadState());
    saveState(state);
    applyTheme(state.theme);
    updateUserLabels(state);
    wireLogout(state);
    wireModal(state);
    wireSettings(state);
    wireSearch(state, page);
    if (page === "dashboard") renderDashboard(state);
    if (page === "outlets") renderOutletsGrid(state);
    if (page === "outlet-details") renderOutletDetails(state);
    if (page === "calculations") {
      renderCalculations(state);
      wireCalculationActions(state);
    }
    if (page === "help") renderHelpFaq();
    if (page === "performance") {
      renderPerformance(state);
      wirePerformanceView(state);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.log("[App] DOMContentLoaded");
    const page = document.body.dataset.page;
    console.log("[App] page:", page);
    if (page === "login") initLogin();
    if (page === "register") initRegister();
    if (page === "verification") initVerification();
    if (["dashboard", "outlets", "outlet-details", "calculations", "performance", "settings", "help"].includes(page)) {
      initAppPages(page);
      initNotifications();
    }
  });
})();
