-- ============================================
-- FARMAPP - ESQUEMA DE BASE DE DATOS
-- ============================================
-- Base de datos: MySQL
-- Descripción: Sistema de gestión de farmacia

-- IMPORTANTE: Ejecuta primero: CREATE DATABASE farmapp;
-- Luego: USE farmapp;
-- Y después este script

USE farmapp;

-- ============================================
-- ELIMINAR TABLAS SI EXISTEN (en orden inverso por foreign keys)
-- ============================================
DROP TABLE IF EXISTS pagos_simulados;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: productos
-- ============================================
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50) NOT NULL,
    imagen_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: carrito
-- ============================================
CREATE TABLE carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_carrito (id_usuario, id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: pagos_simulados
-- ============================================
CREATE TABLE pagos_simulados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago_simulado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ============================================
CREATE INDEX idx_usuario_email ON usuarios(email);
CREATE INDEX idx_producto_categoria ON productos(categoria);
CREATE INDEX idx_carrito_usuario ON carrito(id_usuario);
CREATE INDEX idx_pagos_usuario ON pagos_simulados(id_usuario);

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- Usuario administrador (contraseña: admin123)
-- NOTA: Este hash es un ejemplo. Genera uno real con: node backend/utils/generatePassword.js admin123
INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES
('Administrador', 'admin@farmapp.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'admin');

-- Usuario cliente de prueba (contraseña: cliente123)
INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES
('Cliente Prueba', 'cliente@farmapp.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'cliente');

-- Productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES
('Paracetamol 500mg', 'Analgésico y antipirético para el alivio del dolor y la fiebre', 5.99, 50, 'Medicamentos', 'https://via.placeholder.com/300x300?text=Paracetamol'),
('Vitamina C 1000mg', 'Suplemento vitamínico para fortalecer el sistema inmunológico', 12.99, 30, 'Vitaminas', 'https://via.placeholder.com/300x300?text=Vitamina+C'),
('Jabón Antibacterial', 'Jabón líquido con propiedades antibacterianas', 3.50, 100, 'Cuidado Personal', 'https://via.placeholder.com/300x300?text=Jabon'),
('Vendas Elásticas', 'Vendas elásticas para primeros auxilios', 8.99, 25, 'Primeros Auxilios', 'https://via.placeholder.com/300x300?text=Vendas'),
('Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo para dolor e inflamación', 7.50, 40, 'Medicamentos', 'https://via.placeholder.com/300x300?text=Ibuprofeno'),
('Multivitamínico', 'Complejo vitamínico para adultos', 15.99, 20, 'Vitaminas', 'https://via.placeholder.com/300x300?text=Multivitaminico');
