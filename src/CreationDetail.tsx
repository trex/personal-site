import Post from "./post";

const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long' as 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export default function CreationDetail({ post }: { post: Post }) {
    return (
        <>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-date">{post.date.toLocaleDateString("en-US", dateFormat)}</p>
            <hr/>
            {post.sections.map((section) => {
                return (
                    <div key={section.heading} className="post-section">
                        <h2 className="post-section-heading">{section.heading}</h2>
                        <div className="post-section-image-container">
                            {section.images.map((image) => (
                                <img className="post-section-image" src={image.url} alt={image.title} key={image.title}/>
                            ))}
                        </div>
                        <div className="post-section-copy">
                            {section.copy.split("\n").map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                );
            })}
            <div className="post-links">
                {post.links.map((link) => (
                    <a key={link.display} href={link.url}>{link.display}</a>
                ))}
            </div>
        </>
    );
}