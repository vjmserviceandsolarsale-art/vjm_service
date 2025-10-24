  // Navbar Display and Hidden on scroll and select 

let lastScrollTop = 0;
const sidebar = document.getElementById('sidebar');
const gifIcon = document.getElementById('gifIcon');

window.addEventListener('scroll', () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop + 10) {
    // Scroll down → hide sidebar, show gif
    sidebar.classList.add('collapsed');
    gifIcon.style.display = 'block';
  } else if (st < lastScrollTop - 10) {
    // Scroll up → show sidebar, hide gif
    sidebar.classList.remove('collapsed');
    gifIcon.style.display = 'none';
  }

  lastScrollTop = st <= 0 ? 0 : st;
});

//chatbot script
const openChat = document.getElementById("openChat");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

let step = 0;
let userData = { name: "", phone: "", altPhone: "", brand: "", service: "", issue: "" };

openChat.addEventListener("click", () => chatbot.style.display = "flex");
closeChat.addEventListener("click", () => chatbot.style.display = "none");

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keypress", e => { if (e.key === "Enter") handleUserInput(); });

function handleUserInput() {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  userInput.value = "";

  if (step === 0) {
    userData.name = msg;
    saveToSheet(userData);
    setTimeout(() => addBot("📞 Please share your primary phone number."), 600);
    step++;
  } else if (step === 1) {
    userData.phone = msg;
    saveToSheet(userData);
    setTimeout(() => addBot("📞 Please provide an alternate contact number."), 600);
    step++;
  } else if (step === 2) {
    userData.altPhone = msg;
    saveToSheet(userData);
    setTimeout(() => addBot("🏷️ Which brand is your appliance?"), 600);
    step++;
  } else if (step === 3) {
    userData.brand = msg;
    saveToSheet(userData);
    setTimeout(() => addBot("🛠️ What type of service do you need?"), 600);
    step++;
  } else if (step === 4) {
    userData.service = msg;
    saveToSheet(userData);
    setTimeout(() => addBot("💡 Please describe your issue briefly."), 600);
    step++;
  } else if (step === 5) {
    userData.issue = msg;
    saveToSheet(userData);
    setTimeout(() => finishChat(), 700);
    step = 0;
  }
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add(type + "-msg");
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBot(text) { addMessage(text, "bot"); }

function finishChat() {
  addBot(`✅ Thanks ${userData.name}!`);
  addBot("👩‍🔧 Service person will contact you within 24 hours.");
  addBot("📞 You'll receive a confirmation call within 2 hours.");
  addBot("💬 Live chat & message support available 9 AM - 8 PM.");

  const msg = encodeURIComponent(
    `*Customer Enquiry from Website* 👇\n\n👤 Name: ${userData.name}\n📱 Phone: ${userData.phone}\n📞 Alternate: ${userData.altPhone}\n🏷️ Brand: ${userData.brand}\n🛠️ Service: ${userData.service}\n💡 Issue: ${userData.issue}`
  );

  const whatsappURL = `https://wa.me/916380886238?text=${msg}`;
  setTimeout(() => {
    addBot(`<a href="${whatsappURL}" target="_blank" class="call-link">📲 Click here to chat on WhatsApp</a>`);
  }, 1000);
}

//if they don't click the whatapp automatic data login

// const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwbgiE1aa3Kxc_bIaPVJvMzhMoXjVWj50OZG9YZjUeYjr-T44VGZgCmkouQAfFD07KiUQ/exec"; // Replace with your new Web App URL

// function saveToSheet(data) {
//   fetch(WEB_APP_URL, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(result => console.log('Data saved:', result))
//   .catch(error => console.error('Error saving data:', error));
// }
// saveToSheet(userData);


// book an appointment 
const whatsappBtn = document.getElementById('whatsappBtn');
  const form = document.getElementById('serviceForm');

  whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const appliance = document.getElementById('appliance').value;

    if (!name || !phone || !appliance) {
      alert("Please fill all fields");
      return;
    }

    const message = `Hello! My name is ${name}. I need service for: ${appliance}. My contact number is ${phone}.`;
    const whatsappURL = `https://wa.me/916380886238?text=${encodeURIComponent(message)}`; // Replace number with your WhatsApp number

    window.open(whatsappURL, '_blank');
  });

// Gallery

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const close = document.querySelector(".close");
  const images = document.querySelectorAll(".gallery-item img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  }); 

  close.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close on click outside
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

// preloader script
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000); // stays for 25 seconds
});


function toggleDropdown(el) {
  var dropdown = el.parentElement;
  dropdown.classList.toggle('open');
}