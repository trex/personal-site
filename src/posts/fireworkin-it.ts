import dancing1 from '/art/fireworkin-it-dancing-1.gif';
import dancing2 from '/art/fireworkin-it-dancing-2.gif';
import dancing3 from '/art/fireworkin-it-dancing-3.gif';
import danceFloor from '/art/fireworkin-it-controller.jpg';
import circuit from '/art/fireworkin-it-circuit.jpg';
import makey from '/art/fireworkin-it-makey.jpg';
import particles from '/art/fireworkin-it-particles.gif';

export default {
    title: "fireworkin' it",
    date: new Date('October 19, 2018'),
    sections: [
        {
            heading: "project description",
            images: [
                {
                    title: "Kiddo Dancing 1",
                    url: dancing1
                },
                {
                    title: "Kiddo Dancing 2",
                    url: dancing2
                },
                {
                    title: "Kiddo Dancing 3",
                    url: dancing3
                },
            ],
            copy: `My family engages in a nightly dance party, and it was only a matter of time before we turned our 550 sq ft home into da clurb.
            This project served as a proof of concept for me in the practices of both building large-scale physical input controllers and producing visual output.
            I created a dance floor controller with several pressure sensors running the width of the floor.  As you move, visualizations project onto a screen tracing your movements across the floor.`
        },
        {
            heading: "hardware",
            images: [
                {
                    title: "Dancefloor Controller",
                    url: danceFloor
                },
                {
                    title: "Makey Makey",
                    url: makey
                },
                {
                    title: "Dancefloor Circuit",
                    url: circuit
                }
            ],
            copy: `The dance floor controller is made of linoleum, aluminum stripping, duct-tape, speaker wire, electrical tape, and aluminum foil.  The dance floor wires into a Makey Makey which acts like a keyboard that can be plugged into any computer.  This enables the mapping of different subsections of the dance floor to unique keyboard input keys on a computer.  The Makey Makey plugs into a Raspberry Pi computer to provide input for software programs.  Visual output from the computer is sent to a projector that back lights a projection screen to avoid shadows cast from the dancer.`
        },
        {
            heading: "software",
            images: [
                {
                    title: "Processing3 Visualization",
                    url: particles
                }
            ],
            copy: `The visualization software for this project was written in Processing 3.  The nice thing about this project is the controller can be leveraged as input for infinite software applications, and I have plans to write additional visualizations for the dance floor.`
        }
    ],
    links: [
        {
            display: "Project Source Code",
            url: "https://github.com/trex/ParticleSteps"
        }
    ]
}