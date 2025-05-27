const form = document.getElementById('formKelipatan');
const input = document.getElementById('kelipatan');
const tabelBody = document.getElementById('tabelData');
const peringatan = document.getElementById('peringatan');
const judul = document.getElementById('judul');

function buatTabel(kelipatan) {
  tabelBody.innerHTML = '';
  peringatan.textContent = '';

  if (kelipatan === '') {
    judul.textContent = 'Kelipatan dari 1';
  } else if (kelipatan < 1) {
    peringatan.textContent = 'Mohon masukkan angka positif!';
    judul.textContent = 'Kelipatan dari 1';
    kelipatan = null;
  } else {
    judul.textContent = `Kelipatan dari ${kelipatan}`;
  }

  for (let i = 1; i <= 40; i++) {
    const tr = document.createElement('tr');

    const tdAngka = document.createElement('td');
    tdAngka.textContent = i;

    const tdKelipatan = document.createElement('td');
    tdKelipatan.textContent = i;

    if (kelipatan === '' || (kelipatan >= 1 && i % kelipatan === 0)) {
      tdKelipatan.className = 'green';
    } else {
      tdKelipatan.className = 'white';
    }

    tr.appendChild(tdAngka);
    tr.appendChild(tdKelipatan);
    tabelBody.appendChild(tr);
  }
}

// Saat halaman pertama dibuka
buatTabel('');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nilai = input.value.trim();
  buatTabel(nilai);
});
