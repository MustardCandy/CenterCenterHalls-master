class BlindAi extends SimpleAi{

  static _Path(location, dungeon, cords){
    if (this.update(dungeon, location) == false && this._getMove(cords, dungeon) == true) {
      var openCords = this._getMove(cords, dungeon);
      

    }
  }
}
