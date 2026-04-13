const aiCourses = [
    { id: 1, title: "Generative AI Mastery", price: 499, oldPrice: 3000, progress: 45, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995", points: ["Master Transformers", "Prompt Engineering", "Build AI Agents", "Ethical AI Use", "Deploy with APIs"] },
    { id: 2, title: "SQL for AI Engineers", price: 0, oldPrice: 1200, progress: 85, img: "https://images.unsplash.com/photo-1544383335-c533a4a68ef5", points: ["Advanced Querying", "DB Design for AI", "SQL with Python", "Big Data SQL", "Data Security"] },
    { id: 3, title: "Deep Learning Bootcamp", price: 549, oldPrice: 4000, progress: 10, img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a", points: ["Neural Networks", "PyTorch Mastery", "Computer Vision", "NLP Basics", "GPU Training"] },
    { id: 4, title: "Data Science A-Z", price: 0, oldPrice: 2000, progress: 60, img: "https://images.unsplash.com/photo-1551288049-bbbda536339a", points: ["Statistical Modeling", "Predictive Analytics", "Data Wrangling", "Visualization", "Scikit-Learn"] },
    { id: 5, title: "MLOps Professional", price: 699, oldPrice: 5000, progress: 0, img: "https://images.unsplash.com/photo-1518433278988-2b2f1f7c554a", points: ["CI/CD for ML", "Model Versioning", "Docker & K8s", "Testing for ML", "Monitoring"] },
    { id: 6, title: "NoSQL for Big Data", price: 0, oldPrice: 1500, progress: 0, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", points: ["MongoDB Modeling", "Firebase Sync", "Scaling DBs", "Graph Databases", "JSON Handling"] },
    { id: 7, title: "Computer Vision Pro", price: 499, oldPrice: 2800, progress: 0, img: "https://images.unsplash.com/photo-1527430295725-dd2962132d4b", points: ["Object Detection", "Image Segmentation", "Face Recognition", "OpenCV Basics", "YOLO Models"] },
    { id: 8, title: "AI Ethics & Policy", price: 0, oldPrice: 1000, progress: 100, img: "https://images.unsplash.com/photo-1589254065878-42c9da997008", points: ["Bias Mitigation", "AI Governance", "Fairness Metrics", "Global AI Laws", "Safe Deployment"] },
    { id: 9, title: "Reinforcement Learning", price: 599, oldPrice: 3500, progress: 5, img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", points: ["Q-Learning", "Robotics Control", "Game AI", "Policy Gradients", "Simulation"] },
    { id: 10, title: "Big Data with Spark", price: 499, oldPrice: 3200, progress: 0, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48", points: ["PySpark Mastery", "Real-time Streaming", "Hadoop Ecosystem", "Partitioning", "ETL Pipelines"] },
    { id: 11, title: "NLP Specialization", price: 499, oldPrice: 2500, progress: 0, img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d", points: ["Text Vectorization", "Sentiment Analysis", "Transformers", "BERT & T5", "Chatbots"] },
    { id: 12, title: "AI Engineering (AWS)", price: 649, oldPrice: 4500, progress: 0, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", points: ["SageMaker Workflows", "Cloud AI Services", "MLOps Pipelines", "Scalable Models", "Data Lakes"] },
    { id: 13, title: "Frontend for AI Apps", price: 0, oldPrice: 1800, progress: 95, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", points: ["React Architectures", "AI Dashboard UX", "Real-time Charts", "Tailwind CSS", "API State"] }
];

let cart = [];
let wishlist = [];

function renderCourses(data = aiCourses) {
    const grid = document.getElementById('courseGrid');
    if(!grid) return;
    grid.innerHTML = data.map(c => `
        <div class="course-card">
            <div class="wishlist-heart" onclick="toggleWishlist(${c.id})">❤️</div>
            <div class="card-main">
                <img src="${c.img}?w=400" class="card-img" alt="${c.title}">
                <div class="card-body">
                    <span class="badge ${c.price === 0 ? 'badge-free' : 'badge-paid'}">${c.price === 0 ? 'FREE' : 'PAID'}</span>
                    <h3 style="margin-bottom:10px; font-size:1.1rem;">${c.title}</h3>
                    <div class="progress-container">
                        <div class="progress-bg"><div class="progress-fill" style="width:${c.progress}%"></div></div>
                        <p style="font-size:0.7rem; color:var(--text-muted); margin-top:5px;">${c.progress}% Completed</p>
                    </div>
                    <div style="margin-top:auto; font-weight:800; font-size:1.1rem; color:var(--text-main);">
                        ₹${c.price} <small style="text-decoration:line-through; color:#999; font-weight:400;">₹${c.oldPrice}</small>
                    </div>
                </div>
            </div>
            <div class="hover-overlay">
                <h3 style="margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:10px;">Course Benefits</h3>
                <ul class="benefit-list">${c.points.map(p => `<li>${p}</li>`).join('')}</ul>
                <button onclick="${c.price === 0 ? `alert('Enrolled Successfully!')` : `addToCart(${c.id})`}" 
                        style="width:100%; padding:15px; background:white; color:var(--purple-primary); border:none; border-radius:12px; font-weight:900; cursor:pointer; margin-top:10px;">
                    ${c.price === 0 ? 'Enroll Now' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
}

function filterCourses() {
    const term = document.getElementById('courseSearch').value.toLowerCase();
    const filtered = aiCourses.filter(c => c.title.toLowerCase().includes(term));
    renderCourses(filtered);
}

function addToCart(id) {
    const course = aiCourses.find(c => c.id === id);
    if(!cart.find(i => i.id === id)) {
        cart.push(course);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateUI();
    }
}

function toggleWishlist(id) {
    const course = aiCourses.find(c => c.id === id);
    const index = wishlist.findIndex(i => i.id === id);
    if(index === -1) wishlist.push(course);
    else wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateUI();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const cartCount = document.getElementById('cartCount');
    const wishCount = document.getElementById('wishCount');
    if(!cartCount || !wishCount) return;
    
    cartCount.innerText = cart.length;
    wishCount.innerText = wishlist.length;
    
    document.getElementById('cartList').innerHTML = cart.length === 0 ? 
        '<p style="text-align:center; font-size:0.8rem; color:#999;">Empty</p>' : 
        cart.map(i => `
            <div class="side-item">
                <img src="${i.img}?w=50">
                <p>${i.title}</p>
                <span class="remove-btn" onclick="removeFromCart(${i.id})">✕</span>
            </div>
        `).join('');
    
    document.getElementById('wishList').innerHTML = wishlist.length === 0 ? 
        '<p style="text-align:center; font-size:0.8rem; color:#999;">Empty</p>' : 
        wishlist.map(i => `
            <div class="side-item">
                <img src="${i.img}?w=50">
                <p>${i.title}</p>
                <span class="remove-btn" onclick="toggleWishlist(${i.id})">✕</span>
            </div>
        `).join('');
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const window = document.getElementById('chatWindow');
    if(!input.value) return;
    window.innerHTML += `<div class="msg-user">You: ${input.value}</div>`;
    setTimeout(() => {
        window.innerHTML += `<div class="msg-ai">AI: Great choice, Rajasekhar! This aligns with your AIML career path.</div>`;
        window.scrollTop = window.scrollHeight;
    }, 600);
    input.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const marqueeHtml = aiCourses.slice(0, 6).map(c => `<a class="marquee-item" href="courses.html">🚀 NEW: ${c.title} - ENROLL NOW</a>`).join('');
    const dashboardMarquee = document.getElementById('marquee-dashboard');
    const coursesMarquee = document.getElementById('marquee-courses');
    if(dashboardMarquee) dashboardMarquee.innerHTML = marqueeHtml;
    if(coursesMarquee) coursesMarquee.innerHTML = marqueeHtml;
    renderCourses();
    updateUI();
});
