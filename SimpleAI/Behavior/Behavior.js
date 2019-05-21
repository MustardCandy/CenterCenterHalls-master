class Move {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(cordsA, cordsB){
    Utils.shift(cordsA - cordsB);
  }

  //only checks if its open
  static _getMove(cords, path){
    if () {

    }
  }

  //call the other two static functions
  static update(cordsA, cordsB, dungeon){
    _makePath(cordsA, cordsB);
    _getMove(cords, path);
  }
}
