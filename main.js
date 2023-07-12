img="";
status=""
objects=[];

function preload() {
    img=loadImage("dog_cat.jpg");
}

function setup() {
    canvas=createCanvas(400,400);

    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide()
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(video,gotresult)
}

function gotresult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results;
    }
}

function draw() {
    image(video,0,0,400,400);
   

    if(status != ""){
     
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_object").innerHTML="Number of objects detected are : "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill();
            stroke(r,g,b);
          rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }

    }

    
}

