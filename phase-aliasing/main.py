'''
=================
3D wireframe plot
=================

A very basic demonstration of a wireframe plot.
'''

from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
import math
import numpy as np
import scipy

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d', proj_type='ortho')

x = np.linspace(0,   20, 800)
y = np.linspace(0.9, 1.1, 100)

def f(X, Y):
    freq = 1 # 1 + scipy.sin(2 * scipy.pi * Y) * 0.05
    return scipy.sin(2 * scipy.pi * Y * X)

X, Y = np.meshgrid(x, y)
Z = f(X, Y)

# Plot a basic wireframe.
ax.plot_wireframe(X, Y, Z, rstride=5, cstride=5, alpha=0.1)

lx = x
ly = 1 + scipy.sin(2 * scipy.pi * lx / 4) * 0.05
lz = scipy.sin(2 * scipy.pi * lx * ly)
ax.plot(lx, ly, lz, 'r')


plt.show()
