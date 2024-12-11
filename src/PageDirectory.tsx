export default interface PageDirectory {
    [key: string]: {
        element: React.ReactElement;
        hidden: boolean;
    }
}