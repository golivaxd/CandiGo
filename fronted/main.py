# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import csv
from math import sqrt

app = FastAPI()

# Permitir solicitudes desde Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de entrada
class Datos(BaseModel):
    datos: list[int]  # 12 preguntas

# Leer dataset CSV
dataset = []
with open("dataset_candidatos.csv", newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        attributes = [int(row[col]) for col in reader.fieldnames[:12]]
        dataset.append((attributes, row["Candidato"], row["Partido"]))

# Función para calcular distancia Euclidiana
def euclidean_distance(a, b):
    return sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

# Endpoint para predicción
@app.post("/predecir")
def predecir(input_data: Datos):
    user_input = input_data.datos
    min_dist = float("inf")
    pred_candidato = None
    pred_partido = None
    
    for data, candidato, partido in dataset:
        dist = euclidean_distance(user_input, data)
        if dist < min_dist:
            min_dist = dist
            pred_candidato = candidato
            pred_partido = partido
            
    return {"candidato": pred_candidato, "partido": pred_partido}
