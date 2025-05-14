# Andrei | Palegreen
 
Descripción:
------------
Este proyecto es una demostración de controles interactivos en formularios web utilizando 
HTML, CSS y JavaScript. Se incorporan los siguientes componentes:

1. Firma Digital:
   - Permite al usuario dibujar su firma mediante un canvas.
   - El trazo se captura en formato Base64 y se almacena en un campo oculto.

2. Selector de Coordenadas Geográficas:
   - Utiliza Leaflet y OpenStreetMap para mostrar un mapa interactivo.
   - El usuario puede seleccionar una ubicación en el mapa; la coordenada se guarda en 
     un input oculto.
   - La selección se visualiza en un modal que se abre al pulsar el botón correspondiente.

3. Selector de Color con Paleta Personalizada:
   - Despliega una paleta de 140 colores CSS3 para que el usuario pueda elegir un color.
   - Al seleccionar un color, se actualiza el campo y se muestra la selección.

Funcionalidades Adicionales:
----------------------------
- Generación y descarga de JSON:
  Al enviar el formulario, se genera automáticamente un archivo "datos.json" que contiene 
  los datos de la firma, las coordenadas y el color seleccionado. Este archivo se descarga 
  al equipo del usuario.

- Carga del archivo JSON:
  Se puede cargar un archivo JSON previamente generado. Al seleccionarlo, se leen sus 
  datos y se actualizan los controles del formulario (firma, coordenadas y color).

Estructura del Proyecto:
------------------------
```
andrei-palegreen/
├── .gitattributes
├── README.txt
├── index.html         --> Página principal que integra los tres controles.
├── demo.html          --> Página de demostración individual (por ejemplo, para probar las coordenadas).
├── map-selector.html  --> Página para seleccionar coordenadas (usada en un iframe).
└── assets/
    ├── css/
    │   └── style.css  --> Hoja de estilos con diseño moderno e interesante.
    └── js/
        └── main.js    --> Lógica de interacción y manejo de eventos para todos los controles.
```

Instalación / Uso:
------------------
1. Clona o descarga el proyecto.
2. Coloca el proyecto en un servidor local (por ejemplo, usando XAMPP, Live Server en VSCode, etc.).
3. Accede a la página "index.html" desde tu navegador.

Uso:
----
- Para generar el archivo JSON:
  1. Completa los campos interactivos (firma, coordenadas, color).
  2. Presiona el botón "Enviar". Se generará y descargará automáticamente el archivo "datos.json".

- Para cargar el archivo JSON:
  1. Presiona el botón "Cargar Archivo JSON".
  2. Selecciona el archivo "datos.json" desde tu equipo.
  3. Los campos del formulario se actualizarán automáticamente con la información del JSON.

Dependencias:
-------------
- **Leaflet**: Se utiliza la librería Leaflet a través de CDN para implementar el mapa.
- **OpenStreetMap**: Los mapas se cargan utilizando los tiles de OpenStreetMap.
- JavaScript Vanilla.

Notas:
------
- La descarga y carga del archivo JSON se realiza en el navegador. Para escribir o 
  almacenar el archivo directamente en el servidor, se requeriría implementar una solución 
  del lado del servidor (por ejemplo, con Node.js, PHP, etc.).

Licencia:
---------
Este proyecto está disponible bajo la licencia MIT.

Autor:
------
Creado por Andrei.

---------------------------------------------------------------