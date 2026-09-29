// ดักจับการคลิกรูปภาพหรือลิงก์ภายใน Collapse เพื่อสั่งหดพับกลับทันที
document.addEventListener('click', function (e) {
    const clickedInsideCollapse = e.target.closest('.collapse img, .collapse a');
    if (!clickedInsideCollapse) return;

    const collapseContainer = clickedInsideCollapse.closest('.collapse');
    if (collapseContainer && collapseContainer.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapseContainer) 
                        || new bootstrap.Collapse(collapseContainer);
        bsCollapse.hide();
    }
});