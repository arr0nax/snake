/////////////// BACK END
var snakelm = 0;
var snaketm = 0;
var applelm = 0;
var appletm = 0;
var walltm = 0;
var walllm = 0;
var points = 0;
var lastpress = 0;
var topscores = localStorage.getItem('topscores');

var randomApple = function() {
  var randomtm = Math.floor(Math.random()*10);
  var randomlm = Math.floor(Math.random()*10);
  applelm = randomlm * 100;
  appletm = randomtm * 100;
  $('#apple').animate({marginLeft: applelm + 'px'})
  $('#apple').animate({marginTop: appletm + 'px'})
}

var randomWall = function() {
    for (i=0;i<=points;i++) {
    var randomtm = Math.floor(Math.random()*10);
    var randomlm = Math.floor(Math.random()*10);
    walllm = randomlm * 100;
    walltm = randomtm * 100;
    $('.wall'+i).css("position","absolute");
    $('.wall'+i).animate({marginLeft: walllm + 'px'})
    $('.wall'+i).animate({marginTop: walltm + 'px'})
    }
  };

function sortNumber(a,b) {
  return a - b;
  }

randomWall();


////////////// FRONT END

$(function() {
  if (topscores) {
    var leaderboard = topscores.split(',')
    leaderboard = leaderboard.sort(sortNumber);
    for (var i = leaderboard.length - 1; i > 0; i--) {
      $('ul').append('<li>'+leaderboard[i]+'</li>')
    };
  };
  randomWall();
  randomApple();
  $('body').keypress(function(e) {
    if (points > 3) {
    $('h1').hide();
  };
    if (e.keyCode === (97 || 65)) {
      localStorage.setItem('myCat', 'Tom');
      snakelm = snakelm - 100;
      if (snakelm < 0) {
        snakelm = 0;
      };
      lastpress = 97;
      $('#snake').animate({marginLeft: snakelm + 'px'}, 100);
    } else if (e.keyCode === (115 || 83)) {
      snaketm = snaketm + 100;
      if (snaketm > 1000) {
        snaketm=1000;
      };
      lastpress = 115;
      $('#snake').animate({marginTop: snaketm + 'px'}, 100);
    } else if (e.keyCode === (100 || 68)) {
      snakelm = snakelm + 100;
      if (snakelm > 1000) {
        snakelm = 1000;
      };
      lastpress = 100;

      $('#snake').animate({marginLeft: snakelm + 'px'}, 100);
    } else if (e.keyCode === (119 || 87)) {
      snaketm = snaketm - 100;
      if (snaketm < 0) {
        snaketm = 0;
      };
      lastpress = 119;
      $('#snake').animate({marginTop: snaketm + 'px'}, 100);
    } else if (e.keyCode === 32) {
      if (lastpress === 97) {
        snakelm = snakelm - 300;
        lastpress = 97;
        $('#snake').animate({marginLeft: snakelm + 'px'}, 300);
      } else if (lastpress === 115) {
        snaketm = snaketm + 300;
        lastpress = 115;
        $('#snake').animate({marginTop: snaketm + 'px'}, 300);
      } else if (lastpress === 100) {
        snakelm = snakelm + 300;
        lastpress = 100;

        $('#snake').animate({marginLeft: snakelm + 'px'}, 300);
      } else if (lastpress === 119) {
        snaketm = snaketm - 300;
        lastpress = 119;
        $('#snake').animate({marginTop: snaketm + 'px'}, 300);
      };
    };
    if (snaketm === appletm && snakelm === applelm) {
      points += 1;
      $('body').append('<img style="height:100px; width:100px; margin-left:-100px;" class="wall'+points+'" src="img/wall.jpeg" alt="" />')
      $('#points').text(points)
      randomApple();
      randomWall();
      if (walltm === appletm && walllm === applelm) {
        randomWall();
      };
    };
    for (i=1;i<=points;i++) {
      var currenttm = $('.wall'+i).css('marginTop');
      var currentlm = $('.wall'+i).css('marginLeft');
      currenttm = parseInt(currenttm);
      currentlm = parseInt(currentlm);
      if (applelm === currentlm && appletm === currenttm) {
        randomWall();
      };
      if (snakelm === currentlm && snaketm === currenttm) {
        alert("you lost. your final score was "+ points);
        topscores = topscores + ',' + points
        localStorage.setItem('topscores', topscores);
        location.reload();
      };
    };
  });
});
