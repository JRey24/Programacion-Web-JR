const STORAGE_DATOS_PERSONALES = "encuestaDatosPersonales";

const formularioPrincipal = document.getElementById("encuesta");
const formularioCalificacion = document.getElementById("encuestaCalificacion");

function obtenerListaConEtiquetas(formulario, nombreCampo) {
	const seleccionados = Array.from(formulario.querySelectorAll(`input[name="${nombreCampo}"]:checked`));
	return seleccionados.map((input) => input.parentElement.textContent.trim());
}

function valorSeguro(valor) {
	return valor && valor.trim() !== "" ? valor : "No registrado";
}

if (formularioPrincipal) {
	formularioPrincipal.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!formularioPrincipal.checkValidity()) {
			formularioPrincipal.reportValidity();
			return;
		}

		const datos = new FormData(formularioPrincipal);
		const datosPersonales = {
			nombre: datos.get("nombre") || "",
			apellido: datos.get("apellido") || "",
			direccion: datos.get("direccion") || "",
			genero: datos.get("genero") || "",
			edad: datos.get("edad") || "",
			telefono: datos.get("telefono") || "",
			correo: datos.get("correo") || "",
			profesionOficio: datos.get("profesionOficio") || ""
		};

		sessionStorage.setItem(STORAGE_DATOS_PERSONALES, JSON.stringify(datosPersonales));
		window.location.href = "calificacion.html";
	});
}

if (formularioCalificacion) {
	formularioCalificacion.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!formularioCalificacion.checkValidity()) {
			formularioCalificacion.reportValidity();
			return;
		}

		const datosCalificacion = new FormData(formularioCalificacion);
		const datosPersonalesGuardados = JSON.parse(sessionStorage.getItem(STORAGE_DATOS_PERSONALES) || "{}");

		const problemas = obtenerListaConEtiquetas(formularioCalificacion, "problemas");
		const horarios = obtenerListaConEtiquetas(formularioCalificacion, "horarios");
		const actividades = obtenerListaConEtiquetas(formularioCalificacion, "actividades");
		const organizaciones = obtenerListaConEtiquetas(formularioCalificacion, "organizaciones");

		const contenidoResumen = document.getElementById("contenidoResumen");
		const resumenFinal = document.getElementById("resumenFinal");
		const modalEnviado = document.getElementById("modalEnviado");

		contenidoResumen.innerHTML = `
			<h3>Datos personales</h3>
			<ul>
				<li><strong>Nombre:</strong> ${valorSeguro(datosPersonalesGuardados.nombre)} ${valorSeguro(datosPersonalesGuardados.apellido)}</li>
				<li><strong>Direccion:</strong> ${valorSeguro(datosPersonalesGuardados.direccion)}</li>
				<li><strong>Genero:</strong> ${valorSeguro(datosPersonalesGuardados.genero)}</li>
				<li><strong>Edad:</strong> ${valorSeguro(String(datosPersonalesGuardados.edad || ""))}</li>
				<li><strong>Telefono:</strong> ${valorSeguro(datosPersonalesGuardados.telefono)}</li>
				<li><strong>Correo:</strong> ${valorSeguro(datosPersonalesGuardados.correo)}</li>
				<li><strong>Profesion u oficio:</strong> ${valorSeguro(datosPersonalesGuardados.profesionOficio)}</li>
			</ul>

			<h3>Calificacion del transporte</h3>
			<ul>
				<li><strong>Medio principal:</strong> ${valorSeguro(datosCalificacion.get("medioPrincipal"))}</li>
				<li><strong>Puntualidad (1-5):</strong> ${valorSeguro(datosCalificacion.get("puntualidad"))}</li>
				<li><strong>Aspectos problematicos:</strong> ${problemas.length ? problemas.join(", ") : "No seleccionados"}</li>
				<li><strong>Horarios de mayor dificultad:</strong> ${horarios.length ? horarios.join(", ") : "No seleccionados"}</li>
				<li><strong>Experiencia:</strong> ${valorSeguro(datosCalificacion.get("experiencia"))}</li>
				<li><strong>Mejoras propuestas:</strong> ${valorSeguro(datosCalificacion.get("mejora"))}</li>
				<li><strong>Calificacion general (0-10):</strong> ${valorSeguro(datosCalificacion.get("calificacionGeneral"))}</li>
				<li><strong>Actividades en trayecto:</strong> ${actividades.length ? actividades.join(", ") : "No seleccionadas"}</li>
				<li><strong>Organizaciones prioritarias:</strong> ${organizaciones.length ? organizaciones.join(", ") : "No seleccionadas"}</li>
				<li><strong>Prioridad y razon:</strong> ${valorSeguro(datosCalificacion.get("propuestaOrganizacion"))}</li>
			</ul>
		`;

		modalEnviado.classList.remove("oculto");

		setTimeout(() => {
			modalEnviado.classList.add("oculto");
			formularioCalificacion.classList.add("oculto");
			resumenFinal.classList.remove("oculto");
			resumenFinal.scrollIntoView({ behavior: "smooth" });
		}, 1400);
	});
}
