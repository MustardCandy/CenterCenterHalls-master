var ctx = document.getElementById('map');
var textUpdates = document.getElementById('updates');
var inputMode = document.getElementById('gameState');
ctx.innerHTML = "Context defined"; // for debuging
textUpdates.innerHTML = "Updates Selected"; // for debuging
inputMode.innerHTML = "Mode Selected"; // for debuging

/* Inital conditions and starting map generation.  -------------------------- */
var mapPackage = {name: "The Ultimate Map",
                  size: {width: 75, height: 50},
                  tile: Cell,
                  fill: "#",
                  room: {max:{width: 15, height: 15},
                         min:{width: 5, height: 5}},
                  roomDensity: .2,
                  hallDensity: 1.4}
var blankPackage = {name: "The Blank Map",
                    size: {width: 75, height: 50},
                    tile: Cell,
                    fill: "#",
                    room: {max:{width: 15, height: 15},
                           min:{width: 5, height: 5}},
                    roomDensity: 0,
                    hallDensity: 1.4}
var heroPackage = {image: "@",
                   name: "Derf",
                   health: {max: 10, current: 10},
                   damage: {min: 2, max: 5}};
var behaviorList = {simpleAI: SimpleAI, blindAI: BlindAI}
var monsters = {1: {image: "A", name: "Aidan", health: 1, damage: 1, behavior: "SimpleAI"},
                2: {image: "&", name: "Kade", health: 5, damage: 4, behavior: "BlindAI"},
                3: {image: "$", name: "Jake", health: 4, damage: 5, behavior: "BlindAI"},
                4: {image: "D", name: "Dakota", health: 3, damage: 3, behavior: "SimpleAI"},
                5: {image: "M", name: "Memphis", health: 2, damage: 2, behavior: "SimpleAI"},
                6: {image: "+", name: "LaMorie", health: 10, damage: 10, behavior: "blindAI"}};

var gameState = 1; // need to reduce the number of variables here.
var interact = false;
var interactCell = null;


var dungeon = new Dungeon;
dungeon.initalizeGame(mapPackage, heroPackage);
if(dungeon._hero !== undefined){ textUpdates.innerHTML = dungeon.hero.name + " enters the dungeon!"; }
else { textUpdates.innerHTML = "There is no hero in the dungeon!"; }
inputMode.innerHTML = "Movement";
drawMap();
/* End of inital conditions. ------------------------------------------------ */

/* drawMap()
return: none. Simply an event handler to redraw the current map display.
*/
function drawMap(){ ctx.innerHTML = dungeon.displayDungeon(); }

function update(){ dungeon.map.update(dungeon); }

/* newMap(conditions)
@param conditions: {object} a mapPackage object.
@return: none.
*/
function newMap(conditions){
  dungeon.initalizeDungeon(conditions);
  drawMap();
}

/* addHero(package)
adds a new hero to the map based on the package settings
*/
function addHero(package){
  dungeon._initHero(package);
  dungeon._placeHero();
  drawMap();
}


/* --- Key Event Methods ---------------------------------------------------- */
// TODO:  move these to a new class called UserInterface or somesuch

/* keyHandler(keyUp)
A handler for keyUp Events
*/
function keyHandler(keyUp){
  var inputModes = {1: "Movement", 2: "Interaction", 3: "Combat"}
  if(!interact){ // most of the time
    if (keyUp.key == 5) {
      gameState ++;
      if (gameState > 3) { gameState = 1; }
      inputMode.innerHTML = inputModes[gameState];
    } else {
      switch(gameState){
        case 1:
          moveHandler(keyUp); // return here?
          break;
        case 2: // will set (global) interact to true on good interact
          interactCell = interactHandler(keyUp);
          break;
        case 3:
          combatHandler(keyUp);
          break;
      }
    }
  }
  if(interact){
    var item = lootKeyHandler(keyUp);
    if(item !== undefined && item !== false){
      dungeon.hero.take(item);
      interact = false;
      swapDisplay();
      drawMap();
    }
    if(item == false){
      interact = false;
      swapDisplay();
      drawMap();
    }
    // interact = false; some sort of logic issue.
  }
}

/* keyMaper(keyUp)
@param keyUp: {object} the keyUp object from JS
@return {object} an object with x, y, and name keys
a function to use keyboard input for movement interaction with the game
*/
function keyMaper(keyUp){ // could expand this to handle other controls -> reassigment
  var directions = {1: {x: -1, y: 1, name: "southwest"}, 2: {x: 0, y: 1 ,name: "south"},
              3: {x: 1, y: 1, name: "southeast"}, 4: {x: -1, y: 0, name: "west"},
              6: {x: 1, y: 0, name: "east"}, 7: {x: -1, y: -1, name: "northwest"},
              8: {x: 0, y: -1, name: "north"}, 9: {x: 1, y: -1, name: "northeast"}};
  if(directions[keyUp.key] !== undefined){
    var returnCords = {x: dungeon.hero.location.x + directions[keyUp.key].x,
                     y: dungeon.hero.location.y + directions[keyUp.key].y,
                     name: directions[keyUp.key].name }
    return returnCords;
  }
  else { return undefined; }
}


/* moveHandler(keyUp)
@param KeyUp: {objet} a keyUp object
Moves the hero, or displays an funny error
*/
function moveHandler(keyUp){
  var checkCell = keyMaper(keyUp);
  if(checkCell !== undefined){
    if(dungeon.map.cell[checkCell.y][checkCell.x].open){
      textUpdates.innerHTML = dungeon.hero.name + " moves " + checkCell.name + ".";
      delete checkCell.name;
      dungeon.hero.location = checkCell;
      update();
    }
    else { textUpdates.innerHTML = dungeon.hero.name + " runs into something!"; }
    drawMap();
  }
}

/* interactHandler(keyUp)
@param KeyUp: {objet} a keyUp object
Interacts with a cell, or displays an funny error
@return: {object} a cell to be used in the next section of the key handler
*/
function interactHandler(keyUp){
  var checkCell = keyMaper(keyUp);
  if(checkCell !== undefined && // can only loot cells with an inventory
     dungeon.map.cell[checkCell.y][checkCell.x].inventory.length > 0){
    var list = dungeon.map.cell[checkCell.y][checkCell.x].list;
    // interactStarter(checkCell); depricated, use listToMenu
    lootScreen.innerHTML = listToMenu(list);
    interact = true;
    swapDisplay();
    drawMap();
    return checkCell;
  }
  else if (checkCell !== undefined &&
           dungeon.map.cell[checkCell.y][checkCell.x].inventory.length == 0){
    textUpdates.innerHTML = dungeon.hero.name + " tries to grab something that doesn't exist!";
    return null;
  }
}

/* combatHandler(keyUp)
@param KeyUp: {objet} a keyUp object
attacks a monster in a cell, or displays an funny error
@return: {object} a cell to be used in the next section of the key handler
*/
function combatHandler(keyUp){
    var checkCell = keyMaper(keyUp);
    var cell = dungeon.map.cell[checkCell.y][checkCell.x];
    if(checkCell !== undefined && cell.occupied){
      var damage = dungeon.hero.attack;
      cell.assignDamage(damage);
      textUpdates.innerHTML = dungeon.hero.name + " attacks for " + damage + " damage!";
      drawMap();
    }
    else { textUpdates.innerHTML = dungeon.hero.name + " attacks the darkness! "; }
}

/* lootKeyHandler(keyUp)
@param keyUp: {object} the keyup object from js
@return: {object} the object to be looted, identified by name.
*/
function lootKeyHandler(keyUp){
  if (keyUp.key == 0) { return false; } // base case, cancel interaction

  var whitelist = []; // keys that will trigger any event other than 0
  var cell = dungeon.map.cell[interactCell.y][interactCell.x]; // need below
  var lootTable = cell.list; // need now and below
  // object.keys gets strings.. populate the whitelist
  for (var i = 1; i <= lootTable.length; i++) { whitelist.push(i) }

  if(whitelist.indexOf(parseInt(keyUp.key)) !== -1){  // return item
    return cell.remove(lootTable[keyUp.key]) // return the item and pop it from cell
  }
}

/* listToMenu(list)
@param list: {obect} a number keyed list of items to display
@return a string for the innerHTML of the loot box dialog
This implimentation assumes a 9 item list and styles with additiona items
*/
function listToMenu(list){
  var returnString = "You see the following items...<br><hr>\n";
  var lines = 9; // the number of lines for inventory items
  for (var i = 1; i <= lines; i++) {
    if(i <= list.length){ returnString += i + ": " + list[i]; }
    returnString += "<BR>\n";
  }
  return returnString + "0: Cancel";
}

/*swapDisplay()
placeholder function for more complex function to come. swaps display of
inventory and move for the time
*/
function swapDisplay(){
 if(interact){
   document.getElementById("lootScreen").style.display = "block";
   document.getElementById("playerControls").style.display = "none";
 } else {
   document.getElementById("lootScreen").style.display = "none";
   document.getElementById("playerControls").style.display = "block";
 }

}

document.getElementById("drwbtn").onclick = function(){ drawMap(); }
document.getElementById("newbtn").onclick = function(){ newMap(mapPackage); }
document.getElementById("blkmap").onclick = function(){ newMap(blankPackage); }
document.getElementById("hrobtn").onclick = function(){ addHero(heroPackage); }

document.addEventListener("keyup", keyHandler);
