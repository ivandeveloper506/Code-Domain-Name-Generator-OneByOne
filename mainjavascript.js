/********************************************************************************/
/* Fecha Creación:  11 Febrero 2021.                                            */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Hoja principal de javascript, permite agregar funcionalidad */
/*                  a utilizar en el sitio Web, esto para darle dinamismo a la  */
/*                  a la misma, desde aqui se aplica toda la lógica para        */
/*                  obtener los dominios de forma aleatoria.                    */
/********************************************************************************/

const SPACE = "&nbsp";
const specialPrice = "$7.99/año";
let domainObject = {};
let totalDomainHackExtension = 2;
let randomExtension = true;
let domainHackExtension = false;
let domainExtension = "Aleatoria";
let textDomainAvailable = "";
let textDomainAvailable2 = "";

// Arreglo 1 con la primera parte que formara el dominio
let column1Array = [
  "algo",
  "online",
  "anhelo",
  "programar",
  "disenar",
  "web",
  "carrera",
  "profesional",
  "control",
  "visual",
  "sitio",
  "el",
  "nuestro",
  "computadora",
  "negro",
];

// Arreglo 2 con la segunda parte que formara el dominio
let column2Array = [
  "puravida",
  "costarica",
  "realizado",
  "puedo",
  "satisfacer",
  "empezar",
  "data",
  "interfaz",
  "desarrollar",
  "naturaleza",
  "academia",
  "genial",
  "grande",
  "futbol",
  "maravilloso",
];

// Arreglo 3 con la tercera parte que formara el dominio
let column3Array = [
  "encanta",
  "soluciones",
  "asombroso",
  "crear",
  "propio",
  "producto",
  "final",
  "servicios",
  "api",
  "desarrollo",
  "capacitado",
  "mapache",
  "lepardo",
  "alcance",
  "economico",
];

// Cuando se carga la página la primera vez, se desabilita el boton de agregar dominio.
document.getElementById("buttonDomainAgregate").disabled = true;

// Arreglo con los dominios
let domainArray = [".com", ".net", ".us", ".io", ".co"];

// Objeto para controlar los precios de los dominios.
let domainPriceObject = {
  ".com": "$5.99/año",
  ".net": "$4.99/año",
  ".us": "$3.99/año",
  ".io": "$2.99/año",
  ".co": "$1.99/año",
};

function domainGenerate() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   reasonGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite obtener de forma aleatoria el dominio  */
  /*                  a mostrar en el sitio.                                      */
  /********************************************************************************/

  let randomColumn1 = 0;
  let randomColumn2 = 0;
  let randomColumn3 = 0;

  randomColumn1 = Math.floor(Math.random() * column1Array.length);
  randomColumn2 = Math.floor(Math.random() * column2Array.length);
  randomColumn3 = Math.floor(Math.random() * column3Array.length);

  // Se concatenan las razones de cada columna
  let textDomain =
    column1Array[randomColumn1] +
    column2Array[randomColumn2] +
    column3Array[randomColumn3];

  // Se obtiene la información de la extensión
  if (randomExtension) {
    domainExtension =
      domainArray[Math.floor(Math.random() * domainArray.length)];
  }

  if (domainHackExtension) {
    domainExtension =
      "." + textDomain.substring(textDomain.length - totalDomainHackExtension);
  }

  // Se obtiene el ID del div donde se colocará como se compuso el dominio
  let textComposition = document.getElementById("IDtextComposition");

  // Se obtiene el ID del componente que se debe modificar para mostrar la razón.
  let elemento = document.getElementById("domainName");

  let inputDomain = document.getElementById("IDinputDomain");

  let availableInfo = document.getElementById("availableInfo");

  // Se modifica el valor del input
  inputDomain.value = textDomain + domainExtension;

  // Se modifica el DOM para mandar el texto de la composición del dominio.
  textComposition.innerHTML =
    "El dominio se compone de [" +
    column1Array[randomColumn1] +
    " + " +
    column2Array[randomColumn2] +
    " + " +
    column3Array[randomColumn3] +
    " + " +
    domainExtension +
    "]";

  // Se valida que el mismo no este ocupado
  if (validateAvailableDomain()) {
    // Se valida que el mismo no este ocupado
    if (domainHackExtension) {
      domainPrice = specialPrice;
    } else {
      if (domainPriceObject.hasOwnProperty(domainExtension)) {
        domainPrice = domainPriceObject[domainExtension];
      }
    }

    textDomainAvailable = "Dominio Disponibilidad";
    textDomainAvailable2 =
      SPACE + SPACE + "está disponible " + domainPrice + ".";
    document.getElementById("buttonDomainAgregate").disabled = false;
  } else {
    textDomainAvailable = "Dominio no disponible";
    textDomainAvailable2 = SPACE + SPACE + "no está disponible.";
    document.getElementById("buttonDomainAgregate").disabled = true;
  }

  // Se modifica el DOM para mandar el texto del dominio
  elemento.innerHTML = textDomain + domainExtension + textDomainAvailable2;

  // Se modifica el valor de disponibilidad del dominio
  availableInfo.innerHTML = textDomainAvailable;
}

function getExtension(value) {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   reasonGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite validar la extensión que se asociara   */
  /*                  al dominio al momento que se deba generar.                  */
  /********************************************************************************/

  switch (value.toUpperCase()) {
    case "ALEATORIA":
      randomExtension = true;
      domainHackExtension = false;
      domainExtension = "";

      break;
    case "DOMAIN HACK":
      randomExtension = false;
      domainHackExtension = true;
      domainExtension = "";

      break;
    default:
      domainExtension = value;
      randomExtension = false;
      domainHackExtension = false;

      break;
  }

  let elemento = document.getElementById("basic-addon2");

  // Se modifica el DOM para mandar el texto de la extensión
  elemento.innerHTML = value;
}

function domainAgregate() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   reasonGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite registrar en un objeto el dominio      */
  /*                  generado, y el mismo se utiliza para validar si un dominio  */
  /*                  existe disponible o no.                                     */
  /********************************************************************************/

  domainObject[
    document.getElementById("IDinputDomain").value
  ] = document.getElementById("IDinputDomain").value;
}

function validateAvailableDomain() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   reasonGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite validar si un dominio  está disponible */
  /*                  o no.                                                       */
  /********************************************************************************/

  if (
    domainObject.hasOwnProperty(document.getElementById("IDinputDomain").value)
  ) {
    return false;
  }

  return true;
}

function pageLoad() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   reasonGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite recargar la página.                    */
  /********************************************************************************/

  location.reload();
}