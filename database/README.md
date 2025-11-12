# Base de Datos FarmApp

## Instrucciones de Instalación

### MySQL

1. Crear la base de datos:
```sql
CREATE DATABASE farmapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE farmapp;
```

2. Ejecutar el script:
```bash
mysql -u root -p farmapp < schema.sql
```

### PostgreSQL

1. Crear la base de datos:
```sql
CREATE DATABASE farmapp;
\c farmapp;
```

2. Ejecutar el script (ajustar sintaxis si es necesario):
```bash
psql -U postgres -d farmapp -f schema.sql
```

**Nota**: El script actual usa sintaxis MySQL. Para PostgreSQL, necesitarás ajustar:
- `AUTO_INCREMENT` → `SERIAL` o `GENERATED ALWAYS AS IDENTITY`
- `ENUM` → `VARCHAR` con CHECK constraint
- `ON UPDATE CURRENT_TIMESTAMP` → usar triggers

## Generar Contraseñas Hasheadas

Para crear usuarios con contraseñas hasheadas correctamente:

```bash
cd backend
node utils/generatePassword.js tu_contraseña
```

Esto generará un hash que puedes usar en el script SQL.

## Usuarios de Prueba

Después de ejecutar el script, puedes crear usuarios desde la aplicación o actualizar el script con hashes generados correctamente.

