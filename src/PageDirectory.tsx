export default interface PageDirectory {
    [key: string]: {
        handleOnClick: () => void;
        page: React.ReactElement;
    }
}