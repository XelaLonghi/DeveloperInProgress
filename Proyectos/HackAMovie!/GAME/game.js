"use strict";

fetch(
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json"
)
  .then((response) => response.json())
  .then((objetosJson) => {
    let indicePreguntasActual = 0;
    let contadorAciertos = 0;
    let respuestaSeleccionada = false;
    let curiosidadMostrada = false;
    let curiosidadIndex = -1;

    function mostrarPregunta(index) {
      let pregunta = objetosJson[index].question;
      let respuestas = objetosJson[index].answers;
      let respuestaCorrecta = objetosJson[index].correct;

      let elementoPregunta = document.getElementById("pregunta");
      elementoPregunta.textContent = pregunta;

      let listaRespuestas = document.getElementById("respuestas");
      listaRespuestas.innerHTML = "";

      for (let i = 0; i < respuestas.length; i++) {
        let answerItem = document.createElement("li");
        answerItem.textContent = respuestas[i];

        listaRespuestas.appendChild(answerItem);

        answerItem.addEventListener("click", () => {
          if (!respuestaSeleccionada) {
            respuestaSeleccionada = true;
            if (respuestas[i] === respuestaCorrecta) {
              contadorAciertos++;
              let contadorAciertosElement =
                document.getElementById("contadorAciertos");
              contadorAciertosElement.textContent =
                "Correct answers: " + contadorAciertos;
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent = "Correct answer!";
              answerItem.style.backgroundColor = "#598e39";
            } else {
              let respuestaCorrectaElement =
                document.getElementById("respuestaCorrecta");
              respuestaCorrectaElement.textContent =
                "The correct answer is: " + respuestaCorrecta;
              answerItem.style.backgroundColor = "#a93232";
            }
            mostrarBotonSiguiente();
          }
        });
      }

      let contadorPreguntas = document.getElementById("contadorPreguntas");
      contadorPreguntas.textContent =
        "Question " + (index + 1) + " of " + objetosJson.length;

      let respuestaCorrectaElement =
        document.getElementById("respuestaCorrecta");
      respuestaCorrectaElement.textContent = "";
      let contadorAciertosElement = document.getElementById("contadorAciertos");
      contadorAciertosElement.textContent =
        "Correct answers: " + contadorAciertos;

      mostrarBotonSiguiente();
      mostrarCuriosidad(index);
    }

    function mostrarBotonSiguiente() {
      let btnSiguiente = document.getElementById("btnSiguiente");
      btnSiguiente.disabled = !respuestaSeleccionada;
    }

    function preguntaSiguiente() {
      if (!respuestaSeleccionada) {
        return;
      }
      respuestaSeleccionada = false;
      indicePreguntasActual++;
      if (indicePreguntasActual >= objetosJson.length) {
        indicePreguntasActual = 0;
        let contenedorQuiz = document.getElementById("contenedor-quiz");
        contenedorQuiz.style.justifyContent = "center";
        contenedorQuiz.style.backgroundImage = 'url("../images/VlC6.gif")';
        contenedorQuiz.style.backgroundSize = "cover";
        contenedorQuiz.style.backgroundRepeat = "no-repeat";
        contenedorQuiz.style.color = "white";
        contenedorQuiz.innerHTML =
          "<h2>Well done!!</h2><p>Correct Answers: " +
          contadorAciertos +
          " of " +
          objetosJson.length +
          '</p><a href="../GAME/game.html" id="btnReinicio" style="background: none; border: none; text-decoration: none;"><svg width="8vw" height="8vw" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M23 12c0-6.075-4.925-11-11-11S1 5.925 1 12s4.925 11 11 11 11-4.925 11-11ZM10.707 6.707a1 1 0 0 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414-1.414L10.414 9H14a1 1 0 0 1 1 1v1a1 1 0 1 0 2 0v-1a3 3 0 0 0-3-3h-3.586l.293-.293ZM9 13a1 1 0 1 0-2 0v1a3 3 0 0 0 3 3h3.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 1.414l.293.293H10a1 1 0 0 1-1-1v-1Z" clip-rule="evenodd"></path></svg></a>';
        return;
      }

      mostrarPregunta(indicePreguntasActual);
    }

    function mostrarCuriosidad(preguntaIndex) {
      let curiosidades = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Tom Berenger’s lifelike scar required three hours of makeup work every day of shooting.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Although BB-8 is a machine, he has masculine programming, which means he is referred to with he/him pronouns.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "George Lucas gave his (conditional) blessing",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Spielberg directed all Indiana Jones films but the original concept was from George Lucas.",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "V was played by four different actors.",
      ];

      let btnCuriosidad = document.getElementById("btnCuriosidad");
      let curiosidadElemento = document.getElementById("curiosidad");

      if (
        preguntaIndex === 9 ||
        preguntaIndex === 19 ||
        preguntaIndex === 29 ||
        preguntaIndex === 39 ||
        preguntaIndex === 49
      ) {
        btnCuriosidad.style.display = "block";
      } else {
        btnCuriosidad.style.display = "none";
      }

      if (curiosidadIndex === preguntaIndex && curiosidadMostrada) {
        curiosidadElemento.textContent = curiosidades[preguntaIndex] || "";
        curiosidadElemento.style.display = "block";
      } else {
        curiosidadElemento.style.display = "none";
        curiosidadElemento.textContent = "";
      }
    }

    mostrarPregunta(indicePreguntasActual);

    let btnSiguiente = document.getElementById("btnSiguiente");
    btnSiguiente.addEventListener("click", preguntaSiguiente);

    let btnCuriosidad = document.getElementById("btnCuriosidad");
    btnCuriosidad.addEventListener("click", () => {
      curiosidadIndex = indicePreguntasActual;
      curiosidadMostrada = !curiosidadMostrada;
      mostrarCuriosidad(indicePreguntasActual);
    });
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });
