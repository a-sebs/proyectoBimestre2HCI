// EduSimulador - Motor Principal (Data-Driven)

const Engine = {
    ageGroup: '5-8', // Por defecto
    content: null,

    init: function () {
        // Cargar edad del storage
        const savedAge = localStorage.getItem('ageGroup');
        if (savedAge) {
            this.ageGroup = savedAge;
        }
        this.loadContent();
    },

    loadContent: function () {
        // Asignar el objeto correcto de acuerdo al JS cargado en el HTML
        if (this.ageGroup === '5-8' && typeof content_5_8 !== 'undefined') {
            this.content = content_5_8;
        } else if (this.ageGroup === '9-12' && typeof content_9_12 !== 'undefined') {
            this.content = content_9_12;
        } else if (this.ageGroup === '13-15' && typeof content_13_15 !== 'undefined') {
            this.content = content_13_15;
        } else {
            console.error("Contenido de edad no encontrado o JS no importado.");
        }
    },

    renderAvatar: function (messageOverride) {
        const avatarContainer = document.getElementById('engine-avatar');
        if (!avatarContainer) return;

        // Reglas de avatar
        if (this.content.avatar.active === false && !messageOverride) {
            avatarContainer.style.display = 'none';
            return;
        }

        avatarContainer.style.display = 'flex';

        // Obtener mensaje (override > específico de página > genérico)
        let message = messageOverride || "¡Hola! Estoy aquí para ayudarte.";

        avatarContainer.innerHTML = `
            <div class="guide-avatar">👋</div>
            <div class="guide-bubble">${message}</div>
        `;
    },

    renderPresentacion: function () {
        const data = this.content.presentacion;
        document.getElementById('p-title').innerText = data.title;
        document.getElementById('p-illustration').innerText = data.illustration;
        document.getElementById('p-subtitle').innerText = data.subtitle;
        document.getElementById('p-time').innerText = data.time;
        document.getElementById('p-btn').innerText = data.buttonText;
    },

    renderMapa: function () {
        const data = this.content.mapa;
        document.getElementById('m-title').innerText = data.title;
        this.renderAvatar(data.avatarMessage);

        const container = document.getElementById('m-container');
        container.innerHTML = ""; // Limpiar

        if (data.type === 'trail') {
            // Estilo 5-8: Sendero Vertical
            let html = '<div class="timeline mt-md">';
            data.modules.forEach(mod => {
                let statusClass = mod.status === 'active' ? 'active' : '';
                html += `
                <div class="timeline-item ${statusClass}">
                    <div class="timeline-node">${mod.id}</div>
                    <a href="06-modulo-intro.html" class="timeline-content card-interactive" style="text-decoration: none; color: inherit; ${mod.status === 'locked' ? 'opacity:0.6; pointer-events:none;' : ''}">
                        <h3 style="color: var(--color-primary)">${mod.title}</h3>
                        <div class="text-large mt-sm">${mod.icon}</div>
                    </a>
                </div>`;
            });
            html += '</div>';
            container.innerHTML = html;
        }
        else if (data.type === 'cards') {
            // Estilo 9-12: Tarjetas horizontales/grid
            let html = '<div class="stack mt-md">';
            data.modules.forEach(mod => {
                html += `
                <a href="06-modulo-intro.html" class="card card-interactive" style="text-decoration: none; color: inherit; ${mod.status === 'locked' ? 'opacity:0.6; pointer-events:none;' : ''}">
                    <h3 style="color: var(--color-primary)">${mod.id}. ${mod.title}</h3>
                    <p class="text-small text-muted mt-sm">${mod.description}</p>
                </a>`;
            });
            html += '</div>';
            container.innerHTML = html;
        }
        else if (data.type === 'dashboard') {
            // Estilo 13-15: Dashboard Moodle
            let html = `
            <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Mis Cursos / Inducción</h3>
                <div class="stack">
            `;
            data.modules.forEach(mod => {
                html += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px; background: ${mod.status === 'active' ? '#f5f9fa' : '#fff'}; border-left: 4px solid ${mod.status === 'active' ? 'var(--color-primary)' : '#ddd'};">
                    <div>
                        <strong style="color:var(--color-primary); font-size: 14px;">Módulo ${mod.id}: ${mod.title}</strong>
                        <p class="text-small text-muted" style="margin:0;">${mod.description}</p>
                    </div>
                    <a href="06-modulo-intro.html" class="btn btn-sm btn-outline" style="min-height:30px; font-size:12px; padding: 5px 10px; ${mod.status === 'locked' ? 'opacity:0.5; pointer-events:none;' : ''}">Acceder</a>
                </div>`;
            });
            html += '</div></div>';
            container.innerHTML = html;
        }
    },

    renderIntro: function () {
        const data = this.content.intro;
        document.getElementById('i-title').innerText = data.title;
        document.getElementById('i-desc').innerText = data.description;
        document.getElementById('i-ill').innerText = data.illustration;
        document.getElementById('i-btn').innerText = data.buttonText;
        this.renderAvatar(data.avatarMessage);

        const list = document.getElementById('i-goals');
        list.innerHTML = "";
        data.goals.forEach(g => {
            let li = document.createElement('li');
            li.className = "text-base";
            li.innerText = g;
            list.appendChild(li);
        });
    },

    // Motor de Simulación (Manejo de Pasos)
    simulacionState: {
        currentStepIndex: 0
    },

    renderSimulacion: function () {
        const steps = this.content.simulacion.steps;
        const currentStep = steps[this.simulacionState.currentStepIndex];

        // Manejar Avatar
        this.renderAvatar(currentStep.avatarMessage);

        const overlay = document.getElementById('sim-overlay');
        const helper = document.getElementById('sim-helper');
        const overlayOpacity = currentStep.opacity !== undefined ? currentStep.opacity : 0.8;

        helper.innerHTML = "";

        if (currentStep.type === 'info') {
            overlay.style.backgroundColor = `rgba(27, 36, 48, ${overlayOpacity})`;
            overlay.style.pointerEvents = 'auto'; // Permitir clic en el overlay para avanzar
            overlay.onclick = () => this.nextSimulacionStep();
        } else {
            // Es de tipo 'action'
            overlay.style.backgroundColor = 'transparent'; // El oscurecimiento lo hará el box-shadow del spotlight
            overlay.style.pointerEvents = 'none'; // Bloquear overlay para que no avance al hacer clic en cualquier lado
            overlay.onclick = null;
            
            // Timeout para asegurar que el DOM está renderizado
            setTimeout(() => {
                const appRect = document.querySelector('.app-container').getBoundingClientRect();
                
                // Reiniciar estilos del helper para que ocupe todo el app-container y su origen sea 0,0
                helper.style.position = 'absolute';
                helper.style.top = '0';
                helper.style.left = '0';
                helper.style.margin = '0';
                helper.style.width = '100%';
                helper.style.height = '100%';
                helper.style.pointerEvents = 'none';

                let html = "";

                // 1. Dibujar el Spotlight (hueco oscuro) si se especificó y no es 'none'
                if (currentStep.spotlight && currentStep.spotlight !== 'none') {
                    const spotlightEl = document.getElementById('target-' + currentStep.spotlight);
                    if (spotlightEl) {
                        const sRect = spotlightEl.getBoundingClientRect();
                        const sTop = sRect.top - appRect.top;
                        const sLeft = sRect.left - appRect.left;
                        html += `
                            <div style="
                                position: absolute;
                                top: ${sTop}px; 
                                left: ${sLeft}px;
                                width: ${sRect.width}px;
                                height: ${sRect.height}px;
                                background-color: transparent;
                                box-shadow: 0 0 0 4px var(--color-highlight), 0 0 0 9999px rgba(27, 36, 48, ${overlayOpacity});
                                border-radius: 4px;
                                pointer-events: none;
                            "></div>
                        `;
                    }
                }

                // 2. Dibujar el Elemento Clickeable y el Texto de Ayuda sobre el Target Real
                if (currentStep.targetElement) {
                    const targetEl = document.getElementById('target-' + currentStep.targetElement);
                    if (targetEl) {
                        const tRect = targetEl.getBoundingClientRect();
                        const tTop = tRect.top - appRect.top;
                        const tLeft = tRect.left - appRect.left;

                        // Dibujar el área clickeable exactamente sobre el targetElement
                        html += `
                            <div class="spotlight-element" onclick="Engine.nextSimulacionStep()" style="
                                position: absolute;
                                top: ${tTop}px; 
                                left: ${tLeft}px;
                                width: ${tRect.width}px;
                                height: ${tRect.height}px;
                                background-color: transparent;
                                cursor: pointer;
                                pointer-events: auto;
                            "></div>
                        `;

                        // Dibujar el helper text (si lo hay) apuntando al targetElement
                        if (currentStep.helperText) {
                            html += `
                                <div style="
                                    position: absolute;
                                    top: ${tTop - 80}px;
                                    left: ${tLeft}px;
                                    width: ${tRect.width}px;
                                    text-align: center;
                                    color: white;
                                    font-weight: bold;
                                    pointer-events: none;
                                ">
                                    <span>${currentStep.helperText}</span>
                                    <br><span class="simulator-arrow">↓</span>
                                </div>
                            `;
                        }
                    }
                }

                helper.innerHTML = html;
            }, 50);
        }
    },

    nextSimulacionStep: function () {
        const steps = this.content.simulacion.steps;
        this.simulacionState.currentStepIndex++;

        if (this.simulacionState.currentStepIndex >= steps.length) {
            // Fin de la simulación, ir a la actividad
            window.location.href = '08-modulo-actividad.html';
        } else {
            this.renderSimulacion();
        }
    },

    renderActividad: function () {
        const data = this.content.actividad;
        document.getElementById('a-title').innerText = data.title;
        document.getElementById('a-inst').innerText = data.instruction;
        document.getElementById('a-btn').innerText = data.buttonText;
        this.renderAvatar(data.avatarMessage);

        const input = document.getElementById('a-input');
        const btn = document.getElementById('a-btn');
        const errorMsg = document.getElementById('a-error');
        errorMsg.innerText = data.errorHint;

        btn.onclick = () => {
            if (input.value.toLowerCase().trim() === data.expectedInput) {
                window.location.href = '09-modulo-retroalimentacion.html';
            } else {
                input.style.borderColor = 'var(--state-error)';
                errorMsg.style.display = 'block';
                input.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(5px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 300 });
            }
        };
    },

    renderRetro: function () {
        const data = this.content.retroalimentacion;
        document.getElementById('r-title').innerText = data.title;
        document.getElementById('r-subtitle').innerText = data.subtitle;
        document.getElementById('r-badge-icon').innerText = data.badgeIcon;
        document.getElementById('r-badge-name').innerText = data.badgeName;
        document.getElementById('r-badge-desc').innerText = data.badgeDesc;
        this.renderAvatar(data.avatarMessage);

        const confetti = document.getElementById('r-confetti');
        if (data.confetti) {
            confetti.style.display = 'block';
            confetti.innerText = '🎉';
        } else {
            confetti.style.display = 'none';
        }
    },

    renderProgreso: function () {
        const data = this.content.progreso;
        document.getElementById('p-title').innerText = data.title;
        document.getElementById('p-ill').innerText = data.illustration;
        document.getElementById('p-comp').innerText = "Completado: " + data.completedText;
        document.getElementById('p-btn').innerText = data.nextButtonText;
        this.renderAvatar(data.avatarMessage);

        const mContainer = document.getElementById('p-metrics');
        mContainer.innerHTML = "";
        data.metrics.forEach(m => {
            mContainer.innerHTML += `
            <div class="stack" style="gap: var(--space-xs)">
                <div class="text-large font-display" style="color: var(--color-primary)">${m.value}</div>
                <div class="text-small text-muted">${m.label}</div>
            </div>`;
        });
    }
};

// Auto inicializar cuando cargue la página
window.onload = () => {
    Engine.init();

    // Detectar qué página es para renderizar su contenido
    if (document.getElementById('p-title') && window.location.pathname.includes('presentacion')) Engine.renderPresentacion();
    if (document.getElementById('m-title')) Engine.renderMapa();
    if (document.getElementById('i-title')) Engine.renderIntro();
    if (document.getElementById('sim-overlay')) Engine.renderSimulacion();
    if (document.getElementById('a-title')) Engine.renderActividad();
    if (document.getElementById('r-title')) Engine.renderRetro();
    if (document.getElementById('p-metrics') && window.location.pathname.includes('progreso')) Engine.renderProgreso();
};
