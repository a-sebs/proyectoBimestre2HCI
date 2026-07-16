const content_13_15 = {
    avatar: {
        active: false, // Solo a petición
        style: 'minimal'
    },
    presentacion: {
        title: "Inducción a la Plataforma LMS",
        illustration: "🎓🖥️",
        subtitle: "Programa de inducción",
        time: "15 min",
        buttonText: "Iniciar Inducción"
    },
    mapa: {
        title: "Panel de Control (Dashboard)",
        type: "dashboard", // Diseño tipo Moodle modular
        avatarMessage: "Bienvenido a tu panel. Selecciona el módulo activo.",
        modules: [
            { id: 1, title: "Autenticación", description: "Acceso seguro al sistema", status: "active" },
            { id: 2, title: "Gestión de Recursos", description: "Consulta de materiales", status: "locked" },
            { id: 3, title: "Asignaciones", description: "Entrega de trabajos", status: "locked" },
            { id: 4, title: "Foros", description: "Participación y debate", status: "locked" }
        ]
    },
    intro: {
        title: "Módulo 1: Autenticación",
        description: "Procedimiento para acceder al sistema utilizando credenciales validadas.",
        illustration: "🔐⚙️",
        goals: ["Ingreso de credenciales", "Verificación de acceso"],
        buttonText: "Iniciar Simulación",
        avatarMessage: "Asegúrate de recordar tus credenciales de acceso." // Probablemente no se muestre por la config
    },
    simulacion: {
        steps: [
            {
                type: "action",
                avatarMessage: "Accede introduciendo tus credenciales en el bloque de ingreso.", // Lenguaje técnico
                spotlight: "none", // No oscurecer, parece Moodle real
                targetElement: "btn-login", // Solo esperamos que llene y presione (lo simulamos con un clic al botón)
                helperText: "Acceder al sistema",
                opacity: 0.0 // Transparente
            }
        ]
    },
    actividad: {
        title: "Validación de Acceso",
        instruction: 'Ingresa el ID de usuario proporcionado ("alumno123").',
        expectedInput: "alumno123",
        errorHint: 'Credenciales inválidas. Usa "alumno123".',
        avatarMessage: "Si necesitas ayuda, puedes consultarme.", // Avatar desactivado por defecto
        buttonText: "Acceder"
    },
    retroalimentacion: {
        title: "Autenticación Exitosa",
        subtitle: "Has accedido correctamente al sistema.",
        badgeIcon: "✅",
        badgeName: "Acceso Verificado",
        badgeDesc: "Competencia técnica adquirida",
        avatarMessage: "",
        confetti: false
    },
    progreso: {
        title: "Estado de Inducción",
        illustration: "📈",
        completedText: "25%",
        metrics: [
            { value: "1", label: "Competencia" },
            { value: "25%", label: "Completado" }
        ],
        avatarMessage: "Módulo finalizado. Procede al siguiente apartado.",
        nextButtonText: "Siguiente Módulo"
    },
    aulas: {
        title: "Aulas Virtuales",
        avatarMessage: "",
        courses: [
            { name: "Matemática Avanzada", icon: "📊", hasTask: false },
            { name: "Lengua y Literatura", icon: "📖", hasTask: false },
            { name: "Física", icon: "⚛️", hasTask: true },
            { name: "Inglés Técnico", icon: "🗣️", hasTask: false }
        ],
        noTaskMessage: "No hay asignaciones pendientes en esta aula."
    },
    tarea: {
        courseName: "Física",
        title: "Asignación: Informe de Laboratorio",
        description: "Adjunta el documento con tu informe de laboratorio en formato PDF o Word.",
        uploadLabel: "Adjuntar archivo",
        submitButtonText: "Enviar asignación",
        avatarMessage: ""
    },
    tareaExito: {
        title: "Asignación Enviada",
        subtitle: "Tu archivo fue entregado correctamente.",
        badgeIcon: "✅",
        badgeName: "Entrega Verificada",
        badgeDesc: "Competencia de gestión de tareas adquirida",
        avatarMessage: "",
        confetti: false
    }
};
