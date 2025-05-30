FROM node:18-alpine as build
FROM python:3.11

WORKDIR /app

COPY . /app

COPY package*.json ./
RUN npm install
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install -g vite

COPY . .

CMD ["npm", "run", "dev", "gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"],


