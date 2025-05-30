FROM node:18-alpine as build

WORKDIR /app


COPY package*.json ./
RUN npm install
RUN npm install -g vite


COPY . .

CMD ["npm", "run", "dev", "gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"],


FROM python:3.11

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]