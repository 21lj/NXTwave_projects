const roles = ["Student","Backend Developer", "Freelancer"];
let index = 0;
let currentRole = '';
let letterIndex = 0;

function type() {
  if (letterIndex < roles[index].length) {
    currentRole += roles[index].charAt(letterIndex);
    document.getElementById('role').innerText = currentRole;
    letterIndex++;
    setTimeout(type, 150); 
  } else {
    setTimeout(deleteText, 2000); 
  }
}

function deleteText() {
  if (letterIndex > 0) {
    currentRole = currentRole.slice(0, -1);
    document.getElementById('role').innerText = currentRole;
    letterIndex--;
    setTimeout(deleteText, 100); 
  } else {
    index = (index + 1) % roles.length; 
    setTimeout(type, 500); 
  }
}

type();
