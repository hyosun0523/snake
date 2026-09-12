const canvas=document.getElementById("square");
const ctx=canvas.getContext("2d");

ctx.fillStyle="black";
ctx.fillRect(0, 0, 400, 400);

const tyle=20;
const col=400/tyle;
const row=400/tyle;
let score=0;
function count(){
    document.getElementById("score").innerText=score;
}

let dr={x:tyle, y:0};

let snake=[
    {x:80, y:200},
    {x:60, y:200},
    {x:40, y:200}
]

let food={x:320, y:200};

snake.forEach(part=>{
    ctx.fillStyle="green";
    ctx.fillRect(part.x, part.y, tyle, tyle);
    });

ctx.fillStyle="red";
ctx.fillRect(food.x, food.y, tyle, tyle);

function draw(){

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, 400, 400);
    snake.forEach(part=>{
    ctx.fillStyle="green";
    ctx.fillRect(part.x, part.y, tyle, tyle);
    });

    ctx.fillStyle="red";
    ctx.fillRect(food.x, food.y, tyle, tyle);
    move()
}



function move(){
    let head={...snake[0]};
    head.x+=dr.x;
    head.y+=dr.y;
    snake.unshift(head);
    if(snake[0].x===food.x&&snake[0].y===food.y){
        score++;
        count();
        feed();
        
        }
    else
    snake.pop();
    if(head.x<0||head.x >= col*tyle||head.y<0||head.y >= row*tyle)
        gameOver();
    for(let i=1; i<snake.length; i++){
            if(head.x===snake[i].x&&head.y===snake[i].y)
                gameOver();
        }
    
}
function feed(){
    let newfood;

    while(true){
    newfood={
        x:Math.floor(Math.random()*col)*tyle, 
        y:Math.floor(Math.random()*row)*tyle
    };
    let overlap=snake.some(part=>
        part.x===newfood.x&&part.y===newfood.y
        );
    if(!overlap) break;
    }
    food=newfood;
}

document.addEventListener("keydown", function(e){
    if(e.key==="ArrowUp"&&dr.y!=tyle){
        dr={x:0, y:-tyle};
    }
    if(e.key==="ArrowDown"&&dr.y!=-tyle){
        dr={x:0, y:tyle};
    }
    if(e.key==="ArrowRight"&&dr.x!=-tyle){
        dr={x:tyle, y:0};
    }
    if(e.key==="ArrowLeft"&&dr.x!=tyle){
        dr={x:-tyle, y:0};
    }

});


function gameOver(){
    clearInterval(game);
    alert("게임오버");
}

function gameStart(){
    clearInterval(game);
    snake=[
        {x:80, y:200},
        {x:60, y:200},
        {x:40, y:200}
        ];
    dr={x:tyle, y:0};
    food={x:320, y:200};
    game=setInterval(draw, 100)
}
let game
