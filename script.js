
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.about, .skill_container, .contact, .personal_info, .education').forEach(section => {
    observer.observe(section);
});

const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.querySelector('input[placeholder="Full Name"]');
        const email = document.querySelector('input[placeholder="Email"]');
        const phone = document.querySelector('input[placeholder="Phone Number"]');
        const subject = document.querySelector('input[placeholder="Subject"]');
        const message = document.querySelector('textarea[placeholder="Your Message"]');

        let isValid = true;
        let errors = [];

        if (!fullName.value.trim()) {
            errors.push('Full Name is required');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            errors.push('Valid Email is required');
            isValid = false;
        }


        if (phone.value.trim() && !/^\d{10,}$/.test(phone.value.replace(/\D/g, ''))) {
            errors.push('Valid Phone Number is required (at least 10 digits)');
            isValid = false;
        }


        if (!subject.value.trim()) {
            errors.push('Subject is required');
            isValid = false;
        }


        if (!message.value.trim()) {
            errors.push('Message is required');
            isValid = false;
        }

        if (isValid) {

            const recipient = 'aldencomida703@gmail.com';
            const emailSubject = encodeURIComponent(subject.value);
            const emailBody = encodeURIComponent(
                `Full Name: ${fullName.value}\nEmail: ${email.value}\nPhone: ${phone.value}\n\nMessage:\n${message.value}`
            );
            const mailtoURL = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

            window.location.href = mailtoURL;

            
            contactForm.reset();
        } else {
            alert('Please fix the following errors:\n' + errors.join('\n'));
        }
    });
}


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}


document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});


window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});


window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});
