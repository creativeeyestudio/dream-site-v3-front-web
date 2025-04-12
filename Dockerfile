# Utiliser une image légère de Node.js
FROM node:23-alpine

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet dans le conteneur
COPY . .

# Commande pour démarrer Next.js en mode développement
CMD ["npm", "run", "dev"]