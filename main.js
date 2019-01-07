//////////////////////////////////////////////////////////////////////////////

player = makePlayer();

function instrument1(key)
{
  return baseTrack(
    sine(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 100)),
    1);
}

function instrument2(key)
{
  return baseTrack(
    sawTooth(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument3(key)
{
  return baseTrack(
    triangle(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument4(key)
{
  return baseTrack(
    square(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument5(key)
{
  return baseTrack(
    inverseSawTooth(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

//////////////////////////////////////////////////////////////////////////////
// var f2 = all([instrument1("D"), instrument1("Gb"), instrument1("A")]);
// var f1 = all([instrument1("C"), instrument1("E"), instrument1("G")]);
// player.playTrack(parallel([instrument1("D"), instrument1("Gb"), instrument1("A")]));

var i = instrument4;
var seq = parallel([
  i(baseKeyboard["D"]),
  i(baseKeyboard["Gb"]),
  i(baseKeyboard["A"])]);
var seq2 = overlappingSeq(
  [i(baseKeyboard["D"]),
   i(baseKeyboard["Gb"]),
   i(baseKeyboard["A"])], 0.05);

var buttons = [
  {name: "Sine", instrument: instrument1},
  {name: "Triangle", instrument: instrument3},
  {name: "Square", instrument: instrument4},
  {name: "Sawtooth", instrument: instrument2},
  // sounds the same as sawtooth
  // {name: "Inverse Sawtooth", instrument: instrument5} 
];

// d3.select("#start")
//   .append("button")
//   .text("Start Audio")
//   .on("click", d => {
//     player.start();
//   });

d3.select("#buttons")
  .selectAll("button")
  .data(buttons)
  .enter()
  .append("button")
  .text(d => d.name)
  .on("click", d => {
    var i = d.instrument;
    var seq = overlappingSeq([
      i(baseKeyboard["D"]),
      i(baseKeyboard["Gb"]),
      i(baseKeyboard["A"])], 0.05);
    player.playTrack(seq);
  });

// our 'piano' has keyboard C mapping to piano C4;
//                          X mapping to       B3;
//                          F mapping to piano C#4;
// etc
var miniPianoKeys = {
  "a": 36,
  "z": 37,
  "s": 38,
  "x": 39,
  "c": 40, // c
  "f": 41,
  "v": 42, // d
  "g": 43,
  "b": 44, // e
  "n": 45, // f
  "j": 46,
  "m": 47,
  "k": 48,
  ",": 49,
  "l": 50,
  ".": 51,
  "/": 52,
  "'": 53
};

document.onkeydown = function(event) {
  console.log(event);
  var k = event.key.toLocaleLowerCase();
  if (miniPianoKeys[k] === undefined)
    return;
  console.log("Found!", miniPianoKeys[k]);
  var t = instrument2(miniPianoKeys[k]);
  
  player.playTrack(parallel([t]));
};

// player.debugWave(triangle(1), [0, 2]);
// player.debugWave(addWave(changedPhase(0.5, sawTooth(1)),
//                          sawTooth(1)), [0, 2]);
d3.select("#songs")
  .selectAll("button")
  .data([{ "name": "pushing onwards", "fun": playPppppp },
         { "name": "pocket calculator", "fun": playPocketCalculator }])
  .enter()
  .append("button")
  .text( d => d.name )
  .on("click", d => d.fun() );

////////////////////////////////////////////////////////////////////////////////
// pppppp!

