const board = document.querySelector("#board"); // Obtient la référence de la div par son ID
const ctx = board.getContext("2d");
const SnakeColor = "green";
const SnakeBorderColor = "black";
const AppleColor = "red";
const unit = 10;
let Xacc = unit;
let Yacc = 0;
let AppleX;
let AppleY;
let score = 0;
var highScore = 0;
let snake = [];
let running = false;
let hs = [];
var div = document.getElementById('Score');
var div2 = document.getElementById('HighScore');
document.addEventListener("keydown" , Direction);

let mySound = new Audio('../IMG/Spyro the Dragon Soundtrack - Dark Hollow.mp3')
let youLost = new Audio('../IMG/You Lost - Sound Effect.mp3')

function start() {
    snake = [{x:unit * 3 +250, y: 250},{x:unit*2 +250, y:250},{x:unit +250 , y: 250}];
    running = true;
    createApple();
    drawApple(); 
    createSnake();
    moveSnake();
    nextTick();
  };
function nextTick()
  {
    if(running)
    {
        setTimeout(()=>{
        ClearBoard();
        drawApple();
        moveSnake(); // Mettre à jour les coordonnées du serpent
        createSnake(); // Dessiner le serpent mis à jour
        isGameOver();
        nextTick();
        }, 75);
    }
    else{
        displayGameOver();
        youLost.play();
        mySound.pause();
    }
  };

  function ClearBoard()
  {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,500,500);
  };
  function createApple() {
    function randomApple(min, max) {
    const randN = Math.round((Math.random() * (max - min) + min)/unit)*unit;
    return randN;
  }
    AppleX = randomApple(0, 500-unit);
    AppleY = randomApple(0, 500-unit);
  };

  function drawApple() {
    ctx.fillStyle = AppleColor;
    ctx.fillRect(AppleX,AppleY,unit,unit);
  };
  function moveSnake() {
    const head = {x: snake[0].x + Xacc , y: snake[0].y + Yacc};

    snake.unshift(head);
    if(snake[0].x == AppleX && snake[0].y == AppleY)
    {
        createApple();
        score++;
        div.innerHTML = score;
    }
    else
    {
        snake.pop();
    }
    document.addEventListener('click', function() {
      // Lecture du son après l'interaction utilisateur
      mySound.play();
  });
  };

  function createSnake() {
    ctx.fillStyle = SnakeColor;
    ctx.strokeStyle = SnakeBorderColor;
    ctx.lineWidth = 2;
    snake.forEach(snakePart =>{   
        ctx.fillRect(snakePart.x, snakePart.y, unit, unit);
        ctx.strokeRect(snakePart.x, snakePart.y, unit, unit);
    })
    };
  function Direction(event)
  {
    
        // Récupérer le code de la touche appuyée
        const key = event.keyCode;
        const U = (Yacc == -unit);
        const D = (Yacc == unit);
        const R = (Xacc == unit);
        const L = (Xacc == -unit);


        // Déplacer le serpent en fonction de la touche appuyée
        switch(true){
        case(key == 37 && !R) : // Flèche gauche
            Xacc = -unit;
            Yacc = 0;
            break;
        case(key == 38 && !D) : // Flèche haut
            Xacc = 0;
            Yacc = -unit;
            break;
         case(key == 39 && !L) :// Flèche droite
             Xacc = unit;
             Yacc = 0;
             break;
         case (key == 40 && !U): // Flèche bas
            Xacc = 0;
            Yacc = unit;
          break;
        }
      }
  function isGameOver() {
    switch(true)
    {
        case(snake[0].x < 0+unit):
           running = false;
           break;
        case(snake[0].x >= 500-unit): 
          running = false;
          break;
        case(snake[0].y >= 500-unit) : 
          running = false;
          break;
        case(snake[0].y < -1) : 
           running = false;
           break;
    }
    for(let i = 1 ; i < snake.length; i++)
    {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) running = false;
    }
  }
  function displayGameOver()
  {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER :(",500/2 , 500/2);
    running = false;
    hs.push(score);
    highScore = PlusGrandeValeur(hs);
    div2.innerHTML = highScore;
  }
  function PlusGrandeValeur(array)
{
    var max=0;
    for (let i=0;i<array.length; i++)
    {
        if (array[i] > max)
        {
            max=array[i];
        }
    }
    return max;
}

  function rejouer()
  {
    score = 0;
    Xacc = unit;
    Yacc = 0;
    div.innerHTML=0;
    start();
  }
  start();
  
  //FINAL