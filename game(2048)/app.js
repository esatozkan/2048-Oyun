document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDispay = document.querySelector("#score");
    const resultDisplay = document.getElementById("result");
    const width = 4;
    let squares = [];
    let score =0;

    // Create a playing board(Oyun tahtasını oluşturma)
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement("div");
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square)
        }
        generate();
        generate();
    }
    createBoard();

    // Generate a number randomly(Rastgele sayı üretme)
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generate();
    }

    // Swipe right(Sağa Kaydırma)
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) { 
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]


                let filteredRow = row.filter(num=>num);
                let missing =4- filteredRow.length;
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

        // Swipe left(Sola Kaydırma)
        function moveLeft() {
            for (let i = 0; i < 16; i++) {
                if (i % 4 === 0) { 
                    let totalOne = squares[i].innerHTML
                    let totalTwo = squares[i+1].innerHTML
                    let totalThree = squares[i+2].innerHTML
                    let totalFour = squares[i+3].innerHTML
                    let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
    
    
                    let filteredRow = row.filter(num=>num);
                    let missing =4- filteredRow.length;
                    let zeros = Array(missing).fill(0)
                    let newRow = filteredRow.concat(zeros);
    
                    squares[i].innerHTML = newRow[0];
                    squares[i+1].innerHTML = newRow[1];
                    squares[i+2].innerHTML = newRow[2];
                    squares[i+3].innerHTML = newRow[3];
                }
            }
        }

        // Swipe down(Aşağı indirme)
        function moveDown(){
            for(let i=0; i<4;i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+(width*2)].innerHTML;
                let totalFour = squares[i+(width*3)].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num=>num);
                let missing = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = zeros.concat(filteredColumn);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+(width*2)].innerHTML = newColumn[2];
                squares[i+(width*3)].innerHTML = newColumn[3];
            }
        }

        // Swipe up(Yukarı çıkarma)
        function moveUp(){
            for(let i=0; i<4;i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+(width*2)].innerHTML;
                let totalFour = squares[i+(width*3)].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num=>num);
                let missing = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = filteredColumn.concat(zeros);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+(width*2)].innerHTML = newColumn[2];
                squares[i+(width*3)].innerHTML = newColumn[3];
            }
        }

        function combineRow(){
            for(let i=0;i<15;i++){
                if(squares[i].innerHTML === squares[i+1].innerHTML) {
                    let combinedTotal =parseInt(squares[i].innerHTML) +parseInt(squares[i+1].innerHTML);
                    squares[i].innerHTML = combinedTotal;
                    squares[i+1].innerHTML=0;
                    score += combinedTotal;
                    scoreDispay.innerHTML=score;
                }
            }
            checkForWin();
        }
       
        function combineColumn(){
            for(let i=0;i<12;i++){
                if(squares[i].innerHTML === squares[i+width].innerHTML) {
                    let combinedTotal =parseInt(squares[i].innerHTML) +parseInt(squares[i+width].innerHTML);
                    squares[i].innerHTML = combinedTotal;
                    squares[i+width].innerHTML=0;
                    score += combinedTotal;
                    scoreDispay.innerHTML=score;
                }
            }
            checkForWin();
        }        

        // Assing keycode (Tuşların codları)
        function control(e){
            if(e.keyCode === 39) {
                keyRight();
            }else if(e.keyCode === 37){
                keyLeft();
            }else if(e.keyCode === 38){
                keyUp();
            }else if (e.keyCode === 40){
                keyDown();
            }
        }
        document.addEventListener("keyup",control);

        function keyRight(){
            moveRight();
            combineRow();
            moveRight();
            generate();
        }

        function keyLeft() {
            moveLeft();
            combineRow();
            moveLeft();
            generate();
        }

        function keyDown() {
            moveDown();
            combineColumn();
            moveDown();
            generate();
        }

        function keyUp() {
            moveUp();
            combineColumn();
            moveUp();
            generate();
        }

        // Check for the number 2048 in the squares to win (2048 e ulaşıldığında kazandın mesajı)
        function checkForWin(){
            for(let i=0;i<squares.length;i++){
                if(squares[i].innerHTML==2048){
                    resultDisplay.innerHTML="You Win!";
                    document.removeEventListener("keyup",control);
                }
            }
        }

        //Check if there are no zeros on the board to lose(kaybetme durumu 0 konulacak kutu kalmadığında gerçekleşir bu durumun kontrolü)
        function checkForGameOver (){
            let zeros=0;
            for(let i=0;i<squares.length;i++){
                if(squares[i].innerHTML==0){
                    zeros++;
                }
            }
            if(zeros===0){
                resultDisplay.innerHTML="You Lose!";
                document.removeEventListener("keyup",control);
            }
        }
})

// https://www.youtube.com/watch?v=aDn2g8XfSMc
// ESAT ÖZKAN 16.02.2021 

