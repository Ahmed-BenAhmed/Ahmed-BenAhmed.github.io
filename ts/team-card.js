/**
 * Renders team member cards dynamically
 * @param {Array} teamMembers - Array of team member objects
 */
function renderTeamCards(teamMembers) {
    const teamContainer = document.getElementById('team-container');
    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }
    // Clear existing content
    teamContainer.innerHTML = '';
    // Create cards for each team member
    teamMembers.forEach(member => {
        var _a, _b, _c, _d;
        // Create card wrapper
        const card = document.createElement('div');
        card.className = 'team-card' + (member.isPresident ? ' team-card--president' : '');
        // Create image section
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'team-card__image-wrapper';
        const image = document.createElement('img');
        image.className = 'team-card__image';
        image.src = member.imageSrc || '/public/images/team/default-avatar.png';
        image.alt = member.name || 'Team Member';
        imageWrapper.appendChild(image);
        card.appendChild(imageWrapper);
        // Create name section
        const name = document.createElement('h3');
        name.className = 'team-card__name';
        name.textContent = member.name || '';
        card.appendChild(name);
        // Create role section
        const role = document.createElement('p');
        role.className = 'team-card__role';
        role.textContent = member.role || '';
        card.appendChild(role);
        // Create secondary role section if provided
        if (member.secondaryRole) {
            const secondaryRole = document.createElement('p');
            secondaryRole.className = 'team-card__secondary-role';
            secondaryRole.textContent = member.secondaryRole || '';
            card.appendChild(secondaryRole);
        }
        // Create bio section
        const bio = document.createElement('p');
        bio.className = 'team-card__bio';
        bio.textContent = member.bio || '';
        card.appendChild(bio);
        // Create social links section
        const socialSection = document.createElement('div');
        socialSection.className = 'team-card__social';
        // Add LinkedIn link if provided
        if ((_a = member.socialMedia) === null || _a === void 0 ? void 0 : _a.linkedin) {
            const linkedinLink = createSocialLink('linkedin', member.socialMedia.linkedin);
            socialSection.appendChild(linkedinLink);
        }
        // Add Instagram link if provided
        if ((_b = member.socialMedia) === null || _b === void 0 ? void 0 : _b.instagram) {
            const instagramLink = createSocialLink('instagram', member.socialMedia.instagram);
            socialSection.appendChild(instagramLink);
        }
        // Add Twitter link if provided
        if ((_c = member.socialMedia) === null || _c === void 0 ? void 0 : _c.twitter) {
            const twitterLink = createSocialLink('twitter', member.socialMedia.twitter);
            socialSection.appendChild(twitterLink);
        }
        // Add Github link if provided
        if ((_d = member.socialMedia) === null || _d === void 0 ? void 0 : _d.github) {
            const twitterLink = createSocialLink('github', member.socialMedia.github);
            socialSection.appendChild(twitterLink);
        }
        card.appendChild(socialSection);
        // Add complete card to container
        teamContainer.appendChild(card);
    });
}
/**
 * Creates a social media link element
 * @param {string} platform - Social media platform name
 * @param {string} url - Profile URL
 * @returns {HTMLElement} - Social link element
 */
function createSocialLink(platform, url) {
    const link = document.createElement('a');
    link.className = `team-card__social-link team-card__social-link--${platform}`;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile`);
    const icon = document.createElement('i');
    icon.className = `icon-${platform}`;
    link.appendChild(icon);
    return link;
}
// Example data structure for team members
/**
 * Array of CEC Club team members
 */
const teamMembers = [
    // President (larger card)
    {
        name: "Ahmed Ben Ahmed",
        role: "Président",
        bio: "Computer Engineering student leading our club's vision and operations.",
        imageSrc: "/public/images/team/ahmed.png",
        isPresident: true,
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/ahmed-ben-ahmed/",
            github: "https://github.com/ahmed-benahmed"
        }
    },
    // Vice President
    {
        name: "Zouhair Serrar",
        role: "Vice Président",
        bio: "Supporting club leadership and overseeing project execution.",
        imageSrc: "/public/images/team/zouhir.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/zouhair-serrar"
        }
    },
    // General Secretary
    {
        name: "Chaimaa Dhah",
        role: "Secrétaire Générale",
        bio: "Managing club communications and administrative tasks.",
        imageSrc: "/public/images/team/chaimaa.png",
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/chaimaa-dhah-671324224"
        }
    },
    // Treasurer
    {
        name: "Aya Farmati",
        role: "Trésorière",
        bio: "Handling club finances and budget planning.",
        imageSrc: "/public/images/team/aya.png",
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/aya-farmati-bb1705226"
        }
    },
    // Manager
    {
        name: "Sabti Riad",
        role: "Manager",
        bio: "Coordinating club activities and operations.",
        imageSrc: "/public/images/team/sabti.png",
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/riad-sabti-459186306"
        }
    },
    // Protocol Chief
    {
        name: "Wissal Cheikh",
        role: "Chef de Protocole",
        bio: "Overseeing event organization and official procedures.",
        imageSrc: "/public/images/team/wissal.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/wissal-cheikh"
        }
    },
    // Assistant Protocol Chief
    {
        name: "Asmaa Talal",
        role: "Chef de Protocole Adjointe",
        bio: "Assisting in event planning and protocol management.",
        imageSrc: "/public/images/team/asmaa.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/asmaa-talal"
        }
    },
    // Event Coordinator
    {
        name: "Ait Elhaj Ghizlane",
        role: "Responsable Événementielle",
        bio: "Planning and executing club events and activities.",
        imageSrc: "/public/images/team/aitlhaj.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/ait-elhaj-ghizlane"
        }
    },
    // Training Manager
    {
        name: "Eljazouly Fatima Zahra",
        role: "Responsable de Formation",
        bio: "Developing and coordinating training programs.",
        imageSrc: "/public/images/team/eljazouly.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/eljazouly-fatima-zahra"
        }
    },
    // Assistant Training Manager
    {
        name: "Hamza Mousrij",
        role: "Responsable de Formation Adjoint",
        bio: "Assisting with workshop planning and educational initiatives.",
        imageSrc: "/public/images/team/hamz.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/hamza-mousrij"
        }
    },
    // Multimedia Manager
    {
        name: "Soufiane Hamouche",
        role: "Responsable Multimédia",
        bio: "Creating and managing club's digital content.",
        imageSrc: "/public/images/team/soufian.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/soufiane-hamouche"
        }
    },
    // Design Manager
    {
        name: "Achraf Abdelfadel",
        role: "Responsable Design",
        bio: "Leading the visual identity and design projects.",
        imageSrc: "/public/images/team/achraf.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/achraf-abdelfadel"
        }
    },
    // Social Media Manager
    {
        name: "Sara Mesnaoui",
        role: "Photographer et Réseaux Sociaux",
        bio: "Managing the club's social media presence and photography.",
        imageSrc: "/public/images/team/sara.png",
        socialMedia: {
            linkedin: "https://linkedin.com/in/sara-mesnaoui",
        }
    },
    // Shadow Member
    {
        name: "Elwalid Aboulaakoul",
        role: "Shadow Member",
        secondaryRole: "void* sometimesOnline(); ps in, debugs, vanishes",
        bio: "Assisting the team in the development parts.",
        imageSrc: "/public/images/team/elwalid.jpg",
        socialMedia: {
            github: "https://github.com/aboulaakoul-Elwalid",
            linkedin: "https://www.linkedin.com/in/aboulaakoul",
        }
    }
];
export function renderCards() {
    renderTeamCards(teamMembers);
}
//# sourceMappingURL=team-card.js.map