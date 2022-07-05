let app = {}
let tempoInicio;
let tempo;
let primeiraCarta = null;
let segundaCarta = null;
let tabuleiroDesativado = false;

function iniciarJogo() {
   mostrarTodasCartas();
   embaralhar();
   virarTodasCartas();
   resetarTabuleiro();
   //  Timer();
   tempoInicio = new Date();
}

function virarCarta(element) {
   console.log(tabuleiroDesativado)
   if (tabuleiroDesativado) return;

   if (primeiraCarta === element) return;

   if (!element.classList.contains('desabilitada')) {
      element.classList.add('virada');

      if (primeiraCarta === null) {
         primeiraCarta = element;
      }
      else {
         segundaCarta = element;
         verificaSeCartasSaoIguais();
         verificaSeFimDeJogo();
      }
   }
}

function verificaSeCartasSaoIguais() {
   console.log(primeiraCarta)
   console.log(segundaCarta)
   if (primeiraCarta.dataset.serie === segundaCarta.dataset.serie) {
      desabilitaCartas();
   }
   else {
      desvirarCartas();
   }
}

function desvirarCartas() {
   tabuleiroDesativado = true

   setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      resetarTabuleiro();
   }, 1500);
}

function desabilitaCartas() {
   primeiraCarta.classList.add('desabilitada');
   segundaCarta.classList.add('desabilitada');
   resetarTabuleiro();
}

function verificaSeFimDeJogo() {
   let cartas = document.querySelectorAll('.carta');
   let cartasDesabilitadas = document.querySelectorAll('.desabilitada');

   if (cartas.length === cartasDesabilitadas.length) {
      salvarTempo();
      setTimeout(() => {
         alert(`Parabéns, você venceu! Seu tempo foi ${tempo} segundos`);
      }, 500);
   }
}

function salvarTempo() {
   let tempoFinal = new Date();
   tempo = (tempoFinal - tempoInicio) / 1000;

   let melhorTempo = localStorage.getItem('melhorTempo');
   if (melhorTempo === null || tempo < melhorTempo) {
      localStorage.setItem('melhorTempo', tempo);
   }
}

function resetarTabuleiro() {
   primeiraCarta = null;
   segundaCarta = null;
   tabuleiroDesativado = false
}

function embaralhar() {
   let cartas = document.querySelectorAll('.carta');

   cartas.forEach((carta) => {
      let posicao = Math.floor(Math.random() * 12);
      carta.style.order = posicao;
   });
}

function virarTodasCartas() {
   setTimeout(() => {
      let cartas = document.querySelectorAll('.carta');

      cartas.forEach((carta) => {
         carta.classList.remove('virada');
         carta.classList.remove('desabilitada');
      });
   }, 3000);
}

function mostrarTodasCartas() {
   let cartas = document.querySelectorAll('.carta');

   cartas.forEach((carta) => {
      carta.classList.add('virada');
   });
}

function mostrarMelhorTempo() {
   let melhorTempo = localStorage.getItem('melhorTempo');

   if (melhorTempo === null) {
      alert('Você não jogou nenhuma vez');
      return;
   }

   alert(`O melhor tempo foi ${melhorTempo} segundos`);
}

mostrarTodasCartas();

//app.iniciar();
