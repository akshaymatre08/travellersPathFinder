var iterations = 0;
var order = [];
var population = [];
var populationSize = 500;
var cursorX,cursorY;
var i = 0;
var flag=0;
var recordDistance = Infinity;
var currentBest  = [];
var fitness = [];
var bestEver = [] ;
var img;
var cities2 = [];
var selected = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var reset = 0;
 
function getOption(){
     var obj = document.getElementById("uiCities");
     var idx = obj.selectedIndex-1;
    if(selected[idx]!==1){
    var v = createVector(Locations[idx].x,Locations[idx].y);
    cities2.push(v);
    order[i]  = i++;
    stroke(250,128,114);
    fill(250,128,114);
    ellipse(v.x,v.y,6,6);
    stroke("#e74f4e");
    noFill();
    textFont("Bad Script");
    if(Locations[idx].x<190){
        textSize(12);
        text(Locations[idx].City,Locations[idx].x-10,Locations[idx].y+15);
    }
    else{
        text(Locations[idx].City,Locations[idx].x+10,Locations[idx].y+15);
    }
    //alert("Selected "+ Locations[idx].City);
    selected[idx] = 1;
    }
    else{
        alert(Locations[idx].City + " Already Selected");
    } 
    
}

function getAll(){
    //var obj = document.getElementById("uiCities");
    console.log("Called");
    for(var i=0;i<Locations.length;i++){
        var v = createVector(Locations[i].x,Locations[i].y);
        cities2.push(v);
        order[i]  = i;
        stroke(250,128,114);
        fill(250,128,114);
        ellipse(v.x,v.y,6,6);
        stroke("#e74f4e");
        noFill();
        textFont("Bad Script");
        if(Locations[i].x<190){
            textSize(12);
            text(Locations[i].City,Locations[i].x-10,Locations[i].y+15);
        }
        else{
            text(Locations[i].City,Locations[i].x+10,Locations[i].y+15);
        }
        //alert("Selected "+ Locations[idx].City);
        selected[i] = 1;
        console.log(i);
    }
}

function getCities(){
    for(var i=0;i<Locations.length;i++){
        var opt = new Option(Locations[i].City);
        document.querySelector("#uiCities").append(opt);
    }
}

function preload(){
    
    if(!reset)
        img = loadImage("India_Map_colored_sharp.png");
    setup();
    getCities();
 
}

function setup(){
    
    createCanvas(450, 437);
    image(img,0,0,450,437);

    var button = createButton("Start");
    button.position(530,120);
    button.mousePressed(start);

    var button = createButton("Reset");
    button.position(530,400);
    button.mousePressed(Reset);
}

function draw(){
    if(!flag || iterations>=999){
        if(iterations>=999){
            document.querySelector(".final-root").innerHTML = "Your-Root : "+ printRoot() ;
        }
        noLoop();
    }  
    if(flag){
        iterations++;
        calculateFitness();
        normalizeFitness();
        nextGeneration();

         background(0);
         image(img,0,0,450,437);
       /* stroke("#e74f4e");
        strokeWeight(1);
        noFill();
        image(img,0,0,450,437);
        beginShape();
        for(var i=0;i<currentBest.length;i++){
            var idx = currentBest[i];
            ellipse(cities2[idx].x,cities2[idx].y,4,4);
            vertex(cities2[idx].x, cities2[idx].y);
        }
        endShape();  */
        
        stroke("#e74f4e");
        strokeWeight(2);
        noFill();
        beginShape();
        for(var i=0;i<bestEver.length;i++){
            var idx = bestEver[i];
            ellipse(cities2[idx].x,cities2[idx].y,3,3);
            vertex(cities2[idx].x, cities2[idx].y);
        }
        endShape();
    } 
}

function start(){
    for(var i=0;i<populationSize;i++){
        population[i] = shuffle(order);
        //console.log(population[i]);       
    }
    flag = 1;
    loop();
}

function Reset(){
    reset = 1;
    order = [];
    population = [];
    populationSize = 500;
    i = 0;
    flag=0;
    recordDistance = Infinity;
    currentBest  = [];
    fitness = [];
    bestEver = [] ;
    cities2 = [];
    selected = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    initialPath = 1;
    iterations = 0;
    document.querySelector(".initial-path").innerHTML = "Initial Path : " + 0;
    document.querySelector(".final-path").innerHTML = "Final Path : " + 0;
    document.querySelector(".final-root").innerHTML = " ";
    var obj = document.querySelector("#uiCities");
    var j=1;
    while(obj[1]){
        obj[j].remove();
    }
    preload();
}

function calcDistance(points,order){
    var sum = 0;
    for(var i=0;i<order.length-1;i++){
      var cityAIndex = order[i];
      var cityBIndex = order[i+1];
      var cityA = points[cityAIndex];
      var cityB = points[cityBIndex]; 
      var d = Dist(cityA.x,cityA.y,cityB.x,cityB.y);
      sum+=d;
    }
    return sum;
}

function Dist(x1,y1,x2,y2){
    return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
}

function swap(a,i,j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
  
function printRoot(){
    var s = " ";
    var cnt=0;
    var temp = " ";
    for(var i=0;i<bestEver.length;i++){
        var X = cities2[bestEver[i]].x;
        var Y = cities2[bestEver[i]].y;
        for(var j=0;j<Locations.length;j++){
            if(Locations[j].x == X && Locations[j].y==Y){
                s += Locations[j].City+" -> ";
                cnt++;
                if(cnt===1)
                    temp = Locations[j].City;
                break;
            }
        }
    }
    s+=temp;
    return s;
}
       
