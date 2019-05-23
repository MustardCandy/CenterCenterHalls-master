class SimpleAI {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(start, end){
    var move = {
      x: Utils.shift(dungeon.hero.location.x - start.x),
      y: Utils.shift(dungeon.hero.location.y - start.y)
    }
    return {x: start.x + move.x, y: start.y + move.x}
  }

  //only checks if its open
  static _getMove(cords, dungeon){
    return dungeon.map.cell[cords.y][cords.x].open;
  }

  static remove(monster){
    monster = Utils.typeCheck(monster, "str", "Behavior.js.remove")
    for (var i = 0; i < cell.inventory.length; i++) {
      if (cell.inventory[i].name === monster) { return cell.inventory.splice(i)[0]; }
    }
  }

  //call the other two static functions
  static update(start, end, cords, dungeon){
    this._makePath(start, dungeon.hero.location);
    this._getMove(cords, dungeon);
    //for hw, need if statement and for loop to remove monster from cell
  }
}
