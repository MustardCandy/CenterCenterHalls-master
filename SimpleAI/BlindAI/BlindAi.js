class BlindAI extends Simple {
//moves the blind AI normaly until it hits a wall
  static _firstMoves(){
    this._getmove();
    this._makePath();
    this._update();
  }
  //if _firstMoves failes then this function happens
  static _blindMove(aiCoords){
    var heroLoc = dungeon.hero.location;
    if(this._update == false){
//gets the movment for the Blind Ai this is not the movment but possible moves
      var possibleMove ={
        Up : aiCoords.y +1,
        Down : aiCoords.y -1,
        Left : aiCoords.x -1,
        Right : aiCoords.x +1}
//compares the location of this to the locastion of the monster
      var mtoH = {
        m1 : possibleMove.Up - heroCoords.y,
        m2 : possibleMove.Down - heroCoords.y,
        m3 : possibleMove.Left - heroCoords.x,
        m4 : possibleMove.Right - heroCoords.x}
//finds the value with the least diffrence
      var nextMov = Math.min(mtoH.m1,mtoH.m2,mtoH.m3,mtoH.m4);
     aiCoords = aiCoords + nextmov;
    }
  }
}
