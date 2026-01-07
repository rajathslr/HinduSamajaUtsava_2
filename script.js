// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Generate QR Code
    generateQRCode();

    // Add smooth scroll behavior
    initSmoothScroll();

    // Add intersection observer for animations
    initScrollAnimations();
});

/**
 * Generate QR Code for the website
 */
function generateQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');

    if (qrcodeContainer) {
        // Get the current page URL
        const currentURL = window.location.href;

        // Generate QR code
        new QRCode(qrcodeContainer, {
            text: currentURL,
            width: 200,
            height: 200,
            colorDark: "#C41E3A",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.detail-card, .speaker-card, .program-item, .divine-card');

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Add parallax effect to hero section (optional enhancement)
 */
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

/**
 * Add hover sound effect (optional - can be enabled if audio files are added)
 */
function addHoverSounds() {
    const cards = document.querySelectorAll('.detail-card, .speaker-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Placeholder for sound effect
            // const audio = new Audio('hover-sound.mp3');
            // audio.play();
        });
    });
}

/**
 * Print functionality for event details
 */
function printEventDetails() {
    window.print();
}

// Add print button functionality if needed
const printButton = document.querySelector('.print-button');
if (printButton) {
    printButton.addEventListener('click', printEventDetails);
}

/**
 * Add event to calendar - Creates .ics file compatible with iOS, Android, and desktop
 */
function addToCalendar() {
    // Event details
    const eventTitle = 'Hindu Samajotsava 2026';
    const eventLocation = 'Basaveshwara Temple, Varahasandra, Sompura';
    const eventDescription = 'Hindu Samajotsava is a festival that celebrates our culture, strength and unity. ' +
        'A platform to remember our roots and build the future of a strong India. ' +
        'Join us for this special occasion that is the confluence of heritage and progress.\\n\\n' +
        'Website: ' + window.location.href + '\\n' +
        'Venue: Basaveshwara Temple, Varahasandra, Sompura\\n' +
        'Google Maps: https://maps.app.goo.gl/n3WwfxZ6XZeQukhr8';

    // Event date and time: January 18, 2026, 10:30 AM
    const eventStartDate = new Date('2026-01-18T10:30:00');
    // Assuming event duration of 4 hours
    const eventEndDate = new Date('2026-01-18T14:30:00');

    // Format dates for .ics file (YYYYMMDDTHHmmss)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };

    const startDateTime = formatDate(eventStartDate);
    const endDateTime = formatDate(eventEndDate);
    const currentDateTime = formatDate(new Date());

    // Create .ics file content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Hindu Samajotsava//Event//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${startDateTime}`,
        `DTEND:${endDateTime}`,
        `DTSTAMP:${currentDateTime}`,
        `UID:hindu-samajotsava-2026@varahasandra`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}`,
        `LOCATION:${eventLocation}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Hindu Samajotsava tomorrow',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Hindu_Samajotsava_2026.ics';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show confirmation message
    alert('Calendar event downloaded! Please open the file to add it to your calendar.');
}

