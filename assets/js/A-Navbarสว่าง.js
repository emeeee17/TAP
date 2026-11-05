window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // ตั้งค่าระยะการเลื่อนลงมา (เช่น 300px หรือเมื่อพ้นหน้าแรก)
    if (window.scrollY > 900) { 
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});