#!/bin/bash

# Definieren Sie den Namen Ihres Docker-Images und Tags
IMAGE_NAME="cretu.dev"
IMAGE_TAG="v2"

# Stoppen und entfernen Sie den aktuellen Container (angepasst an Ihren Container-Namen)
CONTAINER_NAME="cretu.dev"
echo "Stoppen des aktuellen Containers: $CONTAINER_NAME"
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

# Bauen Sie das Docker-Image neu
echo "Bauen des neuen Docker-Images: $IMAGE_NAME:$IMAGE_TAG"
docker build -t $IMAGE_NAME:$IMAGE_TAG .

# Starten Sie den neuen Container mit dem Host-Verzeichnis als Volume
echo "Starten des neuen Containers: $CONTAINER_NAME"
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME:$IMAGE_TAG

echo "Container aktualisiert und gestartet: $CONTAINER_NAME"

