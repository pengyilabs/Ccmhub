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

  function renderOutletsGrid(state) {
    const grid = document.getElementById("outlet-grid");
    if (!grid) return;
    grid.innerHTML = "";
    if (!state.outlets.length) {
      grid.innerHTML = '<div class="p-6 bg-white border border-dashed border-gray-300 rounded-xl text-center text-gray-600">No outlets yet. Add one to begin.</div>';
      return;
    }
    state.outlets.forEach((outlet) => {
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

  function renderCalculations(state) {
    const rows = document.getElementById("calc-rows");
    if (!rows) return;
    rows.innerHTML = "";
    if (!state.outlets.length) {
      rows.innerHTML = '<div class="px-6 py-4 text-sm text-gray-600">Add outlets to see calculations.</div>';
      return;
    }
    state.outlets.forEach((outlet) => {
      const row = document.createElement("div");
      row.className = "grid grid-cols-4 px-6 py-4 text-sm text-gray-800";
      row.innerHTML = `
        <span class="font-semibold">${outlet.name}</span>
        <span>${outlet.campaign}</span>
        <span>Cost reduction</span>
        <span class="text-right font-semibold text-green-600">-€${(120 + Math.floor(Math.random() * 40)).toLocaleString()}</span>
      `;
      rows.appendChild(row);
    });
  }

  function renderPerformance(state) {
    const wrap = document.getElementById("performance-cards");
    if (!wrap) return;
    wrap.innerHTML = "";
    if (!state.outlets.length) {
      wrap.innerHTML = '<div class="p-6 bg-white border border-dashed border-gray-300 rounded-xl text-center text-gray-600 col-span-3">Add outlets to see performance.</div>';
      return;
    }
    state.outlets.forEach((outlet) => {
      const card = document.createElement("div");
      card.className = "bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">${outlet.name}</h3>
          <span class="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 font-semibold">Healthy</span>
        </div>
        <p class="text-sm text-gray-500">${outlet.address}</p>
        <div class="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p class="text-gray-500">Services</p>
            <p class="text-gray-900 font-semibold">${3 + Math.floor(Math.random() * 3)}</p>
          </div>
          <div>
            <p class="text-gray-500">Reports</p>
            <p class="text-gray-900 font-semibold">${4 + Math.floor(Math.random() * 5)}</p>
          </div>
          <div>
            <p class="text-gray-500">Uptime</p>
            <p class="text-green-600 font-semibold">${96 + Math.floor(Math.random() * 4)}%</p>
          </div>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  window.CCMRender = {
    renderDashboard,
    renderOutletsGrid,
    renderOutletDetails,
    renderCalculations,
    renderPerformance,
  };
})();
