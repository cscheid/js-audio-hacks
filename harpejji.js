// our 'mini-harpeggi' has keyboard C mapping to piano C4;
//                          X mapping to       B3;
//                          F mapping to piano C#4;
// etc

var pianoKeys = [
  { "note": 28-12, "kind": "white", "x": -7-7, "y": 0 },
  { "note": 30-12, "kind": "white", "x": -6-7, "y": 0 },
  { "note": 32-12, "kind": "white", "x": -5-7, "y": 0 },
  { "note": 33-12, "kind": "white", "x": -4-7, "y": 0 },
  { "note": 35-12, "kind": "white", "x": -3-7, "y": 0 },
  { "note": 37-12, "kind": "white", "x": -2-7, "y": 0 },
  { "note": 39-12, "kind": "white", "x": -1-7, "y": 0 },

  { "note": 28, "kind": "white", "x": -7, "y": 0 },
  { "note": 30, "kind": "white", "x": -6, "y": 0 },
  { "note": 32, "kind": "white", "x": -5, "y": 0 },
  { "note": 33, "kind": "white", "x": -4, "y": 0 },
  { "note": 35, "kind": "white", "x": -3, "y": 0 },
  { "note": 37, "kind": "white", "x": -2, "y": 0 },
  { "note": 39, "kind": "white", "x": -1, "y": 0 },

  { "note": 40, "kind": "white", "x": 0, "y": 0 },
  { "note": 42, "kind": "white", "x": 1, "y": 0 },
  { "note": 44, "kind": "white", "x": 2, "y": 0 },
  { "note": 45, "kind": "white", "x": 3, "y": 0 },
  { "note": 47, "kind": "white", "x": 4, "y": 0 },
  { "note": 49, "kind": "white", "x": 5, "y": 0 },
  { "note": 51, "kind": "white", "x": 6, "y": 0 },
  { "note": 52, "kind": "white", "x": 7, "y": 0 },

  // manual nudges on the x positions
  { "note": 29-12, "kind": "black", "x": 0.43-14, "y": 0 },
  { "note": 31-12, "kind": "black", "x": 1.57-14, "y": 0 },
  { "note": 34-12, "kind": "black", "x": 3.43-14, "y": 0 },
  { "note": 36-12, "kind": "black", "x": 4.5 -14, "y": 0 },
  { "note": 38-12, "kind": "black", "x": 5.57-14, "y": 0 },

  { "note": 29, "kind": "black", "x": 0.43-7, "y": 0 },
  { "note": 31, "kind": "black", "x": 1.57-7, "y": 0 },
  { "note": 34, "kind": "black", "x": 3.43-7, "y": 0 },
  { "note": 36, "kind": "black", "x": 4.5 -7, "y": 0 },
  { "note": 38, "kind": "black", "x": 5.57-7, "y": 0 },

  { "note": 41, "kind": "black", "x": 0.43, "y": 0 },
  { "note": 43, "kind": "black", "x": 1.57, "y": 0 },
  { "note": 46, "kind": "black", "x": 3.43, "y": 0 },
  { "note": 48, "kind": "black", "x": 4.5, "y": 0 },
  { "note": 50, "kind": "black", "x": 5.57, "y": 0 },

];

var miniHarpejjiKeys = {
  "z": 36,
  "x": 38,
  "c": 40,
  "v": 42,
  "b": 44,
  "n": 46,
  "m": 48,
  ",": 50,
  ".": 52,
  "/": 54,

  "a": 37,
  "s": 39,
  "d": 41,
  "f": 43,
  "g": 45,
  "h": 47,
  "j": 49,
  "k": 51,
  "l": 53,
  ";": 55,
  "'": 57,
  
  "q": 38,
  "w": 40,
  "e": 42,
  "r": 44,
  "t": 46,
  "y": 48,
  "u": 50,
  "i": 52,
  "o": 54,
  "p": 56,
  "[": 58,
  "]": 60,

  "`": 37,
  "1": 39,
  "2": 41,
  "3": 43,
  "4": 45,
  "5": 47,
  "6": 49,
  "7": 51,
  "8": 53,
  "9": 55,
  "0": 57,
  "-": 59,
  "=": 61,
};

document.onkeydown = function(event) {
  var k = event.key.toLocaleLowerCase();
  if (miniHarpejjiKeys[k] === undefined)
    return;
  var t = instrument3(miniHarpejjiKeys[k]);
  player.playTrack(parallel([t]));
};


let harpejjiButtons = [];
let xScale = d3.scaleLinear().domain([0, 12]).range([0, 600]);
let yScale = d3.scaleLinear().domain([0, 12]).range([600, 0]);
for (let x = 0; x < 12; ++x) {
  for (let y = 0; y < 12; ++y) {
    harpejjiButtons.push({
      x, y,
      key: 36 + 2 * x + y
    });
  }
}

d3.select("#harpejji-board")
  .selectAll("div")
  .data(harpejjiButtons)
  .enter()
  .append("div")
  .style("position", "absolute")
  .style("width", 48)
  .style("height", 48)
  .style("top", d => `${yScale(d.y) - 50}px`)
  .style("left", d => `${xScale(d.x)}px`)
  .style("border", "1px solid lightgray")
  .style("background-color", d => {
    let which = (d.key - 4) % 12;
    let blackKeys = {
      1: true,
      3: true,
      6: true,
      8: true,
      10: true
    };
    if (blackKeys[which]) {
      return "black";
    } else {
      return "white";
    }
  })
  .on("mousedown", d => {
    player.playTrack(parallel([instrument3(d.key)]));
  })
  .filter(d => ((d.key - 4) % 12 === 0))
  .append("span").text("C")
;
  

// var xScale = d3.scaleLinear().domain([-10, 10]).range([0, 960]);

// https://music.stackexchange.com/questions/53847/what-are-the-dimensions-of-piano-keys-in-inches

// var whiteKeyWidth  = ~~(xScale(1) - xScale(0));
// var blackKeyWidth  = ~~(whiteKeyWidth / (7/8) * (15/32));
// var whiteKeyHeight = ~~(whiteKeyWidth / (7/8) * 6);
// var blackKeyHeight = ~~(whiteKeyWidth / (7/8) * (3 + 15/16));

// d3.select("#piano")
//   .append("svg")
//   .attr("width", 960)
//   .attr("shape-rendering", "sharpEdges")
//   .attr("height", 400)
//   .selectAll("rect")
//   .data(pianoKeys)
//   .enter()
//   .append("rect")
//   .attr("x", d => d.kind == "white" ? xScale(d.x) : xScale(d.x) + (whiteKeyWidth - blackKeyWidth) / 2)
//   .attr("y", d => 0) // 
//   .attr("stroke", d => d.kind == "white" ? "black" : null)
//   .attr("fill", d => d.kind)
//   .attr("height", d => d.kind == "white" ? whiteKeyHeight : blackKeyHeight)
//   .attr("width", d => d.kind == "white" ? whiteKeyWidth : blackKeyWidth)
//   .on("mousedown", d => player.playTrack(parallel([instrument2(d.note)])));
