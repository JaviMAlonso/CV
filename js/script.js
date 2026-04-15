// Datos del CV (puedes modificarlos fácilmente)
const cv = {
    nombre: "Javier Martín Alonso",
    titulo: "Desarrollador Web",
    skills: [
        { nombre: "HTML/CSS", nivel: 99 },
        { nombre: "JavaScript", nivel: 79 },
        { nombre: "Python", nivel: 90 },
        { nombre: "C#", nivel: 70 },
        { nombre: "Java", nivel: 86 },
        { nombre: "SQL", nivel: 55 },
        { nombre: "Machine Learning", nivel: 87 }
    ],
    experiencia: [
        { puesto: "Junior Developer", empresa: "DIEGO R.GALLEGO FERNÁNDEZ-PACHECO", año: "2024" }
    ],
    educacion: [
        { titulo: "Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web", centro: "IES Azarquiel", año: "2022-2024" },
        { titulo: "Curso de Especialización en Desarrollo de Videojuegos y Realidad Virtual", centro: "IES Azarquiel", año: "2024-2025" },
        { titulo: "Curso de Especialización en Inteligencia Artificial", centro: "Fedeto", año: "2026" }

    ],
    contacto: {
        email: "javimalonso9@gmail.com",
        telefono: "601203423"
    },
    idiomas: {
        español: 99,
        inglés: 63

    }
};
document.querySelector("footer p").textContent =
    `© ${new Date().getFullYear()} Javier Martín Alonso`;

// Contenedor de habilidades
const skillsContainer = document.getElementById("skills");
skillsContainer.innerHTML = `<h2>Habilidades</h2>`;

let barrasSkills = [];
const skillsOrdenadas = [...cv.skills].sort((a, b) => b.nivel - a.nivel);
skillsOrdenadas.forEach(skill => {
    function getColor(nivel) {
        if (nivel < 30) return "#e41818";   // rojo
        if (nivel < 50) return "#ff7b00";   // naranja
        if (nivel < 70) return "#ffcc00";   // amarillo
        if (nivel < 90) return "#8bdc3c";   // verde claro
        return "#00a143";                  // verde fuerte
    }
    // Definimos el color según el nivel (puedes reusar la lógica de idiomas)
    let color = getColor(skill.nivel);

    const div = document.createElement("div");
    div.classList.add("skill-item"); // Clase opcional para estilos

    div.innerHTML = `
      <div class="nivel">
        <span>${skill.nombre}</span>
      </div>
      <div class="barra">
        <div class="progreso-skill" style="background:${color}; width: 0; height: 12px; border-radius: 10px; transition: width 1s ease;"></div>
      </div>
    `;

    const progreso = div.querySelector(".progreso-skill");
    barrasSkills.push({ elemento: progreso, nivel: skill.nivel });
    skillsContainer.appendChild(div);
});

// Función para animar habilidades
function animarSkills() {
    barrasSkills.forEach(skill => {
        setTimeout(() => {
            skill.elemento.style.width = skill.nivel + "%";
        }, 150);
    });
}
// Cargar datos
document.getElementById("nombre").textContent = cv.nombre;
document.getElementById("titulo").textContent = cv.titulo;

document.getElementById("experiencia").innerHTML = `
  <h2>Experiencia</h2>
  ${cv.experiencia.map(exp => `
    <p><strong>${exp.puesto}</strong> - ${exp.empresa} (${exp.año})</p>
  `).join('')}
`;

document.getElementById("educacion").innerHTML = `
    <h2> Educación</h2>
        ${cv.educacion.map(ed => `
      <p><strong>${ed.titulo}</strong> - ${ed.centro} (${ed.año})</p>
    `).join('')
    }
`;

document.getElementById("contacto").innerHTML = `
    <h2> Contacto</h2>
    <p>Email: ${cv.contacto.email}</p>
    <p>Teléfono: ${cv.contacto.telefono}</p>
`;
// IDIOMAS PRO
const idiomasContainer = document.getElementById("idiomas");
idiomasContainer.innerHTML = `<h2>Idiomas</h2>`;
const idiomasOrdenados = Object.entries(cv.idiomas)
    .sort((a, b) => b[1] - a[1]);
let barrasIdiomas = [];
let animado = false;

Object.entries(cv.idiomas).forEach(([idioma, nivel]) => {
    let color;

    if (nivel < 50) color = "#e41818";
    else if (nivel < 80) color = "#ffcc00";
    else color = "#2caf63";

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="nivel">
        <span>${idioma.toUpperCase()}</span>
      </div>
      <div class="barra">
        <div class="progreso" style="background:${color}"></div>
      </div>
    `;

    const progreso = div.querySelector(".progreso");
    barrasIdiomas.push({ elemento: progreso, nivel });

    idiomasContainer.appendChild(div);
});

function animarIdiomas() {
    if (animado) return;

    barrasIdiomas.forEach(barra => {
        setTimeout(() => {
            barra.elemento.style.width = barra.nivel + "%";
        }, 100);
    });

    animado = true;
}

function mostrarSeccion(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "idiomas") {
        animarIdiomas();
    }

    // Añadimos esta condición para las habilidades
    if (id === "skills") {
        animarSkills();
    }
}

// Llamar a la animación de la primera sección visible al cargar la página
window.onload = () => {
    if (document.getElementById("skills").classList.contains("active")) {
        animarSkills();
    }
};
let isDark = false;

const botonContainer = document.getElementById("boton");

// Cambiar tema
function toggleTheme() {
    document.body.classList.toggle("dark");

    isDark = !isDark;

    if (isDark) {
        botonContainer.innerText = "☀️ Cambiar tema";
    } else {
        botonContainer.innerText = "🌙 Cambiar tema";
    }
}