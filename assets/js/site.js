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
    let searchStarted = false;
    let storyEngagedSent = false;

    function pageMeta() {
        const body = document.body;
        return {
            page_type: body.dataset.pageType || '',
            section: body.dataset.pageSection || '',
            topic: body.dataset.pageTopic || ''
        };
    }

    function track(eventName, params) {
        if (!window.akanAnalytics || !window.akanAnalytics.enabled) return;
        if (typeof window.gtag !== 'function') return;
        try {
            window.gtag('event', eventName, params || {});
        } catch (error) {
            console.error('Analytics event failed', error);
        }
    }

    function resultCountBucket(count) {
        if (count <= 0) return '0';
        if (count === 1) return '1';
        if (count <= 5) return '2_5';
        return '6_plus';
    }

    function placementFromLink(link) {
        if (link.dataset.placement) return link.dataset.placement;
        if (link.classList.contains('breaking-strip')) return 'home_breaking';
        if (link.classList.contains('home-lead__story')) return 'home_lead';
        if (link.classList.contains('home-secondary__story')) return 'home_secondary';
        if (link.classList.contains('home-focus__story')) return 'home_focus';
        if (link.classList.contains('section-lead__main')) return 'section_lead';
        if (link.classList.contains('section-side-story')) return 'section_side';
        if (link.classList.contains('related-story')) return 'related';
        if (link.classList.contains('search-result')) return 'search_result';
        if (link.closest('.home-briefing')) return 'home_briefing';
        if (link.closest('.home-world')) return 'home_world';
        if (link.closest('.latest-feed')) return 'latest';
        if (link.closest('.section-recent')) return 'section_recent';
        return 'internal';
    }

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
                track('copy_link', pageMeta());
            } catch (error) {
                showToast('Could not copy link');
            }
        });
    }

    if (printButton) {
        printButton.addEventListener('click', () => {
            track('print_article', pageMeta());
            window.print();
        });
    }

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
            track('section_filter_used', { section: section || 'all' });
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
            const section = document.body.dataset.pageSection || '';
            track('topic_filter_used', { section: section, topic: topic || 'all' });
        });
    });

    function renderSearchResults(items, query) {
        searchResults.replaceChildren();
        if (!query) {
            searchStatus.textContent = 'Begin typing to search the reporting archive.';
            return;
        }
        searchStatus.textContent = items.length === 1 ? '1 report found.' : `${items.length} reports found.`;
        items.forEach((item, index) => {
            const link = document.createElement('a');
            const label = document.createElement('span');
            const title = document.createElement('h2');
            const summary = document.createElement('p');
            link.className = 'search-result';
            link.href = item.url;
            link.dataset.resultRank = String(index + 1);
            const topic = Array.isArray(item.topics) && item.topics.length ? item.topics[0] : '';
            label.textContent = topic
                ? `${item.section || 'Ghana'} / ${topic}`
                : (item.section || 'Ghana');
            title.textContent = item.title;
            summary.textContent = item.description || '';
            link.append(label, title, summary);
            searchResults.append(link);
        });
        track('search_results_viewed', { result_count_bucket: resultCountBucket(items.length) });
    }

    async function search() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderSearchResults([], '');
            return;
        }
        if (!searchStarted) {
            searchStarted = true;
            track('search_started', {});
        }
        if (!searchIndex) {
            searchStatus.textContent = 'Searching…';
            try {
                const response = await fetch('/index.json');
                if (!response.ok) throw new Error('Search index unavailable');
                searchIndex = await response.json();
            } catch (error) {
                searchStatus.textContent = 'Search is temporarily unavailable.';
                console.error('Search index failed', error);
                return;
            }
        }
        const matches = searchIndex.filter((item) => [
            item.title,
            item.description,
            item.section,
            ...(item.topics || [])
        ].join(' ').toLowerCase().includes(query));
        renderSearchResults(matches, query);
    }

    if (searchInput) searchInput.addEventListener('input', search);
    if (searchForm) searchForm.addEventListener('submit', (event) => { event.preventDefault(); search(); });

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href') || '';
        if (!href.includes('/stories/')) return;
        const params = { placement: placementFromLink(link) };
        if (link.classList.contains('search-result') && link.dataset.resultRank) {
            const rank = Number(link.dataset.resultRank);
            params.result_rank_bucket = rank <= 3 ? String(rank) : '4_plus';
            track('search_result_opened', params);
        }
        track('story_opened', params);
    });

    if (document.body.dataset.pageType === 'story') {
        let visibleMs = 0;
        let lastVisibleAt = document.visibilityState === 'visible' ? Date.now() : null;
        let maxScroll = 0;

        function maybeEngage() {
            if (storyEngagedSent) return;
            if (visibleMs < 45000 || maxScroll < 50) return;
            storyEngagedSent = true;
            track('story_engaged', pageMeta());
        }

        function onScroll() {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            if (scrollable > 0) {
                maxScroll = Math.max(maxScroll, Math.round((window.scrollY / scrollable) * 100));
            } else {
                maxScroll = 100;
            }
            maybeEngage();
        }

        setInterval(() => {
            if (document.visibilityState !== 'visible' || lastVisibleAt === null) return;
            const now = Date.now();
            visibleMs += now - lastVisibleAt;
            lastVisibleAt = now;
            maybeEngage();
        }, 1000);

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                lastVisibleAt = Date.now();
            } else if (lastVisibleAt !== null) {
                visibleMs += Date.now() - lastVisibleAt;
                lastVisibleAt = null;
                maybeEngage();
            }
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    updateClock();
    setInterval(updateClock, 1000);
}());
