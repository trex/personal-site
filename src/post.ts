export default interface Post {
    title: string;
    date: Date;
    sections: {
        heading: string;
        images: {
            title: string;
            url: string;
        }[];
        copy: string;
    }[];
    links: {
        display: string;
        url: string;
    }[];
}