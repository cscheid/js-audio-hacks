//////////////////////////////////////////////////////////////////////////////
// Music!

var noteDict = [
  { number: 108, freq: 7902.133 },
  { number: 107, freq: 7458.620 },
  { number: 106, freq: 7040.000 },
  { number: 105, freq: 6644.875 },
  { number: 104, freq: 6271.927 },
  { number: 103, freq: 5919.911 },
  { number: 102, freq: 5587.652 },
  { number: 101, freq: 5274.041 },
  { number: 100, freq: 4978.032 },
  { number: 99, freq: 4698.636 },
  { number: 98, freq: 4434.922 },
  { number: 88, freq: 4186.009 },
  { number: 87, freq: 3951.066 },
  { number: 86, freq: 3729.310 },
  { number: 85, freq: 3520.000 },
  { number: 84, freq: 3322.438 },
  { number: 83, freq: 3135.963 },
  { number: 82, freq: 2959.955 },
  { number: 81, freq: 2793.826 },
  { number: 80, freq: 2637.020 },
  { number: 79, freq: 2489.016 },
  { number: 78, freq: 2349.318 },
  { number: 77, freq: 2217.461 },
  { number: 76, freq: 2093.005 },
  { number: 75, freq: 1975.533 },
  { number: 74, freq: 1864.655 },
  { number: 73, freq: 1760.000 },
  { number: 72, freq: 1661.219 },
  { number: 71, freq: 1567.982 },
  { number: 70, freq: 1479.978 },
  { number: 69, freq: 1396.913 },
  { number: 68, freq: 1318.510 },
  { number: 67, freq: 1244.508 },
  { number: 66, freq: 1174.659 },
  { number: 65, freq: 1108.731 },
  { number: 64, freq: 1046.502 },
  { number: 63, freq: 987.7666 },
  { number: 62, freq: 932.3275 },
  { number: 61, freq: 880.0000 },
  { number: 60, freq: 830.6094 },
  { number: 59, freq: 783.9909 },
  { number: 58, freq: 739.9888 },
  { number: 57, freq: 698.4565 },
  { number: 56, freq: 659.2551 },
  { number: 55, freq: 622.2540 },
  { number: 54, freq: 587.3295 },
  { number: 53, freq: 554.3653 },
  { number: 52, freq: 523.2511 },
  { number: 51, freq: 493.8833 },
  { number: 50, freq: 466.1638 },
  { number: 49, freq: 440.0000 },
  { number: 48, freq: 415.3047 },
  { number: 47, freq: 391.9954 },
  { number: 46, freq: 369.9944 },
  { number: 45, freq: 349.2282 },
  { number: 44, freq: 329.6276 },
  { number: 43, freq: 311.1270 },
  { number: 42, freq: 293.6648 },
  { number: 41, freq: 277.1826 },
  { number: 40, freq: 261.6256 },
  { number: 39, freq: 246.9417 },
  { number: 38, freq: 233.0819 },
  { number: 37, freq: 220.0000 },
  { number: 36, freq: 207.6523 },
  { number: 35, freq: 195.9977 },
  { number: 34, freq: 184.9972 },
  { number: 33, freq: 174.6141 },
  { number: 32, freq: 164.8138 },
  { number: 31, freq: 155.5635 },
  { number: 30, freq: 146.8324 },
  { number: 29, freq: 138.5913 },
  { number: 28, freq: 130.8128 },
  { number: 27, freq: 123.4708 },
  { number: 26, freq: 116.5409 },
  { number: 25, freq: 110.0000 },
  { number: 24, freq: 103.8262 },
  { number: 23, freq: 97.99886 },
  { number: 22, freq: 92.49861 },
  { number: 21, freq: 87.30706 },
  { number: 20, freq: 82.40689 },
  { number: 19, freq: 77.78175 },
  { number: 18, freq: 73.41619 },
  { number: 17, freq: 69.29566 },
  { number: 16, freq: 65.40639 },
  { number: 15, freq: 61.73541 },
  { number: 14, freq: 58.27047 },
  { number: 13, freq: 55.00000 },
  { number: 12, freq: 51.91309 },
  { number: 11, freq: 48.99943 },
  { number: 10, freq: 46.24930 },
  { number: 9, freq: 43.65353 },
  { number: 8, freq: 41.20344 },
  { number: 7, freq: 38.89087 },
  { number: 6, freq: 36.70810 },
  { number: 5, freq: 34.64783 },
  { number: 4, freq: 32.70320 },
  { number: 3, freq: 30.86771 },
  { number: 2, freq: 29.13524 },
  { number: 1, freq: 27.50000 }, // first key on piano
  { number: 0, freq: 25.95654 } // not really on piano
];

var notes = new Float32Array(109);
noteDict.forEach(n => notes[n.number] = n.freq);

baseKeyboard = {
  "C": notes[40],
  "Db": notes[41],
  "D": notes[42],
  "Eb": notes[43],
  "E": notes[44],
  "F": notes[45],
  "Gb": notes[46],
  "G": notes[47],
  "Ab": notes[48],
  "A": notes[49],
  "Bb": notes[50],
  "B": notes[51]
};
