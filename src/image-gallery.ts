import avavaBuilder from '/art/avava-builder.gif';
import bagAnimation from '/art/bag-animation.gif';
import blueOysters from '/art/blue-oysters.jpg';
import boletePetey from '/art/bolete-petey.jpg';
import cantWearNikes from '/art/cant-wear-nikes.jpg';
import fireworkinIt from '/art/fireworkin-it.mp4';
import fireworkinItPoster from '/art/fireworkin-it-poster.jpg';
import moundToTheWind from '/art/mound-to-the-wind.png';
import mushroomBuds from '/art/mushroom-buds.png';
import newShit from '/art/new-shit.jpg';
import ousideJulesCover from '/art/outside-jules-cover.png';
import outsideJulesSleeping from '/art/outside-jules-sleeping.png';
import personalSite from '/art/personal-site.png';
import pokedex from '/art/pokedex.png';
import spinningHeads from '/art/spinning-heads.jpg';
import spiritOfTheTree from '/art/spirit-of-the-tree.jpg';
import totoroMural from '/art/totoro-mural.png';
import yeehawPadnah from '/art/yeehaw-padnah.png'
import yieldSign from '/art/yield.jpg';
import yokaiCritters from '/art/yokai-critters-2.gif';


export const filteredImages = (filters: Set<string>) => {
    return images.filter(image => {
        return [...image.tags].some(filter => filters.has(filter));
    })
}

export const images = [
    {
        src: fireworkinIt,
        poster: fireworkinItPoster,
        mediaType: "video",
        title: "Fireworkin' It",
        year: 2018,
        medium: "Interactive custom software & hardware, video projector",
        statement: "A dancefloor controller provides input to visualization software, displayed by a rear-lit projector.",
        tags: new Set(["art", "technology"])
    },
    {
        src: ousideJulesCover,
        mediaType: "image",
        title: "Outside Jules Cover",
        year: 2024,
        medium: "Pen & Ink, Digitally Colored",
        statement: "The cover for Outside Jules, a comic I write and illustrate.",
        tags: new Set(["art"])
    },
    {
        src: cantWearNikes,
        mediaType: "image",
        title: "I Can't Wear Nikes",
        year: 2014,
        medium: "Ink & Watercolor",
        statement: "Illustration of a moment and quote from my 4y.o. son.",
        tags: new Set(["art"])
    },
    {
        src: boletePetey,
        mediaType: "image",
        title: "Bolete Petey",
        year: 2024,
        medium: "Pen & Ink, Digitally Colored",
        statement: "Main character from We Happen to be Mushrooms, a comic strip I write and Illustrate.",
        tags: new Set(["art"])
    },
    {
        src: pokedex,
        mediaType: "image",
        title: "Pokedex",
        year: 2024,
        medium: "Vite, React & the PokeAPI",
        statement: "Responsive pokedex app; I used this project to learn React, and refresh my web design & development muscles.",
        tags: new Set(["art", "technology"])
    },
    {
        src: spiritOfTheTree,
        mediaType: "image",
        title: "Spirit of the Tree",
        year: 2022,
        medium: "Watercolor",
        statement: "Sometimes the trees talk to me. Sometimes I listen. Sometimes I talk back.",
        tags: new Set(["art"])
    },
    {
        src: personalSite,
        mediaType: "image",
        title: "Personal Site",
        year: 2024,
        medium: "Vite, React, CSS, val.town",
        statement: "Responsive personal website. Pretty meta putting it up here, huh?!.",
        tags: new Set(["technology"])
    },
    {
        src: newShit,
        mediaType: "image",
        title: "Time for Some New Shit",
        year: 2009,
        medium: "Marker",
        statement: "I like drawing creatures with eyes.",
        tags: new Set(["art"])
    },
    {
        src: mushroomBuds,
        mediaType: "image",
        title: "We Happen to be Mushrooms",
        year: 2024,
        medium: "Pen & Ink, Digitally Colored",
        statement: "These three mushroom buds are the main characters of We Happen to be Mushrooms, a little comic strip.",
        tags: new Set(["art"])
    },
    {
        src: totoroMural,
        mediaType: "image",
        title: "Totoro Mural",
        year: 2022,
        medium: "Acrylic paints",
        statement: "My Neighbor Totoro mural that I may or may not ever finish.",
        tags: new Set(["art"])
    },
    {
        src: avavaBuilder,
        mediaType: "image",
        title: "Avava Toy Builder",
        year: 2014,
        medium: "HTML5, CSS3, JS",
        statement: "The avava-builder app lets users create custom creatures from various parts, export them for 3D printing, and bring them to life. I pitched it to 1000+ at New Tech Denver and to the TechStars/Disney Accelerator.",
        tags: new Set(["art", "technology"])
    },
    {
        src: yieldSign,
        mediaType: "image",
        title: "Yield",
        year: 2015,
        medium: "Concrete, wood, old computers and wires and shit",
        statement: "A physical manifestation of my dynamic and varied feelings about and relationship with technology.",
        tags: new Set(["art", "technology"])
    },
    {
        src: outsideJulesSleeping,
        mediaType: "image",
        title: "Jules Waking",
        year: 2024,
        medium: "Pen & Ink, Digitally Colored",
        statement: "Opening sequence from Outside Jules.",
        tags: new Set(["art"])
    },
    {
        src: blueOysters,
        mediaType: "image",
        title: "Blue Oysters",
        year: 2020,
        medium: "Watercolor",
        statement: "Blue oyster mushrooms I painted for my mom, and then she gave back to me.",
        tags: new Set(["art"])
    },
    {
        src: bagAnimation,
        mediaType: "image",
        title: "Critter Bag Animation",
        year: 2016,
        medium: "Colored Pencil, Stop-Motion Animation",
        statement: "Animation I created for a brownbag lunch lesson I gave at SendGrid on stop-motion animation.",
        tags: new Set(["art"])
    },
    {
        src: moundToTheWind,
        mediaType: "image",
        title: "Mound to the Wind",
        year: 2017,
        medium: "Pen & Ink, Watercolor",
        statement: "Not much to say about this one.",
        tags: new Set(["art"])
    },
    {
        src: spinningHeads,
        mediaType: "image",
        title: "Spinning Heads",
        year: 2022,
        medium: "Watercolor",
        statement: "Sometimes my head feels a little spinny like.",
        tags: new Set(["art"])
    },
    {
        src: yokaiCritters,
        mediaType: "image",
        title: "Yokai Critters",
        year: 2018,
        medium: "Haxe / JavaScript",
        statement: "Cross-platform, networked, 4-person PacMan Battle Royale clone.",
        tags: new Set(["art", "technology"])
    },
    {
        src: yeehawPadnah,
        mediaType: "image",
        title: "Yeehaw Padnah",
        year: 2024,
        medium: "Pen & Ink, Digitally Colored",
        statement: "Video game loading screen from Outside Jules.",
        tags: new Set(["art"])
    }
];