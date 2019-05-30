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
  static _getMove(nextMove){
    if (dungeon.map.map[nextMove.x][nextMove.y].open) {
      return true;
    }else {return false}
  }

  //call the other two static functions
  static update(heroCoords, aiCoords, dungeon){
      var move = this._makePath(heroCoords,aiCoords);
      var tim = new Monster("+","KoolaidMan",1,{min:1,max:2},"tim");
      this._makePath(heroCoords, aiCoords);
      var nextMoveX = (aiCoords.x + move.x);
      var nextMoveY = (aiCoords.y + move.y);
      var nextMove = {x:nextMoveX,y:nextMoveY}
      this._getMove(aiCoords,nextMove);
      if(this._getMove(aiCoords, nextMove) == true){
      console.log(nextMove)
      dungeon.map.cell[aiCoords.y][aiCoords.x].remove("KoolaidMan")
      aiCoords.x = nextMove.x;
      aiCoords.y = nextMove.y;
      dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
      dungeon.map.cell[aiCoords.y][aiCoords.x].remove("tim")
      dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
      drawMap();
  }
  }

}
