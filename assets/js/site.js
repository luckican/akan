(function () {
    const clock = document.getElementById('clock');
    const copyButton = document.getElementById('copyLink');
    const printButton = document.getElementById('printArticle');
    const toast = document.getElementById('toast');
    const storyFilters = Array.from(document.querySelectorAll('[data-story-filter]'));
    const topicFilters = Array.from(document.querySelectorAll('[data-topic-filter]'));
    const searchInput = document.getElementById('site-search');
    const searchForm = searchInput ? searchInput.closest('form') : null;
    const searchResults = document.getElementById('search-results');
    const searchStatus = document.getElementById('search-status');
    let toastTimer;
    let searchIndex;

    function updateClock() {
        if (!clock) return;
        const now = new Date();
        clock.textContent = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Africa/Accra'
        }).format(now) + ' GMT';
        clock.dateTime = now.toISOString();
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
    }

    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied');
            } catch (error) {
                showToast('Could not copy link');
            }
        });
    }

    if (printButton) printButton.addEventListener('click', () => window.print());

    function setPressed(buttons, activeButton) {
        buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === activeButton)));
    }

    function refreshScope(scope) {
        if (!scope) return;
        const visibleStories = Array.from(scope.querySelectorAll('[data-story]')).filter((story) => !story.hidden);
        scope.querySelectorAll('[data-day-group]').forEach((group) => {
            group.hidden = !Array.from(group.querySelectorAll('[data-story]')).some((story) => !story.hidden);
        });
        const emptyState = scope.querySelector('[data-empty-state]');
        if (emptyState) emptyState.classList.toggle('is-visible', visibleStories.length === 0);
    }

    storyFilters.forEach((button) => {
        button.addEventListener('click', () => {
            const section = button.dataset.storyFilter;
            const scope = document.querySelector('.latest-feed[data-filter-scope]');
            if (!scope) return;
            setPressed(storyFilters, button);
            scope.querySelectorAll('[data-story]').forEach((story) => {
                story.hidden = section !== 'all' && story.dataset.section !== section;
            });
            refreshScope(scope);
        });
    });

    topicFilters.forEach((button) => {
        button.addEventListener('click', () => {
            const topic = button.dataset.topicFilter;
            const scope = document.querySelector('.section-recent[data-filter-scope]');
            if (!scope) return;
            setPressed(topicFilters, button);
            scope.querySelectorAll('[data-story]').forEach((story) => {
                const topics = (story.dataset.topics || '').split(' ').filter(Boolean);
                story.hidden = topic !== 'all' && !topics.includes(topic);
            });
            const lead = document.querySelector('[data-section-lead]');
            if (lead) lead.hidden = topic !== 'all';
            const heading = document.querySelector('[data-section-list-title]');
            if (heading) {
                if (!heading.dataset.defaultTitle) heading.dataset.defaultTitle = heading.textContent;
                heading.textContent = topic === 'all' ? heading.dataset.defaultTitle : button.textContent.trim() + ' reports';
            }
            refreshScope(scope);
        });
    });

    function renderSearchResults(items, query) {
        searchResults.replaceChildren();
        if (!query) {
            searchStatus.textContent = 'Begin typing to search the reporting archive.';
            return;
        }
        searchStatus.textContent = items.length === 1 ? '1 report found.' : `${items.length} reports found.`;
        items.forEach((item) => {
            const link = document.createElement('a');
            const label = document.createElement('span');
            const title = document.createElement('h2');
            const summary = document.createElement('p');
            link.className = 'search-result';
            link.href = item.url;
            label.textContent = `${item.section || 'Report'} / ${item.format || 'Story'}`;
            title.textContent = item.title;
            summary.textContent = item.description || '';
            link.append(label, title, summary);
            searchResults.append(link);
        });
    }

    async function search() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderSearchResults([], '');
            return;
        }
        if (!searchIndex) {
            searchStatus.textContent = 'Searching…';
            try {
                const response = await fetch('/index.json');
                if (!response.ok) throw new Error('Search index unavailable');
                searchIndex = await response.json();
            } catch (error) {
                searchStatus.textContent = 'Search is temporarily unavailable.';
                return;
            }
        }
        const matches = searchIndex.filter((item) => [
            item.title,
            item.description,
            item.section,
            item.format,
            ...(item.topics || [])
        ].join(' ').toLowerCase().includes(query));
        renderSearchResults(matches, query);
    }

    if (searchInput) searchInput.addEventListener('input', search);
    if (searchForm) searchForm.addEventListener('submit', (event) => { event.preventDefault(); search(); });

    updateClock();
    setInterval(updateClock, 1000);
}());
