// script.js - Gestión de formulario de docentes con Supabase

// Configuración de Supabase
const supabaseUrl = 'https://rxuhgvtbrrafnlmywqsw.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'sb_publishable_vDPpEmREFAOsPdmDATv3rQ_VuPoUmEY'; // Reemplaza con tu clave anónima
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función para agregar docente
async function agregarDocente() {
    const nombre = document.getElementById('nombre-docente').value.trim();
    const materiaNombre = document.getElementById('materia-docente').value.trim();

    if (!nombre || !materiaNombre) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // Insertar o actualizar docente
        const { data: docenteData, error: docenteError } = await supabaseClient
            .from('docentes')
            .upsert({ nombre: nombre }, { onConflict: 'nombre' })
            .select('id')
            .single();

        if (docenteError) throw docenteError;

        // Insertar o actualizar materia
        const { data: materiaData, error: materiaError } = await supabaseClient
            .from('materia')
            .upsert({ nombre: materiaNombre }, { onConflict: 'nombre' })
            .select('id')
            .single();

        if (materiaError) throw materiaError;

        // Insertar en matricula
        const { error: matriculaError } = await supabaseClient
            .from('matricula')
            .insert({ docente_id: docenteData.id, materia_id: materiaData.id });

        if (matriculaError) {
            // Si ya existe la combinación, no es error
            if (matriculaError.code !== '23505') { // 23505 es unique violation
                throw matriculaError;
            }
        }

        alert('Docente y materia agregados exitosamente.');
        // Limpiar campos
        document.getElementById('nombre-docente').value = '';
        document.getElementById('materia-docente').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar: ' + error.message);
    }
}

// Función para actualizar docente (necesita ID, por ahora placeholder)
async function actualizarDocente() {
    // Implementar lógica para actualizar, necesita ID del docente
    alert('Función de actualizar no implementada aún.');
}

// Función para eliminar docente (necesita ID, por ahora placeholder)
async function eliminarDocente() {
    // Implementar lógica para eliminar, necesita ID del docente
    alert('Función de eliminar no implementada aún.');
}

// Agregar event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('agregar-docente').addEventListener('click', agregarDocente);
    document.getElementById('actualizar-docente').addEventListener('click', actualizarDocente);
    document.getElementById('eliminar-docente').addEventListener('click', eliminarDocente);
});