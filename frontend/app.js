const out = document.getElementById('out');

document.getElementById('btn-get').addEventListener('click', async () => {
  const res = await fetch('/api/hello');
  const data = await res.json();
  out.textContent = JSON.stringify(data, null, 2);
});

document.getElementById('btn-post').addEventListener('click', async () => {
  const payload = {name: 'you', ts: Date.now()};
  const res = await fetch('/api/echo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  out.textContent = JSON.stringify(data, null, 2);
});
