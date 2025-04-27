const roles = ["Football Legend", "Tech Enthusiast", "Backend Developer", "Sports Analyst"];
let index = 0;
let currentRole = '';
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const roleElement = document.getElementById('role');
    
    if (isDeleting) {
        currentRole = currentRole.slice(0, -1);
        roleElement.textContent = currentRole;
        letterIndex--;
        
        if (currentRole === '') {
            isDeleting = false;
            index = (index + 1) % roles.length;
            typingSpeed = 150; 
            setTimeout(type, 500); 
        } else {
            setTimeout(type, typingSpeed / 2);
        }
    } else {
        currentRole = roles[index].slice(0, letterIndex + 1);
        roleElement.textContent = currentRole;
        letterIndex++;
        
        if (currentRole === roles[index]) {
            isDeleting = true;
            typingSpeed = 1000; 
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            alert(`Thank you, ${name} for your message! you just saw my project.`);
            this.reset();
        });
    }
});

