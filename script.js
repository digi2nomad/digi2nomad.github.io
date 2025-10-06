// Article data
const articles = [
    {
        id: 'ai-prompts-thoughts',
        title: 'Hard-Won Truths About AI Prompts Most Tutorials Miss',
        date: '2025-10-2',
        content: `article/article-001.html`
    },
    {
        id: 'python-image-library',
        title: 'Python\'s Go-To Image Library',
        date: '2025-10-5',
        content: `article/article-002.html`
    }
];

// Function to load article list in sidebar
function loadArticleList() {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';

    articles.forEach((article, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${article.id}`;
        a.textContent = article.title;
        a.dataset.articleId = article.id;

        // Mark the first article (latest) as active
        if (index === 0) {
            a.classList.add('active');
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            loadArticle(article.id);

            // Update active state
            document.querySelectorAll('.article-index a').forEach(link => {
                link.classList.remove('active');
            });
            a.classList.add('active');

            // Update URL hash
            window.location.hash = article.id;
        });

        li.appendChild(a);
        articleList.appendChild(li);
    });
}

function removeLastElementOfPathname(pathname) {
    const parts = pathname.split('/');
    parts.pop();
    return parts.join('/');
}

// Function to load and display an article
async function loadArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    const articleContent = document.getElementById('article-content');
    const href = removeLastElementOfPathname(window.location.href);
    const url = href + '/articles/' + articleId + '.html';
    const response = await fetch(url);
    if (!response.ok) {
        alert('Failed to load article: ' + url);
        throw new Error('HTTP response was not ok');
    }
    if (article) {
        articleContent.innerHTML = await response.text();
        // Scroll to top of article
        articleContent.scrollTop = 0;
    } else {
        articleContent.innerHTML = '<div class="loading">Article not found</div>';
    }
}

// Function to load article based on URL hash
function loadArticleFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash && articles.find(a => a.id === hash)) {
        loadArticle(hash);
        // Update active state
        document.querySelectorAll('.article-index a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.articleId === hash) {
                link.classList.add('active');
            }
        });
    } else {
        // Load the latest article (first in the array)
        loadArticle(articles[0].id);
    }
}

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    loadArticleList();
    loadArticleFromHash();
});

// Handle browser back/forward navigation
window.addEventListener('hashchange', loadArticleFromHash);
