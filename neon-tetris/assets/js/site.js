$(function(){

    buildFoundation();

    //Delcare global variables
    ///Frame variables
    var gSize=20;
    var centerX = ((w/2)-(fWidth/2));
    var centerY = ((h/2)-(fHeight/2));
    ///Grid array
    var columns = 10;
    var rows = 20;

    var keys=Object.keys(tetromino);
    ///Other variables
    var bSize = 20; //Block Size
    var stepX = 3;
    var stepY = -2;
    var $objectCollision = false;
    var $boundryCollision = false;
    var $gameOver = false;
    var $speedUp = false;
    var $currentPiece = "S";
    var $nextPiece = "Z";
    var side = 1;
    var $pause = false;
    var $start = false;
    var level = 1;
    var score = 0;

    //Create frame & grid
    function drawFrame(){
        ggc.strokeStyle="black";
        ggc.beginPath();
            //Grid
            ggc.strokeStyle="rgba(255,255,255,0.1)";
            for(x=0;x<10;x++){
                for(y=0;y<20;y++){
                    ggc.strokeRect(centerX+(gSize*x),centerY+(gSize*y),gSize,gSize);
                }
            }
            
            if(isMobile){
                //Outer frame
                ggc.strokeStyle="black";
                ggc.strokeRect(centerX,centerY,fWidth,fHeight);
            }else{

                ggc.strokeStyle="white";
                ggc.strokeRect(centerX,centerY,fWidth,fHeight);
                //Frame divider
                ggc.moveTo(fWidth/2+centerX,((fHeight/2)-(fHeight/2))+centerY);
                ggc.lineTo(fWidth/2+centerX,((fHeight/2)+(fHeight/2))+centerY);
            }
            //Text
            ggc.fillStyle="white";
            ggc.font = "13px Arial";
            ggc.fillText("Level: "+level,centerX+220,centerY+150);
            ggc.fillText("Score: "+score,centerX+220,centerY+180);
        ggc.stroke();
    }

    //Create grid array
    var grid = new Array();
    for(x=0;x<columns;x++){
        grid[x] = new Array();
        for(y=0;y<rows;y++){
            grid[x][y]=0;
        }
    }

    //Create Tetrominoes

    //draw objects
    function drawObjects(name){
        for(x=0;x<4;x++){
            for(y=0;y<4;y++){
                this.blockX = (bSize*x)+(stepX*bSize);
                 this.blockY = (bSize*y)+(stepY*bSize);
                if(tetromino[name][side][x][y]){
                    //color
                    ggc.fillStyle=tColors3[keys[(tetromino[name][side][x][y]-1)]];
                    ggc.beginPath();
                        ggc.fillRect(centerX+blockX+2,centerY+blockY+2,bSize-2,bSize-2);
                    ggc.fill();

                    //grid
                   ggc.lineWidth=2; ggc.strokeStyle= tColors2[keys[(tetromino[name][side][x][y]-1)]]; 
                    ggc.beginPath();
                        ggc.strokeRect(centerX+blockX,centerY+blockY,bSize,bSize);
                    ggc.stroke();
                    ggc.lineWidth=1;
                }
                //draw next piece
                if(tetromino[$nextPiece][1][x][y]){
                    //color
                    ggc.fillStyle=tColors3[keys[(tetromino[$nextPiece][1][x][y]-1)]];
                    ggc.beginPath();
                        ggc.fillRect(centerX+((bSize*x)+(13*bSize))+2,centerY+((bSize*y)+(2*bSize))+2,bSize-2,bSize-2);
                    ggc.fill();
                    //grid
                   ggc.lineWidth=2; ggc.strokeStyle= tColors2[keys[(tetromino[$nextPiece][1][x][y]-1)]]; 
                    ggc.beginPath();
                        ggc.strokeRect(centerX+((bSize*x)+(13*bSize)),centerY+((bSize*y)+(2*bSize)),bSize,bSize);
                    ggc.stroke();
                    ggc.lineWidth=1;
                }
            }
        }
        for(x=0;x<columns;x++){
            for(y=0;y<rows;y++){
                if(grid[x][y]){
                    //color
                    ggc.fillStyle=tColors4[grid[x][y]];
                    ggc.beginPath();
                        ggc.fillRect(bSize*x+centerX+2,bSize*y+centerY+2,bSize-2,bSize-2);
                    ggc.fill();

                    //grid
                    ggc.lineWidth=2;
                    ggc.strokeStyle= tColors[grid[x][y]];
                    ggc.beginPath();
                        ggc.strokeRect(bSize*x+centerX,bSize*y+centerY,bSize,bSize);
                    ggc.stroke();
                    ggc.lineWidth=1;
                }
            }
        }

        if(!isMobile){
            //Top cover
            ggc.fillStyle="black";
            ggc.beginPath();
            ggc.fillRect(0,0,w,(h/2)-(fHeight/2));
            ggc.fill();
            ggc.fillStyle="white";
            ggc.font = "40px Arial";
            ggc.fillText("TETRIS",centerX+120,centerY-50);
            ggc.font = "14px Arial";
            ggc.fillText("Press 'Enter' to start game | "+
                         "Left Arrow to move left | "+
                         "Right Arrow to move right | "+
                         "Spacebar to rotate | "+
                         "Pause/Break to pause the game",centerX-190,centerY-20);
        }
        else{
            ggc.beginPath();
            ggc.fillStyle="white";
            ggc.font = "14px Arial";
            ggc.fillText("-Shake your phone to start game",10,420);
            ggc.fillText("-Settings: pause game and show controls",10,440);
            ggc.fillText("-up: rotate",70,460);
            ggc.fillText("-down: speed up",70,480);
        }
    }

    //update grid
    function updateGrid(name){
        //update grid
        for(x=0;x<4;x++){
            for(y=0;y<4;y++){
                if(tetromino[name][side][x][y]){
                    grid[stepX+x][stepY+y]=tetromino[name][side][x][y];
                }
            }
        }
        checkGridLines();
        genRandom();
        stepX = 3;
        stepY = -2;
        side = 1;
        $objectCollision=false;
        $boundryCollision=false;
        $speedUp = false;
    }

    //check grid lines
    function checkGridLines(){
        var count=0;
        //var rowCount=0;
        //var rowArray=new Array();
        for(y=0;y<rows;y++){
            count=0;
            //rowCount=0;
            for(x=0;x<columns;x++){
                if(grid[x][y]){
                    count++;
                }
            }
            if(count==10){
                //get row number
                //rowArray[rowCount]=y;
                //rowCount++;
                //clear row
                for(z=0;z<columns;z++){
                    grid[z][y]=0;
                }
                //rearrange rows
                for(a=(y-1);a>0;a--){
                    for(x=0;x<columns;x++){
                        grid[x][a+1]=grid[x][a];
                    }
                }
                score+=20;
                y=0;
            }
        }
        /*try{
            var topRow = rowArray[0] - 1;
            for(a=topRow;a>0;a--){
                for(x=0;x<columns;x++){
                    grid[x][a+rowCount]=grid[x][a];
                }
            }
            if(rowCount){
                score+=20*(rowCount);
            }
        }
        catch(ex){
            //Nothing
        }*/
    }

    //Generate random
    function genRandom(){
        $currentPiece = $nextPiece;
        this.number = Math.floor((Math.random()*7)+0)
        $nextPiece = keys[number];
    }

    //update objects
    function updateObjects(name){
        gameOver(name);
        objectCollision(name);
        boundryCollision(name);
        if(!$objectCollision||!$boundryCollision||!$gameOver){
            stepY++;
        }
    }

    //check for collision
    function objectCollision(name){
        for(x=0;x<4;x++){
            for(y=0;y<4;y++){
                if(tetromino[name][side][x][y]){
                    if(grid[stepX+x][(stepY+1)+y]){
                        //stepY--;
                        $objectCollision=true;
                        updateGrid(name);
                        return true;
                    }
                }
            }
        }
    }

    function boundryCollision(name){
        for(x=0;x<4;x++){
            for(y=0;y<4;y++){
                if(tetromino[name][side][x][y]){
                    if(((stepY+1)+y)>19){
                        //stepY--;
                        $boundryCollision=true;
                        updateGrid(name);
                        return true;
                    }
                }
            }
        }
    }

    function gameOver(name){
        for(x=0;x<4;x++){
            for(y=0;y<4;y++){
                if(tetromino[name][side][x][y]){
                    var condition = grid[stepX+x][0+y];
                    if(stepY<0&&condition!=0){
                        $gameOver=true;
                        $start=false; 
                        gameOverText();
                        //alert("Game Over!\nLeve reached: "+level+"\nScore: "+score);
                        startShake(); //Setting for PC: remove this line
                        return true;
                    }
                }
            }
        }
    }

    function gameOverText(){
        ggc.fillStyle="black";
        ggc.beginPath();
        ggc.fillRect(0,200,w,70);
        ggc.fill();
        ggc.lineWidth=2;
        ggc.strokeStyle="magenta";
        ggc.font = "35px Arial";
        ggc.strokeText("Game Over",95,235);
        ggc.lineWidth=1;
        ggc.fillStyle="magenta";
        ggc.font = "14px Arial";
        ggc.fillText("Shake phone to play again",100,255);
    }


////////////////////
//Pre-fill grid for test purposes
        /*for(y=10 ;y<rows;y++){
            if(y%13==0||y%18==0){
                continue;
            }
            for(x=0;x<columns;x++){
                if(x%5==0&&x!=0){
                    continue;
                }
                grid[x][y]=1;
            }
        }*/
////////////////////



    //Main loop
    function mainLoop(){
        if($pause){
            window.requestAnimationFrame(mainLoop);
            return;
        }
        if($objectCollision||$boundryCollision||$gameOver){
            clearInterval(update[level]);
            window.requestAnimationFrame(mainLoop);
            return;
        }
        else{
            ggc.clearRect(0,0,w,h);
            checkScore();
            drawFrame();
            drawObjects($currentPiece);
            if($speedUp){
                updateObjects($currentPiece);
            }
            window.requestAnimationFrame(mainLoop);
        }
    };
    window.requestAnimationFrame(mainLoop);

    //Control functions
    function leftArrow(){
        try{
            for(x=0;x<4;x++){
                for(y=0;y<4;y++){
                    if(tetromino[$currentPiece][side][x][y]){
                        if(grid[(stepX-1)+x][stepY+y]){
                            return;
                        }
                        else if(((stepX-1)+x)<0){
                            return;
                        }
                    }
                }
            }
            stepX--;
        }
        catch(ex){
            //Ignore
        }
    }
    function rightArrow(){
        try{
            for(x=0;x<4;x++){
                for(y=0;y<4;y++){
                    if(tetromino[$currentPiece][side][x][y]){
                        if(grid[(stepX+1)+x][stepY+y]){
                            return;
                        }
                        else if(((stepX+1)+x)>9){
                            return;
                        }
                    }
                }
            }
            stepX++;
        }
        catch(ex){
            //Ignore
        }
    }
    function downArrow(){
            $speedUp = true;
    }
    function spacebar(){
        try{
            for(x=0;x<4;x++){
                for(y=0;y<4;y++){
                    if(tetromino[$currentPiece][(side%3+1)][x][y]){
                        if(grid[(stepX)+x][stepY+y]){
                            return;
                        }
                        else if(((stepX)+x)>9){
                            return;
                        }
                        else if(((stepY+1)+y)>19){
                            return;
                        }
                    }
                }
            }
            if(side<3){
                side++;
            }else{
                side=0;
            }
        }
        catch(ex){
            //Ignore
        }
    }
    function pauseBreak(){
        $pause=!$pause;
    }
    function enter(){
        if(!$start){
            stopShake(); //Setting for PC - remove this line
            resetGame();
            //window.requestAnimationFrame(mainLoop);
            startGame();
            $start = true;
        }
    }
    //Controls for PC
    $(document).on("keydown",function(e){
        //left arrow (37)
        if(e.which==37&&!$pause&&$start){
            leftArrow();
        }
        //right arrow (39)
        else if(e.which==39&&!$pause&&$start){
            rightArrow();
        }
        //down arrow (40)
        else if(e.which==40&&!$pause&&$start){
            $speedUp = true;
        }
        //spacebar (32)
        else if(e.which==32&&!$pause&&$start){
            spacebar();
        }
        //pause/break (19)
        else if(e.which==19&&$start){
            pauseBreak();
        //enter (13)
        }
        else if(e.which==13){
            enter();
        }
    });

    var update = new Array();

    var time = new Array();
    for(t=0;t<10;t++){
        time[t]=false;
    }
    function checkScore(){
        for(t=0;t<10;t++){
            if(score>(500*(level))&&!time[t]){
                clearInterval(update[level]);
                level++;
                startGame();
                time[t]=true;
            }
        }
    }

    function startGame(){
        update[level] = setInterval(function(){
            if(!$pause&&!$gameOver&&!$speedUp){
                updateObjects($currentPiece);
            }
        },(1100-(level*100)));
    }

    function resetGame(){
        stepX = 3;
        stepY = -2;
        $objectCollision = false;
        $boundryCollision = false;
        $gameOver = false;
        $speedUp = false;
        //$currentPiece = "S";
        //$nextPiece = "Z";
        side = 1;
        $pause = false;
        level = 1;
        score = 0;
        for(x=0;x<columns;x++){
            for(y=0;y<rows;y++){
                grid[x][y]=0;
            }
        }
    }

    if(isMobile){
    //For Sololearn - remove this section for PC
    //Controls for Sololearn
    control[0].on("click",function (){
        if(!$pause&&$start){
            spacebar();
        }
    });
    control[1].on("touchstart",function (){
        if(!$pause&&$start){
            rightArrow();
        }
    });
    control[2].on("touchstart",function (){
        if(!$pause&&$start){
            downArrow();
        }
    });
    control[3].on("touchstart",function (){
        if(!$pause&&$start){
            leftArrow();
        }
    });
    settings.on("click",function (){
        if($start){
            pauseBreak();

        }
        if(view){
            for(t=0;t<4;t++){
                control[t].css("opacity","0.2");
            }
            view=!view;
        }else{
            for(t=0;t<4;t++){
                control[t].css("opacity","0");
            }
            view=!view;
        }
        
    });
    }
    var view = true;
    var shakeEvent = new Shake({threshold: 15});
    //listen to shake event
    function startShake(){
        shakeEvent.start();
        window.addEventListener('shake', function(){
            enter();
        }, false);
    }
    startShake();
    
    //stop listening
    function stopShake(){
        shakeEvent.stop();
    }

    //--------------------------------------------------------//
});