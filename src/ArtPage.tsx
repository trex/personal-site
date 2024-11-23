import bagAnimation from '/art/bag-animation.gif';
import blueOysters from '/art/blue-oysters.jpg';
import boletePetey from '/art/bolete-petey.jpg';
import cantWearNikes from '/art/cant-wear-nikes.jpg';
import moundToTheWind from '/art/mound-to-the-wind.png';
import mushroomBuds from '/art/mushroom-buds.png';
import newShit from '/art/new-shit.jpg';
import ousideJulesCover from '/art/outside-jules-cover.png';
import outsideJulesSleeping from '/art/outside-jules-sleeping.png';
import spinningHeads from '/art/spinning-heads.jpg';
import spiritOfTheTree from '/art/spirit-of-the-tree.jpg';
import totoroMural from '/art/totoro-mural.png';
import yeehawPadnah from '/art/yeehaw-padnah.png'
import yieldSign from '/art/yield.jpg';

const images = [
    {
        src: ousideJulesCover,
        alt: "Outside Jules Cover"
    },
    {
        src: cantWearNikes,
        alt: "I Can't Wear Nikes"
    },
    {
        src: boletePetey,
        alt: "Bolete Petey"
    },
    {
        src: spiritOfTheTree,
        alt: "Spirit of the Tree"
    },
    {
        src: newShit,
        alt: "Time for Some New Shit"
    },
    {
        src: mushroomBuds,
        alt: "We Happen to be Mushrooms"
    },
    {
        src: totoroMural,
        alt: "Totoro Mural"
    },
    {
        src: yieldSign,
        alt: "Yield"
    },
    {
        src: outsideJulesSleeping,
        alt: "Jules Sleeping"
    },
    {
        src: blueOysters,
        alt: "Blue Oysters"
    },
    {
        src: bagAnimation,
        alt: "Critter Bag Animation"
    },
    {
        src: moundToTheWind,
        alt: "Mound to the Wind"
    },
    {
        src: spinningHeads,
        alt: "Spinning Heads"
    },
    {
        src: yeehawPadnah,
        alt: "Yeehaw Padnah"
    }
];

function ArtPage() {
    const columns = 4;
    const columnSize = Math.ceil(images.length / columns);

    return (
        <div className="gallery">
            {
                Array.from({ length: columns }, (_, index) => (
                    <div className="image-column" key={index}>
                        {
                            images.slice(index * columnSize, (index + 1) * columnSize).map((image) => (
                                <div className="image-container" key={image.alt}>
                                    <img src={image.src} alt={image.alt} />
                                    <div className="image-description">{image.alt}</div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default ArtPage;