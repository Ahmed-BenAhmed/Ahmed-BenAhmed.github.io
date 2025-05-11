/**
 * main.ts
 * Main entry point for the application
 */
import { addProjectStyles, ProjectsManager } from './project-card.js';
import { EventsManager, addEventStyles } from './event-card.js';
const backend_endpoint = 'http://127.0.0.1:8000';
// Example data (in a real application, this would come from an API or database)
const sampleProjects = [
    {
        title: "E-commerce Platform",
        description: "A responsive online shopping platform with user authentication and payment processing",
        category: "Web Development",
        imageUrl: "/images/projects/ecommerce.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        contributors: ["Jane Doe", "John Smith"]
    },
    // Add more projects as needed
];
const sampleEvents = [
    {
        event_id: "evt-001",
        title: "Web Development Workshop",
        description: "Exploring the origins and impact of hackathons with industry experts.",
        event_date: "May 15, 2025",
        start_time: "10:00 AM",
        end_time: "2:00 PM",
        location: "virtual",
        event_link: "https://zoom.us/j/example",
        cover_image_url: "/images/events/webdev-workshop.jpg",
        registration_required: true,
        max_attendees: 100,
        status: "upcoming",
        speakers: ["Hicham Maghraoui", "Othman Moussaoui", "Ismail Hamdach"]
    },
    // Add more events as needed
];
// Initialize cards when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add styles to the page
    addEventStyles();
    // Initialize events manager
    const eventsManager = new EventsManager('events-container', `${backend_endpoint}/events`);
    eventsManager.init();
    // Example of how to connect filtering UI
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const status = e.currentTarget.dataset.status;
                eventsManager.filterByStatus(status);
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }
    // Example of how to connect search input
    const searchInput = document.getElementById('event-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            eventsManager.searchEvents(query);
        });
    }
    // Add styles to the page
    addProjectStyles();
    // Initialize projects manager
    const projectsManager = new ProjectsManager('projects-container', `${backend_endpoint}/projects`);
    projectsManager.init();
    // Example of how to connect category filter dropdown
    const categoryFilterProjects = document.getElementById('project-category-filter');
    if (categoryFilterProjects) {
        categoryFilterProjects.addEventListener('change', () => {
            const selectedCategory = categoryFilterProjects.value === 'all' ? null : categoryFilterProjects.value;
            // projectsManager.filterByCategory(selectedCategory);
        });
    }
    // Example of how to connect technology filter dropdown
    const techFilterProjects = document.getElementById('project-tech-filter');
    if (techFilterProjects) {
        techFilterProjects.addEventListener('change', () => {
            const selectedTech = techFilterProjects.value === 'all' ? null : techFilterProjects.value;
            // projectsManager.filterByTechnology(selectedTech);
        });
    }
    // Example of how to connect search input
    const searchInputProjects = document.getElementById('project-search');
    if (searchInputProjects) {
        let debounceTimeout = null;
        searchInputProjects.addEventListener('input', () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = window.setTimeout(() => {
                // projectsManager.searchProjects(searchInputProjects.value);
            }, 300); // Debounce for 300ms
        });
    }
    // Example of how to connect reset button
    const resetButtonProjects = document.getElementById('reset-filters');
    if (resetButtonProjects) {
        resetButtonProjects.addEventListener('click', () => {
            // projectsManager.resetFilters();
        });
    }
});
//# sourceMappingURL=api-integration.js.map