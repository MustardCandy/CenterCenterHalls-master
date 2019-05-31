class SimpleAI {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(start, dungeon){
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

  //call the other two static functions
  static _update(start, dungeon){
    var newCords = this._makePath(start, dungeon);
    if (this._getMove(newCords, dungeon) == true) {
      var monster = dungeon.map.cell[start.y][start.x].monster
      monster = dungeon.map.cell[start.y][start.x].remove(monster);
      monster = dungeon.map.cell[newCords.y][newCords.x].add(monster);
      //if it moves return true and if it doesn't, false
    }
  }
}
