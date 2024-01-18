#!/bin/bash
set -e

# Check if a parameter is provided
if [ -z "$1" ]
then
  echo "No environment provided. Please provide either 'prod', 'maintenance', or 'pre-prod'."
  exit 1
fi

# Set the REMOTE_DIR and MAINTENANCE variables based on the provided environment
REMOTE_DIR_PROD="/home/cpiy9257/new-lmlccommunication.com/prod"
REMOTE_DIR_PREPROD="/home/cpiy9257/lmlccommunication.fr/pre-prod"
if [ "$1" = "prod" ]
then
  REMOTE_DIR=$REMOTE_DIR_PROD
  MAINTENANCE="false"
elif [ "$1" = "maintenance" ]
then
  REMOTE_DIR=$REMOTE_DIR_PROD
  MAINTENANCE="true"
elif [ "$1" = "pre-prod" ]
then
  REMOTE_DIR=$REMOTE_DIR_PREPROD
  MAINTENANCE="false"
else
  echo "Invalid environment provided. Please provide either 'prod', 'maintenance', or 'pre-prod'."
  exit 1
fi

# Update the .env file
echo "MAINTENANCE=$MAINTENANCE" > .env

# On build l'app pour générer les fichiers statiques
# Détecter si l'une ou l'autre fail, et si oui, arrêter le script
yarn build
yarn generate


# Définir le chemin du dossier à compresser
SOURCE_DIR="$(pwd)/.output/public/"

# Définir les informations de connexion pour le serveur distant
REMOTE_USER="cpiy9257"
REMOTE_HOST="109.234.160.108"

# Se déplacer dans le dossier source
cd $SOURCE_DIR

# Compresser les fichiers
zip -r Archive.zip *

# Transférer l'archive vers le serveur distant
scp Archive.zip $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Se connecter au serveur distant, déplacer l'archive, supprimer les anciens fichiers, déplacer l'archive de retour et la décompresser
ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_DIR && mv Archive.zip .. && rm -rf * && mv ../Archive.zip . && unzip Archive.zip && rm Archive.zip"

# Supprimer l'archive locale
rm Archive.zip

echo "Tâche terminée avec succès!"