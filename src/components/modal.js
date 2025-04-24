export function openModal(modal) {
    if (!modal || modal.classList.contains("popup_is-opened")) return;

    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modal) {
    if (!modal || !modal.classList.contains("popup_is-opened")) return;

    modal.classList.add("popup_fade-out");
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            modal.classList.remove("popup_is-opened", "popup_fade-out");
            document.removeEventListener("keydown", handleEscClose);
        }, 300);
    });
}

function handleEscClose(evt) {
    const openedModal = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape" && openedModal) {
        closeModal(openedModal);
    }
}

export function handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
        closeModal(evt.target);
    }
}