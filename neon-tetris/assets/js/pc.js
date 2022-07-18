
function pcStructure(){
    w = window.innerWidth;
    h = window.innerHeight;
    canvas = $("<canvas width="+w+" height="+h+" ></canvas>");
    canvas.css({
        "width":w,
        "height":h,
        "background-color":"black",
        "margin":"0px"
    });
    //create environment
    body.append(canvas);

    fWidth = 400;
    fHeight = 400;
}