//////////////////////////////////////////////////////////////////////////////
// tracks
// a track has a beginning and an end time and can render its own samples with
// a function that will zero out all samples outside its window

function sequence(tracks)
{
  var track_origins   = tracks.map(track => track.window[0]);
  var track_durations = tracks.map(track => track.window[1] - track.window[0]);
  var track_offsets   = [0];
  
  for (var i=1; i<=tracks.length; ++i) {
    track_offsets.push(track_offsets[i-1] + track_durations[i-1]);
  }

  // FIXME JS has no binary search in stdlib?!
  function locate_track(sample) {
    var t = sample.t, l = tracks.length;
    for (var i=0; i<l; ++i) {
      if (t >= track_offsets[i] && t < track_offsets[i+1])
        return i;
    }
    return -1;
  }
  
  return {
    window: [0, track_offsets[tracks.length]],
    render: function(sample) {
      var ix = locate_track(sample);
      if (ix === -1) {
        return { t: sample.t, v: 0.0 };
      }
      var shifted_sample = {
        v: sample.v,
        t: sample.t - track_offsets[ix] + track_origins[ix]
      };
      return {
        v: tracks[ix].render(shifted_sample).v,
        t: sample.t
      };
    }
  };
}

// fixme: the averaging is done badly here,
// parallel([[a,b], c]) != parallel([a, [b,c]])
function parallel(tracks)
{
  var min = Math.min.apply(null, tracks.map(track => track.window[0]));
  var max = Math.max.apply(null, tracks.map(track => track.window[1]));
  return {
    window: [min, max],
    render: function(sample) {
      var result = { v: 0.0, t: sample.t };
      for (var i=0; i<tracks.length; ++i) {
        result.v += tracks[i].render(sample).v;
      }
      result.v /= tracks.length;
      return result;
    }
  };
}

function baseTrack(f, duration)
{
  return {
    window: [0, duration],
    render: function(sample) {
      if (sample.t < this.window[0] || sample.t > this.window[1]) {
        return { v: 0, t: sample.t };
      } else {
        return f(sample);
      }
    }
  };
}

function delay(track, amount)
{
  return {
    window: [track.window[0] + amount, track.window[1] + amount],
    render: function(sample) {
      var this_sample = { v: sample.v, t: sample.t - amount };
      return track.render(this_sample);
    }
  };
}

function overlappingSeq(tracks, wait)
{
  return parallel(tracks.map((track,i) => delay(track, i * wait)));
}

function seqDelays(tracks)
{
  var wait = 0;
  return parallel(tracks.map(track => {
    var r = delay(track[0], wait);
    wait += track[1];
    return r;
  }));
}
