document.addEventListener("DOMContentLoaded", function () {
  // Sidebar show/hide on scroll
  let lastScrollTop = 0;
  const sidebar = document.getElementById('sidebar');
  const gifIcon = document.getElementById('gifIcon');
  if(sidebar && gifIcon) {
    window.addEventListener('scroll', () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop + 10) {
        sidebar.classList.add('collapsed');
        gifIcon.style.display = 'block';
      } else if (st < lastScrollTop - 10) {
        sidebar.classList.remove('collapsed');
        gifIcon.style.display = 'none';
      }
      lastScrollTop = st <= 0 ? 0 : st;
    });
  }

  

  // Chatbot script
  const openChat = document.getElementById("openChat");
  const chatbot = document.getElementById("chatbot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");

  let step = 0;
  let userData = { name: "", phone: "", altPhone: "", brand: "", service: "", issue: "" };

  if (openChat && chatbot) openChat.addEventListener("click", () => chatbot.style.display = "flex");
  if (closeChat && chatbot) closeChat.addEventListener("click", () => chatbot.style.display = "none");
  if (sendBtn) sendBtn.addEventListener("click", handleUserInput);
  if (userInput) userInput.addEventListener("keypress", e => { if (e.key === "Enter") handleUserInput(); });

  function handleUserInput() {
    if(!userInput || !chatBody) return;
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
    if (!chatBody) return;
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

  // Book an appointment 
  const whatsappBtn = document.getElementById('whatsappBtn');
  const form = document.getElementById('serviceForm');
  if (whatsappBtn && form) {
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
      const whatsappURL = `https://wa.me/916380886238?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // Gallery (lightbox for grid gallery)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const close = document.querySelector(".close");
  const images = document.querySelectorAll(".gallery-item img");

  if (lightbox && lightboxImg) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
      });
    });
    if (close) {
      close.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  // Preloader script
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    }
  });

  // Dropdown
  window.toggleDropdown = function (el) {
    var dropdown = el.parentElement;
    dropdown.classList.toggle('open');
  }

  // Gallery Carousel and Modal
  const galleryImages = [
    "Need/gallery1.jpeg", "Need/gallery2.jpeg", "Need/gallery3.jpeg",
    "Need/gallery4.jpg", "Need/gallery5.jpg", "Need/gallery6.png", "Need/gallery7.png"
  ];
  let current = 0;

  // DOM Elements
  const mainImg = document.getElementById('mainGalleryImg');
  const leftBtn = document.querySelector('.carouselgallery-arrow.left');
  const rightBtn = document.querySelector('.carouselgallery-arrow.right');
  const indicators = document.querySelector('.carouselgallery-indicators');
  const clickToView = document.querySelector('.click-to-view');
  const modal = document.getElementById("modal-gallery");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");
  const leftModalBtn = document.querySelector(".modal-arrow-left");
  const rightModalBtn = document.querySelector(".modal-arrow-right");

  // Update carousel and indicators
  function showImage(idx) {
    current = idx;
    mainImg.src = galleryImages[current];
    mainImg.alt = `Gallery ${current+1}`;
    [...indicators.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
  }
  function renderIndicators() {
    indicators.innerHTML = '';
    galleryImages.forEach((img, i) => {
      const span = document.createElement('span');
      span.classList.toggle('active', i === current);
      span.onclick = () => showImage(i);
      indicators.appendChild(span);
    });
  }
  renderIndicators();
  showImage(current);

  // Carousel navigation
  if (leftBtn) leftBtn.addEventListener("click", e => {
    if (current > 0) showImage(current-1);
  });
  if (rightBtn) rightBtn.addEventListener("click", e => {
    if (current < galleryImages.length-1) showImage(current+1);
  });

  // "Click to View" overlay and image click
  function openModal() {
    modalImg.src = galleryImages[current];
    modal.classList.add("show");
  }
  if (mainImg) mainImg.addEventListener("click", openModal);
  if (clickToView) clickToView.addEventListener("click", openModal);

  // Modal navigation
  if (closeModal) closeModal.addEventListener("click", () => modal.classList.remove("show"));
  if (leftModalBtn) leftModalBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (current > 0) {
      current--;
      modalImg.src = galleryImages[current];
      showImage(current);
    }
  });
  if (rightModalBtn) rightModalBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (current < galleryImages.length-1) {
      current++;
      modalImg.src = galleryImages[current];
      showImage(current);
    }
  });
  // Close modal on outside click
  if (modal) modal.addEventListener("click", function(e){
    if(e.target === modal) modal.classList.remove("show");
  });
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("show")) return;
    if (e.key === "ArrowRight" && current < galleryImages.length-1) rightModalBtn && rightModalBtn.click();
    if (e.key === "ArrowLeft" && current > 0) leftModalBtn && leftModalBtn.click();
    if (e.key === "Escape") modal.classList.remove("show");
  });
});