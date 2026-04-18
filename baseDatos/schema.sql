-- schema.sql
-- Esquema simplificado de base de datos para el proyecto de Gestión Universidad de Nariño en Supabase

-- Tabla para docentes
CREATE TABLE IF NOT EXISTS docentes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla para materias
CREATE TABLE IF NOT EXISTS materia (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla de matrícula que relaciona docentes y materias
CREATE TABLE IF NOT EXISTS matricula (
    id SERIAL PRIMARY KEY,
    docente_id INTEGER REFERENCES docentes(id) ON DELETE CASCADE,
    materia_id INTEGER REFERENCES materia(id) ON DELETE CASCADE,
    UNIQUE(docente_id, materia_id)
);