class SimpleAI {
  //cannot always go diagonal but always goes diagonal first
  //only return the step
  static _makePath(heroCoords, aiCoords){

    var moveX = Utils.shift(heroCoords.x - aiCoords.x);
    var moveY = Utils.shift(heroCoords.y - aiCoords.y);
    var move = {x:moveX,y:moveY}

    return move;
  }
  //only checks if its open
  static _getMove(aiCoords){
    if (dungeon.map.cell.open) {
      return true;
    }else {return false}
  }

  //call the other two static functions
  static update(heroCoords, aiCoords, dungeon){
    var tim = new Monster("+","tim",1,{min:1,max:2},"meh");
    this._makePath(heroCoords, aiCoords);
    this._getMove(aiCoords);
    dungeon.map.map[aiCoords.x][aiCoords.y].add(tim);
  }

}
