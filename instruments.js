import {
  addWave,
  chirpT,
  expChirpT,
  expFadeInAt,
  expFadeOut2At,
  gain,
  inverseSawTooth,
  sawTooth,
  sine,
  square,
  triangle,
} from "./wave.js";

import { baseKeyboard, notes } from "./notes.js";

import { baseTrack, overlappingSeq, parallel } from "./track.js";

export function instrument1(key) {
  return baseTrack(
    sine(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 100)),
    1,
  );
}

export function instrument2(key) {
  return baseTrack(
    sawTooth(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1,
  );
}

export function instrument3(key) {
  return baseTrack(
    triangle(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1,
  );
}

export function instrument4(key) {
  return baseTrack(
    square(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1,
  );
}

export function instrument5(key) {
  return baseTrack(
    inverseSawTooth(notes[key])
      .then(gain(0.5))
      .then(expFadeOut2At(0, 10))
      .then(expFadeInAt(0, 50)),
    1,
  );
}
