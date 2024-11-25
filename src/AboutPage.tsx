import tAndATinyFlower from '/t-and-a-tiny-flower.jpg';

function AboutPage() {
    return <>
        <img className="about-headshot" src={tAndATinyFlower} alt="T and a Tiny Flower" />
        <span className="headshot-caption">get a load of this itty-bitty flower</span>
        <div className="bio">
            <p>
                T is a queer, non-binary artist and technologist who thrives at the intersection 
                of creativity and innovation. Their work spans from vibrant, thought-provoking 
                artwork to purpose-driven apps and technology projects.
            </p>
            <p>
                When T isn’t sketching 
                ideas or building with code, they enjoy spending time in nature, cycling, and 
                reading. As a parent, they love collaborating with their two kids on imaginative 
                projects—like the treehouse they built together.
            </p>
            <p>
                T believes in the power of 
                creation to solve real-world problems and bring joy to everyday life. Their 
                site showcases a growing portfolio of artwork and tech creations, offering a 
                glimpse into their unique vision and passion.
            </p>
        </div>
    </>;
}

export default AboutPage;