$(document).ready(function() {

  var currentAlligator = 0;
  var alligatorArray = new Array;

  loadJSON();
  function loadJSON() {

    $.getJSON('data/alligatorData.json', function(data) {

      for (i = 0; i < data.alligators.length; i++) {
        alligatorArray[i] = [];
        alligatorArray[i][0] = data.alligators[i].sideOne;
        alligatorArray[i][1] = data.alligators[i].sideTwo;
      }

      for(i = 0; i < alligatorArray.length; i++) {
        /*Increment*/
    	  card1 = alligatorArray[i];
    	  card2 = alligatorArray.length[i++];
    	  temp = alligatorArray[card1];
    	  alligatorArray[card1] = alligatorArray[card2];
    	  alligatorArray[card2] = temp;
      }

      startFlashcards(currentAlligator);
    })
  }

  function startFlashcards(currentAlligator) {

    $('.card').removeClass('flipped');
    $('.card').empty();
    $('.card').append('<div class="sideOne"><h4 class="card-title"><b>' + 
      alligatorArray[currentAlligator][0].alligatorName +
     '</b></h4><p class="card-body" style="font-weight: normal; font-size: 20px;">'+
     alligatorArray[currentAlligator][0].alligatorFact +'</p></div>');
    $('.card').append('<div class="sideTwo"><img class="card-img-top" src=" ' +
     alligatorArray[currentAlligator][1].url + ' style="width: 100%; height: 45vh; object-fit: cover; padding-bottom= 20px;" aria-label=' +
     alligatorArray[currentAlligator][0].alligatorName +' ></p></div>');

    currentAlligator++;

    $('.nextButton').empty();
    $('.nextButton').append('<button class="btn btn-outline-light btn-lg nextCard bg-dark" id="nextCard" onclick="focusMethod()"> > </button>');

    $('#nextCard').on('click', function() {
      if (currentAlligator < alligatorArray.length) {
        startFlashcards(currentAlligator);
      } else {
        endCards();    

        startOverAtEnd();
      }
    });

    $('.preButton').empty();
    $('.preButton').append('<button class="btn btn-outline-light btn-lg previousCard bg-dark" id="preCard" onclick="focusMethod()"> < </button>');

    $('#preCard').on('click', function() {
      if (currentAlligator != 0) {
          $('.card').removeClass('flipped');
          $('.card').empty();
          currentAlligator --;
          $('.card').append('<div class="sideOne"><h4 class="card-title"><b>' + 
          alligatorArray[currentAlligator][0].alligatorName +
         '</b></h4><p class="card-body" style="font-weight: normal; font-size: 20px;">'+
         alligatorArray[currentAlligator][0].alligatorFact +'</p></div>');
          $('.card').append('<div class="sideTwo"><img class="card-img-top" src=" ' +
         alligatorArray[currentAlligator][1].url + ' style="width: 100%; height: 45vh; object-fit: cover; padding-bottom= 20px;" aria-label=' +
         alligatorArray[currentAlligator][0].alligatorName +' ></p></div>');
      }      
    });
  }

  focusMethod  = function getFocus() {
    document.getElementById("flipCard").focus();
  }

  function endCards() {
    $('.card').empty();
    $('.card').append('<div class="endFlashcard"><p>Start Over?</p></div>');
    $('.card').append('<div class="endFlashcard2"><p>Hit refresh!</P</div>');
  }

  function startOverAtEnd(nextButton) {
    $('.nextButton').empty();
    $('.nextButton').append('<button class="btn btn-outline-light btn-lg nextCard bg-dark" id="startOverAgain"> Refresh </button>');
    $('#startOverAgain').on('click', function() {
      location.reload();
    });
    
  }
  var cardDiv = document.getElementById('cardDiv');
  cardDiv.style.cursor = 'pointer';
  cardDiv.onclick = function() {
      document.flip();
  };

});

function KeyPress(event) {
  var x = event.keyCode;
  if (x == 32 || x == 13 || x == 39 || x == 37) {
    flip();
  }
}

function flip() {
    $('.card').toggleClass('flipped');
}
