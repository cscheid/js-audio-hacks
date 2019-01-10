// now we SICP up our audio DSL

var fProto = (function(){}).constructor.prototype;

fProto.then = function(g) {
  var f = this;
  return function(t) {
    var r = f(t);
    var r2 = g(r);
    return r2;
  };
};

function silenceAt(t) {
  return { v: 0, t: t, w: 0 };
}

function constant(k)
{
  return function(sample) {
    return { v: k, t: sample.t, w: 1 };
  };
}

// Base periodic waveforms, all with period 1
function baseSawTooth(sample)
{
  var v = sample.t % 1;
  return { v: v < 0 ? v + 1: v, t: sample.t, w: 1 };
}

function baseInverseSawTooth(sample)
{
  var v = sample.t % 1;
  v = v < 0 ? v + 1: v;
  v = 1.0 - v;
  return { v: v, t: sample.t, w: 1 };
}

// sin(2 pi t) so that period is 1.
function baseSine(sample)
{
  return { v: Math.sin(2 * Math.PI * sample.t), t: sample.t, w: 1 };
}

function baseTriangle(sample)
{
  var v = sample.t % 1;
  v = v < 0 ? v + 1 : v;
  v = Math.min(v, 1-v);
  return { v: v, t: sample.t, w: 1 };
}

function baseSquare(sample)
{
  var v = sample.t % 1;
  v = v < 0 ? v + 1 : v;
  v = v < 0.5 ? 1 : -1;
  return { v: v, t: sample.t, w: 1 };
}

function changedFreq(freq, f) {
  return function(sample) {
    var result = f({ v: sample.v, t: sample.t * freq, w: 1 });
    result.t = sample.t;
    return result;
  };
}

function changedPhase(phase, f) {
  return function(sample) {
    var result = f({ v: sample.v, t: sample.t + phase, w: 1 });
    result.t = sample.t;
    return result;
  };
}

function changeFreq(f) {
  return freq => changedFreq(freq, f);
}

function addWave(f, g) {
  return function(sample) {
    var result1 = f(sample), result2 = g(sample);
    result1.v += result2.v;
    result1.t = sample.t;
    result1.w += result2.w;
    return result1;
  };
}

var sawTooth = changeFreq(baseSawTooth); 
var inverseSawTooth = changeFreq(baseInverseSawTooth); 
var sine = changeFreq(baseSine);
var triangle = changeFreq(baseTriangle);
 var square = changeFreq(baseSquare);

function gain(g) {
  return function(sample) {
    return { v: sample.v * g, t: sample.t, w: sample.w * g };
  };
}

//////////////////////////////////////////////////////////////////////////////
// combinators

function expFadeInAt(t0, sharpness) {
  return function(sample) {
    var delta = sample.t - t0;
    var weight = delta < 0 ? 0.0 : (1.0 - Math.exp(- delta * sharpness));
    return { v: sample.v * weight, t: sample.t, w: sample.w * weight };
  };
};

function expFadeOutAt(t0, sharpness) {
  return function(sample) {
    var delta = t0 - sample.t;
    var weight = delta < 0 ? 0.0 : (1.0 - Math.exp(- delta * sharpness));
    return { v: sample.v * weight, t: sample.t, w: sample.w * weight };
  };
};

function expFadeOut2At(t0, sharpness) {
  return function(sample) {
    var delta = sample.t - t0;
    var weight = delta < 0 ? 1.0 : Math.exp(- delta * sharpness);
    return { v: sample.v * weight, t: sample.t, w: sample.w * weight };
  };
};
