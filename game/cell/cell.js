/* requires: utils.js (Utils)*/


class Cell{
  constructor(name, type="wall", network=false){
    this._name = Utils.typeCheck(name, "str", "Cell Constructor (name)");
    this._type = Utils.typeCheck(type, "str", "Cell Constructor (type)");
    this._network = Utils.typeCheck(network, "bool", "Cell Constructor (network)");

    // not input by user at time of consreuction
    this._roomList = ["room", "hall", "border"];
    this._border = this._isBorder(type);
    this._room = this._isRoom(type);
    this._inventory = [];
  }

  _isBorder(type){ return type.toLowerCase() === "border"; }

  _isRoom(type){ return this._roomList.indexOf(type.toLowerCase()) > -1; }

  /* _purge()
  Clears the _inventory array
  @return none;
  */
  _purge(){ this._inventory = []; }

  /* add(item)
  @param item: {object} an item to be added to the _inventory array
  @return none;
  */
  add(item){this._inventory.push(Utils.typeCheck(item, "obj", "Cell.add")); }

  /* remove(item)
  @param item: {string} the name field of an object to be removed from the _inventory array
  @return {object} the item removed from the _inventory
  */
  remove(item){ // breaks seperation by design
    item = Utils.typeCheck(item, "str", "Cell.remove");
    for (var i = 0; i < this._inventory.length; i++) {
      if(this._inventory[i].name === item){ return this._inventory.splice(i)[0]; }
    }
  }

  /* assignDamage(damage)
  @param damage: {int} an amount of damage to be passed to a monster in the cell inv
  */
  assignDamage(damage){
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].type == "monster"){ this.inventory[i].health -= damage; }
    }
  }

  get name(){ return this._name; }
  set name(str){ this._name = Utils.typeCheck(str, "str", "Cell.name"); }

  get type(){ return this._type; }
  set type(type){
    this._type = Utils.typeCheck(type, "str", "Cell.name");
    this._border = this._isBorder(type);
    this._room = this._isRoom(type);
  }

  get network(){ return this._network; }
  set network(bool){ this._network = Utils.typeCheck(bool, "bool", "Cell.network"); }

  get inventory(){ return this._inventory; }
  set inventory(array){ Utils.protectionError("Cell", "inventory"); }

  get occupied(){
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].type == "monster"){ return true; }
    }
    return false;
  }

  get open(){
    if(this.occupied){ return false; }
    if(this.type === "room" || this.type === "hall"){ return true; }
    return false;
  }

  get list(){
    var list = {length: 0};
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].type !== "monster"){
        list.length ++;
        list[list.length] = this.inventory[i].name;
      }
    }
    return list;
  }

  get monster(){
    for (var i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].type === "monster") {
        return this.inventory[i].name;
      }
      throw new Error("Attempted to get monster out of wrong cell");
    }
  }

  toString(){
    if(this.inventory.length > 0){ // check for higest item.index thing in interval
      var bestValue = 0;
      var indexOfbest = 0;
      for (var i = 0; i < this.inventory.length; i++) {
        if(this.inventory[i].index > bestValue) {
          bestValue = this.inventory[i].index;
          indexOfbest = i;
        }
      }
      return "" + this.inventory[indexOfbest];
    }
    else { return this.name; }
  }
}
