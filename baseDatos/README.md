# Base de Datos - Universidad de Nariño

Esta carpeta contiene los archivos SQL necesarios para configurar la base de datos en Supabase.

## Archivos

- `schema.sql`: Contiene la definición simplificada de las tablas sin políticas de seguridad.

## Cómo usar

1. Ve a tu proyecto en Supabase (https://supabase.com/dashboard)
2. En el menú lateral, selecciona "SQL Editor"
3. Copia y pega el contenido de `schema.sql` en el editor
4. Ejecuta la consulta para crear las tablas

## Tablas incluidas

- `docentes`: Información de los docentes
  - `id`: Identificador único (SERIAL)
  - `nombre`: Nombre del docente (único)

- `materia`: Información de las materias
  - `id`: Identificador único (SERIAL)
  - `nombre`: Nombre de la materia (único)

- `matricula`: Relación entre docentes y materias
  - `id`: Identificador único (SERIAL)
  - `docente_id`: Referencia a docentes
  - `materia_id`: Referencia a materia
  - Restricción única en (docente_id, materia_id) para evitar duplicados

## Notas

- Se usan claves primarias SERIAL para autoincremento.
- No hay políticas de seguridad configuradas (simplificado).
- Las claves foráneas tienen ON DELETE CASCADE.