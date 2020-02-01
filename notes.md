(Disclosure: I'm completely ignorant in sound synthesis)

## Using weights

I want to be able to mix in an arbitrary number of samples. So my idea
was to keep around a "weight" with each sample, so that when I mix samples,
I use weights.

But now, the question that arises is: how do you treat silence? 

In other words, what are the algebraic laws that should hold for
silent samples? It seems like silence should behave like the identity
for mixing:

mix(silence, x) = x

But then, how do we create a sample that fades to silence?

Here's my current idea: we keep weights around as long as possible,
and then when rendering a wave to an actual PCM buffer, if the weights
are less than 1, we fade proportionally to total weight. If weights
are greater than one, we divide by the total weight.

Although this makes sense, I'm a little weirded out about how similar
this solution is to my usual data-shading hack. Is there a deeper
principle at play or am I ignoring the differences between the two
settings?



## accidental chirp!

A chord of increasing frequencies in time sounded very
scifi-y. Nice.

The exponential chirp, when not aliasing, sounds kinda like what
Rush used in the beginning of 2112. When it starts aliasing (so past
22KHz) it gets into Star Trek phasers territory. Fun.
