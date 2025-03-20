// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            bar.style.width = bar.getAttribute('style').split(':')[1];
        }
    });
};

window.addEventListener('scroll', animateSkillBars);

// Form submission handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('header .container').appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        nav ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        nav ul.show {
            display: flex;
            flex-direction: column;
        }
        
        nav ul li {
            margin: 0.5rem 0;
        }
    }
`;

document.head.appendChild(style);

// Theme functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleIcon = themeToggle.querySelector('i');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('themeColor');
    
    // Apply saved theme if it exists
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
        darkModeToggle.checked = true;
    }
    
    // Apply saved color if it exists
    if (savedColor) {
        setThemeColor(savedColor);
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active');
            }
        });
    }
    
    // Theme toggle button click event
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            darkModeToggle.checked = false;
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Dark mode checkbox toggle
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Theme panel toggle
    const themePanel = document.getElementById('themePanel');
    const themePanelToggle = document.getElementById('themePanelToggle');
    
    themePanelToggle.addEventListener('click', () => {
        themePanel.classList.toggle('open');
    });
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            option.classList.add('active');
            
            // Set theme color
            setThemeColor(color);
            
            // Save color preference
            localStorage.setItem('themeColor', color);
        });
    });
    
    // Function to set theme color
    function setThemeColor(color) {
        let primaryColor;
        let primaryDark;
        
        switch (color) {
            case 'blue':
                primaryColor = '#007bff';
                primaryDark = '#0056b3';
                break;
            case 'green':
                primaryColor = '#28a745';
                primaryDark = '#1e7e34';
                break;
            case 'purple':
                primaryColor = '#6f42c1';
                primaryDark = '#5a32a3';
                break;
            case 'orange':
                primaryColor = '#fd7e14';
                primaryDark = '#d26608';
                break;
            case 'pink':
                primaryColor = '#e83e8c';
                primaryDark = '#c21f6a';
                break;
            default:
                primaryColor = '#007bff';
                primaryDark = '#0056b3';
        }
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-dark', primaryDark);
    }
}); 