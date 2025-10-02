// Article data
const articles = [
    {
        id: 'getting-started',
        title: 'Getting Started with Digital Nomad Life',
        date: '2024-01-15',
        content: `
            <h1>Getting Started with Digital Nomad Life</h1>
            <div class="article-meta">Published on January 15, 2024</div>
            
            <p>Welcome to my blog about digital nomad life! This is where I share my experiences, 
            thoughts, and tips about working remotely while traveling the world.</p>
            
            <h2>Why Become a Digital Nomad?</h2>
            <p>The digital nomad lifestyle offers incredible freedom and flexibility. You can:</p>
            <ul>
                <li>Work from anywhere with an internet connection</li>
                <li>Experience different cultures and locations</li>
                <li>Meet like-minded people from around the world</li>
                <li>Design your own schedule and work-life balance</li>
            </ul>
            
            <h2>Essential Tools</h2>
            <p>To be successful as a digital nomad, you'll need a few key tools:</p>
            <ul>
                <li><strong>Reliable laptop:</strong> Your main work device</li>
                <li><strong>Good internet:</strong> Essential for staying connected</li>
                <li><strong>Cloud storage:</strong> Keep your files accessible everywhere</li>
                <li><strong>Communication tools:</strong> Stay in touch with clients and team</li>
            </ul>
            
            <h2>Getting Started</h2>
            <p>The best way to start is to test the waters. Try working from a different city for 
            a week or two before committing to long-term travel. This helps you understand what 
            challenges you might face and what you need to prepare for.</p>
            
            <p>Remember, there's no one-size-fits-all approach. Find what works for you and 
            embrace the journey!</p>
        `
    },
    {
        id: 'best-coworking-spaces',
        title: 'Best Coworking Spaces in Southeast Asia',
        date: '2024-01-10',
        content: `
            <h1>Best Coworking Spaces in Southeast Asia</h1>
            <div class="article-meta">Published on January 10, 2024</div>
            
            <p>Southeast Asia is a haven for digital nomads, offering affordable living costs, 
            great weather, and excellent coworking spaces. Here are some of my favorites.</p>
            
            <h2>Chiang Mai, Thailand</h2>
            <p>Chiang Mai is often considered the digital nomad capital of the world. The city 
            offers numerous coworking spaces with great amenities:</p>
            <ul>
                <li><strong>CAMP:</strong> One of the largest and most popular spaces</li>
                <li><strong>Punspace:</strong> Multiple locations across the city</li>
                <li><strong>Yellow:</strong> Great for those who want a quieter environment</li>
            </ul>
            
            <h2>Bali, Indonesia</h2>
            <p>Bali combines beautiful beaches with a thriving digital nomad community:</p>
            <ul>
                <li><strong>Dojo Bali:</strong> The original Bali coworking space</li>
                <li><strong>Hubud:</strong> Located in the heart of Ubud</li>
                <li><strong>Outpost:</strong> Beachside coworking in Canggu</li>
            </ul>
            
            <h2>Ho Chi Minh City, Vietnam</h2>
            <p>Vietnam's bustling metropolis offers modern facilities at great prices:</p>
            <ul>
                <li><strong>The Hive:</strong> Professional environment with great networking</li>
                <li><strong>Dreamplex:</strong> Multiple locations with premium facilities</li>
                <li><strong>Start Coworking Campus:</strong> Large space with lots of amenities</li>
            </ul>
            
            <p>Each of these spaces has its own unique vibe, so I recommend trying a few to 
            find the one that suits your working style best.</p>
        `
    },
    {
        id: 'remote-work-tips',
        title: 'Tips for Staying Productive While Traveling',
        date: '2024-01-05',
        content: `
            <h1>Tips for Staying Productive While Traveling</h1>
            <div class="article-meta">Published on January 5, 2024</div>
            
            <p>One of the biggest challenges of the digital nomad lifestyle is maintaining 
            productivity while constantly changing environments. Here are my top tips.</p>
            
            <h2>1. Establish a Routine</h2>
            <p>Even though you're traveling, try to maintain some consistency in your daily 
            routine. Wake up at the same time, have a morning ritual, and set specific work hours.</p>
            
            <h2>2. Choose Your Accommodation Wisely</h2>
            <p>Don't just look at the price and location. Consider:</p>
            <ul>
                <li>Internet speed and reliability</li>
                <li>Workspace availability (desk and chair)</li>
                <li>Noise levels</li>
                <li>Natural lighting</li>
            </ul>
            
            <h2>3. Use Time Management Techniques</h2>
            <p>Popular techniques like the Pomodoro method can help you stay focused. Work in 
            focused 25-minute intervals with short breaks in between.</p>
            
            <h2>4. Set Boundaries</h2>
            <p>Just because you're in a beautiful location doesn't mean you should work all the 
            time. Set clear work hours and stick to them. Use your free time to explore and enjoy 
            your surroundings.</p>
            
            <h2>5. Stay Connected</h2>
            <p>Regular communication with clients, colleagues, and other nomads helps you stay 
            motivated and prevents feelings of isolation.</p>
            
            <h2>6. Take Care of Yourself</h2>
            <p>Don't neglect your health. Exercise regularly, eat well, and get enough sleep. 
            Your productivity depends on your physical and mental well-being.</p>
            
            <p>Remember, productivity isn't about working more hours—it's about working smarter 
            and maintaining a sustainable lifestyle.</p>
        `
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

// Function to load and display an article
function loadArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    const articleContent = document.getElementById('article-content');
    
    if (article) {
        articleContent.innerHTML = article.content;
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
