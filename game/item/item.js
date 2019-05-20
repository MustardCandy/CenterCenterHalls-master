/* requires utils.js (Utils) */

class Item{
  constructor(image, name, type, index){
    this._image = Utils.typeCheck(image, "str", "Item constructor: image");
    this._name = Utils.typeCheck(name, "str", "Item constructor: name");
    this._type = this._typeCheck(type);
    this._index = Utils.typeCheck(index, "int", "Item constructor: index");

  }

  /* _typeCheck(type, whitelist)
  @param type {string} a string to be checked against the whitelist and as string
  @param call {string} where to throw an error from if needed
  @return {string} type if it is a string and whitelisted
  */
  _typeCheck(type, call="Item constructor: type"){
    type = Utils.typeCheck(type, "str", call);
    type = Utils.whitelist(type, ["treasure", "armor", "weapon", "monster"], call);
    return type;
  }

  get image(){ return this._image; }
  set image(string){ this._image = Utils.typeCheck(string, "str", "Item.image"); }

  get name(){ return this._name; }
  set name(string){ this._name = Utils.typeCheck(string, "str", "Item.name"); }

  get type(){ return this._type; }
  set type(type){ this._typeCheck(type, "Item.type");}

  get index() { return this._index; }
  set index(integer){ this._index = Utils.typeCheck(integer, "int", "Item.index"); }

  toString(){ return this.image; }
}
