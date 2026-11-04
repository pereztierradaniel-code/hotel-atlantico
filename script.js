/* Hotel Atlántico · Comportamiento de la página */

// Cabecera: transparente mientras se ve la portada, sólida al bajar
const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");

if (header && hero && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("site-header--solid", !entry.isIntersecting);
    },
    { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }
  );
  observer.observe(hero);
} else if (header) {
  header.classList.add("site-header--solid");
}

// Habitaciones: cada tarjeta abre su ficha en una ventana emergente (<dialog>)
const roomExtras = document.querySelector("#room-extras");

document.querySelectorAll(".room-dialog").forEach((dialog) => {
  // Servicios y horarios comunes, escritos una sola vez en el HTML
  const slot = dialog.querySelector("[data-room-extras]");
  if (slot && roomExtras) {
    slot.replaceWith(roomExtras.content.cloneNode(true));
  }

  // Un clic en el fondo oscuro (fuera de la ficha) la cierra
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // «Consultar disponibilidad» cierra la ficha y deja que el enlace baje a Contacto
  dialog.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => dialog.close());
  });
});

document.querySelectorAll("[data-room]").forEach((button) => {
  const dialog = document.getElementById(button.dataset.room);
  if (!dialog || typeof dialog.showModal !== "function") return;

  button.addEventListener("click", () => dialog.showModal());
});

// Formulario de contacto: lo abren los botones «Consultar disponibilidad».
// No se envía a ningún servidor; al validar se muestra una confirmación ficticia.
const contactDialog = document.querySelector("#contact-dialog");
const contactForm = document.querySelector("#contact-form");
const contactSummary = document.querySelector("#contact-summary");
const contactSuccess = document.querySelector("#contact-success");

// usuario@dominio.ext, sin espacios ni puntos al principio, al final o seguidos
const EMAIL_PATTERN = /^[^\s@.]+(\.[^\s@.]+)*@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

// Comprobación de cada campo obligatorio: devuelve el mensaje de error o ""
const contactRules = {
  name: (field) => (field.value.trim() ? "" : "Escribe tu nombre."),
  email: (field) => {
    const value = field.value.trim();
    if (!value) return "Escribe tu correo electrónico.";
    if (!EMAIL_PATTERN.test(value)) {
      return "El correo no tiene un formato válido. Ejemplo: nombre@correo.com";
    }
    return "";
  },
  message: (field) => (field.value.trim() ? "" : "Escribe el mensaje de tu consulta."),
  privacy: (field) =>
    field.checked ? "" : "Debes aceptar la política de privacidad para enviar la consulta.",
};

function showFieldError(field, message) {
  const error = document.getElementById(`${field.id}-error`);
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
  if (error) error.textContent = message;
}

// Revisa todos los campos y devuelve los que tienen error
function validateContactForm() {
  return Object.entries(contactRules)
    .map(([name, check]) => {
      const field = contactForm.elements[name];
      const message = check(field);
      showFieldError(field, message);
      return message ? field : null;
    })
    .filter(Boolean);
}

function resetContactForm() {
  contactForm.reset();
  delete contactForm.dataset.submitted;
  Object.keys(contactRules).forEach((name) => showFieldError(contactForm.elements[name], ""));
  contactSummary.hidden = true;
  contactSummary.textContent = "";
  contactForm.hidden = false;
  contactSuccess.hidden = true;
}

// Desde la ficha de una habitación, el mensaje empieza indicando cuál interesa
function openContactForm(room) {
  if (room) {
    contactForm.elements.reason.value = "disponibilidad";
    const message = contactForm.elements.message;
    if (!message.value.trim()) message.value = `Me interesa ${room}. `;
  }
  contactDialog.showModal();
}

if (contactDialog && contactForm && contactSummary && contactSuccess &&
    typeof contactDialog.showModal === "function") {
  document.querySelectorAll("[data-contact]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openContactForm(link.dataset.contact);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.dataset.submitted = "true";

    const invalid = validateContactForm();
    if (invalid.length) {
      contactSummary.textContent = invalid.length === 1
        ? "Hay un campo por revisar: el error se indica debajo de él."
        : `Hay ${invalid.length} campos por revisar: cada error se indica debajo de su campo.`;
      contactSummary.hidden = false;
      invalid[0].focus();
      return;
    }

    // Envío ficticio: se muestra la confirmación en lugar del formulario
    contactSuccess.querySelector("[data-success-name]").textContent =
      `, ${contactForm.elements.name.value.trim()}`;
    contactForm.hidden = true;
    contactSuccess.hidden = false;
    contactSuccess.focus();
  });

  // Tras el primer intento de envío, cada error desaparece en cuanto se corrige
  contactForm.addEventListener("input", (event) => {
    const check = contactRules[event.target.name];
    if (!contactForm.dataset.submitted || !check) return;

    showFieldError(event.target, check(event.target));
    if (!validateContactForm().length) contactSummary.hidden = true;
  });

  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) contactDialog.close();
  });

  // Después de una confirmación, al cerrar el formulario vuelve a quedar vacío
  contactDialog.addEventListener("close", () => {
    if (!contactSuccess.hidden) resetContactForm();
  });
}
