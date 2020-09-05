//////////////////////////////////////////////////////////////////////////////

d3.select("#start")
  .append("button")
  .text("Start")
  .on("click", () => {
    player = makePlayer();
  });

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
];

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

d3.select("#songs")
  .selectAll("button")
  .data([{ "name": "pushing onwards", "fun": playPppppp },
         { "name": "pocket calculator", "fun": playPocketCalculator }])
  .enter()
  .append("button")
  .text( d => d.name )
  .on("click", d => d.fun() );

////////////////////////////////////////////////////////////////////////////////

var weirdStuff = [
  {
    "name": "chirpChord",
    "fun": d => player.playWave(
      addWave(chirpT(200),
              chirpT(200 * 1.41),
              chirpT(400)).then(gain(0.05)),
      [2, 2.5])
  },
  {
    "name": "expChirpChord",
    "fun": d => player.playWave(
      addWave(expChirpT(10),
              expChirpT(20),
              expChirpT(40)).then(gain(0.05)),
      [1, 3])
  }
];

d3.select("#weird-stuff")
  .selectAll("button")
  .data(weirdStuff)
  .enter()
  .append("button")
  .text( d => d.name )
  .on("click", d => d.fun() );

