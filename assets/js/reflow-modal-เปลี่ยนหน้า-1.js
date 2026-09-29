document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ดักจับการกด Dropdown Item เพื่อสลับหน้าและ Icon
    // ==========================================
    document.addEventListener('click', function (e) {
        const menuItem = e.target.closest('[data-target-page]');
        if (!menuItem) return;

        e.preventDefault();

        const targetPage = menuItem.getAttribute('data-target-page')?.trim();
        const targetProductId = menuItem.getAttribute('data-show-product')?.trim();

        // บังคับค้นหาเฉพาะภายใน .card ของตัวเองก่อนเสมอ
        const card = menuItem.closest('.card') || menuItem.closest('.modal') || document;

        // ------------------------------------------
        // A. สลับ Icon / Paragraph เฉพาะภายใน Card ตัวเอง
        // ------------------------------------------
        if (targetProductId) {
            // ซ่อน Icon ทั้งหมดแค่ใน Card นี้
            const allIcons = card.querySelectorAll('[data-icon-for]');
            allIcons.forEach(icon => icon.classList.add('d-none'));

            // แสดงเฉพาะ Icon ที่ตรงรหัสสินค้า ใน Card นี้
            const targetIcons = card.querySelectorAll(`[data-icon-for="${targetProductId}" i]`);
            targetIcons.forEach(icon => icon.classList.remove('d-none'));
        }

        // ------------------------------------------
        // B. สั่งเปลี่ยนหน้า Product List + สั่ง Pulse กระพริบ
        // ------------------------------------------
        if (targetPage) {
            const productList = card.querySelector('[data-reflow-type="product-list"]');

            if (productList) {
                const allClickables = productList.querySelectorAll('a, button, [class*="ref-page"], [class*="pagination"] *');
                allClickables.forEach(el => {
                    if (el.children.length === 0 && el.textContent.trim() === targetPage) {
                        el.click();
                    }
                });

                // 🟢 สั่งเล่น Effect Pulse กระพริบตรงโซนราคาและปุ่ม Add to Cart
                productList.classList.remove('pulse-effect');
                void productList.offsetWidth; // Force Reflow เพื่อ Reset Animation ให้เล่นใหม่ได้แม้กดซ้ำ
                productList.classList.add('pulse-effect');

                setTimeout(() => {
                    productList.classList.remove('pulse-effect');
                }, 400);
            }
        }
    });

    // ==========================================
    // 2. บังคับ Reset หน้า 2 (3.5L) ให้ทุก Card แยกกันเมื่อเปิด Modal
    // ==========================================
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function () {
            const reflowObj = window.reflow || window.Reflow;
            if (reflowObj && typeof reflowObj.start === 'function') {
                reflowObj.start();
            }

            setTimeout(() => {
                const cardsInModal = modal.querySelectorAll('.card');
                
                if (cardsInModal.length > 0) {
                    cardsInModal.forEach(card => {
                        const targetDefaultItem = card.querySelector('[data-target-page="2"]') 
                                               || card.querySelector('[data-target-page]');
                        if (targetDefaultItem) {
                            targetDefaultItem.click();
                        }
                    });
                } else {
                    const fallbackItem = modal.querySelector('[data-target-page="2"]') 
                                       || modal.querySelector('[data-target-page]');
                    if (fallbackItem) fallbackItem.click();
                }
            }, 300);
        });
    });

});