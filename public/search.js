class DocsSearch extends HTMLElement {
    connectedCallback() {
      const dialog = this.querySelector('dialog');
      const trigger = this.querySelector('.search-trigger');
      const query = this.querySelector('input[type="search"]');
      const scope = this.querySelector('input[type="checkbox"]');
      const status = this.querySelector('.search-status');
      const results = this.querySelector('.search-results');
      let request = 0;
      let timer;
      let api;
      const open = () => { if (!dialog.open) { dialog.showModal(); query.focus(); } };
      trigger.addEventListener('click', open);
      this.querySelector('.close-search').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
      document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); open(); }
      });
      const search = async () => {
        const current = ++request;
        const value = query.value.trim();
        results.replaceChildren();
        if (!value) { status.textContent = 'Type to search guides and API reference.'; return; }
        status.textContent = 'Searching…';
        try {
          const entry = '/pagefind/pagefind.js';
          api ??= import(/* @vite-ignore */ entry);
          const filters = scope.checked
            ? this.dataset.module
              ? { module: this.dataset.module, channel: this.dataset.channel, version: this.dataset.version }
              : { latest: 'yes' }
            : {};
          const response = await (await api).search(value, { filters });
          const matches = await Promise.all(response.results.slice(0, 20).map((result) => result.data()));
          if (current !== request) return;
          status.textContent = response.results.length ? `${response.results.length} result${response.results.length === 1 ? '' : 's'}` : 'No results. Try a different word or broaden your search.';
          for (const match of matches) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = match.url;
            link.textContent = match.meta.title;
            const meta = document.createElement('small');
            meta.textContent = [match.meta.module, match.meta.release].filter(Boolean).join(' · ');
            const excerpt = document.createElement('p');
            excerpt.textContent = new DOMParser().parseFromString(match.excerpt, 'text/html').body.textContent;
            item.append(link, meta, excerpt);
            results.append(item);
          }
        } catch (error) {
          console.error('Documentation search failed', error);
          api = undefined;
          if (current === request) status.textContent = this.dataset.searchDev === 'true'
            ? 'Search is available in the built preview. Build the docs, then open the local preview.'
            : 'Search could not load. Check your connection and try again.';
        }
      };
      query.addEventListener('input', () => { ++request; clearTimeout(timer); timer = setTimeout(search, 150); });
      scope.addEventListener('change', search);
    }
  }
  if (!customElements.get('docs-search')) customElements.define('docs-search', DocsSearch);
