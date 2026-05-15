// JoJo Mod for Sandboxels
// A glowing blue liquid that emits light

elements.jojo = {
    color: "#1E90FF",
    category: "liquids",
    state: "liquid",
    density: 1.0,
    viscosity: 5,
    conduct: 0,

    // Glowing effect using color variation to simulate a shimmer
    colorFunction: function(pixel) {
        let flicker = Math.sin(Date.now() / 200 + pixel.x * 0.5 + pixel.y * 0.5) * 20;
        let r = Math.min(255, Math.max(0, 30 + flicker));
        let g = Math.min(255, Math.max(0, 144 + flicker));
        let b = 255;
        return "rgb(" + r + "," + g + "," + b + ")";
    },

    // Emit light around each JoJo pixel
    tick: function(pixel) {
        // Spread a soft blue glow to neighboring pixels
        let neighbors = [
            { x: pixel.x + 1, y: pixel.y },
            { x: pixel.x - 1, y: pixel.y },
            { x: pixel.x,     y: pixel.y + 1 },
            { x: pixel.x,     y: pixel.y - 1 },
        ];
        for (let n of neighbors) {
            let neighbor = pixelMap[n.x] && pixelMap[n.x][n.y];
            if (neighbor && neighbor.element === "jojo") {
                neighbor.glow = true;
            }
        }
        pixel.glow = true;
    },

    // Glowing light emission
    lightR: 30,
    lightG: 100,
    lightB: 255,
    lightRadius: 6,
    lightBrightness: 1.5,

    menu: true,
    menuX: 4,
    menuY: 1,

    desc: "A mysterious glowing blue liquid. Its origins are... fabulous.",
};
