// Page wiring for CCM HUB static prototype
(function () {
  const { loadState, saveState, seedSampleData, updateUserLabels, defaultState } = window.CCMState;
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

  function wireOnboarding(state) {
    const modal = document.getElementById("onboarding-modal");
    if (!modal) return;
    const closeBtn = document.getElementById("onboard-close");
    const skipBtn = document.getElementById("onboard-skip");
    const nextBtn = document.getElementById("onboard-next");
    const backBtn = document.getElementById("onboard-back");
    const titleEl = document.getElementById("onboard-title");
    const bodyEl = document.getElementById("onboard-body");
    const stepLabel = document.getElementById("onboard-step-label");
    const dots = document.getElementById("onboard-dots");
    const visual = document.getElementById("onboard-visual");
    const textBlock = document.getElementById("onboard-text");
    const leading = document.getElementById("onboard-leading");

    const steps = [
      {
        title: "Welcome to your CCM HUB",
        body: "Let's walk you through how everything works — outlets, services, and performance — so you can start managing your network efficiently.",
      },
      {
        title: "Create your first Outlet",
        body: "Outlets represent your physical locations — restaurants or bars. Each outlet can have its own services, calculations, and performance metrics.",
        visual: `
          <div class="flex items-center justify-center">
            <div class="w-[380px] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.2)] border border-gray-200 bg-white">
              <div class="relative">
                <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80" alt="Hans im Glück outdoor seating" class="w-full h-[190px] object-cover" />
                <span class="absolute top-3 right-3 inline-flex items-center px-3 h-7 rounded-full bg-[#FDD42B] text-xs font-semibold text-gray-900 border border-[#e6c11f]">Aperol Spritz</span>
              </div>
              <div class="p-4 space-y-3">
                <div class="space-y-1">
                  <p class="text-base font-semibold text-gray-900">Hans im Glück</p>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fa-regular fa-location-dot"></i>
                    <span>Marienplatz, Munich</span>
                  </div>
                </div>
                <div class="grid grid-cols-4 text-center text-sm text-gray-700 border-t border-gray-100 pt-3">
                  <div class="space-y-1">
                    <p class="text-base font-semibold text-gray-900">3</p>
                    <p class="text-xs text-gray-500">Services</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-base font-semibold text-gray-900">12</p>
                    <p class="text-xs text-gray-500">Reports</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-base font-semibold text-green-600">Active</p>
                    <p class="text-xs text-gray-500">Status</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-base font-semibold text-gray-900">DCE</p>
                    <p class="text-xs text-gray-500">Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
      },
      {
        title: "Explore Services",
        body: "Each outlet can have multiple services linked to it. Services help you perform actions, manage processes, and analyze performance. Because services depend on outlets, they will only be available once you create at least one outlet.",
        visual: `
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              ${["Service A", "Service B"]
                .map(
                  (name) => `
                <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-left space-y-4">
                  <div>
                    <p class="text-base font-semibold text-gray-900">${name}</p>
                    <p class="text-sm text-gray-600 mt-1">A short description of what this service allows you to do.</p>
                  </div>
                  <div class="space-y-3">
                    <button class="w-full h-11 rounded-lg bg-[#FDD42B] text-sm font-semibold text-gray-900 border border-[#e6c11f]">Action One</button>
                    <p class="text-xs text-gray-600">Brief explanation of what happens when you select this option.</p>
                    <button class="w-full h-11 rounded-lg bg-[#FDD42B] text-sm font-semibold text-gray-900 border border-[#e6c11f]">Action Two</button>
                    <p class="text-xs text-gray-600">Short description for this secondary option.</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `,
      },
      {
        title: "Calculations Overview",
        body: "Calculations help you plan stock and measure campaign results. You can create detailed calculations for each outlet with articles.",
        visual: `
          <div class="w-full max-w-[620px] mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden text-left">
            <div class="border-b border-gray-200 text-center py-4 px-5">
              <p class="text-base font-semibold text-gray-900">New Calculation</p>
              <p class="text-sm text-gray-600">Create a new calculation for one of your outlets.</p>
            </div>
            <div class="px-5 py-4 space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-800 block text-center">Select Outlet *</label>
                <div class="h-11 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 flex items-center justify-center px-3">Hans im Glück - Marienplatz</div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-gray-800">Articles *</p>
                  <button class="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800">+ Add Row</button>
                </div>
                <table class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead class="bg-gray-50 text-gray-900">
                    <tr class="border-b border-gray-200">
                      <th class="px-4 py-3 text-left font-semibold">Article Name</th>
                      <th class="px-4 py-3 text-center font-semibold">Pieces</th>
                      <th class="px-4 py-3 text-center font-semibold">Boxes</th>
                      <th class="px-4 py-3 text-center font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3">Aperol Spritz Wall Sign</td>
                      <td class="px-4 py-3 text-center">12</td>
                      <td class="px-4 py-3 text-center">3</td>
                      <td class="px-4 py-3 text-center">€450</td>
                    </tr>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3">Aperol Pillow Set</td>
                      <td class="px-4 py-3 text-center">24</td>
                      <td class="px-4 py-3 text-center">6</td>
                      <td class="px-4 py-3 text-center">€280</td>
                    </tr>
                    <tr class="bg-gray-50 text-gray-900 font-semibold">
                      <td class="px-4 py-3">Total</td>
                      <td class="px-4 py-3 text-center">36</td>
                      <td class="px-4 py-3 text-center">9</td>
                      <td class="px-4 py-3 text-center">€730</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex items-center justify-end gap-3 pt-2">
                <button class="px-4 h-10 rounded-lg border border-gray-200 bg-white text-gray-800 font-semibold">Cancel</button>
                <button class="px-4 h-10 rounded-lg bg-[#FDD42B] text-gray-900 font-semibold border border-[#e6c11f] shadow-[0_10px_18px_rgba(253,212,43,0.35)]">Save Calculation</button>
              </div>
            </div>
          </div>
        `,
      },
      {
        title: "Performance Overview",
        body: "Track your outlets' performance with detailed metrics. Monitor subscribers, redeemers, review clicks, and conversion ratios for each location.",
        visual: `
          <div class="w-full max-w-[520px] mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div class="py-5 px-6 border-b border-gray-200 text-center">
              <p class="text-lg font-semibold text-gray-900">Restaurant Rustikeria</p>
            </div>
            <div class="px-6 py-5 space-y-5">
              <div class="flex items-center justify-between text-base text-gray-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center text-lg">👥</span>
                  <span>Subscribers</span>
                </div>
                <span class="text-base font-semibold text-gray-900">11</span>
              </div>
              <div class="flex items-center justify-between text-base text-gray-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-green-50 text-green-500 border border-green-100 flex items-center justify-center text-lg">↗</span>
                  <span>Redeemers</span>
                </div>
                <span class="text-base font-semibold text-gray-900">8</span>
              </div>
              <div class="flex items-center justify-between text-base text-gray-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center text-lg">✴</span>
                  <span>Review Clicks</span>
                </div>
                <span class="text-base font-semibold text-gray-900">24</span>
              </div>
              <div class="h-px bg-gray-200"></div>
              <div class="flex items-center justify-between text-base text-gray-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-[#fdd42b] text-yellow-800 border border-[#e6c11f] flex items-center justify-center text-lg"></span>
                  <span>Conversion Ratio</span>
                </div>
                <span class="text-base font-semibold text-gray-900">72.7%</span>
              </div>
            </div>
          </div>
        `,
      },
      {
        title: "",
        body: "",
        visual: `
          <div class="flex flex-col items-center justify-center gap-5 text-center max-w-xl mx-auto">
            <div class="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-2xl text-green-600">
              <i class="fa-solid fa-check"></i>
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-semibold text-gray-900">You're ready to go!</h3>
              <p class="text-sm text-gray-600 leading-6">You can now explore the dashboard, add outlets, or activate services anytime.</p>
              <p class="text-sm text-gray-500">Note: You can revisit this guide anytime from Help in your Dashboard.</p>
            </div>
            <div class="flex items-center gap-3 pt-2">
              <button data-open-modal class="px-4 h-11 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50">Add First Outlet</button>
              <button id="onboard-finish" class="px-5 h-11 rounded-lg bg-[#FDD42B] text-gray-900 font-semibold border border-[#e6c11f] shadow-[0_10px_18px_rgba(253,212,43,0.35)] hover:bg-[#f3cf6f]">Go to Overview</button>
            </div>
          </div>
        `,
      },
    ];

    let idx = 0;
    const total = steps.length;
    const updateView = () => {
      const step = steps[idx];
      if (titleEl) titleEl.textContent = step.title;
      if (bodyEl) bodyEl.textContent = step.body;
      if (textBlock) textBlock.style.display = step.title || step.body ? "block" : "none";
      if (visual) visual.innerHTML = step.visual || "";
      if (leading) {
        if (idx === 0) {
          leading.className = "flex justify-center";
          leading.innerHTML = `
            <div class="w-16 h-16 rounded-xl bg-[#FDD42B] border border-[#e6c11f] text-gray-900 font-bold text-2xl flex items-center justify-center shadow-md">C</div>
          `;
        } else {
          leading.className = "hidden";
          leading.innerHTML = "";
        }
      }
      if (stepLabel) {
        const hideLabel = idx === 0 || idx === total - 1;
        stepLabel.textContent = hideLabel ? "" : `Step ${idx + 1} of ${total}`;
      }
      if (dots) {
        dots.innerHTML = "";
        steps.forEach((_, i) => {
          const dot = document.createElement("span");
          dot.className = `w-2 h-2 rounded-full ${i === idx ? "bg-[#FDD42B]" : "bg-gray-300"}`;
          dots.appendChild(dot);
        });
      }
      if (backBtn) {
        const hideBack = idx === 0;
        backBtn.classList.toggle("hidden", true);
        backBtn.disabled = true;
      }
      if (skipBtn) {
        const showSkip = idx === 0;
        skipBtn.classList.toggle("hidden", !showSkip);
        skipBtn.disabled = !showSkip;
      }
      if (nextBtn) nextBtn.textContent = idx === total - 1 ? "Finish" : idx === 0 ? "Start Guide" : "Next";
    };

    const open = () => {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      document.body.classList.add("overflow-hidden");
      updateView();
    };
    const close = (markSeen = false) => {
      modal.classList.add("hidden");
      modal.style.display = "none";
      document.body.classList.remove("overflow-hidden");
      if (markSeen) {
        state.onboardingSeen = true;
        saveState(state);
      }
    };

    if (!state.onboardingSeen && !state.seededSample && document.body.dataset.page === "dashboard") {
      open();
    }

    closeBtn?.addEventListener("click", () => close(true));
    skipBtn?.addEventListener("click", () => close(true));
    nextBtn?.addEventListener("click", () => {
      if (idx < total - 1) {
        idx += 1;
        updateView();
      } else {
        close(true);
      }
    });
    backBtn?.addEventListener("click", () => {
      if (idx > 0) {
        idx -= 1;
        updateView();
      }
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close(true);
    });

    document.addEventListener("click", (e) => {
      const finishBtn = e.target.closest("#onboard-finish");
      if (finishBtn) {
        close(true);
        window.location.href = "dashboard.html";
      }
    });
  }

  function wireCalculationModal() {
    const modal = document.getElementById("new-calc-modal");
    const openBtn = document.querySelector("[data-open-calc-modal]");
    if (!modal || !openBtn) return;

    modal.classList.add("hidden");
    modal.style.display = "none";

    const cancelBtn = modal.querySelector("[data-calc-cancel]");
    const closeBtn = modal.querySelector("[data-calc-close]");
    const saveBtn = modal.querySelector("[data-calc-save]");

    const open = () => {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
      document.body.classList.add("overflow-hidden");
    };
    const close = () => {
      modal.classList.add("hidden");
      modal.style.display = "none";
      document.body.classList.remove("overflow-hidden");
    };

    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
    [cancelBtn, closeBtn, saveBtn].forEach((btn) => {
      btn?.addEventListener("click", (e) => {
        e.preventDefault();
        close();
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  }

  function wireLogout(state) {
    const btn = document.getElementById("logout-btn");
    if (!btn) return;

    let modal = document.getElementById("logout-confirm-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "logout-confirm-modal";
      document.body.appendChild(modal);
    }
    modal.className = "fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm";
    modal.style.display = "none";
    modal.innerHTML = `
      <div class="bg-white w-[620px] max-w-[95vw] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.26)] border border-gray-100 px-10 pt-10 pb-8 text-center space-y-6">
        <div class="w-14 h-14 mx-auto rounded-full border border-[#ffd4d7] bg-[#ffe9eb] text-[#f44336] flex items-center justify-center text-xl">
          <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div class="space-y-2">
          <h3 class="text-[21px] font-semibold text-[#1f2a3b]">Are you sure you want to log out?</h3>
          <p class="text-sm text-gray-600 leading-6">Your session will be closed and you will need to log in again to access the platform.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-2">
          <button type="button" data-logout-cancel class="w-full h-12 rounded-lg border border-gray-200 bg-white text-gray-800 font-semibold hover:bg-gray-50">Cancel</button>
          <button type="button" data-logout-confirm class="w-full h-12 rounded-lg bg-[#f44336] text-white font-semibold shadow-[0_10px_18px_rgba(244,67,54,0.3)] hover:bg-[#e53935]">Yes, log out</button>
        </div>
      </div>
    `;

    const openModal = () => {
      modal.classList.remove("hidden");
      modal.style.display = "flex";
    };
    const closeModal = () => {
      modal.classList.add("hidden");
      modal.style.display = "none";
    };

    const cancelBtn = modal.querySelector("[data-logout-cancel]");
    const confirmBtn = modal.querySelector("[data-logout-confirm]");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });

    cancelBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });

    confirmBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      saveState({ ...defaultState });
      window.location.href = "index.html";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
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
      state = seedSampleData(state);
      saveState(state);
      window.location.href = "dashboard.html";
    });
    document.getElementById("goto-register")?.addEventListener("click", () => {
      window.location.href = "register.html";
    });
    document.querySelectorAll("[data-auth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        let state = seedSampleData(loadState());
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
      state.seededSample = false;
      state.outlets = [];
      state.calculations = [];
      saveState(state);
      window.location.href = "verification.html";
    });
    document.getElementById("goto-login-from-register")?.addEventListener("click", () => {
      window.location.href = "index.html";
    });
    document.querySelectorAll("[data-auth]").forEach((btn) => {
      btn.addEventListener("click", () => {
        let state = seedSampleData(loadState());
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
      let nextState = { ...state, seededSample: false };
      saveState(nextState);
      window.location.href = "dashboard.html";
    });
    document.getElementById("back-to-register")?.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  function initAppPages(page) {
    const state = loadState();
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
      wireCalculationModal();
    }
    if (page === "help") renderHelpFaq();
    if (page === "performance") {
      renderPerformance(state);
      wirePerformanceView(state);
    }
    wireOnboarding(state);
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
