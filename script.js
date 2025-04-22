// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
        
        // 更新活动导航链接
        updateActiveNavLink();
    });
    
    // 返回顶部按钮点击事件
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 移动端菜单切换
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // 切换汉堡菜单图标
        const bars = document.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // 点击导航链接关闭移动菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // 重置汉堡菜单图标
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // 更新活动导航链接
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 目的地滑块
    const destinationContainer = document.querySelector('.destination-container');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    let cardIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 4;
    
    // 根据窗口大小设置每次显示的卡片数量
    function setCardsPerView() {
        if (window.innerWidth < 576) {
            cardsPerView = 1;
        } else if (window.innerWidth < 768) {
            cardsPerView = 2;
        } else if (window.innerWidth < 1024) {
            cardsPerView = 3;
        } else {
            cardsPerView = 4;
        }
        
        // 更新卡片宽度
        updateCardWidth();
    }
    
    // 更新卡片宽度
    function updateCardWidth() {
        if (!destinationContainer) return;
        
        const containerWidth = destinationContainer.parentElement.clientWidth;
        cardWidth = containerWidth / cardsPerView;
        
        // 设置每个卡片的宽度
        destinationCards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
        });
        
        // 更新滑块位置
        moveSlider();
    }
    
    // 移动滑块
    function moveSlider() {
        if (!destinationContainer) return;
        
        const maxIndex = destinationCards.length - cardsPerView;
        
        // 确保索引在有效范围内
        if (cardIndex < 0) cardIndex = 0;
        if (cardIndex > maxIndex) cardIndex = maxIndex;
        
        // 移动滑块
        destinationContainer.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
        
        // 更新按钮状态
        if (prevBtn && nextBtn) {
            prevBtn.disabled = cardIndex === 0;
            nextBtn.disabled = cardIndex === maxIndex;
            
            // 更新按钮样式
            if (prevBtn.disabled) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            
            if (nextBtn.disabled) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }
    }
    
    // 上一张按钮点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            cardIndex--;
            moveSlider();
        });
    }
    
    // 下一张按钮点击事件
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            cardIndex++;
            moveSlider();
        });
    }
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', function() {
        setCardsPerView();
    });
    
    // 初始化滑块
    setCardsPerView();
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 这里可以添加表单验证逻辑
            
            // 模拟表单提交
            alert(`感谢您的留言，${name}！我们会尽快回复您。`);
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取邮箱
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // 模拟订阅
            alert(`感谢订阅我们的通讯！我们会将最新信息发送到 ${email}`);
            
            // 重置表单
            newsletterForm.reset();
        });
    }
    
    // 图片库动画效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 添加滚动动画
    function checkScroll() {
        galleryItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化图片库项目样式
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);
    
    // 初始检查
    checkScroll();
    
    // 图片懒加载
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.classList.add('fade-in');
                            img.removeAttribute('data-src');
                            
                            // 移除占位样式
                            const parent = img.closest('.img-wrapper') || img.parentElement;
                            if (parent && parent.classList.contains('img-placeholder')) {
                                parent.classList.remove('img-placeholder');
                            }
                        }
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                // 添加占位样式
                const parent = img.closest('.img-wrapper') || img.parentElement;
                if (parent) {
                    parent.classList.add('img-placeholder');
                }
                
                imageObserver.observe(img);
            });
        } else {
            // 回退方案：对不支持IntersectionObserver的浏览器
            images.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }
    
    // 图片错误处理
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.onerror = function() {
                // 图片加载失败时显示备用图片
                this.src = 'images/placeholder.jpg';
                this.alt = '图片无法加载';
                // 移除占位样式
                const parent = this.closest('.img-wrapper') || this.parentElement;
                if (parent && parent.classList.contains('img-placeholder')) {
                    parent.classList.remove('img-placeholder');
                }
            };
        });
    }
    
    // 优化背景图片加载
    function preloadHeroImage() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // 创建一个新的图片对象来预加载背景图
        const img = new Image();
        // 从CSS中提取背景图URL (这里简化处理)
        const bgUrl = window.innerWidth <= 768 ? 'images/hero-bg-mobile.jpg' : 'images/hero-bg.jpg';
        
        img.onload = function() {
            // 背景图加载完成后应用到hero区域
            heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgUrl}')`;
            heroSection.classList.add('hero-loaded');
        };
        
        img.src = bgUrl;
    }
    
    // 图片尺寸响应式处理
    function setupResponsiveImages() {
        const updateImageSources = () => {
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
            
            document.querySelectorAll('[data-src-mobile]').forEach(img => {
                if (isMobile && img.getAttribute('data-src-mobile')) {
                    img.setAttribute('data-src', img.getAttribute('data-src  {
                    img.setAttribute('data-src', img.getAttribute('data-src-mobile'));
                } else if (isTablet && img.getAttribute('data-src-tablet')) {
                    img.setAttribute('data-src', img.getAttribute('data-src-tablet'));
                } else if (img.getAttribute('data-src-desktop')) {
                    img.setAttribute('data-src', img.getAttribute('data-src-desktop'));
                }
            });
            
            // 重新触发懒加载
            lazyLoadImages();
        };
        
        // 初始设置
        updateImageSources();
        
        // 窗口大小改变时更新
        window.addEventListener('resize', updateImageSources);
    }
    
    // 图片库模态框
    function setupGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        const modalImg = document.getElementById('modal-img');
        const modalCaption = document.getElementById('modal-caption');
        const closeBtn = document.querySelector('.modal-close');
        
        if (!modal || !modalImg) return;
        
        // 点击图片打开模态框
        document.querySelectorAll('.gallery-image').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalCaption.innerHTML = this.alt;
            });
        });
        
        // 点击关闭按钮关闭模态框
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // 点击模态框外部关闭模态框
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // 初始化所有图片优化功能
    function initImageOptimizations() {
        // 预加载英雄区域背景图
        preloadHeroImage();
        
        // 设置响应式图片
        setupResponsiveImages();
        
        // 初始化懒加载
        lazyLoadImages();
        
        // 处理图片错误
        handleImageErrors();
        
        // 设置图片库模态框
        setupGalleryModal();
    }
    
    // 初始化所有功能
    initImageOptimizations();
});