$(function (){
alert("Help guide the chicken to cross the road through all 10 levels to discover why the chicken really crossed the road.\n\nYou can click on the settings icon to toggle the controls visibility.")

//The custom alert below was provided by @Burey
/*$.alert({
    theme: 'my-alert',
    title: '<i>Prologue</i>',
    content: 'Help guide the chicken to cross the road through all 10 levels to discover why the chicken really crossed the road.\n\nYou can click on the settings icon to toggle the controls visibility.',
});*/

//------foundation for game------//
//declaring variables
var body;
var box;
var game;
var settings;
var badge;
var badgeText;
var control = new Array();
//equals to 60 frames per second
var fps = (1000/60);

function createWorld(){
    //create elements
    body = $("body");
    box = $("<div></div>");
    game = $("<canvas width='340' height='490'></canvas>");
    settings = $("<div></div>");
    badge = $("<div></div>");
    badgeText = $("<span></span>");
    troubleshoot = $("<p></p>");
    for(g=0;g<4;g++){
        control[g] = $("<div></div>");
    }
    //apply css
    body.css({
    "text-align":"center",
    "background-color":"black"
    });
    box.css({
    "width":"340px",
    "height":"490px",
    "background-color":"none",
    "background-image":
    "url('assets/img/background.png')",
    "display":"inline-block",
    "position":"relative",
    "z-index":"1"
    });
    game.css({
    "width":"340px",
    "height":"490px",
    "background-color":"none",
    "position":"absolute",
    "left":"0",
    "z-index":"2"
    });
    settings.css({
    "width":"50px",
    "height":"50px",
    "background-color":"none",
    "background-image":
    "url('assets/img/options.png')",
    "background-size":"cover",
    "position":"absolute",
    "bottom":"0",
    "left":"0",
    "z-index":"5"
    });
    badge.css({
    "width":"150px",
    "height":"150px",
    "background-color":"none",
    "background-image":
    "url('assets/img/chickenbadge.png')",
    "background-size":"cover",
    "opacity":"0",
    "transform":"left",
    "-webkit-transform":"left",
    "transition":"opacity 1s ease-in",
    "-webkit-transition":"opacity 1s ease-in",
    "position":"relative",
    "top":"170px",
    "left":"-150px",
    "z-index":"5"
    });
    badgeText.css({
    "width":"150px",
    "text-algin":"center",
    "color":"white",
    "-webkit-text-stroke":"1px black",
   "font-size":"28px",
   "text-shadow":"3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000",
        "position":"absolute",
        "bottom":"-10px",
        "left":"0"
    });
    control[0].css({
    "width":"340px",
    "height":"150px",
    "background-color":"none",
    "background-image":
    "url('assets/img/up.png')",
    "background-size":"cover",
    "opacity":"0.2",
    "position":"absolute",
    "top":"0",
    "left":"0",
    "z-index":"4"
    });
    control[1].css({
    "width":"170px",
    "height":"190px",
    "background-color":"none",
    "background-image":
    "url('assets/img/right.png')",
    "background-size":"cover",
    "opacity":"0.2",
    "position":"absolute",
    "top":"150px",
    "right":"0",
    "z-index":"4"
    });
    control[2].css({
    "width":"340px",
    "height":"150px",
    "background-color":"none",
    "background-image":
    "url('assets/img/down.png')",
    "background-size":"cover",
    "opacity":"0.2",
    "position":"absolute",
    "bottom":"0",
    "left":"0",
    "z-index":"4"
    });
    control[3].css({
    "width":"170px",
    "height":"190px",
    "background-color":"none",
    "background-image":
    "url('assets/img/left.png')",
    "background-size":"cover",
    "opacity":"0.2",
    "position":"absolute",
    "top":"150px",
    "left":"0",
    "z-index":"4"
    });
    troubleshoot.css({
       "text-align":"left",
       "background-color":
       "rgba(255,255,255,0.5)",
       "color":"darkred",
       "position":"absolute",
       "top":"0px",
       "left":"0px",
       "z-index":"3"
    });
    //elements to DOM
    body.append(box);
    box.append(game);
    box.append(settings);
    box.append(badge);
    badge.append(badgeText);
    for(a=0;a<4;a++){
        box.append(control[a]);
    }
    box.append(troubleshoot);
}
createWorld();
    //Controls for PC
    $(document).on("keydown",function(e){
        //left arrow (37)
        if(e.which==37){
            chicken("left");
            /*The following suggestion has
            been suggested by @Nomeh Uchenna
            Gabriel, to prevent the player 
            from increasing it's moveCount 
            when trying to move back when 
            still on the first line.*/
            if(moveCount>0){
            moveCount-=2;
            }
            else {
                moveCount-=0;
            }
        }
        //right arrow (39)
        else if(e.which==39){
            chicken("right")
            moveCount-=2;
        }
        //down arrow (40)
        else if(e.which==40){
            chicken("down");
            moveCount-=2;
        }
        //up arrow (38)
        else if(e.which==38){
            chicken("up");
            moveCount-=2;
        }
    });
    //Controls for mobile
    control[0].on("touchstart",function (){
        //--Part of the game--//
        chicken("up");
        moveCount-=2;
        //-------------------//
    });
    control[1].on("touchstart",function (){
        //--Part of the game--//
        chicken("right")
        moveCount-=2;
        //-------------------//
    });
    control[2].on("touchstart",function (){
        //--Part of the game--//
        chicken("down");
        moveCount-=2;
        //-------------------//
    });
    control[3].on("touchstart",function (){
        //--Part of the game--//
        chicken("left");
        /*The following suggestion has
        been suggested by @Nomeh Uchenna
        Gabriel, to prevent the player 
        from increasing it's moveCount 
        when trying to move back when 
        still on the first line.*/
        if(moveCount>0){
        moveCount-=2;
        }
        else {
            moveCount-=0;
        }
        //-------------------//
    });
    settings.on("click",function (){
        //--Part of the game--//
        if($tate[5]==false){
            for(t=0;t<4;t++){
                control[t].css("opacity","0");
            }
            $tate[5]=true;
        }else{
        for(t=0;t<4;t++){
                control[t].css("opacity","0.2");
            }
            $tate[5]=false;
        }
        //-------------------//
    });
    
    badge.on("click",function (){
        //--Part of the game--//
        alert("Congratulations! You've unlocked the exclusive 'Chicken Badge!'");
        //-------------------//
    });

//for drawing images
function draw(ctx,image,x,y,width,height){
    //checks if image is loaded
    if(!image.complete){
        setTimeout(function (){
        draw(ctx,image,x,y,width,height);
        },50);
        return;
    }
    //draws the image if loaded
    ctx.drawImage(image,x,y,width,height);
}
//declare images
//----Part of game----//
//make log image object
var image = new Image();
image.src = "assets/img/log.png";
//make chicken image object
var roaster = new Image();
roaster.src = "assets/img/chicken.png";
//make car image objects
var vehicle = new Array();
for(n=0;n<12;n++){
    vehicle[n] = new Image();
    vehicle[n].src = "assets/img/vehicle"+(n+1)+".png";
}
//-------------------//

//create runtime
var ctx = game[0].getContext('2d');
function runtime(){
    
    //-----Part of the game-----//
    if($tate[1]==true){
        //game ends because of collision
        return;
    }
    else if($tate[3]==true){
        //game ends because of win
        return;
    }
    carCollide();
    onLog();
    checkWin();
    ctx.clearRect(0, 0, 340, 490);
    //side walk
    //ctx.fillStyle="grey";
    //ctx.fillRect(0,0,34,490);
    //logs
    ctx.fillStyle="brown";
    //logs: increase speed by 10% per level
    logs(0.56*(1+(level/10)));
    //gravel
    //ctx.fillStyle="yellow";
    //ctx.fillRect(170,0,34,490);
    //grass
    //ctx.fillStyle="green";
    //ctx.fillRect(306,0,34,490);
    //chicken
    //ctx.fillStyle="darkgreen";
    //ctx.fillRect(chickenX,chickenY,34,34);
    draw(ctx,roaster,chickenX,chickenY,34,34);
    //cars: increase speed by 10% per level
    cars(0.56*(1+(level/10)));
    //--------------------------//
    
}
main=setInterval(runtime,fps);

//for troubleshooting
function testArea(){
    /*This function gets called at
      the very end of this script.*/
    $(troubleshoot).html(""+
        "Live troubleshoot:<br>"+
        /*----Part of the game----*/
        /*"$tate[0]:"+$tate[0]+"<br>"+
        "//false when roaster idle, true when roaster moves<br>"+
        "$tate[1]:"+$tate[1]+"<br>"+
        "//false when no car hits, true when car hits<br>"+
        "$tate[2]:"+$tate[2]+"<br>"+
        "//false when off log, true when on log<br>"+
        "$tate[3]:"+$tate[3]+"<br>"+
        "//false when game not completed, true when win<br>"+
        "$tate[4]:"+$tate[4]+"<br>"+
        "//false when off added logs, true when on added logs<br>"+
        "roadTime:"+roadTime+"<br>"+
        "//tracks time spent on the road per second<br>"+
        "logTime:"+logTime+"<br>"+
        "//tracks time spent on logs per second<br>"+
        "duration:"+duration+"<br>"+
        "//tracks time taken to complete the level<br>"+
        "moveCount:"+moveCount+"<br>"+
        "//tracks number of moves<br>"+
        "destination:"+destination+"<br>"+
        "//the winning destination the chicken lands on in xp<br>"+
        "level:"+level+"<br>"+
        "//shows the current level<br>"*/
        /*----------------------*/
    +"");
    
}
//---------------------------------//

//----Part of the game----//

//declaring game variables
car = new Array();
//when adding cars
carCount=4;
log = new Array();
chickenX = 0;
chickenY = 170;
logSpeed = new Array();
logSpeed[0] = 0.56;
logSpeed[1] = (0.56*1.3);
logSpeed[2] = (0.56*1.7);
var time;
var $tate = new Array();
    //for controls
    $tate[0] = false;
    //for collisions
    $tate[1] = false;
    //for logs
    $tate[2] = false;
    //check win
    $tate[3] = false;
    //for added logs
    $tate[4] = false;
    //for settings 
    $tate[5] = false;
    
//create xp system
//for time on road
roadTime=0;
//for time on logs
logTime=0;
//for number of moves
moveCount=0;
//for time taken
duration=0;
//for win destination
destination=0;
//for level
level=1;
//for totalXP
totalXP=0;
//for overall XP
overallXP=0;

//calculates xp
function xp(){
    if($tate[1]==true||$tate[3]==true){
        clearInterval(xps);
        return;
    }
    if(chickenX>33&&chickenX<170){
        roadTime+=15*level;
    }
    else if(chickenX>203&&chickenX<272){
        logTime+=10*level;
    }
    duration-=1*level
}
xps = setInterval(xp,1000);

//for level control
function levels(nature){
    function calcXP(){
        totalXP=(roadTime+logTime+duration+moveCount+destination);
        overallXP+=totalXP;
    }
    calcXP();
    alert("Congratulations! You've completed level "+level+
    ".\nYour total XP gained in this level is:\n"+
    "Time spent on road: +"+roadTime+"XP\n"+
    "Time spent on logs: +"+logTime+"XP\n"+
    "Duration of level: "+duration+"XP\n"+
    "Number of moves: "+moveCount+"XP\n"+
    "The chicken crossed the road\nto get to "+nature+": +"+destination+"XP\n"+
    "------------------------------\n"+
    "Total XP: "+totalXP+"XP\n"+
    "Overall XP: "+overallXP+"XP");
    if(level==10){
        alert("Congratulations! You've completed all levels. :\)\n\nAnd now we know why the chicken crossed the road. :\)\n\nIt crossed the road to go rescue it's family. Dead or alive, it's the principle that matters. They might be dead but no human will eat them. ;\)");
        badge.css({"left":"100px","opacity":"1"});
        $(badgeText).html(overallXP+"XP");
        clearInterval(main);
        return;
    }
    level++;
    if(carCount!=12){
        carCount++;
    }
    reset();
}

//controls all car functions
function cars(Kph){
    //check cars
    for(i=0;i<carCount;i++){
        if(car[i]<-34){
        if(i>3&&car[i-4]>445){
        //random placement for added cars
        car[i]=car[i-4]+ Math.floor((Math.random()*102)+34);
            ran = Math.floor((Math.random()*12)+1);
            vehicle[i].src = "assets/img/vehicle"+ran+".png";
    }
    else{
            car[i]=490;
            ran = Math.floor((Math.random()*12)+1);
            vehicle[i].src = "assets/img/vehicle"+ran+".png";
        }
    }
    }
    
    for(h=0;h<12;h++){
    //for drawing cars on 1st lane
    if(h==0||h==4||h==8){
        carX=34;
        car[h]-=Kph;
    }//for drawing cars on 2nd lane
    else if(h==1||h==5||h==9){
        carX=68;
        car[h]-=Kph*1.5;
    }//for drawing cars on 3rd lane
    else if(h==2||h==6||h==10){
        carX=102;
        car[h]-=Kph*1.3;
    }//for drawing cars on 4th lane
    else if(h==3||h==7||h==11){
        carX=136;
        car[h]-=Kph*1.7;
    }
    draw(ctx,vehicle[h],carX,car[h],34,34);
    }

}

//controls all log functions
function logs(Mph){
    //check logs
    for(c=0;c<6;c++){
        if(log[c]<-134){
            log[c]=490;
        }
    }
    //draws, moves and sets log speed
    for(b=0;b<6;b++){
        //for logs near gravel
        if(b==0||b==3){
            logX=204;
            log[b]-=Mph;
            logSpeed[b]=Mph;
        }//for logs in the middle
        else if(b==1||b==4){
            logX=238;
            log[b]-=Mph*1.7;
            logSpeed[b]=Mph*1.7;
        }//for logs near fast food joints
        else if(b==2||b==5){
            logX=272;
            log[b]-=Mph*1.3;
            logSpeed[b]=Mph*1.3;
        }
        draw(ctx,image,logX,log[b],34,136);
    }
}

//controls the chicken
function chicken(direction){
    if($tate[0]==true){
        return;
    }
    $tate[0] = true;
    $tate[2] = false;
    currentX = chickenX;
    currentY = chickenY;
    //The removal of the added condition != in the below if statement was suggested by @Jamie
    if(direction=="up"&&chickenY>0){
        time = setInterval(function (){
            if(chickenY>currentY-34){
                chickenY-=1;
            }
            else{
                clearInterval(time);
                $tate[0] = false;
            }
        },fps);
    }
    else if(direction=="right"&&chickenX!=306){
        time = setInterval(function (){
            if(chickenX<currentX+34){
                chickenX+=1;
            }
            else{
                clearInterval(time);
                $tate[0] = false;
            }
        },fps);
    } 
    else if(direction=="down"&&chickenY!=476){
        time = setInterval(function (){
            if(chickenY<currentY+34){
                chickenY+=1;
            }
            else{
                clearInterval(time);
                $tate[0] = false;
            }
        },fps);
    } 
    else if(direction=="left"&&chickenX!=0){
        time = setInterval(function (){
            if(chickenX>currentX-34){
                chickenX-=1;
            }
            else{
                clearInterval(time);
                $tate[0] = false;
            }
        },fps);
    }
    else{
        $tate[0] = false;
    }
}

//car collision check
function carCollide(){
    for(h=0;h<4;h++){ 
        if((car[h]<chickenY+22&&car[h]+22>chickenY)&&(chickenX>12+(34*h)&&chickenX<56+(34*h))){
        alert("Oops! The chicken couldn't even cross the road.\n-you lost 100XP\n\nClick 'OK' to try again.");
        overallXP-=100;
        $tate[1]=true;
        reset();
    }
    }
    //for second set of cars
    for(a=4;a<8;a++){ 
        if((car[a]<chickenY+22&&car[a]+22>chickenY)&&(chickenX>12+(34*(a-4))&&chickenX<56+(34*(a-4)))){
        alert("Oops! The chicken couldn't even cross the road.\n-you lost 100XP\n\nClick 'OK' to try again.");
        overallXP-=100;
        $tate[1]=true;
        reset();
    }
    }
    //for third set of cars
    for(r=8;r<11;r++){ 
        if((car[r]<chickenY+22&&car[r]+22>chickenY)&&(chickenX>12+(34*(r-8))&&chickenX<56+(34*(r-8)))){
        alert("Oops! The chicken couldn't even cross the road.\n-you lost 100XP\n\nClick 'OK' to try again.");
        overallXP-=100;
        $tate[1]=true;
        reset();
    }
    }
    //last added car
 if((car[11]<chickenY+22&&car[11]+22>chickenY)&&(chickenX>12+(34*(3))&&chickenX<56+(34*(3)))){
        alert("Oops! The chicken couldn't even cross the road.\n-you lost 100XP\n\nClick 'OK' to try again.");
        overallXP-=100;
        $tate[1]=true;
        reset();
    }
}

//log move check
function onLog(){
    if($tate[0]==true){
        return;
    }
    for(s=0;s<3;s++){
    if(chickenX==(204+(34*s))&&(chickenY+34>log[s]&&chickenY<log[s]+102)){
        if(chickenY<1){
            $tate[2]=false;
            return
        }
        $tate[2]=true;
        $tate[4]=false;
        chickenY-=logSpeed[s];
    }
    }
    //for added logs
    for(i=3;i<6;i++){
    if(chickenX==(204+(34*(i-3)))&&(chickenY+34>log[i]&&chickenY<log[i]+102)){
        if(chickenY<1){
            $tate[2]=false;
            return
        }
        $tate[2]=true;
        $tate[4]=true;
        chickenY-=logSpeed[i];
    }
    }
    drownCheck();
}

//drown check
function drownCheck(){
    if($tate[0]==true||$tate[2]==true){
        return;
    }
    for(r=0;r<3;r++){
        if($tate[4]==false&&((chickenX==204+(34*r)&&chickenY+34<log[r])||(chickenX==204+(34*r)&&chickenY>log[r]+106))){
        alert("Oops! The chicken crossed the road to drown?.\n-you lost 50XP\n\nClick 'OK' to try again.");
        overallXP-=50;
        $tate[1]=true;
        reset();
        }
    }
    
    //for added logs
    for(a=3;a<6;a++){
        if($tate[4]==true&&((chickenX==204+(34*(a-3))&&chickenY+34<log[a])||(chickenX==204+(34*(a-3))&&chickenY>log[a]+106))){ 
        alert("Oops! The chicken crossed the road to drown?.\n-you lost 50XP\n\nClick 'OK' to try again.");
        overallXP-=50;
        $tate[1]=true;
        reset();
        }
    }
    
}

//check for win
function checkWin(){
    if(chickenX==306&&chickenY+34<98){
        destination=20;
        $tate[3]=true;
        levels("McDonalds");
    }
    else if(chickenX==306&&(chickenY+34>98&&chickenY+34<196)){
        destination=120;
        $tate[3]=true;
        levels("Spur");
    }
    else if(chickenX==306&&(chickenY+34>196&&chickenY+34<294)){
        destination=240;
        $tate[3]=true;
        levels("KFC");
    }
    else if(chickenX==306&&(chickenY+34>294&&chickenY+34<392)){
        destination=40;
        $tate[3]=true;
        levels("Steers");
    }
    else if(chickenX==306&&(chickenY+34>392)){
        destination=80;
        $tate[3]=true;
        levels("Burger King");
    }
}

//resets the game
function reset(){
    for(v=0;v<4;v++){
        car[v]= Math.floor((Math.random()*490)+0);
    }
    for(n=0;n<3;n++){
        log[n]=Math.floor((Math.random()*490)+0);
    }
    //loop for added logs
    for(t=3;t<6;t++){
        log[t]=log[t-3]+204+(34*(t-3));
    }
    //loops for ađded cars
    for(s=4;s<carCount;s++){
        car[s]=car[s-4]+ Math.floor((Math.random()*102)+34);
    }
    //reset variables to initial values
    //the chicken
    chickenX = 0;
    chickenY = 170;
    //for time on road
    roadTime = 0;
    //for time on logs
    logTime=0;
    //for number of moves
    moveCount = 0;
    //for time taken
    duration = 0;
    //for win destination
    destination = 0;
    //for totalXP
    totalXP=0;
    //for controls
    $tate[0] = false;
    //for collisions
    $tate[1] = false;
    //for logs
    $tate[2] = false;
    //check win
    $tate[3] = false;
    //for added logs
    $tate[4] = false;
    //for chicken move
    clearInterval(time);
}
reset();
//-------------------------------//
//for live troubleshoot
//setInterval(testArea,50);

//Credits for this function below goes to @Kirk Schafer
window.onbeforeunload = function() {
  // shut down the animation system
  // works when SoloLearn tabs are switched
  clearInterval(xps);
  clearInterval(time);
  clearInterval(main);
}

});
