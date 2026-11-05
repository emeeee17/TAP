document.querySelectorAll('.auto-resize').forEach(textarea => {
    const resize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', resize);

    // รองรับข้อความที่มีอยู่แล้วตอนเปิดหน้า
    resize();
});