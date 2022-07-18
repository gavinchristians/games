
function mobileStructure(){
        w = 360;
        h = 505;

        box = $("<div></div>");
        settings = $("<div></div>");
        for(g=0;g<4;g++){
            control[g] = $("<div></div>");
        }
        canvas = $("<canvas width="+w+" height="+h+" ></canvas>");
        box.css({
        "width":w+"px",
        "height":h+"px",
        "background-color":"none",
        "display":"inline-block",
        "position":"relative",
        "z-index":"1",
        "margin":"0px"
        });
        settings.css({
        "width":"50px",
        "height":"50px",
        "background-color":"none",
        "background-image":
        "url('assets/img/options.png')",
        "background-size":"cover",
        "position":"absolute",
        "border-radius":"50%",
        "bottom":"0",
        "left":"0",
        "z-index":"5"
        });
        control[0].css({
        "width":w+"px",
        "height":"155px",
        "background-color":"none",
        "background-image":
        "url('assets/img/up.png')",
        "background-size":"cover",
        "opacity":"0",
        "position":"absolute",
        "top":"0",
        "left":"0",
        "z-index":"4"
        });
        control[1].css({
        "width":(w/2)+"px",
        "height":"195px",
        "background-color":"none",
        "background-image":
        "url('assets/img/right.png')",
        "background-size":"cover",
        "opacity":"0",
        "position":"absolute",
        "top":"155px",
        "right":"0",
        "z-index":"4"
        });
        control[2].css({
        "width":w+"px",
        "height":"155px",
        "background-color":"none",
        "background-image":
        "url('assets/img/down.png')",
        "background-size":"cover",
        "opacity":"0",
        "position":"absolute",
        "bottom":"0",
        "left":"0",
        "z-index":"4"
        });
        control[3].css({
        "width":(w/2)+"px",
        "height":"195px",
        "background-color":"none",
        "background-image":
        "url('assets/img/left.png')",
        "background-size":"cover",
        "opacity":"0",
        "position":"absolute",
        "top":"155px",
        "left":"0",
        "z-index":"4"
        });
        box.append(canvas);
        box.append(settings);
        for(a=0;a<4;a++){
            box.append(control[a]);
        }
        //-------------------------------------------------------//
        canvas.css({
            "width":w,
            "height":h,
            "background-color":"black",
            "position":"absolute", //Setting for PC: remove this line
            "z-index":"2", //Setting for PC: remove this line
            "margin":"0px"
        });
        //create environment
        body.append(box);

        fWidth = 360;
        fHeight = 505;
}