const content_9_12 = {
    avatar: {
        active: true,
        style: 'guide' // Moderado
    },
    presentacion: {
        title: "Recorrido de Aprendizaje",
        illustration: "🗺️🧭",
        subtitle: "3 Módulos",
        time: "10 min",
        buttonText: "Comenzar recorrido"
    },
    mapa: {
        title: "Mapa de Módulos",
        type: "cards", // Diseño de tarjetas conectadas
        avatarMessage: "Aquí tienes los módulos. Selecciona el primero para iniciar.",
        modules: [
            { id: 1, title: "Iniciar Sesión", description: "Accede a la plataforma", status: "active" },
            { id: 2, title: "Materiales", description: "Descarga documentos", status: "locked" },
            { id: 3, title: "Entregar Tarea", description: "Sube tu archivo", status: "locked" }
        ]
    },
    intro: {
        title: "Módulo 1: Iniciar Sesión",
        description: "Aprenderás a ingresar a tu cuenta usando tus datos de acceso.",
        illustration: "💻👤",
        goals: ["Identificar los campos", "Ingresar credenciales", "Entrar a la plataforma"],
        buttonText: "Practicar",
        avatarMessage: "Observa bien los pasos. ¡Es muy fácil!"
    },
    simulacion: {
        steps: [
            {
                type: "action",
                avatarMessage: "Selecciona el campo de Usuario y luego el de Contraseña para llenarlos.",
                spotlight: "login-form", // Menos restrictivo, ilumina todo el formulario
                targetElement: "username", 
                helperText: "Llena tus datos",
                opacity: 0.7 
            },
            {
                type: "action",
                avatarMessage: "Ahora pulsa el botón para entrar.",
                spotlight: "login-button",
                targetElement: "btn-login",
                helperText: "Pulsa aquí",
                opacity: 0.7
            }
        ]
    },
    actividad: {
        title: "Demuestra lo aprendido",
        instruction: 'Escribe tu usuario (ej. "estudiante") para continuar.',
        expectedInput: "estudiante",
        errorHint: 'Recuerda escribir "estudiante"',
        avatarMessage: "Usa lo que aprendimos para iniciar sesión.",
        buttonText: "Continuar"
    },
    retroalimentacion: {
        title: "¡Excelente!",
        subtitle: "Completaste el reto correctamente.",
        badgeIcon: "🏅",
        badgeName: "Insignia de Explorador",
        badgeDesc: "Completaste tu primer módulo",
        avatarMessage: "¡Muy bien hecho! Has ganado una insignia.",
        confetti: false
    },
    progreso: {
        title: "Tu Progreso",
        illustration: "📊",
        completedText: "33%",
        metrics: [
            { value: "1", label: "Módulo" },
            { value: "1", label: "Insignia" }
        ],
        avatarMessage: "Avanzas a buen ritmo. ¿Continuamos?",
        nextButtonText: "Siguiente módulo"
    }
};
