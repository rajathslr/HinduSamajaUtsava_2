// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Generate QR Code
    generateQRCode();

    // Add smooth scroll behavior
    initSmoothScroll();

    // Add intersection observer for animations
    initScrollAnimations();

    // Initialize language
    initLanguage();

    // Initialize Visitor Count
    initVisitorCount();
});

/**
 * Generate QR Code for the website
 */
function generateQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');

    if (qrcodeContainer) {
        // Use the specific GitHub Pages URL as requested
        const targetURL = 'https://rajathslr.github.io/HinduSamajaUtsava_2/';

        // Generate QR code
        new QRCode(qrcodeContainer, {
            text: targetURL,
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
 * Add event to calendar - Handles Android and iOS specifically
 */
function addToCalendar() {
    // Event details
    const eventTitle = translations[currentLang].mainTitle; // Use translated title
    const eventLocation = 'Basaveshwara Temple, Varahasandra, Sompura';
    const eventDescription = (currentLang === 'en' ?
        'Hindu Samajotsava is a festival that celebrates our culture, strength and unity. Join us for this grand celebration.\n\n' :
        'ಹಿಂದೂ ಸಮಾಜೋತ್ಸವವು ನಮ್ಮ ಸಂಸ್ಕೃತಿ, ಶಕ್ತಿ ಮತ್ತು ಒಗ್ಗಟ್ಟನ್ನು ಆಚರಿಸುವ ಹಬ್ಬವಾಗಿದೆ. ನಮ್ಮ ಬೇರುಗಳನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಬಲಿಷ್ಠ ಭಾರತದ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸಲು ಒಂದು ವೇದಿಕೆಯಾಗಿದೆ.\n\n') +
        'Website: ' + window.location.href + '\n' +
        'Venue: Basaveshwara Temple, Varahasandra, Sompura\n' +
        'Google Maps: https://maps.app.goo.gl/n3WwfxZ6XZeQukhr8';

    // Event Date: Jan 18, 2026, 10:30 AM IST to 2:30 PM IST
    // IST is GMT+5:30
    // 10:30 AM IST = 05:00 AM GMT
    // 02:30 PM IST = 09:00 AM GMT
    const startDate = '20260118T050000Z';
    const endDate = '20260118T090000Z';

    // Detect User Agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    if (isAndroid) {
        // Android - Open Google Calendar via Web Link (Intent)
        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
        window.open(gCalUrl, '_blank');
    } else {
        // iOS and Desktop - Standard .ICS File
        // Format dates for .ics file (Same format YYYYMMDDTHHmmssZ)
        const now = new Date();
        const stampDate = now.toISOString().replace(/[-:.]/g, '').split('.')[0] + 'Z';

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Hindu Samajotsava//Event//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTART:${startDate}`, // UTC Time
            `DTEND:${endDate}`,     // UTC Time
            `DTSTAMP:${stampDate}`,
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

        // Create blob and open
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

        if (isIOS) {
            // For iOS, using FileReader to open as data URI sometimes works better for direct opening
            const reader = new FileReader();
            reader.onload = function (e) {
                window.location.href = e.target.result;
                // Fallback alert if it doesn't open automatically
                setTimeout(() => {
                    alert("Tap 'Add to Calendar' if prompted, or check your downloads.");
                }, 1000);
            }
            reader.readAsDataURL(blob);
        } else {
            // Desktop standard download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Hindu_Samajotsava_2026.ics';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('Calendar event downloaded! Please open the file to add it to your calendar.');
        }
    }
}

/**
 * Language Translation Logic
 */
const translations = {
    en: {
        mainTitle: "Hindu Samajotsava",
        organizingCommittee: "Hindu Samajotsava Organizing Committee",
        location: "Channasandra, Bengaluru",
        tagline1: "For building a strong Bharat &",
        tagline2: "For the betterment of Hindu Society",
        introText: "Hindu Samajotsava is a festival that celebrates our culture, strength and unity. It is a platform to remember our roots and build the future of a strong India. A festival that proclaims the unity of Hindu society with the enthusiasm of youth power. A special occasion that is the confluence of heritage and progress. Let us participate with our family and friends in this festival that aims to bring about transformation in Hindu society through social harmony, family education, environmental protection, indigenous lifestyle and civic etiquette.",
        dateLabel: "Date",
        eventDate: "18-01-2026",
        eventDay: "Sunday",
        timeLabel: "Time",
        eventTime: "10:30 AM",
        eventOnwards: "Onwards",
        venueLabel: "Venue",
        venueName: "Basaveshwara Temple",
        venueAddress: "Varahasandra, Sompura",
        mapHint: "📱 Click for directions",
        addToCalendar: "Add to Calendar",
        divinePresenceTitle: "Divine Presence",
        swamijiName: "Shri Ni Pra Swa Mallikarjuna Devaru",
        swamijiLocation: "Sarpathooshana Matt, Chikkapete, Bengaluru",
        guidingSpeechTitle: "Guiding Speech",
        speaker1Name: "Shri Karunakara Rai",
        speaker1Title: "Professor, NMIT, Bengaluru",
        speaker2Name: "Smt. Veena P.",
        speaker2Title: "Mahila Swa SahayaSangha, President",
        programDetailsTitle: "Program Details",
        program1: "A grand procession",
        program2: "Gopuja",
        program3: "Lighting the lamp & Bharath Mata Puja",
        program4: "Blessings from Swamiji",
        program5: "Addresses by honorable guests",
        program6: "Cultural Program",
        program7: "Singing of Vande Mataram by all",
        program8: "Prasada Distribution",
        noteTitle: "Note:",
        noteText: "There will also be stalls selling Swadeshi products at the venue. Everyone is kindly requested to make use of this opportunity",
        ctaTitle: "Let thousands gather and take part",
        ctaSubtitle: "Be a part of this grand celebration of our culture and heritage",
        footerTagline: "For building a strong Bharat & For the betterment of Hindu Society",
        qrScan: "Scan to visit our website",
        qrScanKn: "ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        visitorCount: "Page Hits"
    },
    kn: {
        mainTitle: "ಹಿಂದೂ ಸಮಾಜೋತ್ಸವ",
        organizingCommittee: "ಹಿಂದೂ ಸಮಾಜೋತ್ಸವ ಆಯೋಜನಾ ಸಮಿತಿ",
        location: "ಚನ್ನಸಂದ್ರ, ಬೆಂಗಳೂರು",
        tagline1: "ಸಮರ್ಥ ಭಾರತದ ನಿರ್ಮಾಣಕ್ಕಾಗಿ &",
        tagline2: "ಹಿಂದೂ ಸಮಾಜದ ಉನ್ನತಿಗಾಗಿ",
        introText: "ಹಿಂದೂ ಸಮಾಜೋತ್ಸವವು ನಮ್ಮ ಸಂಸ್ಕೃತಿ, ಶಕ್ತಿ ಮತ್ತು ಒಗ್ಗಟ್ಟನ್ನು ಆಚರಿಸುವ ಹಬ್ಬವಾಗಿದೆ. ಇದು ನಮ್ಮ ಬೇರುಗಳನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಬಲಿಷ್ಠ ಭಾರತದ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸಲು ಒಂದು ವೇದಿಕೆಯಾಗಿದೆ. ಯುವಶಕ್ತಿಯ ಉತ್ಸಾಹದೊಂದಿಗೆ ಹಿಂದೂ ಸಮಾಜದ ಏಕತೆಯನ್ನು ಸಾರುವ ಹಬ್ಬ. ಪರಂಪರೆ ಮತ್ತು ಪ್ರಗತಿಯ ಸಂಗಮವಾಗಿರುವ ವಿಶೇಷ ಸಂದರ್ಭ. ಸಾಮಾಜಿಕ ಸಾಮರಸ್ಯ, ಕುಟುಂಬ ಪ್ರಬೋದನೆ, ಪರಿಸರ ಸಂರಕ್ಷಣೆ, ಸ್ವದೇಶಿ ಜೀವನಶೈಲಿ ಮತ್ತು ನಾಗರಿಕ ಶಿಷ್ಟಾಚಾರಗಳ ಮೂಲಕ ಹಿಂದೂ ಸಮಾಜದಲ್ಲಿ ಪರಿವರ್ತನೆ ತರುವ ಗುರಿಯನ್ನು ಹೊಂದಿರುವ ಈ ಉತ್ಸವದಲ್ಲಿ ನಮ್ಮ ಕುಟುಂಬ ಮತ್ತು ಸ್ನೇಹಿತರೊಂದಿಗೆ ಭಾಗವಹಿಸೋಣ.",
        dateLabel: "ದಿನಾಂಕ",
        eventDate: "18-01-2026",
        eventDay: "ಭಾನುವಾರ",
        timeLabel: "ಸಮಯ",
        eventTime: "ಬೆಳಿಗ್ಗೆ 10:30",
        eventOnwards: "ರಿಂದ",
        venueLabel: "ಸ್ಥಳ",
        venueName: "ಬಸವೇಶ್ವರ ದೇವಸ್ಥಾನ",
        venueAddress: "ವರಹಾಸಂದ್ರ, ಸೋಂಪುರ",
        mapHint: "📱 ದಾರಿಗಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
        addToCalendar: "ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
        divinePresenceTitle: "ದಿವ್ಯ ಸಾನ್ನಿಧ್ಯ",
        swamijiName: "ಶ್ರೀ ನಿ ಪ್ರ ಸ್ವ ಮಲ್ಲಿಕಾರ್ಜುನ ಪಂಡಿತಾರಾಧ್ಯ ಶಿವಾಚಾರ್ಯ ಸ್ವಾಮೀಜಿ",
        swamijiLocation: "ಸರ್ಪಭೂಷಣ ಮಠ, ಚಿಕ್ಕಪೇಟೆ, ಬೆಂಗಳೂರು",
        guidingSpeechTitle: "ಮಾತೃಭಾಷಣ",
        speaker1Name: "ಶ್ರೀ ಕರುಣಾಕರ ರೈ",
        speaker1Title: "ಪ್ರಾಧ್ಯಾಪಕರು, NMIT, ಬೆಂಗಳೂರು",
        speaker2Name: "ಶ್ರೀಮತಿ ವೀಣಾ ಪಿ.",
        speaker2Title: "ಅಧ್ಯಕ್ಷರು, ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘ",
        programDetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು",
        program1: "ಭವ್ಯ ಶೋಭಾಯಾತ್ರೆ",
        program2: "ಗೋ ಪೂಜೆ",
        program3: "ದೀಪ ಪ್ರಜ್ವಲನೆ & ಭಾರತ ಮಾತೆ ಪೂಜೆ",
        program4: "ಪೂಜ್ಯ ಸ್ವಾಮೀಜಿ ಅವರಿಂದ ಆಶೀರ್ವಚನ",
        program5: "ಗಣ್ಯರಿಂದ ನುಡಿ ನಮನ",
        program6: "ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮ",
        program7: "ವಂದೇ ಮಾತರಂ ಗಾಯನ",
        program8: "ಪ್ರಸಾದ ವಿತರಣೆ",
        noteTitle: "ಸೂಚನೆ:",
        noteText: "ಸ್ಥಳದಲ್ಲಿ ಸ್ವದೇಶಿ ವಸ್ತುಗಳ ಮಾರಾಟ ಮಳಿಗೆಗಳು ಇರುತ್ತವೆ. ಎಲ್ಲರೂ ಇದರ ಸದುಪಯೋಗ ಪಡೆದುಕೊಳ್ಳಬೇಕಾಗಿ ವಿನಂತಿ.",
        ctaTitle: "ಸಾವಿರಾರು ಸಂಖ್ಯೆಯಲ್ಲಿ ಸೇರೋಣ",
        ctaSubtitle: "ನಮ್ಮ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆಯ ಈ ಭವ್ಯ ಆಚರಣೆಯ ಭಾಗವಾಗಿರಿ",
        footerTagline: "ಸಮರ್ಥ ಭಾರತದ ನಿರ್ಮಾಣಕ್ಕಾಗಿ & ಹಿಂದೂ ಸಮಾಜದ ಉನ್ನತಿಗಾಗಿ",
        qrScan: "ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        qrScanKn: "ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        visitorCount: "ಪುಟ ವೀಕ್ಷಣೆಗಳು"
    }
};

let currentLang = 'en';

function initLanguage() {
    // Check if user has a preferred language
    const savedLang = localStorage.getItem('hinduSamajLang');
    if (savedLang) {
        setLanguage(savedLang);
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'kn' : 'en';
    setLanguage(newLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('hinduSamajLang', lang);

    // Update toggle button text
    const btnText = document.getElementById('lang-btn-text');
    if (btnText) {
        btnText.textContent = lang === 'en' ? 'ಕನ್ನಡ' : 'English';
    }

    // Update fonts based on language
    if (lang === 'kn') {
        document.body.classList.add('lang-kn');
    } else {
        document.body.classList.remove('lang-kn');
    }

    // Translate all elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Toggle QR code text visibility (special case due to separate elements)
    const qrEn = document.querySelector('.qr-title');
    const qrKn = document.querySelector('.qr-title-kannada');

    if (qrEn && qrKn) {
        if (lang === 'en') {
            qrEn.style.display = 'block';
            qrKn.style.display = 'none';
        } else {
            qrEn.style.display = 'none';
            qrKn.style.display = 'block';
        }
    }
}

/**
 * Initialize Visitor Count
 */
function initVisitorCount() {
    const counterElement = document.getElementById('visit-count');
    if (!counterElement) return;

    // Use the unique namespace defined for this project
    // API: CounterAPI.dev
    const namespace = 'hindu-samajotsava-2026';
    const key = 'homepage';

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then(res => res.json())
        .then(data => {
            if (data && data.count) {
                counterElement.innerText = data.count;
            }
        })
        .catch(err => {
            console.error('Counter Error:', err);
            // Fallback or leave as "..."
            // console.log("Failed to fetch count");
        });
}
