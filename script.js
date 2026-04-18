// script.js - Gestión de formulario de docentes con Supabase

// Configuración de Supabase
const supabaseUrl = 'https://rxuhgvtbrrafnlmywqsw.supabase.co'; 
const supabaseKey = 'sb_publishable_vDPpEmREFAOsPdmDATv3rQ_VuPoUmEY'; 
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función para agregar docente, materia y su asignación
async function agregarDocente() {
    const nombreDocente = document.getElementById('nombre-docente').value.trim();
    const nombreMateria = document.getElementById('materia-docente').value.trim();

    if (!nombreDocente || !nombreMateria) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // 1. Insertar en la tabla 'docente'
        const { data: docenteData, error: docenteError } = await supabaseClient
            .from('docente') // Nombre exacto de la tabla
            .insert({ nombre: nombreDocente }) 
            .select('id_docente') // Pedimos que nos devuelva el id generado
            .single();

        if (docenteError) throw docenteError;

        // 2. Insertar en la tabla 'materia'
        const { data: materiaData, error: materiaError } = await supabaseClient
            .from('materia') // Nombre exacto de la tabla
            .insert({ nombre: nombreMateria })
            .select('id_materia') // Pedimos que nos devuelva el id generado
            .single();

        if (materiaError) throw materiaError;

        // 3. Crear la relación en la tabla 'asignacion'
        const { error: asignacionError } = await supabaseClient
            .from('asignacion') // Nombre exacto de la tabla
            .insert({ 
                id_docente: docenteData.id_docente, // Usamos el ID del docente recién creado
                id_materia: materiaData.id_materia  // Usamos el ID de la materia recién creada
            });

        if (asignacionError) throw asignacionError;

        alert('Docente, materia y asignación agregados exitosamente.');
        
        // Limpiar campos del HTML
        document.getElementById('nombre-docente').value = '';
        document.getElementById('materia-docente').value = '';
        
    } catch (error) {
        console.error('Error completo:', error);
        alert('Error al agregar: ' + error.message);
    }
}

// Función para actualizar docente (necesita ID, por ahora placeholder)
async function actualizarDocente() {
    alert('Función de actualizar no implementada aún.');
}

// Función para eliminar docente (necesita ID, por ahora placeholder)
async function eliminarDocente() {
    alert('Función de eliminar no implementada aún.');
}

// Agregar event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que los botones en tu HTML tengan estos IDs exactamente
    document.getElementById('agregar-docente').addEventListener('click', agregarDocente);
    // document.getElementById('actualizar-docente').addEventListener('click', actualizarDocente);
    // document.getElementById('eliminar-docente').addEventListener('click', eliminarDocente);
});
