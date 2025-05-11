var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * ProjectsManager class that handles fetching, rendering, and state management for projects
 */
export class ProjectsManager {
    /**
     * Create a new ProjectsManager
     *
     * @param containerId - ID of the HTML element where projects will be rendered
     * @param apiEndpoint - URL to fetch projects from
     */
    constructor(containerId, apiEndpoint) {
        this.projects = [];
        this.container = null;
        this.activeFilters = {
            category: null,
            technology: null,
            search: ''
        };
        this.containerId = containerId;
        this.apiEndpoint = apiEndpoint;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
        }
    }
    /**
     * Initialize the projects manager and load projects
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showLoadingState();
            try {
                yield this.fetchProjects();
                this.renderProjects();
                // this.initializeFilterOptions();
            }
            catch (error) {
                this.showErrorState(error instanceof Error ? error.message : 'An error occurred');
                console.error('Failed to load projects:', error);
            }
        });
    }
    /**
     * Fetch projects from the API endpoint
     */
    fetchProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.apiEndpoint);
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
                const data = yield response.json();
                if (Array.isArray(data)) {
                    this.projects = data;
                }
                else if (data.projects && Array.isArray(data.projects)) {
                    this.projects = data.projects;
                }
                else {
                    throw new Error('Invalid API response format');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Display loading state UI
     */
    showLoadingState() {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        const loadingElement = document.createElement('div');
        loadingElement.className = 'projects-loading';
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        loadingElement.appendChild(spinner);
        const loadingText = document.createElement('p');
        loadingText.textContent = 'Loading projects...';
        loadingElement.appendChild(loadingText);
        this.container.appendChild(loadingElement);
    }
    /**
     * Display error state UI
     *
     * @param message - Error message to display
     */
    showErrorState(message) {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        const errorElement = document.createElement('div');
        errorElement.className = 'projects-error';
        const errorIcon = document.createElement('i');
        errorIcon.className = 'fas fa-exclamation-triangle';
        errorElement.appendChild(errorIcon);
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Failed to load projects';
        errorElement.appendChild(errorTitle);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorElement.appendChild(errorMessage);
        const retryButton = document.createElement('button');
        retryButton.className = 'btn btn-primary';
        retryButton.textContent = 'Try Again';
        retryButton.addEventListener('click', () => this.init());
        errorElement.appendChild(retryButton);
        this.container.appendChild(errorElement);
    }
    /**
     * Display empty state UI when no projects are available
     */
    showEmptyState(message = 'There are currently no projects to display.') {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        const emptyElement = document.createElement('div');
        emptyElement.className = 'projects-empty';
        const emptyIcon = document.createElement('i');
        emptyIcon.className = 'fas fa-project-diagram';
        emptyElement.appendChild(emptyIcon);
        const emptyTitle = document.createElement('h3');
        emptyTitle.textContent = 'No Projects Found';
        emptyElement.appendChild(emptyTitle);
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = message;
        emptyElement.appendChild(emptyMessage);
        if (this.activeFilters.category || this.activeFilters.technology || this.activeFilters.search) {
            const resetButton = document.createElement('button');
            resetButton.className = 'btn btn-outline';
            resetButton.textContent = 'Reset Filters';
            resetButton.addEventListener('click', () => {
                // this.resetFilters();
            });
            emptyElement.appendChild(resetButton);
        }
        this.container.appendChild(emptyElement);
    }
    /**
     * Initialize filter options based on available projects
     */
    // private initializeFilterOptions(): void {
    //     // Get unique categories
    //     const categories = [...new Set(this.projects.flatMap(project => project.tags))];
    //
    //     // Get unique technologies
    //     const technologies = [...new Set(
    //         this.projects.flatMap(project => project.technologies)
    //     )];
    //
    //     // Update category filter dropdown if it exists
    //     const categoryFilter = document.getElementById('project-category-filter') as HTMLSelectElement;
    //     if (categoryFilter) {
    //         // Clear existing options except the first one (All)
    //         while (categoryFilter.options.length > 1) {
    //             categoryFilter.remove(1);
    //         }
    //
    //         // Add new category options
    //         categories.forEach(category => {
    //             const option = document.createElement('option');
    //             option.value = category;
    //             option.textContent = category;
    //             categoryFilter.appendChild(option);
    //         });
    //     }
    //
    //     // Update technology filter dropdown if it exists
    //     const techFilter = document.getElementById('project-tech-filter') as HTMLSelectElement;
    //     if (techFilter) {
    //         // Clear existing options except the first one (All)
    //         while (techFilter.options.length > 1) {
    //             techFilter.remove(1);
    //         }
    //
    //         // Add new technology options
    //         technologies.sort().forEach(tech => {
    //             const option = document.createElement('option');
    //             option.value = tech;
    //             option.textContent = tech;
    //             techFilter.appendChild(option);
    //         });
    //     }
    // }
    /**
     * Apply all active filters and render filtered projects
     */
    // private applyFilters(): void {
    //     let filteredProjects = [...this.projects];
    //
    //     // Apply category filter
    //     if (this.activeFilters.category) {
    //         filteredProjects = filteredProjects.filter(
    //             project => project.category === this.activeFilters.category
    //         );
    //     }
    //
    //     // Apply technology filter
    //     if (this.activeFilters.technology) {
    //         filteredProjects = filteredProjects.filter(
    //             project => project.technologies.includes(this.activeFilters.technology!)
    //         );
    //     }
    //
    //     // Apply search filter
    //     if (this.activeFilters.search) {
    //         const searchQuery = this.activeFilters.search.toLowerCase();
    //         filteredProjects = filteredProjects.filter(
    //             project =>
    //                 project.title.toLowerCase().includes(searchQuery) ||
    //                 project.description.toLowerCase().includes(searchQuery) ||
    //                 project.contributors.some(contributor =>
    //                     contributor.toLowerCase().includes(searchQuery)
    //                 )
    //         );
    //     }
    //
    //     this.renderFilteredProjects(filteredProjects);
    // }
    /**
     * Reset all filters to their default state
     */
    // resetFilters(): void {
    //     this.activeFilters = {
    //         category: null,
    //         technology: null,
    //         search: ''
    //     };
    //
    //     // Reset UI elements
    //     const categoryFilter = document.getElementById('project-category-filter') as HTMLSelectElement;
    //     if (categoryFilter) {
    //         categoryFilter.selectedIndex = 0;
    //     }
    //
    //     const techFilter = document.getElementById('project-tech-filter') as HTMLSelectElement;
    //     if (techFilter) {
    //         techFilter.selectedIndex = 0;
    //     }
    //
    //     const searchInput = document.getElementById('project-search') as HTMLInputElement;
    //     if (searchInput) {
    //         searchInput.value = '';
    //     }
    //
    //     // Re-render all projects
    //     this.renderProjects();
    // }
    /**
     * Filter projects by category
     *
     * @param category - Category to filter by, or null for all categories
     */
    // filterByCategory(category: string | null): void {
    //     this.activeFilters.category = category;
    //     this.applyFilters();
    // }
    //
    // /**
    //  * Filter projects by technology
    //  *
    //  * @param technology - Technology to filter by, or null for all technologies
    //  */
    // filterByTechnology(technology: string | null): void {
    //     this.activeFilters.technology = technology;
    //     this.applyFilters();
    // }
    //
    // /**
    //  * Search projects by title, description, or contributors
    //  *
    //  * @param query - Search query string
    //  */
    // searchProjects(query: string): void {
    //     this.activeFilters.search = query.trim();
    //     this.applyFilters();
    // }
    /**
     * Render all projects to the container
     */
    renderProjects() {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        if (this.projects.length === 0) {
            this.showEmptyState();
            return;
        }
        this.projects.forEach(project => {
            var _a;
            const projectCard = this.createProjectCard(project);
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(projectCard);
        });
    }
    /**
     * Render filtered projects to the container
     *
     * @param filteredProjects - Array of filtered projects to display
     */
    // private renderFilteredProjects(filteredProjects: Project[]): void {
    //     if (!this.container) return;
    //
    //     this.container.innerHTML = '';
    //
    //     if (filteredProjects.length === 0) {
    //         let message = 'No projects found matching your criteria.';
    //
    //         // Create more specific message based on filters
    //         const activeFilters: string[] = [];
    //         if (this.activeFilters.category) activeFilters.push(`category "${this.activeFilters.category}"`);
    //         if (this.activeFilters.technology) activeFilters.push(`technology "${this.activeFilters.technology}"`);
    //         if (this.activeFilters.search) activeFilters.push(`search "${this.activeFilters.search}"`);
    //
    //         if (activeFilters.length) {
    //             message = `No projects found matching ${activeFilters.join(' and ')}.`;
    //         }
    //
    //         this.showEmptyState(message);
    //         return;
    //     }
    //
    //
    //     filteredProjects.forEach(project => {
    //         const projectCard = this.createProjectCard(project);
    //         this.container?.appendChild(projectCard);
    //     });
    //
    // }
    /**
     * Creates a project card DOM element with the given properties
     *
     * @param project - The project data
     * @returns The project card element to be inserted into the page
     */
    createProjectCard(project) {
        // Create the main card element
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        if (project.featured) {
            projectCard.classList.add('project-card--featured');
        }
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-card__image-container';
        // Create and append image
        const image = document.createElement('img');
        image.className = 'project-card__image';
        image.src = project.cover_image_url;
        image.alt = `Preview of ${project.title}`;
        // image.onerror = () => {
        //     // Handle image loading error with a fallback
        //     image.src = '/public/images/project_placeholder.jpg';
        // };
        imageContainer.appendChild(image);
        // Create and append category badge
        const categoryBadge = document.createElement('div');
        const categories = ["web", "mobile", "ai", "data", "iot"];
        categoryBadge.setAttribute('data-category', categories[Math.floor(Math.random() * categories.length)]);
        categoryBadge.className = 'project-card__category-badge';
        categoryBadge.textContent = project.tags.join(" ");
        imageContainer.appendChild(categoryBadge);
        // Add status badge if provided
        if (project.status) {
            const statusBadge = document.createElement('div');
            statusBadge.className = `project-card__status-badge project-card__status-badge--${project.status}`;
            statusBadge.textContent = project.status.replace('-', ' ');
            imageContainer.appendChild(statusBadge);
        }
        // Add the image container to the card
        projectCard.appendChild(imageContainer);
        // Create content container
        const content = document.createElement('div');
        content.className = 'project-card__content';
        // Create and append title
        const title = document.createElement('h3');
        title.className = 'project-card__title';
        title.textContent = project.title;
        content.appendChild(title);
        // Create and append description
        const description = document.createElement('p');
        description.className = 'project-card__description';
        description.textContent = project.description;
        content.appendChild(description);
        // Create technologies container
        const technologiesContainer = document.createElement('div');
        technologiesContainer.className = 'project-card__technologies';
        // Add technology badges
        project.tags.forEach(tech => {
            const techBadge = document.createElement('span');
            techBadge.className = 'project-card__tech-badge';
            techBadge.textContent = tech;
            // Add click handler for filtering by this technology
            techBadge.addEventListener('click', (e) => {
                e.preventDefault();
                // this.filterByTechnology(tech);
                // Update the tech filter dropdown if it exists
                const techFilter = document.getElementById('project-tech-filter');
                if (techFilter) {
                    for (let i = 0; i < techFilter.options.length; i++) {
                        if (techFilter.options[i].value === tech) {
                            techFilter.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
            technologiesContainer.appendChild(techBadge);
        });
        content.appendChild(technologiesContainer);
        // Create footer
        const footer = document.createElement('div');
        footer.className = 'project-card__footer';
        // Create contributors container
        const contributorsContainer = document.createElement('div');
        contributorsContainer.className = 'project-card__contributors';
        // Add contributors
        // project.contributors.forEach(contributor => {
        //     const contributorElement = document.createElement('span');
        //     contributorElement.className = 'project-card__contributor';
        //     contributorElement.textContent = contributor;
        //     contributorsContainer.appendChild(contributorElement);
        // });
        footer.appendChild(contributorsContainer);
        // Create code link
        const codeLink = document.createElement('a');
        codeLink.className = 'project-card__link';
        codeLink.href = project.codeUrl || '#';
        const codeIcon = document.createElement('i');
        codeIcon.className = 'project-card__icon icon-code';
        codeLink.appendChild(codeIcon);
        codeLink.appendChild(document.createTextNode('Code'));
        footer.appendChild(codeLink);
        // Add demo link if available
        if (project.demoUrl) {
            const demoLink = document.createElement('a');
            demoLink.className = 'project-card__link project-card__link--demo';
            demoLink.href = project.demoUrl;
            const demoIcon = document.createElement('i');
            demoIcon.className = 'project-card__icon icon-demo';
            demoLink.appendChild(demoIcon);
            demoLink.appendChild(document.createTextNode('Demo'));
            footer.appendChild(demoLink);
        }
        // Append footer to content
        content.appendChild(footer);
        // Append content to card
        projectCard.appendChild(content);
        return projectCard;
    }
}
// CSS to be added to the page for loading states and project display
export const addProjectStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    
    /* Loading State */
    .projects-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(0, 0, 0, 0.1);
      border-top-color: #3498db;
      border-radius: 50%;
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Error State */
    .projects-error {
      padding: 2rem;
      text-align: center;
      border: 1px solid #f8d7da;
      background-color: #1a1a1a;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .projects-error i {
      font-size: 3rem;
      color: #dc3545;
      margin-bottom: 1rem;
    }
    
    .projects-error button {
      margin-top: 1rem;
    }
    
    /* Empty State */
    .projects-empty {
      padding: 3rem;
      text-align: center;
      border: 1px solid #e9ecef;
      background-color: #f8f9fa;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .projects-empty i {
      font-size: 3rem;
      color: #6c757d;
      margin-bottom: 1rem;
    }
    
    /* Filter styles */
    .projects-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    /* Project card variations */
    .project-card--featured {
      border: 2px solid gold;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Status badges */
    .project-card__status-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      color: white;
    }
    
   
  `;
    document.head.appendChild(styleElement);
};
//# sourceMappingURL=project-card.js.map