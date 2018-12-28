//////////////////////////////////////////////////////////////////////////////

player = makePlayer();

function instrument1(key)
{
  return baseTrack(
    sine(baseKeyboard[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 100)),
    1);
}

function instrument2(key)
{
  return baseTrack(
    sawTooth(baseKeyboard[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument3(key)
{
  return baseTrack(
    triangle(baseKeyboard[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument4(key)
{
  return baseTrack(
    square(baseKeyboard[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

function instrument5(key)
{
  return baseTrack(
    inverseSawTooth(baseKeyboard[key])
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
var seq = parallel([i("D"), i("Gb"), i("A")]);
var seq2 = overlappingSeq([i("D"), i("Gb"), i("A")], 0.05);

var buttons = [
  {name: "Sine", instrument: instrument1},
  {name: "Triangle", instrument: instrument3},
  {name: "Square", instrument: instrument4},
  {name: "Sawtooth", instrument: instrument2},
  // sounds the same as sawtooth
  // {name: "Inverse Sawtooth", instrument: instrument5} 
];
d3.select("#buttons")
  .selectAll("button")
  .data(buttons)
  .enter()
  .append("button")
  .text(d => d.name)
  .on("click", d => {
    var i = d.instrument;
    var seq = overlappingSeq([i("D"), i("Gb"), i("A")], 0.05);
    player.playTrack(seq);
  });

// player.debugWave(square(1), [0, 1]);

//   , "Triangle", "Sine", 
// d3.select

// player.playTrack(seq2);
