# Docker-Swarm-Project-M2-IWOCS-2022

- Université Le Havre Normandie
- Master 2 IWOCS
- Février 2022

## Auteurs

| Nom             | Prénom                    | login    | email                                             |
| --------------- | ------------------------- | -------- | ------------------------------------------------- |
| TAOUALIT | Madjid | tm177375 | madjid.taoualit@etu.univ-lehavre.fr |
| MERZOUK| Yugurten | my175117 | yugurten.merzouk@etu.univ-lehavre.fr |


## L'ajout des services

```
docker service create --name python-bruteforce-md5
```

## La création de l'image Docker

```
docker-compose build
docker-compose up --scale esclave=5 --scale maitre=1
docker-compose ps
```
