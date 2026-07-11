const content_5_8 = {
    avatar: {
        active: true, // Siempre activo
        style: 'friendly'
    },
    presentacion: {
        title: "¡Vamos a Jugar!",
        illustration: "🎈✨",
        subtitle: "1 misión divertida",
        time: "5 min",
        buttonText: "¡Empezar!"
    },
    mapa: {
        title: "El Camino del Saber",
        type: "trail", // Diseño de sendero
        avatarMessage: "¡Mira nuestro camino! Toca el número 1 para empezar nuestra aventura.",
        modules: [
            { id: 1, title: "Entrar", icon: "🚪", status: "active" },
            { id: 2, title: "Cursos", icon: "📚", status: "locked" },
            { id: 3, title: "Tareas", icon: "✏️", status: "locked" }
        ]
    },
    intro: {
        title: "Módulo 1: Entrar",
        description: "Vamos a aprender cómo abrir la puerta de nuestra escuela virtual.",
        illustration: "🚪🔑",
        goals: ["Escribir nombre", "Escribir clave", "Tocar el botón verde"],
        buttonText: "¡A jugar!",
        avatarMessage: "Presta mucha atención al video y luego practicamos juntos."
    },
    simulacion: {
        steps: [
            {
                type: "info",
                avatarMessage: "¿Qué es un usuario? Es tu nombre especial en la escuela.",
                spotlight: "none"
            },
            {
                type: "action",
                avatarMessage: "¡Toca aquí para escribir tu nombre!",
                spotlight: "username-field",
                targetElement: "username", // element to click to advance
                helperText: "Presiona aquí",
                opacity: 0.95 // muy oscuro
            },
            {
                type: "info",
                avatarMessage: "¿Qué es una contraseña? Es una llave secreta que solo tú sabes.",
                spotlight: "none"
            },
            {
                type: "action",
                avatarMessage: "¡Toca aquí para poner tu llave secreta!",
                spotlight: "password-field",
                targetElement: "password",
                helperText: "Presiona aquí",
                opacity: 0.95
            },
            {
                type: "action",
                avatarMessage: "¡Muy bien! Ahora toca el botón Entrar.",
                spotlight: "login-button",
                targetElement: "btn-login",
                helperText: "Toca el botón",
                opacity: 0.95
            }
        ]
    },
    actividad: {
        title: "¡Tu turno!",
        instruction: 'Toca el cuadro y escribe "yo"',
        expectedInput: "yo",
        errorHint: 'Intenta escribir "yo"',
        avatarMessage: 'Escribe "yo" en el cuadro y toca Continuar. ¡Tú puedes!',
        buttonText: "Continuar"
    },
    retroalimentacion: {
        title: "¡Súper bien!",
        subtitle: "¡Eres muy inteligente!",
        badgeIcon: "🌟",
        badgeName: "Estrella Brillante",
        badgeDesc: "¡Primer logro desbloqueado!",
        avatarMessage: "¡Lo hiciste perfecto! Ganaste una estrella.",
        confetti: true
    },
    progreso: {
        title: "¡Mira cuánto avanzaste!",
        illustration: "📈",
        completedText: "25%",
        metrics: [
            { value: "1", label: "Misión" },
            { value: "1", label: "Estrella" }
        ],
        avatarMessage: "¡Qué emoción! ¿Vamos al siguiente juego?",
        nextButtonText: "Siguiente juego"
    }
};
