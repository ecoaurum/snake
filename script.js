// Ссылка на урок: 
//https://www.youtube.com/watch?v=x9bGncEL2Zg&list=PL3LQJkGQtzc5_T0iUzzGv_h3GSksei0AJ&index=1&ab_channel=GloAcademy

//  Первая часть

//1. Создадим поле
// 2ю Разобъем поле на ячуйки
// 3. Присвоим координаты каждой ячейке

// Вторая часть.

// 4. Создадим змею
// 5. Создадим мышь
// 6. Научим змею двигаться вправо

// Третья часть

// 7. Научим змею двигаться во всех направлениях
// 8. Научим змею есть мышей
// 9. Пропишеи правила окончания игры
// 10. Отобразим количество очков


let field = document.createElement("div");
document.body.appendChild(field);

field.classList.add("container");

for(let i = 1; i < 101; i++) {
    let excel = document.createElement("div");
    field.appendChild(excel);
    excel.classList.add("excel");
}

let excel = document.getElementsByClassName("excel");

let x = 1;
let y = 10;

for(let i = 0; i < excel.length; i++) {
    if(x > 10){
        x = 1;
        y--;
    }
    excel[i].setAttribute("posX", x);
    excel[i].setAttribute("posY", y);
    x++;   
};

// Создаем тело змеи 

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let cordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' + cordinates[1] + '"]'), 
                document.querySelector('[posX = "' + (cordinates[0]-1) + '"][posY = "' + cordinates[1] + '"]'), 
                document.querySelector('[posX = "' + (cordinates[0]-2) + '"][posY = "' + cordinates[1] + '"]')];
                

for(let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakebody");
}
snakeBody[0].classList.add("head");

console.log(snakeBody);

// Создаем мышь

let mouse;
 
function createMouse(){ 
    function generateMouse(){
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    let mouseCordinates = generateMouse();
    // console.log(mouseCordinates);
    mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    
    while(mouse.classList.contains("snakeBody")) {
        let mouseCordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    }

    mouse.classList.add("mouse");
}

createMouse();

let direction = "right";
let steps = false;


// Выводим счет
let input = document.createElement("input");
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;
let score = 0;
input.value = `Ваши очки: ${score}`;


// Создаем перемещение змеи

function move() {
    let snakeCordinates = [snakeBody[0].getAttribute("posX"), snakeBody[0].getAttribute("posY")];
    snakeBody[0].classList.remove("head");
    snakeBody[snakeBody.length - 1].classList.remove("snakebody");
    snakeBody.pop();

    if(direction == "right"){
        if(snakeCordinates[0] < 10){
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]+1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
        }
    } else if(direction == "left"){
        if(snakeCordinates[0] > 1){
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]-1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCordinates[1] + '"]'));
        }
    } else if(direction == "up"){
        if(snakeCordinates[1] < 10){
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'));
        }
    } else if(direction == "down"){
        if(snakeCordinates[1] > 1){
        snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (snakeCordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "10"]'));
        }
    }
        // Учим змею есть мышей
    if(snakeBody[0].getAttribute("posX") == mouse.getAttribute("posX") && snakeBody[0].getAttribute("posY") == mouse.getAttribute("posY") ) {
        mouse.classList.remove("mouse");
        let a = snakeBody[snakeBody.length - 1].getAttribute("posX");
        let b = snakeBody[snakeBody.length - 1].getAttribute("posY");
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if(snakeBody[0].classList.contains("snakebody")) {
        setTimeout(() =>{
            alert(`Игра окончена. Ваши очки: ${score}`);
        }, 200);
        clearInterval(interval);
        snakeBody[0].style.background = 'url(img/may.jpg) center no-repeat';
        snakeBody[0].style.backgroundSize = "cover";
    }


    snakeBody[0].classList.add("head");
    for(let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add("snakebody");
    }
    steps = true;  
};

let interval = setInterval(move, 300);


//вместо слова window было слово document (все работало)
window.addEventListener('keydown', function(event){    
        if(steps == true) {

            if(event.code == "ArrowLeft" && direction != "right"){
                direction = "left";
                steps = false;
                // console.log(true);
            } else if(event.code == "ArrowUp" && direction != "down"){
                direction = "up";
                steps = false;
                // console.log(true);
            } else if(event.code == "ArrowRight" && direction != "left"){ 
                direction = "right";
                steps = false;
                // console.log(true);
            } else if(event.code == "ArrowDown" && direction != "up"){
                direction = "down";
                steps = false;
                // console.log(true);
            }
        }
});















