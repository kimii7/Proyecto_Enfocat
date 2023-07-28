import cv2
import os
import numpy as np
import tensorflow as tf
from mtcnn.mtcnn import MTCNN
import pandas as pd
import json
import time
from datetime import datetime
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

def ejecutar_script():

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


    # dataPath = 'data'  # Cambia a la ruta donde hayas almacenado Data
    imagePaths = os.listdir(directorio_actual)
    print('imagePaths=', imagePaths)

    cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)

    # Guardar la fecha y hora de la muestra
    fecha = datetime.now()

    inicio_script = time.time()

    # faceClassif = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    face_detector = MTCNN()

    def adjust_contrast(image, contrast_factor):
        # Ajustar el contraste multiplicando los valores de píxeles por un factor
        adjusted_image = cv2.convertScaleAbs(image, alpha=contrast_factor, beta=0)
        return adjusted_image

    def balance_white(image):
        # Convertir la imagen BGR a LAB
        image_lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        # Dividir los canales de la imagen LAB
        l_channel, a_channel, b_channel = cv2.split(image_lab)
        # Calcular el promedio de la intensidad del canal L
        l_avg = np.mean(l_channel)
        # Calcular el factor de escala para el canal L basado en el promedio
        scale_factor = 128.0 / l_avg
        # Aplicar el factor de escala al canal L
        l_channel_balanced = np.clip(l_channel * scale_factor, 0, 255).astype(np.uint8)
        # Combinar los canales L, A y B nuevamente
        image_balanced_lab = cv2.merge([l_channel_balanced, a_channel, b_channel])
        # Convertir la imagen LAB de nuevo a BGR
        image_balanced = cv2.cvtColor(image_balanced_lab, cv2.COLOR_LAB2BGR)
        return image_balanced

    # Crear una lista para almacenar las predicciones de emociones en varios cuadros
    emotion_predictions_buffer = []

    # Crear un DataFrame para almacenar las emociones predichas
    df_emociones = pd.DataFrame(columns=['Emocion'])

    while True:
        ret, frame = cap.read()
        if ret == False:
            break
        frame = cv2.flip(frame, 1)

        # Aplicar el balance de blancos a la imagen
        white_balanced_frame = balance_white(frame)

        # Ajustar el contraste de la imagen
        contrast_factor = 1.5  # 0-1 menos contraste, >1 mas contraste
        adjusted_frame = adjust_contrast(frame, contrast_factor)

        # Ecualizador del histograma
        # equalized_frame = cv2.equalizeHist(adjusted_frame)
    
        # Detección de caras utilizando MTCNN
        faces = face_detector.detect_faces(white_balanced_frame)

        # Detección de caras utilizando MTCNN
        faces = face_detector.detect_faces(frame)

        umbral = 65
        for face in faces:
            x, y, w, h = face['box']

            # Obtener la región de interés (ROI) de la cara en color para el detector de puntos clave faciales
            face_roi_color = frame[y:y + h, x:x + w]

            # Convertir la región de interés (ROI) de la cara a escala de grises para los modelos de puntos clave faciales y emociones
            face_roi_gray = cv2.cvtColor(face_roi_color, cv2.COLOR_BGR2GRAY)

            # Preprocesar la imagen en escala de grises para el modelo de puntos clave faciales
            face_roi_resized = cv2.resize(face_roi_gray, (96, 96), interpolation=cv2.INTER_CUBIC)
            face_roi_normalized = face_roi_resized / 255.0
            face_roi_reshaped = np.reshape(face_roi_normalized, (1, 96, 96, 1))
            # Ecualizador del histograma
            # face_roi_reshaped = cv2.equalizeHist(face_roi_reshaped)
            # Detección de puntos clave faciales
            keypoints = model_1_facialKeyPoints.predict(face_roi_reshaped)

            # Reconocimiento de emociones
            emotion_prediction = model_2_emotion.predict(face_roi_reshaped)
            emotion_class = np.argmax(emotion_prediction)
            prediction_probability = np.max(emotion_prediction)*100

            # Almacena la predicción en el buffer de predicciones
            emotion_predictions_buffer.append(emotion_class)

            # Limita el tamaño del buffer a un número determinado de cuadros
            buffer_size = 10
            if len(emotion_predictions_buffer) > buffer_size:
                emotion_predictions_buffer.pop(0)

            # Realiza el promedio de las predicciones en el buffer
            average_emotion_prediction = np.mean(emotion_predictions_buffer)

            # Emociones a detectar
            emotions_labels = {0: 'Ira', 1: 'Odio', 2: 'Tristeza', 3: 'Felicidad', 4: 'Sorpresa', 5:'Neutral'}

            # Si la diferencia entre la predicción actual y el promedio es menor que un umbral, muestra la predicción promediada
            threshold = 2
            if len(set(emotion_predictions_buffer)) == 1 or abs(emotion_class - average_emotion_prediction) < threshold:
                predicted_emotion = emotions_labels[int(round(average_emotion_prediction))]
            else:
                predicted_emotion = emotions_labels[emotion_class]

            print(emotion_class)
            predicciones_validas = 0

            buffer_size = 10
            if len(emotion_predictions_buffer) > buffer_size:
                emotion_predictions_buffer.pop(0)

            # Si la predicción es válida (emotion_class 0, 1 o 2 y prediction_probability >= umbral), añadirla a la lista
            if emotion_class == 0 or emotion_class == 1 or emotion_class == 2 and prediction_probability <= umbral:
                emotion_class = 5

            # Almacena la predicción en el buffer de predicciones
            emotion_predictions_buffer.append(emotion_class)

            predicciones_validas = emotions_labels[emotion_class]

            label = '{} {:.0f}%'.format(predicciones_validas,prediction_probability)

            # Almacenar las emociones detectadas
            df_emociones = pd.concat([df_emociones, pd.DataFrame({'Emocion': [predicciones_validas]})], ignore_index=True)
            
            # Mostrar la emoción predicha en la imagen
            cv2.putText(frame, label, (x, y - 5), 1, 1.3, (255, 255, 0), 1, cv2.LINE_AA)

            # Dibujar el rectángulo alrededor del rostro
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Mostrar salida
            cv2.putText(frame, 'Presiona "esc" para salir', (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1, cv2.LINE_AA)


        # Mostrar la imagen con la emoción en tiempo real
        nFrame = cv2.hconcat([frame, np.zeros((480, 300, 3), dtype=np.uint8)])
        cv2.imshow('nFrame', nFrame)

        k = cv2.waitKey(1)
        if k == 27: # Se cierra ventana al presionar 'esc'
            break

    cap.release()
    cv2.destroyAllWindows()

    fin_script = time.time()

    duracion_detector = fin_script - inicio_script

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

    print('Duracion del script:', duracion_detector ,'s')
    print(df_emotion_summary)

    '''
    Esta mala clasificacion de algunas emociones se debe a la gran similitud que existe
    entre varias. Esto provoca que geometricamente sean practicamente indiferenciables
    y, por lo tanto, es complicado que los algoritmos sepan clasificarlas correctamente.
    '''
    return df_emotion_summary.to_json(orient="records")
