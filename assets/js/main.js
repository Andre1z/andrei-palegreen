(function() {
  document.addEventListener('DOMContentLoaded', function() {

    /* ===== Campo de Firma ===== */
    var signatureInputs = document.querySelectorAll('input.apm-signature');
    signatureInputs.forEach(function(originalInput) {
      var container = document.createElement('div');
      container.className = 'apm-signature-container';

      var canvas = document.createElement('canvas');
      canvas.className = 'apm-signature-canvas';
      canvas.width = 300;
      canvas.height = 150;

      var hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      if (originalInput.hasAttribute('name')) {
        hiddenInput.name = originalInput.getAttribute('name');
      }
      if (originalInput.hasAttribute('id')) {
        hiddenInput.id = originalInput.getAttribute('id');
      }

      container.appendChild(canvas);
      container.appendChild(hiddenInput);
      originalInput.parentNode.replaceChild(container, originalInput);

      var ctx = canvas.getContext('2d');
      var isDrawing = false, lastX = 0, lastY = 0;

      function startDrawing(e) {
        isDrawing = true;
        var rect = canvas.getBoundingClientRect();
        if(e.touches && e.touches.length > 0) {
          lastX = e.touches[0].clientX - rect.left;
          lastY = e.touches[0].clientY - rect.top;
        } else {
          lastX = e.clientX - rect.left;
          lastY = e.clientY - rect.top;
        }
        e.preventDefault();
      }
      function draw(e) {
        if (!isDrawing) return;
        var rect = canvas.getBoundingClientRect();
        var currentX, currentY;
        if(e.touches && e.touches.length > 0) {
          currentX = e.touches[0].clientX - rect.left;
          currentY = e.touches[0].clientY - rect.top;
        } else {
          currentX = e.clientX - rect.left;
          currentY = e.clientY - rect.top;
        }
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        lastX = currentX;
        lastY = currentY;
        hiddenInput.value = canvas.toDataURL('image/png');
        e.preventDefault();
      }
      function stopDrawing(e) {
        isDrawing = false;
        e.preventDefault();
      }
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);
      canvas.addEventListener('touchcancel', stopDrawing);
    });

    /* ===== Campo de Coordenadas Geográficas ===== */
    var geoModal = document.createElement('div');
    geoModal.className = 'apm-modal';
    geoModal.style.display = 'none';

    var modalContent = document.createElement('div');
    modalContent.className = 'apm-modal-content';

    var closeButton = document.createElement('span');
    closeButton.className = 'apm-modal-close';
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    var iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.src = 'map-selector.html';
    modalContent.appendChild(iframe);

    geoModal.appendChild(modalContent);
    document.body.appendChild(geoModal);

    var activeGeoHiddenInput = null, activeGeoDisplay = null;
    var geoInputs = document.querySelectorAll('input.apm-geocoords');
    geoInputs.forEach(function(originalInput) {
      var container = document.createElement('div');
      container.className = 'apm-geocoords-container';

      var button = document.createElement('button');
      button.type = 'button';
      button.innerText = 'Seleccionar Coordenadas';

      var display = document.createElement('span');
      display.className = 'apm-geocoords-display';
      display.innerText = 'Ninguna coordenada seleccionada';

      var hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      if (originalInput.hasAttribute('name')) {
        hiddenInput.name = originalInput.getAttribute('name');
      }
      if (originalInput.hasAttribute('id')) {
        hiddenInput.id = originalInput.getAttribute('id');
      }

      container.appendChild(button);
      container.appendChild(display);
      container.appendChild(hiddenInput);
      originalInput.parentNode.replaceChild(container, originalInput);

      button.addEventListener('click', function() {
        activeGeoHiddenInput = hiddenInput;
        activeGeoDisplay = display;
        geoModal.style.display = 'block';
      });
    });

    closeButton.addEventListener('click', function() {
      geoModal.style.display = 'none';
    });

    window.addEventListener('message', function(event) {
      if(event.data && event.data.lat && event.data.lng) {
        if(activeGeoDisplay && activeGeoHiddenInput) {
          activeGeoDisplay.innerText = 'Lat: ' + event.data.lat + ', Lng: ' + event.data.lng;
          activeGeoHiddenInput.value = event.data.lat + ',' + event.data.lng;
        }
        geoModal.style.display = 'none';
      }
    });

    /* ===== Campo de Color con Paleta Personalizada ===== */
    var css3ColorInputs = document.querySelectorAll('input.apm-css3colors');
    var css3Colors = [
      { name: "AliceBlue", hex: "#F0F8FF" },
      { name: "AntiqueWhite", hex: "#FAEBD7" },
      { name: "Aqua", hex: "#00FFFF" },
      { name: "Aquamarine", hex: "#7FFFD4" },
      { name: "Azure", hex: "#F0FFFF" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Bisque", hex: "#FFE4C4" },
      { name: "Black", hex: "#000000" },
      { name: "BlanchedAlmond", hex: "#FFEBCD" },
      { name: "Blue", hex: "#0000FF" },
      { name: "BlueViolet", hex: "#8A2BE2" },
      { name: "Brown", hex: "#A52A2A" },
      { name: "BurlyWood", hex: "#DEB887" },
      { name: "CadetBlue", hex: "#5F9EA0" },
      { name: "Chartreuse", hex: "#7FFF00" },
      { name: "Chocolate", hex: "#D2691E" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "CornflowerBlue", hex: "#6495ED" },
      { name: "Cornsilk", hex: "#FFF8DC" },
      { name: "Crimson", hex: "#DC143C" },
      { name: "Cyan", hex: "#00FFFF" },
      { name: "DarkBlue", hex: "#00008B" },
      { name: "DarkCyan", hex: "#008B8B" },
      { name: "DarkGoldenRod", hex: "#B8860B" },
      { name: "DarkGray", hex: "#A9A9A9" },
      { name: "DarkGrey", hex: "#A9A9A9" },
      { name: "DarkGreen", hex: "#006400" },
      { name: "DarkKhaki", hex: "#BDB76B" },
      { name: "DarkMagenta", hex: "#8B008B" },
      { name: "DarkOliveGreen", hex: "#556B2F" },
      { name: "DarkOrange", hex: "#FF8C00" },
      { name: "DarkOrchid", hex: "#9932CC" },
      { name: "DarkRed", hex: "#8B0000" },
      { name: "DarkSalmon", hex: "#E9967A" },
      { name: "DarkSeaGreen", hex: "#8FBC8F" },
      { name: "DarkSlateBlue", hex: "#483D8B" },
      { name: "DarkSlateGray", hex: "#2F4F4F" },
      { name: "DarkSlateGrey", hex: "#2F4F4F" },
      { name: "DarkTurquoise", hex: "#00CED1" },
      { name: "DarkViolet", hex: "#9400D3" },
      { name: "DeepPink", hex: "#FF1493" },
      { name: "DeepSkyBlue", hex: "#00BFFF" },
      { name: "DimGray", hex: "#696969" },
      { name: "DimGrey", hex: "#696969" },
      { name: "DodgerBlue", hex: "#1E90FF" },
      { name: "FireBrick", hex: "#B22222" },
      { name: "FloralWhite", hex: "#FFFAF0" },
      { name: "ForestGreen", hex: "#228B22" },
      { name: "Fuchsia", hex: "#FF00FF" },
      { name: "Gainsboro", hex: "#DCDCDC" },
      { name: "GhostWhite", hex: "#F8F8FF" },
      { name: "Gold", hex: "#FFD700" },
      { name: "GoldenRod", hex: "#DAA520" },
      { name: "Gray", hex: "#808080" },
      { name: "Grey", hex: "#808080" },
      { name: "Green", hex: "#008000" },
      { name: "GreenYellow", hex: "#ADFF2F" },
      { name: "HoneyDew", hex: "#F0FFF0" },
      { name: "HotPink", hex: "#FF69B4" },
      { name: "IndianRed", hex: "#CD5C5C" },
      { name: "Indigo", hex: "#4B0082" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Khaki", hex: "#F0E68C" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "LavenderBlush", hex: "#FFF0F5" },
      { name: "LawnGreen", hex: "#7CFC00" },
      { name: "LemonChiffon", hex: "#FFFACD" },
      { name: "LightBlue", hex: "#ADD8E6" },
      { name: "LightCoral", hex: "#F08080" },
      { name: "LightCyan", hex: "#E0FFFF" },
      { name: "LightGoldenRodYellow", hex: "#FAFAD2" },
      { name: "LightGray", hex: "#D3D3D3" },
      { name: "LightGrey", hex: "#D3D3D3" },
      { name: "LightGreen", hex: "#90EE90" },
      { name: "LightPink", hex: "#FFB6C1" },
      { name: "LightSalmon", hex: "#FFA07A" },
      { name: "LightSeaGreen", hex: "#20B2AA" },
      { name: "LightSkyBlue", hex: "#87CEFA" },
      { name: "LightSlateGray", hex: "#778899" },
      { name: "LightSlateGrey", hex: "#778899" },
      { name: "LightSteelBlue", hex: "#B0C4DE" },
      { name: "LightYellow", hex: "#FFFFE0" },
      { name: "Lime", hex: "#00FF00" },
      { name: "LimeGreen", hex: "#32CD32" },
      { name: "Linen", hex: "#FAF0E6" },
      { name: "Magenta", hex: "#FF00FF" },
      { name: "Maroon", hex: "#800000" },
      { name: "MediumAquaMarine", hex: "#66CDAA" },
      { name: "MediumBlue", hex: "#0000CD" },
      { name: "MediumOrchid", hex: "#BA55D3" },
      { name: "MediumPurple", hex: "#9370DB" },
      { name: "MediumSeaGreen", hex: "#3CB371" },
      { name: "MediumSlateBlue", hex: "#7B68EE" },
      { name: "MediumSpringGreen", hex: "#00FA9A" },
      { name: "MediumTurquoise", hex: "#48D1CC" },
      { name: "MediumVioletRed", hex: "#C71585" },
      { name: "MidnightBlue", hex: "#191970" },
      { name: "MintCream", hex: "#F5FFFA" },
      { name: "MistyRose", hex: "#FFE4E1" },
      { name: "Moccasin", hex: "#FFE4B5" },
      { name: "NavajoWhite", hex: "#FFDEAD" },
      { name: "Navy", hex: "#000080" },
      { name: "OldLace", hex: "#FDF5E6" },
      { name: "Olive", hex: "#808000" },
      { name: "OliveDrab", hex: "#6B8E23" },
      { name: "Orange", hex: "#FFA500" },
      { name: "OrangeRed", hex: "#FF4500" },
      { name: "Orchid", hex: "#DA70D6" },
      { name: "PaleGoldenRod", hex: "#EEE8AA" },
      { name: "PaleGreen", hex: "#98FB98" },
      { name: "PaleTurquoise", hex: "#AFEEEE" },
      { name: "PaleVioletRed", hex: "#DB7093" },
      { name: "PapayaWhip", hex: "#FFEFD5" },
      { name: "PeachPuff", hex: "#FFDAB9" },
      { name: "Peru", hex: "#CD853F" },
      { name: "Pink", hex: "#FFC0CB" },
      { name: "Plum", hex: "#DDA0DD" },
      { name: "PowderBlue", hex: "#B0E0E6" },
      { name: "Purple", hex: "#800080" },
      { name: "RebeccaPurple", hex: "#663399" },
      { name: "Red", hex: "#FF0000" },
      { name: "RosyBrown", hex: "#BC8F8F" },
      { name: "RoyalBlue", hex: "#4169E1" },
      { name: "SaddleBrown", hex: "#8B4513" },
      { name: "Salmon", hex: "#FA8072" },
      { name: "SandyBrown", hex: "#F4A460" },
      { name: "SeaGreen", hex: "#2E8B57" },
      { name: "SeaShell", hex: "#FFF5EE" },
      { name: "Sienna", hex: "#A0522D" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "SkyBlue", hex: "#87CEEB" },
      { name: "SlateBlue", hex: "#6A5ACD" },
      { name: "SlateGray", hex: "#708090" },
      { name: "SlateGrey", hex: "#708090" },
      { name: "Snow", hex: "#FFFAFA" },
      { name: "SpringGreen", hex: "#00FF7F" },
      { name: "SteelBlue", hex: "#4682B4" },
      { name: "Tan", hex: "#D2B48C" },
      { name: "Teal", hex: "#008080" },
      { name: "Thistle", hex: "#D8BFD8" },
      { name: "Tomato", hex: "#FF6347" },
      { name: "Turquoise", hex: "#40E0D0" },
      { name: "Violet", hex: "#EE82EE" },
      { name: "Wheat", hex: "#F5DEB3" },
      { name: "White", hex: "#FFFFFF" },
      { name: "WhiteSmoke", hex: "#F5F5F5" },
      { name: "Yellow", hex: "#FFFF00" },
      { name: "YellowGreen", hex: "#9ACD32" }
    ];

    css3ColorInputs.forEach(function(originalInput) {
      var container = document.createElement('div');
      container.className = 'apm-css3colors-container';
      container.style.position = 'relative';

      var display = document.createElement('div');
      display.className = 'apm-css3colors-display';
      display.innerText = 'Seleccionar Color';

      var hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      if (originalInput.hasAttribute('name')) {
        hiddenInput.name = originalInput.getAttribute('name');
      }
      if (originalInput.hasAttribute('id')) {
        hiddenInput.id = originalInput.getAttribute('id');
      }

      container.appendChild(display);
      container.appendChild(hiddenInput);
      originalInput.parentNode.replaceChild(container, originalInput);

      var palette = document.createElement('div');
      palette.className = 'apm-css3colors-palette';
      palette.style.display = 'none';

      css3Colors.forEach(function(color) {
        var item = document.createElement('div');
        item.className = 'apm-css3colors-item';

        var swatch = document.createElement('span');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color.hex;

        var text = document.createElement('span');
        text.innerText = color.name;

        item.appendChild(swatch);
        item.appendChild(text);

        item.addEventListener('click', function() {
          display.innerText = color.name;
          hiddenInput.value = color.hex;
          palette.style.display = 'none';
        });

        palette.appendChild(item);
      });
      container.appendChild(palette);

      display.addEventListener('click', function(e) {
        palette.style.display = (palette.style.display === 'none') ? 'block' : 'none';
        e.stopPropagation();
      });

      document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
          palette.style.display = 'none';
        }
      });
    });

  });
  
})();
// Función para recopilar los datos de los tres campos
// Función que recopila los datos de los tres campos:
function gatherFormData() {
  // Se asume que cada uno de los controles ya ha sido convertido y contiene un input hidden.
  const signature = document.querySelector('.apm-signature-container input[type="hidden"]')?.value || "";
  const coords    = document.querySelector('.apm-geocoords-container input[type="hidden"]')?.value || "";
  const color     = document.querySelector('.apm-css3colors-container input[type="hidden"]')?.value || "";

  return {
    firma: signature,
    coords: coords,
    color: color
  };
}

// Función para disparar la descarga del archivo JSON utilizando Blob
function downloadJSON(jsonData, filename = 'datos.json') {
  const jsonStr = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Función que se ejecuta al enviar el formulario
function handleFormSubmit(e) {
  e.preventDefault();  // Evita el envío tradicional del formulario
  const formData = gatherFormData();
  
  // Almacenamos el JSON de forma global, si fuera necesario para otras operaciones.
  window.generatedFormJson = formData;
  console.log("JSON generado:", formData);
  
  // Aquí se dispara la descarga del archivo datos.json
  downloadJSON(formData, "datos.json");
  
  // Notificamos al usuario (opcional)
  alert("JSON generado y descargado como datos.json.");
}

// Enlazamos el evento submit del formulario a nuestra función
document.querySelector('form').addEventListener('submit', handleFormSubmit);
// Función para manejar la carga del archivo JSON
function handleJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const jsonData = JSON.parse(e.target.result);
      
      // Actualizar el campo de firma y redibujar la imagen en el canvas
      const sigHiddenInput = document.querySelector('.apm-signature-container input[type="hidden"]');
      if (sigHiddenInput && jsonData.firma) {
        sigHiddenInput.value = jsonData.firma;
        const canvas = document.querySelector('.apm-signature-container canvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = jsonData.firma;
        }
      }

      // Actualizar el campo de coordenadas
      const geoHiddenInput = document.querySelector('.apm-geocoords-container input[type="hidden"]');
      const geoDisplay = document.querySelector('.apm-geocoords-container .apm-geocoords-display');
      if (geoHiddenInput && geoDisplay && jsonData.coords) {
        geoHiddenInput.value = jsonData.coords;
        // Asumimos que el formato es "lat,lng"
        const parts = jsonData.coords.split(',');
        geoDisplay.innerText = 'Lat: ' + parts[0] + ', Lng: ' + parts[1];
      }

      // Actualizar el campo de color
      const colorHiddenInput = document.querySelector('.apm-css3colors-container input[type="hidden"]');
      const colorDisplay = document.querySelector('.apm-css3colors-container .apm-css3colors-display');
      if (colorHiddenInput && colorDisplay && jsonData.color) {
        colorHiddenInput.value = jsonData.color;
        colorDisplay.innerText = jsonData.color;
        // Actualizamos el fondo para visualizar el color
        colorDisplay.style.background = jsonData.color;
        colorDisplay.style.color = "#fff";
      }
      
      // (Opcional) Mostrar el JSON cargado en un contenedor de la página,
      // por ejemplo, en un <pre id="jsonPreview"></pre>
      const jsonPreview = document.getElementById('jsonPreview');
      if (jsonPreview) {
        jsonPreview.textContent = JSON.stringify(jsonData, null, 2);
      }
    } catch(err) {
      alert("Error al procesar el JSON: " + err);
    }
  };

  reader.readAsText(file);
}

// Vincular el input file para que, al cambiar, lea el JSON
document.getElementById('jsonFileInput').addEventListener('change', handleJsonFile);

// Opcional: botón para disparar la carga del archivo JSON (abre el dialogo de selección)
document.getElementById('loadFileButton').addEventListener('click', function() {
  document.getElementById('jsonFileInput').click();
});