const ctx = document.getElementById('myChart').getContext('2d');
const chartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [{
    label: 'Data Bulanan',
    data: [10, 20, 15, 25, 30],
    borderColor: 'blue',
    fill: false,
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: chartData,
  options: {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

const myChart = new Chart(ctx, config);

function addData() {
  const label = document.getElementById('labelInput').value;
  const value = document.getElementById('valueInput').value;

  if (label === '' || value === '') {
    alert("Label dan Value tidak boleh kosong!");
    return;
  }

  chartData.labels.push(label);
  chartData.datasets[0].data.push(parseFloat(value));
  myChart.update();

  document.getElementById('labelInput').value = '';
  document.getElementById('valueInput').value = '';
}