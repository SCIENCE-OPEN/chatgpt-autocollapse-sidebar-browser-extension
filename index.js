(function () {

  const CONSOLE_PREFIX = "[ChatGPT Auto-Collapse Sidebar Browser Extension]";
  let intervalId = null;

  function ensureCollapsedSidebar() {
    const closeBtn = document.querySelector('button[data-app-shell-sidebar-trigger="true"]');
    if (!closeBtn) {
      console.log(CONSOLE_PREFIX, "sidebar toggle not found yet");
      return;
    }

    const state = closeBtn.getAttribute("data-state");       // "open" or "closed"
    const expanded = closeBtn.getAttribute("aria-expanded"); // "true" or "false"

    console.log(CONSOLE_PREFIX, "found button", { state, expanded });

    if (state === "open" || expanded === "true") {
      console.log(CONSOLE_PREFIX, "clicking to close");
      closeBtn.click();
    } else {
      console.log(CONSOLE_PREFIX, "sidebar already closed");
      clearInterval(intervalId);
    }
  }

  /**
   * Run immediately and after interval until is sidebar found and eventually closed.
   */
  function kickoff() {
    ensureCollapsedSidebar();
    intervalId = setInterval(ensureCollapsedSidebar, 500);
  }

  if (document.readyState !== "loading") kickoff();
})();
