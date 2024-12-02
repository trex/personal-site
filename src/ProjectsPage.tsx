import { useReducer } from "react";
import ProjectPortal from "./ProjectPortal";
import { filteredProjects } from "./projects";

interface ProjectState {
    activeFilters: Set<string>;
}

interface ProjectActions {
    type: string;
    name: string;
    checkedValue: boolean;
}

const filters = new Set(["art", "technology"]);

const initialState: ProjectState = {
    activeFilters: new Set(filters),
}

function reducer (state: ProjectState, action: ProjectActions) {
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

function ProjectsPage() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const projects = filteredProjects(state.activeFilters);
    const columns = 3;
    const baseSize = Math.floor(projects.length / columns); // Base size for each column
    const remainder = projects.length % columns; // Remaining images to distribute

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

    return <>
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
            {   
                state.activeFilters.size < 1 ?
                    <div className="gallery-empty">apply categories to see projects</div> :
                columnSizes.map((_, index) => (
                    <div key={index} className="project-column">
                        {
                            projects.slice(columnSizes.slice(0, index).reduce((a, b) => a + b, 0), 
                                columnSizes.slice(0, index + 1).reduce((a, b) => a + b, 0)).map((project) => {
                                    return <div key={project.attributes.title} className="project-container">
                                        <img src={project.attributes.image} alt={project.attributes.imageAlt} />
                                        <div className="project-attributes">
                                            <div className="project-title">{project.attributes.title}</div>
                                            <div className="project-year">{project.attributes.year}</div>
                                            <div className="project-medium">{project.attributes.medium}</div>
                                            <div className="project-description">{project.attributes.description}</div>
                                            {
                                                project.component && <ProjectPortal post={project.component} />
                                            }
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                ))
            }
            
        </div>
    </>
}

export default ProjectsPage;