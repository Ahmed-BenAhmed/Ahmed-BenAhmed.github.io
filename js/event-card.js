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
 * EventsManager class that handles fetching, rendering, and state management for events
 */
export class EventsManager {
    /**
     * Create a new EventsManager
     *
     * @param containerId - ID of the HTML element where events will be rendered
     * @param apiEndpoint - URL to fetch events from
     */
    constructor(containerId, apiEndpoint) {
        this.events = [];
        this.container = null;
        this.containerId = containerId;
        this.apiEndpoint = apiEndpoint;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
        }
    }
    /**
     * Initialize the events manager and load events
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showLoadingState();
            try {
                yield this.fetchEvents();
                this.renderEvents();
            }
            catch (error) {
                this.showErrorState(error instanceof Error ? error.message : 'An error occurred');
                console.error('Failed to load events:', error);
            }
        });
    }
    /**
     * Fetch events from the API endpoint
     */
    fetchEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.apiEndpoint);
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
                const data = yield response.json();
                if (Array.isArray(data)) {
                    this.events = data;
                }
                else if (data.events && Array.isArray(data.events)) {
                    this.events = data.events;
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
        loadingElement.className = 'events-loading';
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        loadingElement.appendChild(spinner);
        const loadingText = document.createElement('p');
        loadingText.textContent = 'Loading events...';
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
        errorElement.className = 'events-error';
        const errorIcon = document.createElement('i');
        errorIcon.className = 'fas fa-exclamation-triangle';
        errorElement.appendChild(errorIcon);
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Failed to load events';
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
     * Display empty state UI when no events are available
     */
    showEmptyState() {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        const emptyElement = document.createElement('div');
        emptyElement.className = 'events-empty';
        const emptyIcon = document.createElement('i');
        emptyIcon.className = 'far fa-calendar-times';
        emptyElement.appendChild(emptyIcon);
        const emptyTitle = document.createElement('h3');
        emptyTitle.textContent = 'No Events Found';
        emptyElement.appendChild(emptyTitle);
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'There are currently no events scheduled. Please check back later.';
        emptyElement.appendChild(emptyMessage);
        this.container.appendChild(emptyElement);
    }
    /**
     * Render all events to the container
     */
    renderEvents() {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        if (this.events.length === 0) {
            this.showEmptyState();
            return;
        }
        this.events.forEach(event => {
            var _a;
            const eventCard = this.createEventCard(event);
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(eventCard);
        });
    }
    /**
     * Filter events by status
     *
     * @param status - Status to filter by, or 'all' for all events
     */
    filterByStatus(status) {
        if (!this.container)
            return;
        const filteredEvents = status === 'all'
            ? this.events
            : this.events.filter(event => event.status === status);
        this.container.innerHTML = '';
        if (filteredEvents.length === 0) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'events-empty';
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = `No ${status} events found.`;
            emptyElement.appendChild(emptyMessage);
            this.container.appendChild(emptyElement);
            return;
        }
        const eventsGrid = document.createElement('div');
        eventsGrid.className = 'events-grid';
        filteredEvents.forEach(event => {
            var _a;
            const eventCard = this.createEventCard(event);
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(eventCard);
        });
    }
    /**
     * Search events by title or description
     *
     * @param query - Search query string
     */
    searchEvents(query) {
        if (!this.container)
            return;
        const normalizedQuery = query.toLowerCase().trim();
        const filteredEvents = normalizedQuery === ''
            ? this.events
            : this.events.filter(event => event.title.toLowerCase().includes(normalizedQuery) ||
                event.description.toLowerCase().includes(normalizedQuery) ||
                event.speakers.some(speaker => speaker.toLowerCase().includes(normalizedQuery)));
        this.container.innerHTML = '';
        if (filteredEvents.length === 0) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'events-empty';
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = `No events found matching "${query}".`;
            emptyElement.appendChild(emptyMessage);
            this.container.appendChild(emptyElement);
            return;
        }
        const eventsGrid = document.createElement('div');
        eventsGrid.className = 'events-grid';
        filteredEvents.forEach(event => {
            var _a;
            const eventCard = this.createEventCard(event);
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(eventCard);
        });
    }
    /**
     * Creates an event card DOM element with the given properties
     *
     * @param event - The event data from the database
     * @returns The event card element to be inserted into the page
     */
    createEventCard(event) {
        // Create the main card element
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-event-id', event.event_id);
        eventCard.setAttribute('data-status', event.status);
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'event-card__image-container';
        // Create and append image
        const image = document.createElement('img');
        image.className = 'event-card__image';
        image.src = event.cover_image_url;
        image.alt = event.title;
        image.onerror = () => {
            // Handle image loading error with a fallback
            image.src = '/images/event-placeholder.jpg';
        };
        imageContainer.appendChild(image);
        // Add status badge if not 'upcoming' (which is default)
        if (event.status !== 'upcoming') {
            const statusBadge = document.createElement('div');
            statusBadge.className = `event-card__status-badge event-card__status-badge--${event.status}`;
            statusBadge.textContent = event.status.charAt(0).toUpperCase() + event.status.slice(1);
            imageContainer.appendChild(statusBadge);
        }
        // Append image container to card
        eventCard.appendChild(imageContainer);
        // Create content container
        const content = document.createElement('div');
        content.className = 'event-card__content';
        // Create and append title
        const title = document.createElement('h3');
        title.className = 'event-card__title';
        title.textContent = event.title;
        content.appendChild(title);
        // Create meta information section
        const meta = document.createElement('div');
        meta.className = 'event-card__meta';
        // Create and append date
        const date = document.createElement('p');
        date.className = 'event-card__date';
        const calendarIcon = document.createElement('i');
        calendarIcon.className = 'far fa-calendar-alt';
        date.appendChild(calendarIcon);
        // Format date and time information
        const dateTimeText = ` ${event.event_date} • ${event.start_time}${event.end_time ? ' - ' + event.end_time : ''}`;
        date.appendChild(document.createTextNode(dateTimeText));
        meta.appendChild(date);
        // Create and append platform/location
        const platform = document.createElement('p');
        platform.className = 'event-card__platform';
        const locationIcon = document.createElement('i');
        locationIcon.className = 'fas fa-map-marker-alt';
        platform.appendChild(locationIcon);
        // Display either physical location or "Online" for virtual events
        const locationText = event.location === 'virtual' ? 'Online' : event.location;
        platform.appendChild(document.createTextNode(' ' + locationText));
        meta.appendChild(platform);
        // Append meta section to content
        content.appendChild(meta);
        // Create speakers section if speakers exist
        if (event.speakers && event.speakers.length > 0) {
            const speakers = document.createElement('p');
            speakers.className = 'event-card__speakers';
            const speakersLabel = document.createElement('strong');
            speakersLabel.textContent = 'Speakers:';
            speakers.appendChild(speakersLabel);
            speakers.appendChild(document.createTextNode(' ' + event.speakers.join(', ')));
            content.appendChild(speakers);
        }
        // Create and append description
        const description = document.createElement('p');
        description.className = 'event-card__description';
        description.textContent = event.description;
        content.appendChild(description);
        // Create and append button
        const button = document.createElement('a');
        button.className = 'btn btn-outline event-card__btn';
        button.href = event.event_link || `#event-details/${event.event_id}`;
        button.textContent = 'Learn More';
        // If registration is required, update the button text
        if (event.registration_required) {
            button.textContent = 'Register Now';
            // Add "seats left" indicator for limited seating events
            if (event.max_attendees !== null) {
                const seatsIndicator = document.createElement('span');
                seatsIndicator.className = 'event-card__seats';
                seatsIndicator.textContent = ` • Limited Seats`;
                button.appendChild(seatsIndicator);
            }
        }
        content.appendChild(button);
        // Append content to card
        eventCard.appendChild(content);
        return eventCard;
    }
}
// CSS to be added to the page for loading states and event display
export const addEventStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    
    /* Loading State */
    .events-loading {
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
    .events-error {
      padding: 2rem;
      text-align: center;
      border: 1px solid #f8d7da;
      background-color: #1a1a1a;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .events-error i {
      font-size: 3rem;
      color: #dc3545;
      margin-bottom: 1rem;
    }
    
    .events-error button {
      margin-top: 1rem;
    }
    
    /* Empty State */
    .events-empty {
      padding: 3rem;
      text-align: center;
      border: 1px solid #e9ecef;
      background-color: #f8f9fa;
      border-radius: 8px;
      margin: 2rem 0;
    }
    
    .events-empty i {
      font-size: 3rem;
      color: #6c757d;
      margin-bottom: 1rem;
    }
    
    /* Status badges */
    .event-card__status-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      color: white;
    }
    
    .event-card__status-badge--ongoing {
      background-color: #28a745;
    }
    
    .event-card__status-badge--completed {
      background-color: #6c757d;
    }
    
    .event-card__status-badge--canceled {
      background-color: #dc3545;
    }
  `;
    document.head.appendChild(styleElement);
};
//# sourceMappingURL=event-card.js.map