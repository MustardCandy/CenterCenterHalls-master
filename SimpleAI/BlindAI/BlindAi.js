class BlindAI extends Simple {
//moves the blind AI normaly until it hits a wall
  static _firstMoves(){
    this._getmove();
    this._makePath();
    this._update();
  }

  static _hypo(start, end){// returns the hypthouse of two point\
    var sideX = start.x - end.x;
    var sideY = start.y - end.y;
    return Math.sqrt(Math.pow(sideX,2) + Math.pow(sideY,2));
  }

  static _getOpen(aiCoords,dungeon){
    var morph = Utils.coordinateMorphs();
    var openArr = [];
    for (var i = 0; i < morph.length; i++) {
      morph[i]
      var around = {x:aiCoords.x + morph[i].x, y:aiCoords.y + morph[i].y}
      if(dungeon.map.cell[around.y][around.x].open){
        openArr.push(around);
      }
    }
    return openArr;
  }

  static _blindMove(aiCoords,dungeon){
    var heroLoc = dungeon.hero.location;
    var hyp = this._hypo(aiCoords,heroLoc);




  }



//   //if _firstMoves failes then this function happens
//   static _blindMove(aiCoords,dungeon){
//     var tim = new Monster("+","tim",1,{min:1,max:2},"tim");
//     var heroLoc = dungeon.hero.location;
//     console.log(heroLoc);
//   //  if(this._update == false){
// //gets the movment for the Blind Ai this is not the movment but possible moves
//       var possibleMove ={
//         Up : aiCoords.y +1,
//         Down : aiCoords.y -1,
//         Left : aiCoords.x -1,
//         Right : aiCoords.x +1}
//         console.log(possibleMove);
// //compares the location of this to the locastion of the monster
//       var mtoH = {
//         m1 : possibleMove.Up - heroLoc.y,
//         m2 : possibleMove.Down - heroLoc.y,
//         m3 : possibleMove.Left - heroLoc.x,
//         m4 : possibleMove.Right - heroLoc.x}
//         console.log(mtoH);
// //finds the value with the least diffrence
//       var nextMov = Math.min(mtoH.m1,mtoH.m2,mtoH.m3,mtoH.m4);
//       console.log(nextMov)
//       if(this._makePath == true){
//         aiCoords = aiCoords + nextmove;
//         dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
//         dungeon.map.cell[aiCoords.y][aiCoords.x].remove("tim")
//         dungeon.map.map[aiCoords.y][aiCoords.x].add(tim);
//         console.log(aiCoords);
//       }
//     }
//   }
