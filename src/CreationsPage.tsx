import { images } from './image-gallery';

function CreationsPage() {
    const columns = 4;
    const columnSize = Math.ceil(images.length / columns);

    return (
        <div className="gallery">
            {
                Array.from({ length: columns }, (_, index) => (
                    <div className="image-column" key={index}>
                        {
                            images.slice(index * columnSize, (index + 1) * columnSize).map((image) => (
                                <div className="image-container" key={image.title}>
                                    {image.mediaType === "image" ? <img src={image.src} alt={image.title} />
                                        : <video controls poster={image.poster}>
                                            <source src={image.src}></source>    
                                        </video>}
                                    <div className={`image-attributes ${image.mediaType === "video" ? "video" : ""}`}>
                                        <div className="image-title">{image.title}</div>
                                        <div className="image-year">{image.year}</div>
                                        <div className="image-medium">{image.medium}</div>
                                        <div className="image-statement">{image.statement}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default CreationsPage;