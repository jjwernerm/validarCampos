// El evento 'DOMContentLoaded' se activa cuando el documento HTML se carga y parsea por completo, asegurando que todos los elementos HTML en la página estén listos para ser manipulados con JavaScript.
document.addEventListener('DOMContentLoaded', function () {

  // Se crea un array vacío llamado 'inputsValue':
  // Este array se utilizará para almacenar los valores ingresados en los campos del formulario.
  const inputsValue = [];

  // Se declaran variables para almacenar referencias a los elementos del formulario.
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const btnValidate = document.querySelector('.btn-validate');


  // Se asignan escuchadores de eventos a los elementos del formulario:
  // Los campos de entrada 'inputName' e 'inputEmail' activarán la función 'validate' cada vez que se cambie su valor.
  // El botón 'btnValidate' activará la función 'clickBtn' cuando se haga clic en él.
  inputName.addEventListener('input', validate);
  inputEmail.addEventListener('input', validate);
  btnValidate.addEventListener('click', clickBtn);
  
  // Se define la función 'validate':
  // Esta función se encarga de validar los valores ingresados en los campos del formulario.
  // El parámetro 'e' representa el evento que desencadenó la función (en este caso, el evento 'input' de los campos de entrada).
  function validate(e) {

    // Comprobar si el valor del campo que ha cambiado (el que desencadenó el evento) está vacío después de quitar espacios en blanco al principio y al final.
    // e: Es el objeto Event que contiene información sobre el evento que se ha producido, como el tipo de evento, el elemento que lo generó y otros detalles.
    // e.target: es una propiedad que representa el elemento que generó el evento actual.
    // value: se obtiene el valor del elemento que generó el evento actual.
    // .trim(): es un método de cadena en JavaScript que se utiliza para quitar espacios en blanco al principio y al final de una cadena.
    if (e.target.value.trim() === '') {
      
      // Si el campo está vacío, se llama a la función 'activateAlert' para mostrar un mensaje de error indicando que el campo no puede estar vacío.
      // Se pasa el nombre del campo y su elemento padre como argumentos a la función 'activateAlert'.
      activateAlert(`El campo ${e.target.name} no debe estar vacío`, e.target.parentElement);

      // Se deshabilita el botón de validación 'btnValidate' para evitar que se pueda enviar el formulario con campos vacíos.
      // .setAttribute(): es un método de elemento en JavaScript que se utiliza para establecer o modificar el valor de un atributo de un elemento.
      btnValidate.setAttribute('disabled', 'true');

      // Se detiene la ejecución de la función validate si el campo está vacío, ya que no es necesario seguir validando otros formatos si falta información.
      return;
    };

    // Se comprueba si el campo que ha cambiado es el campo de nombre (id='name') y si el valor no pasa la validación de nombre llamando a la función 'validateName'.
    if (e.target.id === 'name' && !validateName(e.target.value)) {

      // Si el formato del nombre no es válido, se muestra un mensaje de error específico para el nombre.
      // e.target.parentElement: se utiliza para acceder al elemento padre del elemento que generó el evento, lo que es útil para diversas tareas de manipulación del DOM, como:
      // - Mostrar mensajes de error junto a los campos del formulario.
      // - Resaltar elementos.
      // - Aplicar estilos CSS.
      // - Navegar por la estructura del DOM.
      activateAlert('El tipo de nombre no es válido', e.target.parentElement);
      btnValidate.setAttribute('disabled', 'true');
      return;
    }

    if (e.target.id === 'email' && !validateEmail(e.target.value)) {
      activateAlert('El tipo de email no es válido', e.target.parentElement);
      btnValidate.setAttribute('disabled', 'true');
      return;
    }

    // Se llama a la función 'disableAlert' pasando como argumento el elemento padre. 
    disableAlert(e.target.parentElement);

    // Se almacena el valor del campo que ha cambiado en el array 'inputsValue', quitando espacios en blanco y convirtiendo la cadena a minúsculas.
    // Aquí el detalle:
    // inputsValue[e.target.id]: asigna el valor del campo de entrada a la propiedad del objeto correspondiente al ID del campo. Esto permite asociar cada valor con su campo correspondiente.
    // .toLowerCase(): convierte todas las letras del valor a minúsculas
    inputsValue[e.target.id] = e.target.value.trim().toLowerCase();

    enableBtn();

  };

  // Se define la función 'activateAlert':
  // Esta función se encarga de mostrar mensajes de error en el formulario.
  // Recibe dos parámetros:
  // 'message' el mensaje de error que se mostrará.
  // 'reference' el elemento del formulario al que se adjuntará el mensaje de error.
  function activateAlert(message, reference) {

    disableAlert(reference);

    // Se crea un elemento <p>.
    const errorMessage = document.createElement('P');

    // Se asigna el mensaje de error al contenido del elemento, en este caso a <p>. 
    errorMessage.textContent = message;

    // Se añade la clase 'text-danger' al elemento <p> para darle un estilo.
    errorMessage.classList.add('text-danger');

    // Se adjunta el elemento <p> (con el mensaje de error) al elemento de referencia del formulario.
    // En este caso el elemento reference (que es un elemento del formulario) debe agregar al elemento errorMessage (que es un elemento <p>) como su hijo.
    reference.appendChild(errorMessage);

    
    // Se asigna a la variable 'errorBorder' la referencia (que en este caso es el elemento padre) que tenga la clase form-control.
    const errorBorder = reference.querySelector('.form-control');

    // Si hay una propiedad 'errorBorder' en el objeto 'inputsBorders' se elimina.
    errorBorder.classList.remove('border');

    // Se establece un borde rojo en el elemento del formulario.
    errorBorder.style.borderColor = 'red';

    // Se añade una sombra roja alrededor del elemento del formulario.
    errorBorder.style.boxShadow = '0 0 0 0.3rem rgba(255, 0, 0, 0.25)';

  };

  // Se define la función 'disableAlert':
  // Esta función se encarga de ocultar los mensajes de error del formulario.
  // Recibe un parámetro:
  // 'reference' el elemento del formulario del que se eliminará el mensaje de error.
  function disableAlert(reference) {

    const messageActivated = reference.querySelector('.text-danger');

    // Si se encontró la clase '.text-danger' dentro del elemnto en referencia, se elimina del DOM para ocultarlo visualmente.
    if (messageActivated) {
      messageActivated.remove();
    };

    const borderActivated = reference.querySelector('.form-control');

    // Se establecen estilos al elemento en referencia que apunta a la clase '.form-control'.
    borderActivated.style.borderColor = '#198754';
    borderActivated.style.boxShadow = '0 0 0 0.3rem rgba(25, 135, 84, 0.25)';

  };

  // Se define la función 'validateName':
  // Esta función se encarga de validar el formato del nombre ingresado en el campo 'inputName'.
  // Regresa 'true' si el formato es válido, y 'false' en caso contrario.
  function validateName(name) {

    // Expresión regular para validar el formato del campo (según tipo de campo: text, number, email, otros).
    // const regex = /^[a-zA-Z]{2,}?$/;
    const regex = /^[a-zA-Z]{2,}\s?/

    // .test(): Es un método de la expresión regular que sirve para verificar si la cadena cumple con el formato.
    const result = regex.test(name);

    // Devolver el resultado de la validación (true si es válido, false si no es válido)
    return result;

  };

  // Se define la función 'validateEmail':
  // Esta función se encarga de validar el formato del correo electrónico ingresado en el campo 'inputEmail'.
  // Regresa 'true' si el formato es válido, y 'false' en caso contrario.
  function validateEmail(email) {

    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  };

  // Se define la función 'enableBtn':
  // Esta función se encarga de habilitar o deshabilitar el botón de validación en función de si los campos del formulario tienen valores válidos.
  function enableBtn() {

    // Comprobar si los valores de los campos 'name' y 'email' existen en un array llamado 'inputsValue'.
    if (inputsValue['name'] && inputsValue['email']) {
      // Si lo anterior es 'true':
      // Elimina el atributo disabled del botón, activándolo para que pueda ser presionado.
      btnValidate.removeAttribute('disabled');
    } else {
      // Si lo anterior es 'false':
      // Agrega el atributo disabled al botón, desactivándolo para evitar que se pueda presionar.
      btnValidate.setAttribute('disabled', 'true');
    };

  };

  // La función clickBtn se activa cuando se hace clic en el botón 'btnValidate'.
  // La función realiza las siguientes acciones:
  // Agrega un mensaje de confirmación al formulario.
  // Espera 3 segundos.
  // Borra el mensaje de confirmación.
  // Vacia los campos del formulario.
  // Vacia el array inputsValue.
  // Restaura el estilo predeterminado de los campos del formulario.
  function clickBtn(e) {

    const reference = e.target.parentElement
    const messageForm = document.createElement('P');
    messageForm.textContent = 'Formulario Validado';
    messageForm.classList.add('text-center', 'mt-2', 'p-2', 'rounded');
    messageForm.style.color = '#198754';
    messageForm.style.backgroundColor = 'rgba(25, 135, 84, 0.25)';
    reference.appendChild(messageForm);

    setTimeout(() => {

      messageForm.remove();

      inputName.value = '';
      inputEmail.value = '';
      inputsValue.name = '';
      inputsValue.email = '';
      inputName.style.borderColor = '';
      inputName.style.boxShadow = '';
      inputEmail.style.borderColor = '';
      inputEmail.style.boxShadow = '';

    }, 3000);

  };

});