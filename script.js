
// --- การตั้งค่า (Configuration) ---
const CORRECT_PASSWORD = "08062025"; // รหัสผ่าน
const START_DATE = "2025-05-29";   // วันเริ่มคบ (ปี-เดือน-วัน)

// --- ฟังก์ชันจัดการหน้าเว็บ ---
function goToPage(pageId) {
    // 1. ซ่อนทุกหน้าที่มี class="page"
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        // รอ Animation จบนิดนึงค่อยซ่อน (optional)
        page.style.display = 'none'; 
    });

    // 2. แสดงหน้าที่ต้องการ
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        // ใช้ setTimeout เล็กน้อยเพื่อให้ Animation ทำงาน
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 10);
    }
}

// --- ฟังก์ชันเช็ครหัสผ่าน ---
function checkPass() {
    const input = document.getElementById('passInput').value;
    const errorMsg = document.getElementById('error-msg');

    if (input === CORRECT_PASSWORD) {
        errorMsg.style.display = 'none'; // ซ่อนข้อความผิด
        goToPage('page4'); // ไปหน้าถัดไป
    } else {
        errorMsg.style.display = 'block'; // โชว์ข้อความผิด
        
        // เพิ่มลูกเล่นสั่นๆ (Optional)
        const inputBox = document.getElementById('passInput');
        inputBox.style.borderColor = 'red';
        setTimeout(() => { inputBox.style.borderColor = '#ffeff2'; }, 500);
    }
}

// --- ฟังก์ชันนับเวลา ---
function updateTimer() {
    const startDate = new Date(START_DATE);
    const now = new Date();
    const diff = now - startDate;

    // คำนวณวัน
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // แสดงผล
    const timerDisplay = document.getElementById("timer-display");
    if (timerDisplay) {
        timerDisplay.innerText = `${days} วัน`;
    }
}

// เริ่มทำงานเมื่อโหลดเว็บเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    // รันตัวนับเวลาครั้งแรก
    updateTimer();
    // อัปเดตทุก 1 ชั่วโมง (เผื่อเปิดทิ้งไว้นาน)
    setInterval(updateTimer, 1000 * 60 * 60);
    
    // (Optional) ให้กด Enter เพื่อเช็ครหัสได้เลย ไม่ต้องกดปุ่ม
    const passInput = document.getElementById('passInput');
    if(passInput){
        passInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                checkPass();
            }
        });
    }

});