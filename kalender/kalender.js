const canvas = document.getElementById("calendarCanvas");
const ctx = canvas.getContext("2d");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function drawCalendar(month, year) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Header Navigasi
  ctx.fillStyle = "blue";
  ctx.fillText("<< Bulan Sebelumnya", 160, 40);
  ctx.fillText(">> Bulan Berikutnya", 640, 40);

  // Judul Bulan
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`${monthNames[month]} ${year}`, canvas.width / 2, 70);

  // Ukuran kotak
  const cols = 7;
  const rows = 7; // 1 row for days name + 6 rows for dates
  const cellWidth = 100;
  const cellHeight = 60;
  const startX = 50;
  const startY = 100;

  // Gambar nama hari
  ctx.font = "16px Arial";
  for (let i = 0; i < cols; i++) {
    const x = startX + i * cellWidth;
    ctx.strokeRect(x, startY, cellWidth, cellHeight);
    ctx.fillText(days[i], x + cellWidth / 2, startY + 35);
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let day = 1;
  for (let row = 1; row <= 6; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * cellWidth;
      const y = startY + row * cellHeight;

      if ((row === 1 && col < firstDay) || day > daysInMonth) {
        ctx.strokeRect(x, y, cellWidth, cellHeight); // kotak kosong
        continue;
      }

      // Warnai tanggal hari ini
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, cellWidth, cellHeight);
        ctx.fillStyle = "white";
      } else if (day === today.getDate()) {
        // Warna merah untuk tanggal yang sama di bulan lain
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, cellWidth, cellHeight);
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "black";
      }

      ctx.strokeRect(x, y, cellWidth, cellHeight);
      ctx.fillText(day, x + cellWidth / 2, y + 35);

      day++;
    }
  }
}

drawCalendar(currentMonth, currentYear);

// Navigasi bulan
canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x >= 60 && x <= 260 && y >= 20 && y <= 50) {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    drawCalendar(currentMonth, currentYear);
  }

  if (x >= 540 && x <= 740 && y >= 20 && y <= 50) {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    drawCalendar(currentMonth, currentYear);
  }
});
