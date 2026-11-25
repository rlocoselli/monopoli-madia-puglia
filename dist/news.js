fetch('/feed.xml').then(response => {
  if (!response.ok) throw new Error('RSS indisponibile');
  return response.text();
}).then(xml => {
  const parsed = new DOMParser().parseFromString(xml, 'application/xml');
  if (parsed.querySelector('parsererror')) throw new Error('RSS non valido');
  const list = document.getElementById('feed-list');
  const fragment = document.createDocumentFragment();
  parsed.querySelectorAll('item').forEach(item => {
    const link = item.querySelector('link')?.textContent || '';
    const url = new URL(link, location.origin);
    if (url.hostname !== 'monopoli-madia-puglia.rlocoselli.chatgpt.site' && url.origin !== location.origin) return;
    if (url.pathname !== '/notizie.html') return;
    const a = document.createElement('a');
    a.href = url.pathname + url.hash;
    const date = document.createElement('time');
    const published = new Date(item.querySelector('pubDate')?.textContent || '');
    if (!Number.isNaN(published.getTime())) {
      date.dateTime = published.toISOString().slice(0, 10);
      date.textContent = published.toLocaleDateString('it-IT', {day:'numeric',month:'long',year:'numeric'});
    }
    a.append(date, document.createTextNode(item.querySelector('title')?.textContent || 'Notizia'));
    fragment.append(a);
  });
  if (fragment.childNodes.length) list.replaceChildren(fragment);
}).catch(() => {});
