CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_focus BOOLEAN DEFAULT FALSE,    -- Для "Фокус дня"
    is_completed BOOLEAN DEFAULT FALSE,
    due_date TIMESTAMP,                -- Дедлайн
    parent_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE, -- Связь с целью/сферой
    type VARCHAR(50) DEFAULT 'task',   -- 'sphere', 'goal', 'task' (на будущее)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Тестовые данные (чтобы ты сразу увидел результат)
INSERT INTO tasks (title, description, is_focus, due_date, type) VALUES 
('Здоровье', 'Сфера жизни', false, null, 'sphere'),
('Работа', 'Сфера жизни', false, null, 'sphere');

INSERT INTO tasks (title, description, is_focus, due_date, parent_id, type) VALUES 
('Пробежать марафон', 'Годовая цель', false, '2025-12-31', 1, 'goal'),
('Запуск MVP', 'Запустить проект', true, '2025-06-01', 2, 'goal');

INSERT INTO tasks (title, description, is_focus, due_date, parent_id, type) VALUES 
('Купить кроссовки', 'Срочно', true, NOW() + interval '1 day', 3, 'task'),
('Написать бэкенд', 'Node + PG', true, NOW(), 4, 'task'),
('Сделать макет', 'Figma', false, NOW() + interval '3 days', 4, 'task');