// Rendering helpers for dashboards and pages
(function () {
  function renderDashboard(state) {
    const outletCount = state.outlets.length;
    const statOutlets = document.getElementById("stat-outlets");
    const statServices = document.getElementById("stat-services");
    const statReports = document.getElementById("stat-reports");
    const statCalcs = document.getElementById("stat-calcs");
    if (statOutlets) statOutlets.textContent = outletCount.toString();
    if (statServices) statServices.textContent = outletCount ? "3" : "0";
    if (statReports) statReports.textContent = outletCount ? "5" : "0";
    if (statCalcs) statCalcs.textContent = outletCount ? "12" : "0";

    const container = document.getElementById("dashboard-outlets");
    if (!container) return;
    container.innerHTML = "";
    if (!state.outlets.length) {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="px-6 py-4 text-sm text-gray-500" colspan="4">No outlets yet. Create one to get started.</td>`;
      container.appendChild(row);
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
      emptyRow.innerHTML = `<td colspan="6" class="px-6 py-6 text-center text-gray-500">No outlets found. Add one to begin.</td>`;
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
      emptyRow.innerHTML = `<td colspan="4" class="px-6 py-6 text-center text-gray-500">No calculations found.</td>`;
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
    if (!summary && !cardsWrap && !tableBody) return;

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
