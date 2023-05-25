const themes = new Map([
    [
        "amethyst",
        {
            title: "Amethyst",
            image: "https://example.com/amethyst.png",
            previous: "nothing",
            next: "aquamist",
        },
    ],
    [
        "aquamist",
        {
            title: "Aqua Mist",
            image: "https://example.com/aquamist.png",
            previous: "amethyst",
            next: "crimson",
        },
    ],
    [
        "crimson",
        {
            title: "Crimson",
            image: "https://example.com/crimson.png",
            previous: "aquamist",
            next: "forest",
        },
    ],
    [
        "forest",
        {
            title: "Forest",
            image: "https://example.com/forest.png",
            previous: "crimson",
            next: "light",
        },
    ],
    [
        "light",
        {
            title: "Light",
            image: "https://example.com/light.png",
            previous: "forest",
            next: "midnight",
        },
    ],
    [
        "midnight",
        {
            title: "Midnight",
            image: "https://example.com/midnight.png",
            previous: "light",
            next: "nightfall",
        },
    ],
    [
        "nightfall",
        {
            title: "Nightfall",
            image: "https://example.com/nightfall.png",
            previous: "nightfall",
            next: "slate",
        },
    ],
    [
        "slate",
        {
            title: "Slate",
            image: "https://example.com/slate.png",
            previous: "nightfall",
            next: "sunflower",
        },
    ],
    [
        "sunflower",
        {
            title: "Sunflower",
            image: "https://example.com/sunflower.png",
            previous: "slate",
            next: "nothing",
        },
    ],
]);

module.exports = themes;