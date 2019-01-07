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

var quarter_note = 0.225;

var d4 = quarter_note, d8 = quarter_note / 2;

function playPppppp()
{
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
}
