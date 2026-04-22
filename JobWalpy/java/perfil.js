document.addEventListener('DOMContentLoaded', () => {
    // Selectores iniciales
    const companyCards = document.querySelectorAll('.card.profile-card-clickable');
    const mainContainer = document.querySelector('.main-container');

    // 1. Asignar el Event Listener a cada tarjeta de empresa
    companyCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('button') || event.target.closest('a')) { 
                return;
            }
            const companyId = card.dataset.id;
            loadCompanyProfile(companyId);
        });
    });

    // 2. Función para cargar y mostrar el perfil de la empresa
    function loadCompanyProfile(id) {
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        document.querySelector('.cv-page')?.remove();

        // 👉 Ocultar la sidebar cuando se abre un perfil
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'none';
        
        // Obtener los datos (simulados)
        const companyData = getCompanyData(id);
        if (!companyData || !companyData.companyName) {
            alert('Error: Datos de la empresa no encontrados.');
            if (mainContainer) mainContainer.style.display = 'flex';
            if (sidebar) sidebar.style.display = 'block';
            return;
        }

        // Crear el contenedor del perfil
        const cvPage = document.createElement('div');
        cvPage.classList.add('cv-page');

        cvPage.innerHTML = `
            <style>
                /* PERFIL DE EMPRESA CENTRADO */
                body {
                    background: #f2f4f7;
                }

                .cv-page {
                    max-width: 650px; /* Más angosto */
                    margin: 60px auto; /* Centrado vertical y horizontal */
                    padding: 40px;
                    background-color: #ffffff;
                    border-radius: 15px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    display: block;
                }

                .cv-header {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #1972ca;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }

                .cv-avatar {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background-color: #f0f0f0;
                    margin-right: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    color: #555;
                }

                .cv-personal-info h1 {
                    color: #003871;
                    margin: 0 0 5px 0;
                    font-size: 1.8rem;
                }

                .cv-section {
                    margin-bottom: 25px;
                }

                .cv-section h2 {
                    color: #1972ca;
                    border-left: 5px solid #1972ca;
                    padding-left: 10px;
                    margin-bottom: 15px;
                    font-size: 1.3rem;
                }

                .cv-section ul {
                    list-style: disc;
                    padding-left: 25px;
                    color: #333;
                }

                .back-button {
                    margin-top: 30px;
                    padding: 12px 25px;
                    background-color: #003871;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.1s;
                    font-size: 1rem;
                }

                .back-button:hover {
                    background-color: #1972ca;
                    transform: scale(1.03);
                }

                @media screen and (max-width: 600px) {
                    .cv-page {
                        width: 90%;
                        margin: 30px auto;
                        padding: 25px;
                    }
                }
            </style>

            <div class="cv-header">
                <div class="cv-avatar">Logo/Avatar</div>
                <div class="cv-personal-info">
                    <h1 id="cv-name">${companyData.companyName}</h1>
                    <p>Sector: ${companyData.sector}</p>
                    <p>Web: <a href="http://${companyData.website}" target="_blank" style="color:#1972ca;">${companyData.website}</a></p>
                    <p>Teléfono: ${companyData.phone}</p>
                    <p>Sede Principal: ${companyData.headquarters}</p>
                </div>
            </div>

            <div class="cv-section">
                <h2>Descripción</h2>
                <p>${companyData.description}</p>
            </div>
            
            <div class="cv-section">
                <h2>Tecnologías / Herramientas Clave</h2>
                <ul>
                    ${companyData.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>

            <div class="cv-section">
                <h2>Proyectos Recientes</h2>
                <ul>
                    ${companyData.projects.map(proj => `
                        <li>
                            <strong>${proj.title}</strong> (${proj.year})
                            <p>${proj.description}</p>
                        </li>`).join('')}
                </ul>
            </div>

            <div class="cv-section">
                <h2>Cultura y Beneficios</h2>
                <ul>
                    ${companyData.culture.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <button class="back-button" id="backToCompanies">← Volver a Empresas</button>
        `;

        document.body.appendChild(cvPage);

        // Botón volver
        const backButton = cvPage.querySelector('#backToCompanies');
        backButton.addEventListener('click', () => {
            cvPage.remove();
            if (mainContainer) mainContainer.style.display = 'flex';
            if (sidebar) sidebar.style.display = 'block';
        });
    }

    // 3. Datos simulados
    function getCompanyData(id) {
        const companies = {
            '1': {
                companyName: 'Celusoluciono',
                sector: 'Tecnología y Desarrollo de Software',
                website: 'www.celusoluciono.com',
                phone: '+57 1 789 0000',
                headquarters: 'Cali, Colombia',
                description: 'Líder en la creación de soluciones SaaS para el sector financiero en Latinoamérica. Buscamos desarrolladores, UX/UI y analistas.',
                technologies: ['React', 'Node.js', 'AWS/Azure', 'Kubernetes'],
                projects: [
                    { title: 'Plataforma de Trading Móvil', year: '2023', description: 'Desarrollo de una app móvil para transacciones rápidas y seguras.' },
                    { title: 'Sistema de IA para Riesgos', year: '2022', description: 'Implementación de un modelo de machine learning para predecir riesgos crediticios.' }
                ],
                culture: ['Trabajo remoto flexible', 'Bonos por desempeño', 'Capacitación constante', 'Oficinas modernas con cafetería gratuita']
            },
            '2': {
                companyName: 'Construcciones Atlas',
                sector: 'Construcción e Infraestructura',
                website: 'www.atlasconstruct.com',
                phone: '+57 4 567 1111',
                headquarters: 'Medellín, Colombia',
                description: 'Empresa dedicada a la construcción de proyectos de vivienda y obras públicas. Fuerte enfoque en seguridad y sostenibilidad.',
                technologies: ['AutoCAD', 'BIM (Revit)', 'Project Management Software', 'Normas ISO 9001'],
                projects: [
                    { title: 'Eco-Torres del Parque', year: '2024', description: 'Complejo de vivienda certificado por sostenibilidad ambiental.' },
                    { title: 'Puente Vial Metropolitano', year: '2023', description: 'Obra de infraestructura pública de alto impacto en la región.' }
                ],
                culture: ['Seguro de vida superior', 'Subsidio de transporte', 'Días libres extra por antigüedad', 'Planes de carrera para ingenieros y arquitectos']
            },
            '3': {
                companyName: 'Bancolombia',
                sector: 'Finanzas y Banca',
                website: 'www.bancolombia.com',
                phone: '+57 2 345 2222',
                headquarters: 'Bogotá, Colombia',
                description: 'Institución financiera con más de 50 años en el mercado. Ofrecemos oportunidades en áreas de riesgo, tecnología y atención al cliente.',
                technologies: ['SAP FICO', 'SQL Server', 'Blockchain (exploración)', 'Herramientas de BI'],
                projects: [
                    { title: 'Digitalización de Sucursales', year: '2024', description: 'Migración de procesos internos a plataformas 100% digitales.' }
                ],
                culture: ['Fondo de empleados con alta rentabilidad', 'Auxilios educativos', 'Jornada laboral reducida los viernes', 'Programas de bienestar financiero']
            },
        };

        return companies[id];
    }
});
//navegador columna izquierda

 const sidebar = document.querySelector(".sidebar"); 
const menu = document.querySelector("#menu");
const cerrar = document.querySelector("#cerrar");

menu.addEventListener("click", () => {
    sidebar.classList.add("visible"); 
    menu.style.display = 'none'; 
    cerrar.style.display = 'block'; 
});

cerrar.addEventListener("click", () => {
    sidebar.classList.remove("visible"); 
    menu.style.display = 'block'; 
    cerrar.style.display = 'none'; 
});