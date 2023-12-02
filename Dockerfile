# Verwenden Sie ein offizielles Node-Basisimage
FROM node:latest

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Kopieren Sie die package.json und yarn.lock in das Arbeitsverzeichnis
COPY package.json yarn.lock ./

# Installieren Sie Abhängigkeiten
RUN yarn install

# Kopieren Sie den Rest Ihres Projekts in das Arbeitsverzeichnis
COPY . .

# Bauen Sie Ihr Next.js-Projekt
RUN yarn build

# Starten Sie das Projekt beim Starten des Containers
CMD ["yarn", "start"]
