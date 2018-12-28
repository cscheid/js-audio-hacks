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

// player.debugWave(triangle(1), [0, 2]);
player.debugWave(addWave(changedPhase(0.5, sawTooth(1)),
                         sawTooth(1)), [0, 2]);

////////////////////////////////////////////////////////////////////////////////
// pppppp!

function ppinst(key, duration)
{
  var baseWave = addWave(
    baseSawTooth.then(gain(0.25)),
    baseSquare.then(gain(0.75)));
  var note = changeFreq(baseWave);
  
  return baseTrack(
    note(notes[key])
      .then(gain(0.75))
      .then(expFadeOutAt(duration * 0.23, 95))
      .then(expFadeInAt(0, 200)),
    duration);
}

// the note 
var gs   = ppinst(24, 0.5);
var gs_n = ppinst(36, 0.5);
var cs_n = ppinst(29, 0.5);

var quarter_note = 0.215;

var d4 = quarter_note, d8 = quarter_note / 2;

player.playTrack(seqDelays([
  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4],
  [gs_n, d8],  [cs_n, d8],  [gs, d4]
]));
