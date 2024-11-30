import { useReducer } from 'react';
import { filteredImages } from './image-gallery';
import CreationPortal from './CreationPortal';

interface CreationState {
    activeFilters: Set<string>;
}

interface CreationActions {
    type: string;
    name: string;
    checkedValue: boolean;
}

const filters = new Set(["art", "technology"]);

const initialState: CreationState = {
    activeFilters: new Set(filters),
}

function reducer (state: CreationState, action: CreationActions) {
    if (action.type === "filter-change") {
        let updatedFilters = new Set(state.activeFilters);
        action.checkedValue ? updatedFilters.add(action.name) : updatedFilters.delete(action.name);
        return {
            ...state,
            activeFilters: updatedFilters,
        };
    }
    return state;
}

function CreationsPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const images = filteredImages(state.activeFilters);
    const columns = 4;
    const baseSize = Math.floor(images.length / columns); // Base size for each column
    const remainder = images.length % columns; // Remaining images to distribute

    // Create an array to hold the sizes for each column
    const columnSizes = Array(columns).fill(baseSize).map((size, index) => 
        size + (index < remainder ? 1 : 0) // Distribute the remainder
    );

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "filter-change",
            name: e.target.name,
            checkedValue: e.target.checked
        });
    }

    return (
        <>
            <div className="gallery-filters">
                {
                    Array.from(filters).map(filter => (
                        <label className="filter-label" key={filter}>
                            <input 
                                className="filter-checkbox"
                                type="checkbox" 
                                name={filter} 
                                checked={state.activeFilters.has(filter)} 
                                onChange={handleFilterChange} 
                            />
                            {filter}
                        </label>
                    ))
                }
            </div>
            <div className="gallery">
                {   state.activeFilters.size < 1 ? 
                        <div className="gallery-empty">apply categories to see images</div> :
                    columnSizes.map((_, index) => (
                        <div className="image-column" key={index}>
                            {
                                // Account for the number of images in the previous column
                                images.slice(columnSizes.slice(0, index).reduce((a, b) => a + b, 0), 
                                             columnSizes.slice(0, index + 1).reduce((a, b) => a + b, 0)).map((image) => (
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
                                            {
                                                image.post && <CreationPortal post={image.post}/>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default CreationsPage;