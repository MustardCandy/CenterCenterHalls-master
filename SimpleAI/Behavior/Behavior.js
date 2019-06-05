
class Simple {
  //cannot always go diagonal but always goes diagonal first
  //only return the step

  static _makePath(heroCoords, aiCoords){
    var heroCoords = dungeon.hero.location;
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
  //this updates and then moves the monster across the map
  static _update(dungeon){
      var heroCoords = dungeon.hero.location
      var move = this._makePath(heroCoords,aiCoords);
      //a temp test monster
      var tim = new Monster("+","KoolaidMan",1,{min:1,max:2},"tim");
      //the next direc tion that the monster will move in
      this._makePath(heroCoords, aiCoords);
      var nextMoveX = (aiCoords.x + move.x);
      var nextMoveY = (aiCoords.y + move.y);
      var nextMove = {x:nextMoveX,y:nextMoveY}
      this._getMove(aiCoords,nextMove);
      //checks if the space it wants to move is avilible to move into
      if(this._getMove(aiCoords, nextMove) == true){
      //console.log(nextMove)
      dungeon.map.cell[aiCoords.y][aiCoords.x].remove("KoolaidMan")
      aiCoords.x = nextMove.x;
      aiCoords.y = nextMove.y;
      dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
      dungeon.map.cell[aiCoords.y][aiCoords.x].remove("tim")
      dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
      drawMap();
  }else{return false}
  }

}
