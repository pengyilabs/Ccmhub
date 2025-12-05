// Rendering helpers for dashboards and pages
(function () {
  function renderDashboard(state) {
    const outletCount = state.outlets.length;
    const statOutlets = document.getElementById("stat-outlets");
    const statServices = document.getElementById("stat-services");
    const statReports = document.getElementById("stat-reports");
    const statCalcs = document.getElementById("stat-calcs");
    const statOutletsSub = document.getElementById("stat-outlets-sub");
    const statServicesSub = document.getElementById("stat-services-sub");
    const statReportsSub = document.getElementById("stat-reports-sub");
    const statCalcsSub = document.getElementById("stat-calcs-sub");
    const heroTitle = document.getElementById("dashboard-title");
    const heroSubtitle = document.getElementById("dashboard-subtitle");
    const viewAllBtn = document.getElementById("dashboard-view-all");
    const openCalcsBtn = document.getElementById("dashboard-open-calcs");
    const iconOutlets = document.getElementById("stat-card-outlets-icon");
    const iconServices = document.getElementById("stat-card-services-icon");
    const iconActions = document.getElementById("stat-card-actions-icon");
    const iconCalcs = document.getElementById("stat-card-calcs-icon");

    const hasData = outletCount > 0;
    if (heroTitle && heroSubtitle) {
      heroTitle.textContent = hasData ? "Overview" : "Welcome to CCM HUB";
      heroSubtitle.textContent = hasData
        ? "Overview of your outlets and recent activity."
        : "You don't have any data yet. Start by creating an outlet or exploring services.";
    }

    if (statOutlets) statOutlets.textContent = outletCount.toString();
    if (statServices) statServices.textContent = outletCount ? "3" : "0";
    if (statReports) statReports.textContent = outletCount ? "5" : "0";
    if (statCalcs) statCalcs.textContent = outletCount ? "12" : "0";
    if (statOutletsSub) statOutletsSub.textContent = hasData ? "Outlets active" : "No data available";
    if (statServicesSub) statServicesSub.textContent = hasData ? "Services running" : "No data available";
    if (statReportsSub) statReportsSub.textContent = hasData ? "Actions pending" : "No data available";
    if (statCalcsSub) statCalcsSub.textContent = hasData ? "Calculations total" : "No data available";

    [iconOutlets, iconServices, iconActions, iconCalcs].forEach((iconEl) => {
      if (!iconEl) return;
      iconEl.classList.toggle("bg-gray-50", !hasData);
      iconEl.classList.toggle("border-gray-200", !hasData);
      iconEl.classList.toggle("text-gray-400", !hasData);
    });

    if (viewAllBtn) {
      viewAllBtn.classList.toggle("bg-white", hasData);
      viewAllBtn.classList.toggle("text-gray-800", hasData);
      viewAllBtn.classList.toggle("cursor-not-allowed", !hasData);
      viewAllBtn.classList.toggle("text-gray-400", !hasData);
      viewAllBtn.disabled = !hasData;
    }
    if (openCalcsBtn) {
      openCalcsBtn.disabled = !hasData;
      openCalcsBtn.classList.toggle("cursor-not-allowed", !hasData);
      openCalcsBtn.classList.toggle("text-gray-500", !hasData);
      openCalcsBtn.classList.toggle("text-gray-800", hasData);
      openCalcsBtn.classList.toggle("bg-gray-50", !hasData);
      openCalcsBtn.classList.toggle("bg-white", hasData);
      openCalcsBtn.classList.toggle("border-gray-200", true);
    }

    const container = document.getElementById("dashboard-outlets");
    if (!container) return;
    container.innerHTML = "";
    if (!state.outlets.length) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
        <td colspan="4" class="p-0">
          <div class="w-full min-h-[320px] flex items-center justify-center bg-white">
          <div class="w-full max-w-5xl rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-4 py-12">
              <div class="w-16 h-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                <i class="fa-regular fa-building"></i>
              </div>
              <div class="text-center space-y-2">
                <p class="text-lg font-semibold text-gray-900">No Outlets Yet</p>
                <p class="text-sm text-gray-600">Get started by creating your first outlet to manage your restaurant locations.</p>
              </div>
              <div class="flex items-center gap-3 mt-2">
                <button data-open-modal class="px-4 h-11 inline-flex items-center gap-2 rounded-md bg-[#FDD42B] text-sm font-semibold text-gray-900 border border-[#e6c11f] shadow-sm hover:shadow">
                  <i class="fa-solid fa-plus"></i>
                  Create an Outlet
                </button>
                <a href="help.html" class="px-4 h-11 inline-flex items-center rounded-md border border-gray-200 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50">Help</a>
              </div>
            </div>
          </div>
        </td>
      `;
      container.appendChild(emptyRow);
      return;
    }
    state.outlets.slice(-4).forEach((outlet) => {
      const row = document.createElement("tr");
      row.className = "border-t border-gray-100";
      row.innerHTML = `
        <td class="px-6 py-4">
          <div class="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
            <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=200&q=60');"></div>
          </div>
        </td>
        <td class="px-6 py-4 font-semibold text-gray-900">${outlet.name}</td>
        <td class="px-6 py-4 text-gray-800">${outlet.address}</td>
        <td class="px-6 py-4">
          <span class="px-3 py-1 rounded-full bg-[#FDD42B] text-gray-900 text-xs font-semibold border border-yellow-200">${outlet.campaign}</span>
        </td>
      `;
      container.appendChild(row);
    });
  }

  function renderOutletsGrid(state, filterTerm = "") {
    const tbody = document.getElementById("outlet-table-body");
    const countLabel = document.getElementById("outlet-count-label");
    if (!tbody) return;

    const term = filterTerm.trim().toLowerCase();
    const outlets = term
      ? state.outlets.filter(
          (o) => o.name.toLowerCase().includes(term) || o.address.toLowerCase().includes(term) || o.campaign.toLowerCase().includes(term)
        )
      : state.outlets;

    tbody.innerHTML = "";

    if (!outlets.length) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
        <td colspan="6" class="px-6 py-12">
          <div class="w-full min-h-[260px] rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-2xl">
              <i class="fa-regular fa-building"></i>
            </div>
            <div class="text-center space-y-2">
              <p class="text-lg font-semibold text-gray-900">No outlets found</p>
              <p class="text-sm text-gray-600">Create a new outlet to start managing your locations.</p>
            </div>
            <button data-open-modal class="px-4 h-11 inline-flex items-center gap-2 rounded-md bg-[#FDD42B] text-sm font-semibold text-gray-900 border border-[#e6c11f] shadow-sm hover:shadow">
              <i class="fa-solid fa-plus"></i>
              Create Outlet
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(emptyRow);
      if (countLabel) {
        const total = state.outlets.length;
        const plural = total === 1 ? "outlet" : "outlets";
        countLabel.textContent = `Showing 0 of ${total} ${plural}`;
      }
      return;
    }

    outlets.forEach((outlet) => {
      const row = document.createElement("tr");
      row.className = "border-b border-gray-100 last:border-0";
      row.innerHTML = `
        <td class="px-6 py-4">
          <div class="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=200&q=60" alt="${outlet.name}" />
          </div>
        </td>
        <td class="px-6 py-4 font-semibold text-gray-900">${outlet.name}</td>
        <td class="px-6 py-4 text-gray-700">${outlet.address}</td>
        <td class="px-6 py-4">
          <span class="px-3 py-1 rounded-full bg-[#FDD42B] text-gray-900 text-xs font-semibold border border-yellow-200">${outlet.campaign}</span>
        </td>
        <td class="px-6 py-4">
          <span class="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold border border-green-100">Active</span>
        </td>
        <td class="px-6 py-4 text-right">
          <a class="px-3 h-9 inline-flex items-center rounded-md border border-gray-200 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50" href="outlet-details.html?id=${outlet.id}">View Details</a>
        </td>
      `;
      tbody.appendChild(row);
    });

    if (countLabel) {
      const total = state.outlets.length;
      const plural = total === 1 ? "outlet" : "outlets";
      countLabel.textContent = `Showing ${outlets.length} of ${total} ${plural}`;
    }
  }

  function renderOutletDetails(state) {
    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("id") || (state.outlets[0] ? state.outlets[0].id : null);
    const outlet = state.outlets.find((o) => o.id === selectedId) || null;
    const title = document.getElementById("detail-title");
    const campaign = document.getElementById("detail-campaign");
    const address = document.getElementById("detail-address");
    const status = document.getElementById("detail-status");
    if (title) title.textContent = outlet ? outlet.name : "Select an outlet";
    if (campaign) campaign.textContent = outlet ? outlet.campaign : "—";
    if (address) address.textContent = outlet ? outlet.address : "—";
    if (status) status.textContent = outlet ? "Active" : "—";
    const services = document.getElementById("detail-services");
    if (services) {
      services.innerHTML = "";
      if (outlet) {
        ["POS Integration", "Brand Visibility", "Staff Training"].forEach((svc) => {
          const chip = document.createElement("span");
          chip.className = "px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold";
          chip.textContent = svc;
          services.appendChild(chip);
        });
      }
    }
  }

  function renderHelpFaq() {
    const container = document.getElementById("faq-list");
    if (!container) return;
    const faqs = [
      { q: "How do I get started with CCM HUB?", a: "Sign in, seed your first outlet, and explore the dashboard to review metrics." },
      { q: "How do I add a new outlet to my account?", a: "Use the Add Outlet button and fill in the name, address, and campaign fields." },
      { q: "What services are available for my outlets?", a: "You can manage campaigns, reports, performance tracking, and notifications per outlet." },
      { q: "How do calculations work?", a: "Calculations summarize inventory and performance data per outlet based on your inputs." },
      { q: "How can I track my outlet performance?", a: "Open the Performance page to see cards or table views for subscribers, redeemers, and ratios." },
      { q: "What is the difference between onboarding and offboarding?", a: "Onboarding adds a new outlet and its services; offboarding deactivates and archives its data." },
      { q: "How do I manage team members and their roles?", a: "Use Settings to invite team members and assign roles for access control." },
      { q: "Can I export performance reports?", a: "Yes, use Export actions on the Performance or Outlets pages to download reports." },
      { q: "How do I customize my notification preferences?", a: "Open Settings and toggle alerts to choose which notifications to receive." },
      { q: "Is my data secure on CCM HUB?", a: "We use encrypted storage and secure sessions to protect your account data." },
    ];

    container.innerHTML = "";
    faqs.forEach((faq) => {
      const details = document.createElement("details");
      details.className = "group";

      const summary = document.createElement("summary");
      summary.className = "flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50";
      summary.innerHTML = `
        <span class="font-medium text-gray-900">${faq.q}</span>
        <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition-transform group-open:rotate-180"></i>
      `;

      const answer = document.createElement("div");
      answer.className = "px-6 pb-4 text-gray-600";
      answer.textContent = faq.a;

      details.appendChild(summary);
      details.appendChild(answer);
      container.appendChild(details);
    });
  }

  function renderCalculations(state, filterTerm = "") {
    const tbody = document.getElementById("calc-table-body");
    const countLabel = document.getElementById("calc-count-label");
    if (!tbody) return;

    const term = filterTerm.trim().toLowerCase();
    const calcs = term
      ? state.calculations.filter(
          (calc) =>
            calc.id.toLowerCase().includes(term) ||
            calc.createdAt.toLowerCase().includes(term) ||
            calc.articles.toString().includes(term)
        )
      : state.calculations;

    tbody.innerHTML = "";

    if (!calcs.length) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
        <td colspan="4" class="px-6 py-12">
          <div class="w-full min-h-[260px] rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-2xl">
              <i class="fa-solid fa-calculator"></i>
            </div>
            <div class="text-center space-y-2">
              <p class="text-lg font-semibold text-gray-900">No calculations available</p>
              <p class="text-sm text-gray-600">Create your first outlet to start making calculations.</p>
            </div>
            <button data-open-calc-modal class="px-4 h-11 inline-flex items-center gap-2 rounded-md bg-[#FDD42B] text-sm font-semibold text-gray-900 border border-[#e6c11f] shadow-sm hover:shadow">
              <i class="fa-solid fa-plus"></i>
              New Calculation
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(emptyRow);
      if (countLabel) {
        const total = state.calculations.length;
        const plural = total === 1 ? "calculation" : "calculations";
        countLabel.textContent = `Showing 0 of ${total} ${plural}`;
      }
      return;
    }

    calcs.forEach((calc) => {
      const row = document.createElement("tr");
      row.className = "border-b border-gray-100 last:border-0";
      row.innerHTML = `
        <td class="px-6 py-4 font-semibold text-gray-900">${calc.id}</td>
        <td class="px-6 py-4 text-gray-700">${calc.createdAt}</td>
        <td class="px-6 py-4 text-gray-700">${calc.articles}</td>
        <td class="px-6 py-4">
          <div class="flex items-center justify-end gap-2">
            <button type="button" data-delete-calc="${calc.id}" class="px-3 h-9 inline-flex items-center gap-2 rounded-md border border-gray-200 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50">
              <i class="fa-regular fa-trash-can text-gray-500"></i>
              Delete
            </button>
            <button type="button" class="px-3 h-9 inline-flex items-center gap-2 rounded-md border border-gray-200 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50">
              <i class="fa-regular fa-eye text-gray-500"></i>
              View Details
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    if (countLabel) {
      const total = state.calculations.length;
      const plural = total === 1 ? "calculation" : "calculations";
      countLabel.textContent = `Showing ${calcs.length} of ${total} ${plural}`;
    }
  }

  function renderPerformance(state, viewMode = "cards") {
    const summary = document.getElementById("performance-summary");
    const cardsWrap = document.getElementById("performance-details-cards");
    const tableWrap = document.getElementById("performance-details-table");
    const tableBody = document.getElementById("performance-table-body");
    const emptyContainer = document.getElementById("performance-empty");
    if (!summary && !cardsWrap && !tableBody) return;

    const hasPerformanceData = state.outlets.length > 0 && state.calculations.length > 0;

    if (!hasPerformanceData) {
      if (summary) summary.innerHTML = "";
      if (cardsWrap) cardsWrap.innerHTML = "";
      if (tableWrap) tableWrap.hidden = true;
      if (tableBody) tableBody.innerHTML = "";
      if (emptyContainer) {
        emptyContainer.innerHTML = `
          <div class="w-full min-h-[260px] rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-2xl">
              <i class="fa-solid fa-chart-column"></i>
            </div>
            <div class="text-center space-y-2">
              <p class="text-lg font-semibold text-gray-900">No performance data yet</p>
              <p class="text-sm text-gray-600">Once your outlets and services are active, you'll see performance stats here.</p>
            </div>
          </div>
        `;
        emptyContainer.hidden = false;
      }
      return;
    } else if (emptyContainer) {
      emptyContainer.hidden = true;
      emptyContainer.innerHTML = "";
    }

    if (summary) {
      const metrics = [
        { label: "Subscribers", value: "51", delta: "+12% from last period", icon: "fa-regular fa-id-badge", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        { label: "Redeemers", value: "17", delta: "+5% from last period", icon: "fa-solid fa-arrow-trend-up", iconBg: "bg-green-50", iconColor: "text-green-500" },
        { label: "Review Clicks", value: "57", delta: "+18% from last period", icon: "fa-regular fa-star", iconBg: "bg-purple-50", iconColor: "text-purple-500" },
        { label: "Average Ratio", value: "33.6%", delta: "+3% from last period", icon: "fa-solid fa-square-full", iconBg: "bg-yellow-100", iconColor: "text-yellow-500" },
      ];
      summary.innerHTML = "";
      metrics.forEach((metric) => {
        const card = document.createElement("div");
        card.className = "bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3";
        card.innerHTML = `
          <div class="w-11 h-11 shrink-0 rounded-lg ${metric.iconBg} border border-gray-100 flex items-center justify-center ${metric.iconColor}">
            <i class="${metric.icon}"></i>
          </div>
          <div class="space-y-1">
            <p class="text-sm text-gray-500">${metric.label}</p>
            <p class="text-2xl font-bold text-gray-900">${metric.value}</p>
            <p class="text-xs text-green-600 font-semibold">${metric.delta}</p>
          </div>
        `;
        summary.appendChild(card);
      });
    }

    const performanceData = [
      { name: "Restaurant Rustikeria", subscribers: 11, redeemers: 0, clicks: 0, ratio: "0.0%" },
      { name: "Barissimo Viktualienmarkt", subscribers: 5, redeemers: 2, clicks: 8, ratio: "40.0%" },
      { name: "Cole & Porter Bar", subscribers: 8, redeemers: 3, clicks: 12, ratio: "37.5%" },
      { name: "Monti Monaco", subscribers: 15, redeemers: 7, clicks: 20, ratio: "46.7%" },
      { name: "Schweiger", subscribers: 7, redeemers: 1, clicks: 5, ratio: "14.3%" },
      { name: "Hans im Glück", subscribers: 9, redeemers: 4, clicks: 10, ratio: "44.4%" },
    ];

    if (cardsWrap) {
      cardsWrap.style.display = viewMode === "cards" ? "grid" : "none";
      cardsWrap.innerHTML = "";
      if (viewMode === "cards") {
        performanceData.forEach((item) => {
          const card = document.createElement("div");
          card.className = "border border-gray-200 rounded-xl bg-white p-5 shadow-sm";
          card.innerHTML = `
            <h4 class="text-base font-semibold text-gray-900 mb-3">${item.name}</h4>
            <div class="space-y-2 text-sm text-gray-700">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-gray-600"><i class="fa-regular fa-id-badge"></i> Subscribers</span>
                <span class="font-semibold text-gray-900">${item.subscribers}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-gray-600"><i class="fa-solid fa-arrow-trend-up"></i> Redeemers</span>
                <span class="font-semibold text-gray-900">${item.redeemers}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-gray-600"><i class="fa-regular fa-star"></i> Review Clicks</span>
                <span class="font-semibold text-gray-900">${item.clicks}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-gray-600"><i class="fa-solid fa-percent"></i> Ratio</span>
                <span class="font-semibold text-gray-900">${item.ratio}</span>
              </div>
            </div>
          `;
          cardsWrap.appendChild(card);
        });
      }
    }

    if (tableWrap && tableBody) {
      tableWrap.style.display = viewMode === "table" ? "block" : "none";
      tableBody.innerHTML = "";
      if (viewMode === "table") {
        performanceData.forEach((item) => {
          const row = document.createElement("tr");
          row.className = "border-b border-gray-100 last:border-0";
          row.innerHTML = `
            <td class="px-6 py-4 font-semibold text-gray-900">${item.name}</td>
            <td class="px-6 py-4 text-gray-800">${item.subscribers}</td>
            <td class="px-6 py-4 text-gray-800">${item.redeemers}</td>
            <td class="px-6 py-4 text-gray-800">${item.clicks}</td>
            <td class="px-6 py-4 text-right font-semibold text-gray-900">${item.ratio}</td>
          `;
          tableBody.appendChild(row);
        });
      }
    }
  }

  window.CCMRender = {
    renderDashboard,
    renderOutletsGrid,
    renderOutletDetails,
    renderCalculations,
    renderHelpFaq,
    renderPerformance,
  };
})();
