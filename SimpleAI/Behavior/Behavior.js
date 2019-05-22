class SimpleAI {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(start, end){
    var move = {x: Utils.shift(end.x - start.x), y: Utils.shift(end.y - start.y)}
    return {x: start.x + move.x, y: start.y + move.x}
  }

  //only checks if its open
  static _getMove(cords, dungeon){
    return dungeon.map.cell[cords.y][cords.x].open();
  }

  //call the other two static functions
  static update(cordsA, cordsB, dungeon){
    _makePath(cordsA, cordsB);
    _getMove(cords, path);
  }
}
