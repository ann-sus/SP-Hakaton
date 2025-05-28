# Вибираємо базовий образ Python
FROM python:3.11-slim

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей (requirements.txt)
COPY requirements.txt .

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо весь код проєкту
COPY . .

# Виставляємо порт (Django зазвичай 8000)
EXPOSE 8000

# Команда запуску сервера Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
