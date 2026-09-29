// --- Part A: ระบบปุ่ม X ปิด/ย้อนกลับหน้าเดิม (รองรับหลายปุ่มด้วย Class) ---
const closeButtons = document.querySelectorAll('.btn-close-pop');

closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // ตรวจสอบว่ามียอด History ย้อนกลับได้หรือไม่
        if (window.history.length > 1 && document.referrer.includes(window.location.hostname)) {
            window.history.back(); // ย้อนกลับหน้าเดิมทันที + จำตำแหน่ง Scroll
        } else {
            window.location.href = 'index.html#catagory'; // Fallback เมื่อเปิดลิงก์ตรง
        }
    });
});