class SimpleAI {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(cordsA, cordsB){

    var moveX = Utils.shift(cordsA.x - cordsB.x);
    var moveY = Utils.shift(cordsA.y - cordsB.y);
    var move = {x:moveX,y:moveY}

    return move;
  }
  //only checks if its open
  static _getMove(cords){
    if (dungeon.map.cell.open) {
      return true;
    }else {return false}
  }

  //call the other two static functions
  static update(cordsA, cordsB, dungeon){
    _makePath(cordsA, cordsB);
    _getMove(cords, path);
  }
}
