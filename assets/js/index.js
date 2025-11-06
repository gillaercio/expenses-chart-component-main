document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./data.json');
  const data = await response.json();

  const maxAmount = Math.max(...data.map(item => item.amount));
  const bars = document.querySelectorAll('.chart__bar');

  bars.forEach(bar => {
    const day = bar.dataset.day;
    const record = data.find(item => item.day === day);

    if (record) {
      const height = (record.amount / maxAmount) * 100;
      bar.style.height = `${height}%`;
      bar.title = `$${record.amount}`;

      const value = document.createElement('span');
      value.classList.add('bar__value');
      value.textContent = `$${record.amount}`;

      const label = document.createElement('span');
      label.classList.add('bar__label');
      label.textContent = record.day;

      bar.appendChild(value);
      bar.appendChild(label);
    }

    if (record.amount === maxAmount) {
      bar.style.backgroundColor = 'var(--Blue-300)';
    } else {
      bar.style.backgroundColor = 'var(--Red-500)';
    }
  });
});