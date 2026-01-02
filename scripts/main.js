let focoAnterior = null;

function gerenciarFocoModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  const elementosModal = modal.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
  );

  const primeiroElemento = elementosModal[0];
  const ultimoElemento = elementosModal[elementosModal.length - 1];

  primeiroElemento.focus();

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === primeiroElemento) {
          event.preventDefault();
          ultimoElemento.focus();
        }
      } else {
        if (document.activeElement === ultimoElemento) {
          event.preventDefault();
          primeiroElemento.focus();
        }
      }
    }
  });
}

function alternarModal(modalId, abrir) {
  const modal = document.querySelector(`#${modalId}`);

  if (abrir) {
    focoAnterior = document.activeElement;

    modal.style.display = "block";
    gerenciarFocoModal(modalId);
  } else {
    modal.style.display = "none";

    if (focoAnterior) {
      focoAnterior.focus();
    }
  }

  document.body.style.overflow = abrir ? "hidden" : "auto";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    alternarModal("ver-modal-inscrito", false);
    alternarModal("ver-modal-contato", false);
    alternarModal("ver-modal-enviado", false);
    document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
      alternarSubmenu(item, false);
    });
  }
});

function alternarSubmenu(item, mostrar) {
  const submenu = item.querySelector(".submenu");

  if (submenu) {
    submenu.style.display = mostrar ? "block" : "none";

    const menuItem = item.querySelector(".cabecalho__lista-item a");
    menuItem.setAttribute("aria-expanded", mostrar ? true : false);

    const DropdownExpandedIcon = item.querySelector(
      ".material-symbols-outlined.icone"
    );

    DropdownExpandedIcon.classList.toggle("active", mostrar);
  }
}

//selecionar todos os cabecalho__lista-item
document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
  // adicionar um ouvinte mouseover
  item.addEventListener("mouseover", () => alternarSubmenu(item, true));

  // adicionar um ouvinte mouseout
  item.addEventListener("mouseout", () => alternarSubmenu(item, false));

  item.addEventListener("click", () => {
    const submenu = item.querySelector(".submenu");

    const isDisplayed = submenu.style.display === "block";

    alternarSubmenu(item, !isDisplayed);
  });
});

/**
 * Accordion
 */
document.querySelectorAll(".botao-acordeao").forEach((button) => {
  button.addEventListener("click", () => alternarAcordeao(button));
});

function alternarAcordeao(button) {
  const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

  document.querySelectorAll(".botao-acordeao").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");

    const content = btn.nextElementSibling;
    content.classList.remove("expandido");
    content.setAttribute("aria-hidden", "true");
  });

  if (!isAlreadyOpen) {
    button.setAttribute("aria-expanded", "true");

    const content = button.nextElementSibling;
    content.classList.add("expandido");

    content.setAttribute("aria-hidden", "false");
  }
}
