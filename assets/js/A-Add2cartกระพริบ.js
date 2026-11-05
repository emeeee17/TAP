document.addEventListener('DOMContentLoaded', function() {
    // 1. ดึงปุ่มในเมนู Dropdown ทั้งหมดที่มี data-show-product
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-show-product]');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 2. ดึงค่ารหัสสินค้า เช่น "mc-1l" จากปุ่มที่ถูกคลิก
            const productId = this.getAttribute('data-show-product');

            // 3. ค้นหาตัว Product div ที่มี data-icon-for ตรงกับรหัสที่คลิก
            const productElement = document.querySelector(`div[data-icon-for="${productId}"]`);

            if (productElement) {
                // ลบคลาสเก่าออกก่อน (เผื่อผู้ใช้กดซ้ำๆ)
                productElement.classList.remove('blink-effect');
                
                // บังคับให้เบราว์เซอร์รีเซ็ตจังหวะ Animation
                void productElement.offsetWidth;
                
                // เพิ่มคลาสเพื่อให้เกิดการกระพริบ
                productElement.classList.add('blink-effect');
                
                // ลบคลาสออกเมื่อจบการกระพริบ (0.8 วินาทีตาม CSS) เพื่อให้กดใหม่ได้อีก
                setTimeout(() => {
                    productElement.classList.remove('blink-effect');
                }, 800); 
            }
        });
    });
});