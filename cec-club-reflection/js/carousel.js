document.addEventListener("DOMContentLoaded", () => {
    // Fetch milestones data from external JSON file
    fetch('./instagram_posts_data.json')
        .then(response => response.json())
        .then(milestonesData => {
            const milestonesTrack = document.getElementById("milestones-track");
            const prevButton = document.querySelector(".carousel-button--prev");
            const nextButton = document.querySelector(".carousel-button--next");
            let currentIndex = 0;

            function createMilestoneCard(milestone) {
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");

                // Use milestone.image.src for image, fallback to empty string if not present
                const img = document.createElement("img");
                img.src = milestone.image && milestone.image.src ? milestone.image.src : "";
                img.alt = (milestone.image && milestone.image.alt) ? milestone.image.alt : "";
                carouselItem.appendChild(img);

                // Use milestone.content.caption for caption, fallback to empty string
                const caption = document.createElement("p");
                caption.classList.add("carousel-item__caption");
                caption.textContent = (milestone.content && milestone.content.caption) ? milestone.content.caption : "";
                carouselItem.appendChild(caption);

                // Use milestone.metadata.timestamp for timestamp, if present
                if (milestone.metadata && milestone.metadata.timestamp) {
                    const timestamp = document.createElement("p");
                    timestamp.classList.add("carousel-item__timestamp");
                    timestamp.textContent = milestone.metadata.timestamp;
                    carouselItem.appendChild(timestamp);
                }

                return carouselItem;
            }

            function renderMilestones() {
                milestonesTrack.innerHTML = "";
                milestonesData.forEach(milestone => {
                    milestonesTrack.appendChild(createMilestoneCard(milestone));
                });
                updateCarousel();
            }

            function updateCarousel() {
                if (milestonesTrack.children.length === 0) return;
                const itemWidth = milestonesTrack.children[0].offsetWidth;
                milestonesTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
            }

            prevButton.addEventListener("click", () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : milestonesData.length - 1;
                updateCarousel();
            });

            nextButton.addEventListener("click", () => {
                currentIndex = (currentIndex < milestonesData.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });

            // Initial render
            renderMilestones();

            // Update carousel on window resize
            window.addEventListener("resize", updateCarousel);
        })
        .catch(error => {
            console.error("Failed to load milestones data:", error);
        });
});


