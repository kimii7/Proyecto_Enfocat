import cv2
import os
import numpy as np
import tensorflow as tf
import pandas as pd
import json
from datetime import datetime

# Obtener la ruta del directorio donde se encuentra el script
directorio_actual = os.path.dirname(os.path.abspath(__file__))

# Cambiar el directorio de trabajo al directorio donde se encuentra el script
os.chdir(directorio_actual)

# Cargar los modelos de detección de puntos clave faciales y reconocimiento de emociones
with open('detection.json', 'r') as json_file:
    json_savedModel = json_file.read()

model_1_facialKeyPoints = tf.keras.models.model_from_json(json_savedModel)
model_1_facialKeyPoints.load_weights('weights_keypoint.hdf5')
adam = tf.keras.optimizers.Adam(learning_rate=0.0001, beta_1=0.9, beta_2=0.999, amsgrad=False)
model_1_facialKeyPoints.compile(loss="mean_squared_error", optimizer=adam, metrics=['accuracy'])

with open('emotion.json', 'r') as json_file:
    json_savedModel = json_file.read()

model_2_emotion = tf.keras.models.model_from_json(json_savedModel)
model_2_emotion.load_weights('weights_emotions.hdf5')
model_2_emotion.compile(optimizer="Adam", loss="categorical_crossentropy", metrics=["accuracy"])

dataPath = 'data'  # Cambia a la ruta donde hayas almacenado Data
imagePaths = os.listdir(dataPath)
print('imagePaths=', imagePaths)

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

faceClassif = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Crear una lista para almacenar las predicciones de emociones en varios cuadros
emotion_predictions_buffer = []

# Crear un DataFrame para almacenar las emociones predichas
df_emociones = pd.DataFrame(columns=['Emocion'])

while True:
    ret, frame = cap.read()
    if ret == False:
        break
    frame = cv2.flip(frame,1)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    auxFrame = gray.copy()
    nFrame = cv2.hconcat([frame, np.zeros((480, 300, 3), dtype=np.uint8)])

    faces = faceClassif.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        # Obtener la región de interés (ROI) de la cara para detectar puntos clave faciales
        face_roi = gray[y:y + h, x:x + w]
        face_roi_resized = cv2.resize(face_roi, (96, 96), interpolation=cv2.INTER_CUBIC)
        face_roi_normalized = face_roi_resized / 255.0
        face_roi_reshaped = np.reshape(face_roi_normalized, (1, 96, 96, 1))

        # Detección de puntos clave faciales
        keypoints = model_1_facialKeyPoints.predict(face_roi_reshaped)

        # Reconocimiento de emociones
        emotion_prediction = model_2_emotion.predict(face_roi_reshaped)
        emotion_class = np.argmax(emotion_prediction)

        # Almacena la predicción en el buffer de predicciones
        emotion_predictions_buffer.append(emotion_class)

        # Limita el tamaño del buffer a un número determinado de cuadros
        buffer_size = 10
        if len(emotion_predictions_buffer) > buffer_size:
            emotion_predictions_buffer.pop(0)

        # Realiza el promedio de las predicciones en el buffer
        average_emotion_prediction = np.mean(emotion_predictions_buffer)

        # Emociones a detectar
        emotions_labels = {0: 'Ira', 1: 'Odio', 2: 'Tristeza', 3: 'Felicidad', 4: 'Sorpresa'}

        # Si la diferencia entre la predicción actual y el promedio es menor que un umbral, muestra la predicción promediada
        threshold = 2
        if len(set(emotion_predictions_buffer)) == 1 or abs(emotion_class - average_emotion_prediction) < threshold:
            predicted_emotion = emotions_labels[int(round(average_emotion_prediction))]
        else:
            predicted_emotion = emotions_labels[emotion_class]

        # Almacenar las emociones detectadas
        df_emociones = pd.concat([df_emociones, pd.DataFrame({'Emocion': [predicted_emotion]})], ignore_index=True)
        
        # Mostrar la emoción predicha en la imagen
        cv2.putText(frame, predicted_emotion, (x, y - 5), 1, 1.3, (255, 255, 0), 1, cv2.LINE_AA)

        # Dibujar el rectángulo alrededor del rostro
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Mostrar la imagen con la emoción en tiempo real
        nFrame = cv2.hconcat([frame, np.zeros((480, 300, 3), dtype=np.uint8)])

    cv2.imshow('nFrame', nFrame)
    k = cv2.waitKey(1)
    if k == 27: # Se cierra ventana al presionar 'esc'
        break

cap.release()
cv2.destroyAllWindows()

# Guardar la fecha y hora de la muestra
fecha = datetime.now()

# Calcular la frecuencia de cada emoción
emotion_counts = df_emociones['Emocion'].value_counts()

# Crear el nuevo DataFrame
df_emotion_summary = pd.DataFrame({
    'Emocion': emotion_counts.index,
    'Cantidad': emotion_counts.values
})

# Ordenar el DataFrame por tipo de emoción (opcional)
df_emotion_summary = df_emotion_summary.sort_values(by='Emocion')

# Restablecer los índices del DataFrame
df_emotion_summary = df_emotion_summary.reset_index(drop=True)

# Exportar el DataFrame a un archivo JSON
df_emotion_summary.to_json('emotion_summary_{}-{}-{}_{}h{}.json'.format(fecha.year,fecha.month,fecha.day,fecha.hour,fecha.minute), orient='records', indent=2)

print(df_emotion_summary)