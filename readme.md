 -- INSTRUCCIONES BACKEND --

Para utilizar el backend hace falta instalar las siguientes dependencias:

    - python https://www.python.org/downloads/
    - pip install Django
    - pip install pip install djangorestframework
    - pip install django-cors-headers
    - pip install mysqlclient

Instalar mysql :

    - segun el usuario, password y host tendras que modificar el archivo backend/backend/settings.py en el apartado DATABASES

Crear una database con el nombre cleanCode, en caso de ponerle otro modificar el apartado DATABASES NAME del archivo mencionado anteriormente

Ejecutar los siguientes comandos dentro de la carpeta ./backend:

    - python .\manage.py makemigrations
    - python .\manage.py migrate

Esto creara las tablas de la base de datos.

Ya podemos iniciar el servidor con el siguiente comando:

    - python .\manage.py runserver 8000


 -- INSTRUCCIONES FRONTEND --

Para usar el frontend deberas instalar las siguientes dependencias:

    - instalar node js
    - npm install vite
    - instalar paquete react-calendar.
    - instalar html-canvas 2.
    - instalar react-count up.
    - instalar react-intersection-observer.
    - instalar react-router-doom.
    - instalar react-chartjs-2.
    - instalar fontawesome.

Una vez hecho puedes iniciar el frontend con el siguiente comando:
    - npm run dev

Se iniciara seguramente con el puerto 5173 o 5174 de forma predeterminada.