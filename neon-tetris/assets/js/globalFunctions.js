
function buildFoundation(){
	body = $("body");
    if(isMobile){
        mobileStructure();
    }else{
        pcStructure();
    }
    //style elements
    body.css({
        "background-color":"black",
        "margin":"0px",
        "overflow":"hidden"
    });
    ggc = canvas[0].getContext('2d');
    ggc.font = "13px Arial";
    ggc.textAlign = "start";
}