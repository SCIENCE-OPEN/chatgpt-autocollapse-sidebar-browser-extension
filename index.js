
(function () {
  const PREFIX = "[ChatGPT Auto-Collapse Sidebar]";
  const SELECTOR = 'button[data-app-shell-sidebar-trigger="true"]';

  let observer = null;

  function ensureCollapsedSidebar() {
    const button = document.querySelector(SELECTOR);

    if (!button) {
      return false;
    }

    if (button.getAttribute("aria-expanded") === "true") {
      console.log(PREFIX, "Sidebar is open; closing it.");
      button.click();
    }

    return true;
  }

  function start() {
    if (ensureCollapsedSidebar()) {
      return;
    }

    observer = new MutationObserver(() => {
      if (ensureCollapsedSidebar()) {
        observer.disconnect();
        observer = null;
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
