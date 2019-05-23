/* requires map.js (Map), room.js (Room), utils.js (Utils), hall.js (Hall),
   cell.js (Cell) hero.js (Hero) and any additional dependancies that they have.
   This class builds the map from the map class adds the hero, loot, and mobs,
   and tracks them.
*/


class Dungeon {
  constructor() {
    this._name = undefined; // pulled from the map if not overridden
    this._namePosition = "top";
    this._nameFromMap = true;
    this._map = undefined;
    this._trim = {bottom: "-", top: "-", sides: "|", corners:["+", "+", "+", "+"]};
    // corners: tl -> tr ->bl -> br
    this._hero = undefined;
  }

  /* _startTrim(width, position, name)
  @param width: {int} the width of the top pannel minus corners
  @param position: {string} if it is the "top" or "bottom"
  @param name: {string} a name to be displayed on the pannel
  @reutrn: {string} a string decorated with items from _trim
  */
  _startTrim(width, position="top", name=null){
    position = position.toLowerCase();  //shouldn't reall need this for internal, but better safe than sorry
    if(position === "top"){ var elements = [this.trim.corners[0], this.trim.corners[1], this.trim.top]; }
    if(position === "bottom") { var elements = [this.trim.corners[2], this.trim.corners[3], this.trim.bottom];}
    var trim = elements[0];

    if(name !== null && name.length < width) {

      var half = Math.floor((width - name.length)/2);
      for (var i = 0; i < half; i++) { trim += elements[2]; }

      trim += name;

      if(width - name.length !== half * 2){ half += 1; } // if uneven
      for (var i = 0; i < half; i++) { trim += elements[2]; }
    }

    else { for (var i = 0; i < width; i++) { trim += elements[2]; } }

    return trim + elements[1] + "<BR>";
  }

  /* _edgeTrim(line)
  @param line: {string} A line of text to be decorated with time.sides and a <BR>
  @return: {string} the modified string.
  */
  _edgeTrim(line){
    return this.trim.sides + line + this.trim.sides + "<BR>";
  }

  /* _endTrim(width, position, name) - A Wrapper for _startTrim
  @param width: {int} the width of the top pannel minus corners
  @param position: {string} if it is the "top" or "bottom"
  @param name: {string} a name to be displayed on the pannel
  @reutrn: {string} a string decorated with items from _trim
  */
  _endTrim(width, position="bottom", name=null){
    return this._startTrim(width, position, name);
  }

  /* _initHero(heroPackage)
  @param heroPackage: {object} an object with all the needed items for the hero Class
  @return none. This function adds a hero to the dungeon
  */
  _initHero(heroPackage){
    this._hero = new Hero(heroPackage.image, heroPackage.name, heroPackage.health, heroPackage.damage);
  }

  /* _placeHero()
  finds an open cell (in a room) in places the hero
  modifies the dungeon.hero.loction value.
  */
  _placeHero(){
    var cells = this.map.getOpen("room");
    this.hero.location = cells[Utils.rand(cells.length -1)];
  }

  /* _keyToMove(key);
  @param key: {int} a number from 1 - 9, other than 5
  @return: {object} an x and y keyed object
  */
  _keyToMove(key){
    key = Utils.typeCheck(key, "int", "Dungeon._keyToMove")
    key = Utils.whitelist(key, [1,2,3,4,6,7,8,9], "Dungeon._keyToMove");
    var keys = {1: {x: -1, y: 1}, 2: {x: 0, y: 1}, 3: {x: 1, y: 1}, 4: {x: -1, y: 0},
                6: {x: 1, y: 0}, 7: {x: -1, y: -1}, 8: {x: 0, y: -1}, 9: {x: 1, y: -1}};
     // check for a hero and if exist,set a check condition
    try { var heroLoc = this.hero.location; }
    catch (e) { return {x: null, y: null}; }

    var update = keys[key];
    return {x: heroLoc.x + update.x, y: heroLoc.y + update.y};
  }

  /* _checkMove(coordinates)
  @param coordinates:{object} an x and y keyed object
  @return: {boolean} true or false if the location is open.
  */
  _checkMove(coordinates){
    return this.map.cell[coordinates.y][coordinates.x].open;
  }

  /* displayDungeon()
  @return: {string} a string representation of the map property.
  */
  displayDungeon(){
    var map = this.map; // to allow for the getter to do the undefined check
    var output = "";

    // check for a hero and if exist,set a check condition
    try { var heroLoc = this.hero.location; }
    catch (e) { var heroLoc = {x: null, y: null}; }

    // Breaks access restrictions internally for this and end for name
    if(this.namePosition == "top" && this._name !== undefined ){  // top
      output += this._startTrim(map.width, "top", this.name);
    }  else { output += this._startTrim(map.width); }

    for (var i = 0; i < map.map.length; i++) { // body y array
      var line = "";
      for (var j = 0; j < map.map[i].length; j++) { // body x array
        if(i === heroLoc.y && j === heroLoc.x){line += this.hero;}
        else{ line += map.map[i][j]; }
      }
      output += this._edgeTrim(line);
    }

    if(this.namePosition == "bottom" && this._name !== undefined ){  // end
      output += this._endTrim(map.width, "bottom", this.name);
    }  else { output += this._endTrim(map.width); }

    return output;
  }

  /* initalizeDungeon(mapPackage)
  A function to initalize the dungeon with a map. The format of the object to be
  Passed to it is as follows {name:str, size:{width:int, height:int}, tile:class
  fill:str, room:{min:{width:int, height:int}, max:{width:int, height:int}}
  roomDensity:float, hallDensity:float} Make a map without a hero
  @param mapPackage:{object} An object with information for inital dungeon construction
  @return: none
  */
  initalizeDungeon(mapPackage){
    this.map = new Map(mapPackage);
    this.map.makeMap(mapPackage.room, mapPackage.roomDensity, mapPackage.hallDensity);
    this._hero = undefined;
  }

  /* initalizeGame(mapPackage, heroPackage)
  Initalizes the game, adding the control packages to the game. Will be expanded
  @param mapPackage: {object} An object with constructor expectations for dungeon
  @param heroPackage: {object} An object with constructor expectations for hero
  @return: none - smimply makes a dungeon with a hero
  */
  initalizeGame(mapPackage, heroPackage){
    this.initalizeDungeon(mapPackage);
    this._initHero(heroPackage);
    this._placeHero();
  }

  get name(){ return Utils.undefinedCheck(this._name, "Dungeon.name"); }
  set name(name){ this._name = Utils.typeCheck(name, "str", "Dungeon.name"); }

  get namePosition(){ return this._namePosition; }
  set namePosition(name){ this._namePosition = Utils.typeCheck(name, "str", "Dungeon.namePosition"); }

  get nameFromMap(){ return this._nameFromMap; }
  set nameFromMap(bool){ this._nameFromMap = Utils.typeCheck(name, "bool", "Dungeon.nameFromMap"); }

  get map(){ return Utils.undefinedCheck(this._map, "Dungeon.map"); }
  set map(map){
    this._map = Utils.typeCheck(map, "obj", "Dungeon.map");
    if(this.nameFromMap){ this.name = map.name; }
  }

  get trim(){ return this._trim; }
  set trim(obj){ this._trim = Utils.typeCheck(obj, "obj", "Dungeon.trim"); }

  get hero(){ return Utils.undefinedCheck(this._hero, "Dungeon.hero"); }
  set hero(value){ Utils.protectionError("Dungeon", "hero"); }

  get cell(){return this.map.cell;}
}
