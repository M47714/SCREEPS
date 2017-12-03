module.exports.loop = function () {
    //var creep = Game.creeps;
    var creep=Game.creeps;
    var count=0;
    for(var i in creep){
        count=count+1;   
    }
    console.log(count);
    if(count==0 || Game.spawns['Spawn0'].energy==Game.spawns['Spawn0'].energyCapacity){
        newCreep('Harvy',(count+1));
        /*try{
            Game.spawns['Spawn0'].spawnCreep([WORK,CARRY,MOVE],"Harvy"+(count+1));
            creep['Harvy'+(count+1)].memory.resource_energy=getRndInteger(0,4);
        }catch(err){
            Game.spawns['Spawn0'].spawnCreep([WORK,CARRY,MOVE],"Harvy"+(count+1));
            creep['Harvy'+(count+1)].memory.resource_energy=getRndInteger(0,4);
        }*/
    }
    for(var c in creep){
        var capacity = creep[c].carryCapacity;
        var i=creep[c].memory.resource_energy;
        console.log(c+" :"+i);
        if(creep[c].carry.energy < capacity) {
            var sources = creep[c].room.find(FIND_SOURCES);
            if(creep[c].harvest(sources[i]) == ERR_NOT_IN_RANGE) {
                creep[c].moveTo(sources[i]);
            }
        }
        else {
            if(creep[c].transfer(Game.spawns['Spawn0'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep[c].moveTo(Game.spawns['Spawn0']);
            }
        }
    }
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    function newCreep(nome,c){
        try{
            nome=nome+c;
            Game.spawns['Spawn0'].spawnCreep([WORK,CARRY,MOVE],nome);
            creep[nome].memory.resource_energy=getRndInteger(0,4);
            console.log("creep created:");
        }catch(err){
            newCreep(nome,++c);
        }
    }
}
