function Apple() {
  this.lm = 0
  this.tm = 0
}

Apple.prototype.random = function() {
  var randomtm = Math.floor(Math.random()*10);
  var randomlm = Math.floor(Math.random()*10);
  this.lm = randomlm * 100;
  this.tm = randomtm * 100;
  $('#apple').animate({marginLeft: applelm + 'px'})
  $('#apple').animate({marginTop: appletm + 'px'})
}
