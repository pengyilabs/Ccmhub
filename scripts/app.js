// Page wiring for CCM HUB static prototype
(function () {
  const { loadState, saveState, seedOutlets, updateUserLabels, defaultState } = window.CCMState;
  const { renderDashboard, renderOutletsGrid, renderOutletDetails, renderCalculations, renderPerformance } = window.CCMRender;
  const { init: initNotifications } = window.CCMNotifications;

  function wireSearch(state) {
    const input = document.getElementById("search-input");
    if (!input) return;
    input.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      if (!term) {
        renderOutletsGrid(state);
        return;
      }
      const filtered = state.outlets.filter(
        (o) =>
          o.name.toLowerCase().includes(term) ||
          o.address.toLowerCase().includes(term) ||
          o.campaign.toLowerCase().includes(term)
      );
      const grid = document.getElementById("outlet-grid");
      if (!grid) return;
      grid.innerHTML = "";
      filtered.forEach((outlet) => {
        const card = document.createElement("article");
        card.className = "bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3";
        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-gray-500">Outlet</p>
              <h3 class="text-lg font-semibold text-gray-900">${outlet.name}</h3>
              <p class="text-sm text-gray-500">${outlet.address}</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#FDD42B] text-gray-900 text-xs font-semibold shadow-sm">${outlet.campaign}</span>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>Reports: ${4 + Math.floor(Math.random() * 4)}</span>
            <span class="text-green-600 font-semibold">Active</span>
          </div>
          <div class="flex items-center gap-3">
            <a class="text-sm font-semibold text-gray-900 hover:underline" href="outlet-details.html?id=${outlet.id}">View details</a>
            <button class="text-sm text-gray-600 hover:underline" type="button">Download report</button>
          </div>
        `;
        grid.appendChild(card);
      });
    });
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
        renderDashboard(state);
        renderOutletsGrid(state);
        renderCalculations(state);
        renderPerformance(state);
      });
    }
  }

  function wireLogout(state) {
    const btn = document.getElementById("logout-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      saveState({ ...defaultState });
      window.location.href = "index.html";
    });
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
    updateUserLabels(state);
    wireLogout(state);
    wireModal(state);
    wireSettings(state);
    wireSearch(state);
    if (page === "dashboard") renderDashboard(state);
    if (page === "outlets") renderOutletsGrid(state);
    if (page === "outlet-details") renderOutletDetails(state);
    if (page === "calculations") renderCalculations(state);
    if (page === "performance") renderPerformance(state);
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
