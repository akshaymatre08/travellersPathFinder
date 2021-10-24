var initialPath = 1;
function calculateFitness(){
    var currentRecord = Infinity;
    for(var i=0;i<population.length;i++){
        var d = calcDistance(cities2,population[i]);
        if(initialPath){
            document.querySelector(".initial-path").innerHTML = "Initial Path : " +d;
            initialPath = 0;
        }
        if(recordDistance>d){
          recordDistance = d;
          document.querySelector(".final-path").innerHTML = "Final Path : " + recordDistance;
          bestEver = population[i];
        }
        if(currentRecord>d){
            currentRecord = d;
            currentBest = population[i];
        }

        fitness[i] = 1/(pow(d,8)+1); //Higher the distance lower the fitness. And +1 if d=0 
    }
}

function normalizeFitness(){
    var sum=0;
    for(var i=0;i<fitness.length;i++){
        sum+=fitness[i];
    }
    for(var i=0;i<fitness.length;i++){
        fitness[i] = fitness[i]/sum;
    }
}

function nextGeneration(){
    var  newPopulation = [];
    for(var i=0;i<population.length;i++){
        var orderA = pickOne(population,fitness);
        var orderB = pickOne(population,fitness);
        var order = crossOver(orderA,orderB);
        mutate(order,0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

/*Pool Selection. r will generate random no less than 1. lets say we have fitness 0.7. the probability that 
population with prob 0.7 will get selected is 70%*/
function pickOne(list,probability){
    var index = 0;
    var r = random(1);
    while(r>0){
        r = r - probability[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function crossOver(orderA,orderB){
    var start = floor(random(orderA.length));
    var end = floor(random(start+1,orderA.length));
    var newOrder = orderA.slice(start, end);
    for(var i=0;i<orderB.length;i++){
        var city = orderB[i];
        if(!newOrder.includes(city)){
            newOrder.push(city);
        }
    }
    return newOrder;
}

function mutate(order,mutationRate){
    if(random(1) < mutationRate){
        indexA = floor(random(order.length));
        indexB = (indexA + 1)%cities2.length;
        swap(order,indexA,indexB);
    }
}

