// Notifications popover handling
(function () {
  function init() {
    const triggers = document.querySelectorAll("[data-notification-trigger]");
    if (!triggers.length) return;
    console.log("[Notifications] found triggers:", triggers.length);

    let panel = document.getElementById("notification-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "notification-panel";
      panel.className = "hidden fixed w-[380px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden";
      panel.style.display = "none";
      panel.style.top = "10%";
      panel.style.right = "5%";
      panel.style.opacity = "0";
      panel.style.visibility = "hidden";
      panel.style.pointerEvents = "none";
      panel.innerHTML = `
        <div class="p-4 border-b border-gray-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-900">Notifications</span>
            <span class="px-2 py-1 rounded-full bg-[#FDD42B] text-gray-900 text-xs font-semibold leading-none">3</span>
          </div>
          <button class="text-sm font-semibold text-gray-700 hover:underline" type="button">Mark all as read</button>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <div class="p-4 flex gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500"><i class="fa-solid fa-arrow-trend-up"></i></div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Performance report available</p>
              <p class="text-sm text-gray-700">Weekly report is ready for Restaurant Rustikeria.</p>
              <p class="text-xs text-gray-500 mt-1">Yesterday</p>
            </div>
          </div>
          <div class="p-4 flex gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500"><i class="fa-solid fa-circle-exclamation"></i></div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Action required</p>
              <p class="text-sm text-gray-700">Some outlets have missing campaign data.</p>
              <p class="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </div>
          <div class="p-4 flex gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500"><i class="fa-solid fa-gear"></i></div>
            <div>
              <p class="text-sm font-semibold text-gray-900">Outlet settings updated</p>
              <p class="text-sm text-gray-700">Settings for Cole & Porter Bar have been updated successfully.</p>
              <p class="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
        <button type="button" class="w-full text-center py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 border-t border-gray-200">View all notifications</button>
      `;
      document.body.appendChild(panel);
    }

    const showPanel = () => {
      panel.classList.remove("hidden");
      panel.style.display = "block";
      panel.style.opacity = "1";
      panel.style.visibility = "visible";
      panel.style.pointerEvents = "auto";
      console.log("[Notifications] show panel rect:", panel.getBoundingClientRect());
    };
    const hidePanel = () => {
      panel.classList.add("hidden");
      panel.style.display = "none";
      panel.style.opacity = "0";
      panel.style.visibility = "hidden";
      panel.style.pointerEvents = "none";
      console.log("[Notifications] hide panel");
    };

    triggers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (panel.style.display === "none" || panel.classList.contains("hidden")) {
          console.log("[Notifications] show panel");
          showPanel();
        } else {
          console.log("[Notifications] hide panel");
          hidePanel();
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && !(e.target.closest && e.target.closest("[data-notification-trigger]"))) hidePanel();
    });
    panel.addEventListener("click", (e) => e.stopPropagation());
  }

  window.CCMNotifications = { init };
})();
