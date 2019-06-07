class BlindAI extends SimpleAI{
  static _chase(start, dungeon, cords){
    if (this._update(start, dungeon) == false) {
      return Math.sqrt(Math.pow(start, 2) + Math.pow(dungeon, 2)); // check if this all you need
    } else {

    }
  }
  static openCords(cords, dungeon){
    var blah = Utils.coordinateMorphs();
    var cord = [];
    for (var i = 0; i < blah.length; i++) {
      var obj = {x: cords.x + blah[i].x, y: cords.y + blah[i].y}
      if(dungeon.map.cell[obj.y][obj.x].open){
        cord.push(obj);
      }
    }
    return cord;
  }

}
