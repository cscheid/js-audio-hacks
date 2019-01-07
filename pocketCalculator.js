function pocketCalculatorInst(key)
{
  return baseTrack(
    sawTooth(notes[key])
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1);
}

var pocketCalcNotes = [
  [36, 1], [38, 1], [45, 2],
  [45, 3],                   [43, 1],
  [36, 1], [38, 1], [43, 2],
  [43, 1], [42, 2],          [40, 1]];

var quarterNote = 0.215;
function playPocketCalculator()
{
  player.playTrack(seqDelays(pocketCalcNotes.map(desc => [
    pocketCalculatorInst(desc[0], 0.5),
    quarterNote * desc[1]])));
}

