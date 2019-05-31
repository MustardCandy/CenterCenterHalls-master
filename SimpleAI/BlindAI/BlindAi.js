class BlindAI extends SimpleAI {
//moves the blind AI normaly until it hits a wall
  static _firstMoves(){
    var aiCoords =;
    this._getmove();
    this._makePath();
    this._update();
  }
  //if _firstMoves failes then this function happens
  static _blindMove(){
    var heroLoc = dungeon.hero.location;
    if(this._update == false){
    
    }

  }

}
