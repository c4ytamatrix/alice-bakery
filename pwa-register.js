const isInstalledPwa = window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

if (isInstalledPwa) {
    history.pushState({ page: 1 }, "", location.href);
    window.addEventListener("popstate", () => {
        history.pushState({ page: 1 }, "", location.href);
    });
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register(new URL("service-worker.js", document.baseURI))
            .catch(error => console.error("PWA offline support could not be enabled.", error));
    });
}
