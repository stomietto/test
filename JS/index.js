// Obtener referencias a los elementos del formulario
const formElement = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const fechaLlegadaInput = document.getElementById('fecha_llegada');
const fechaSalidaInput = document.getElementById('fecha_salida');
const tamanoRadioButtons = document.querySelectorAll('input[name="size"]');
const pesoSelect = document.getElementById('peso');
const cuidadosEspecialesCheckbox = document.getElementById('cuidados_especiales');
const totalDiasInput = document.getElementById('total_dias');
const montoTotalInput = document.getElementById('total_monto');

// Verificar si el carácter no es una letra ni un espacio en blanco
function validarNombre(nombre) {
  return /^[a-zA-Z\sÑñ]+$/.test(nombre);
}

function validarFechaLlegada(fechaLlegada) {
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0); // Establecer las horas de la fecha actual a 0 (medianoche)
  fechaLlegada.setHours(0, 0, 0, 0); // Establecer las horas de la fecha de llegada a 0 (medianoche)

  return fechaLlegada >= fechaActual; // Devolver true si la fecha de llegada es igual o posterior a la fecha actual
}

// Función para validar la fecha de salida
function validarFechaSalida(fechaLlegada, fechaSalida) {
  return fechaSalida > fechaLlegada;
}

// Función para calcular el número de días entre dos fechas
function calcularDias(fechaLlegada, fechaSalida) {
  const unDia = 24 * 60 * 60 * 1000; // Horas * minutos * segundos * milisegundos
  const diffDias = Math.round(Math.abs((fechaSalida - fechaLlegada) / unDia));
  return diffDias + 1; // Se agrega 1 para incluir el día de llegada y salida
}

// Función para calcular el monto total
function calcularMontoTotal(dias, peso, cuidadosEspeciales) {
  let precioBase;
  switch (peso) {
    case '0-10':
      precioBase = 7500;
      break;
    case '14-27':
      precioBase = 8000;
      break;
    case '25-50':
      precioBase = 8500;
      break;
    default:
      precioBase = 0;
  }

  const montoBase = dias * precioBase;
  const montoTotal = cuidadosEspeciales ? montoBase * 1.05 : montoBase;
  return montoTotal;
}

// Función para manejar el cálculo de la estadía
function calcularEstadia() {
  const nombre = nombreInput.value.trim();
  const fechaLlegada = new Date(fechaLlegadaInput.value);
  const fechaSalida = new Date(fechaSalidaInput.value);
  const tamanoSeleccionado = Array.from(tamanoRadioButtons).find(radioButton => radioButton.checked);
  const peso = pesoSelect.value;
  const cuidadosEspeciales = cuidadosEspecialesCheckbox.checked;

  // Validaciones
  if (!validarNombre(nombre)) {
    alert('Canólopis te sugiere que revises el nombre de la mascota. Solo puede contener letras y espacios.');
    return false; // Retornar false si la validación falla
  }

  if (!validarFechaLlegada(fechaLlegada)) {
    alert('Canólopis te sugiere que revises la fecha de llegada. Debe ser posterior a la fecha actual.');
    return false; // Retornar false si la validación falla
  }

  if (!validarFechaSalida(fechaLlegada, fechaSalida)) {
    alert('Canólopis te sugiere que revises la fecha de salida. Debe ser posterior a la fecha de llegada.');
    return false; // Retornar false si la validación falla
  }

  if (!tamanoSeleccionado) {
    alert('Canólopis te sugiere que selecciones el tamaño de la mascota.');
    return false; // Retornar false si la validación falla
  }

  if (!peso) {
    alert('Canólopis te sugiere que selecciones el peso de la mascota.');
    return false; // Retornar false si la validación falla
  }

  // Cálculos
  const dias = calcularDias(fechaLlegada, fechaSalida);
  const montoTotal = calcularMontoTotal(dias, peso, cuidadosEspeciales);

  // Mostrar resultados
  totalDiasInput.value = dias;
  montoTotalInput.value = "$" + " " + montoTotal.toFixed(2);

  return true; // Retornar true si todas las validaciones se pasan correctamente
}

montoTotalInput.value = "$" + montoTotalInput.value;

// Habilitar/deshabilitar el campo de peso según la selección del tamaño
tamanoRadioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', () => {
    pesoSelect.disabled = !Array.from(tamanoRadioButtons).some(radio => radio.checked);
  });
});

// Agregar event listener al formulario para evitar el envío si hay errores
formElement.addEventListener('submit', event => {
  event.preventDefault(); // Prevenir el envío del formulario

  // Validar campos y realizar cálculos aquí
  if (calcularEstadia()) {
    // Si calcularEstadia() devuelve true, significa que no hubo errores
    // Aquí puedes enviar el formulario o realizar cualquier otra acción necesaria
    // ...
  }
});


