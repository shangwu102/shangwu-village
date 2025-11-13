<template>
  <div class="slider-container" ref="containerRef">
    <!-- 第一屏：轮播图和文字内容 -->
    <section class="slider-screen screen-1">
      <div class="hero-section">
        <div class="hero-content">
          <!-- 左侧轮播图 -->
          <div class="hero-carousel" ref="carouselRef">
            <div class="carousel-slides">
              <div 
                v-for="(slide, index) in carouselSlides" 
                :key="index"
                :class="['carousel-slide', { active: currentSlide === index }]"
              >
                <div class="slide-overlay"></div>
                <img 
                  :src="slide.image" 
                  :alt="slide.title" 
                  class="carousel-image"
                >
              </div>
            </div>
            
            <!-- 轮播指示器 -->
            <div class="carousel-indicators">
              <button 
                v-for="(slide, index) in carouselSlides" 
                :key="index"
                :class="['indicator-dot', { active: currentSlide === index }]"
                @click="goToSlide(index)"
                :aria-label="`Go to slide ${index + 1}`"
              ></button>
            </div>
            
            <!-- 轮播控制箭头 -->
            <button 
              class="carousel-arrow prev" 
              @click="prevSlide"
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              </svg>
            </button>
            <button 
              class="carousel-arrow next" 
              @click="nextSlide"
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </button>
          </div>
          
          <!-- 右侧文字内容 -->
          <div class="hero-text-container">
            <div class="hero-text">
              <h1 class="hero-title">探索乡村美景</h1>
              <div class="hero-subtitle">发现自然与人文的和谐之美</div>
              <p class="hero-description">
                {{ carouselSlides[currentSlide].description }}
              </p>
              
              <!-- 按钮组 -->
              <div class="hero-buttons">
                <ElButton type="primary" size="large" class="explore-btn" @click="handleExploreClick">
                  开始探索
                </ElButton>
                <ElButton size="large" class="secondary-btn">
                  了解更多
                </ElButton>
              </div>
              
              <!-- 特色标签 -->
            </div>
          </div>
        </div>

        <div class="slide-indicator">
          <div class="indicator-text">向下滚动探索更多</div>
          <div class="indicator-arrow"></div>
        </div>
      </div>
    </section>

    <!-- 第二屏：多媒体展示（采用你提供的“大地色生态风格”样式） -->
    <section class="slider-screen screen-2">
      <div class="multi-container">
        <!-- 360° -->
        <div class="multi-row">
          <div class="multi-label">360°</div>
          <div class="multi-content">
            <iframe
              src="https://app.cloudpano.com/tours/TQl4SzPOaX"
              allowfullscreen
              frameborder="0"
            ></iframe>
          </div>
        </div>

        <!-- 老照片 -->
        <div class="multi-row">
          <div class="multi-label">老照片</div>
          <div class="multi-content">
            <div class="slideshow" ref="slideshowRef">
              <img src="../assets/262.jpg" class="active" />
              <img src="../assets/LNCrwnFGSU.jpg" />
              <img src="../assets/nkgI8DBXQF.jpg" />
              <img src="../assets/SyaZvCEVZv.jpg" />
            </div>
          </div>
        </div>

        <!-- 录音 -->
        <div class="multi-row">
          <div class="multi-label">录音</div>
          <div class="multi-content">
            <audio controls>
              <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
              您的浏览器不支持音频播放。
            </audio>
          </div>
        </div>

        <!-- 文字 -->
        <div class="multi-row">
          <div class="multi-label">土特产</div>
          <div class="multi-content">
            <div class="text-box">
              <!-- <p>这是一段示例说明文字。这里可以展示历史背景、人物故事或展览内容的详细文字介绍。用户可以滚动查看更多内容。</p>
              <p>文字模块支持长文本展示，并可结合其他多媒体模块共同构成完整的信息体验。设计上注重可读性与层次感。</p>
              <p>在真实项目中，这部分可以接入数据库或后台CMS内容管理系统。</p> -->
            </div>
          </div>
        </div>

        <!-- <div class="multi-footer">网页原型设计 · 大地色生态风格</div> -->
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElButton } from 'element-plus'

// 直接导入图片资源
import image1 from '../assets/262.jpg'
import image2 from '../assets/LNCrwnFGSU.jpg'
import image3 from '../assets/nkgI8DBXQF.jpg'
import image4 from '../assets/SyaZvCEVZv.jpg'

// --- 轮播图数据与状态 --- 
const carouselSlides = ref([
  {
    image: image1,
    title: '乡村风景1',
    description: '这里有连绵起伏的青山绿水，空气清新，环境优美，是逃离都市喧嚣的理想去处。'
  },
  {
    image: image2,
    title: '乡村风景2',
    description: '传统村落保存完好，青瓦白墙，小桥流水，展现了中国乡村的独特魅力和历史底蕴。'
  },
  {
    image: image3,
    title: '乡村风景3',
    description: '田园风光令人陶醉，金黄的稻田，翠绿的茶园，勾勒出一幅美丽的乡村画卷。'
  },
  {
    image: image4,
    title: '乡村风景4',
    description: '通过VR技术，您可以身临其境感受乡村的四季变化，体验农耕文化，了解乡村生活。'
  }
])

const currentSlide = ref(0)
const carouselRef = ref(null)
let carouselTimer = null

// --- 轮播图控制逻辑 --- 
const goToSlide = (index) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselSlides.value.length) % carouselSlides.value.length
}

const startCarousel = () => {
  carouselTimer = setInterval(() => {
    nextSlide()
  }, 2000)
}

const stopCarousel = () => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}

// --- 状态与配置 ---
const currentScreen = ref(0)
const lastScrollTime = ref(0)
const scrollDebounceTime = 500
const scrollThreshold = 50
const isAnimating = ref(false)
const containerRef = ref(null)

// slideshow timer & ref
const slideshowRef = ref(null)
let slideshowTimer = null

// 监听容器内滚轮切屏
const handleWheel = (e) => {
  const now = Date.now()
  if (now - lastScrollTime.value < scrollDebounceTime) return
  lastScrollTime.value = now
  if (isAnimating.value) return
  const scrollAmount = Math.abs(e.deltaY)
  if (scrollAmount < scrollThreshold) return

  if (e.deltaY > 0 && currentScreen.value === 0) {
    switchToScreen(1)
  } else if (e.deltaY < 0 && currentScreen.value === 1) {
    switchToScreen(0)
  }
}

const switchToScreen = (index) => {
  if (isAnimating.value || currentScreen.value === index) return
  isAnimating.value = true
  if (containerRef.value) containerRef.value.classList.add('animating')

  const screen1 = document.querySelector('.screen-1')
  const screen2 = document.querySelector('.screen-2')
  if (!screen1 || !screen2) {
    isAnimating.value = false
    if (containerRef.value) containerRef.value.classList.remove('animating')
    return
  }

  screen1.classList.remove('active')
  screen2.classList.remove('active')

  const toScreen = index === 1 ? screen2 : screen1
  const fromScreen = index === 1 ? screen1 : screen2

  toScreen.style.opacity = '0'
  toScreen.style.transform =
    index === 1
      ? `translateY(${window.innerHeight}px) scale(0.98)`
      : `translateY(-${window.innerHeight}px) scale(0.98)`

  // 强制回流
  void toScreen.offsetHeight

  if (index === 1) {
    fromScreen.style.transform = `translateY(-${window.innerHeight}px) scale(0.98)`
    fromScreen.style.opacity = '0.7'
    toScreen.style.transform = 'translateY(0) scale(1)'
    toScreen.style.opacity = '1'
  } else {
    fromScreen.style.transform = `translateY(${window.innerHeight}px) scale(0.98)`
    fromScreen.style.opacity = '0.7'
    toScreen.style.transform = 'translateY(0) scale(1)'
    toScreen.style.opacity = '1'
  }

  setTimeout(() => toScreen.classList.add('active'), 120)
  currentScreen.value = index

  setTimeout(() => {
    isAnimating.value = false
    if (containerRef.value) containerRef.value.classList.remove('animating')
    // 确保最终位置
    if (index === 1) {
      screen1.style.transform = `translateY(-${window.innerHeight}px)`
      screen1.style.opacity = '0.95'
      screen2.style.transform = `translateY(0)`
      screen2.style.opacity = '1'
    } else {
      screen1.style.transform = `translateY(0)`
      screen1.style.opacity = '1'
      screen2.style.transform = `translateY(${window.innerHeight}px)`
      screen2.style.opacity = '0.95'
    }
  }, 820)
}

const handleExploreClick = () => {
  if (currentScreen.value === 0) switchToScreen(1)
}

const handleResize = () => {
  const screen1 = document.querySelector('.screen-1')
  const screen2 = document.querySelector('.screen-2')
  if (screen1 && screen2) {
    if (currentScreen.value === 0) {
      screen1.style.transform = `translateY(0)`
      screen2.style.transform = `translateY(${window.innerHeight}px)`
    } else {
      screen1.style.transform = `translateY(-${window.innerHeight}px)`
      screen2.style.transform = `translateY(0)`
    }
  }
}

onMounted(() => {
  // 仅在组件内隐藏默认浏览器滚动（在卸载时恢复）
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'

  // animate in first screen text
  setTimeout(() => {
    document.querySelectorAll('.hero-text').forEach((el) => el.classList.add('animate-in'))
  }, 100)
  const s1 = document.querySelector('.screen-1')
  if (s1) s1.classList.add('active')

  // container wheel
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', handleWheel, { passive: true })
  }

  // 初始化主轮播图
  startCarousel()
  
  // 监听轮播图鼠标事件
  if (carouselRef.value) {
    carouselRef.value.addEventListener('mouseenter', stopCarousel)
    carouselRef.value.addEventListener('mouseleave', startCarousel)
  }

  // 初始化第二屏轮播（使用 slideshowRef 优先）
  const slides = slideshowRef.value
    ? slideshowRef.value.querySelectorAll('img')
    : document.querySelectorAll('.slideshow img')

  if (slides && slides.length > 0) {
    let idx = 0
    slideshowTimer = setInterval(() => {
      slides[idx].classList.remove('active')
      idx = (idx + 1) % slides.length
      slides[idx].classList.add('active')
    }, 4000)
  }

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (containerRef.value) containerRef.value.removeEventListener('wheel', handleWheel)
  window.removeEventListener('resize', handleResize)
  
  // 清理轮播图定时器
  if (slideshowTimer) {
    clearInterval(slideshowTimer)
    slideshowTimer = null
  }
  
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
  
  // 移除轮播图事件监听
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('mouseenter', stopCarousel)
    carouselRef.value.removeEventListener('mouseleave', startCarousel)
  }
  
  // 恢复默认滚动
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ---------- 容器、屏幕 ---------- */
.slider-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
}
.slider-container.animating {
  pointer-events: none;
}

.slider-screen {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease;
  overflow: hidden;
}

/* 第一屏 */
.screen-1 {
  transform: translateY(0);
  opacity: 1;
}

/* 第二屏：背景与内部滚动（把 padding 放在内部 multi-container） */
.screen-2 {
  transform: translateY(100vh);
  opacity: 0.95;
  overflow: auto; /* 允许第二屏内部滚动 */
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f0f4eb; /* 和你提供的 body 背景一致 */
}

/* ---------- 第一屏样式：左右分栏布局 ---------- */
.hero-section {
  background: linear-gradient(135deg, #2d8f40 0%, #84b854 50%, #ffcc33 100%);
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0 auto;
}

/* 左侧轮播图样式 */
.hero-carousel {
  position: relative;
  width: 55%;
  height: 80%;
  max-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

.carousel-slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1.1);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.carousel-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active,
.indicator-dot:hover {
  background-color: #ffcc33;
  transform: scale(1.3);
}

/* 轮播箭头 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(5px);
}

.carousel-arrow:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow.prev {
  left: 20px;
}

.carousel-arrow.next {
  right: 20px;
}

.carousel-arrow svg {
  fill: currentColor;
}

/* 右侧文字内容样式 */
.hero-text-container {
  width: 40%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  animation: fadeInRight 1s ease-out;
}

.hero-text {
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
  max-width: 100%;
}

.hero-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
  background: linear-gradient(90deg, #ffffff, #ffeb99);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #fff9e6;
  font-weight: 500;
  letter-spacing: 1px;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.95);
}

/* 按钮组 */
.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.explore-btn {
  --el-button-bg-color: #ffcc33;
  --el-button-border-color: #ffcc33;
  --el-button-text-color: #333;
  --el-button-hover-bg-color: #ffdb66;
  --el-button-hover-border-color: #ffdb66;
  border-radius: 50px;
  font-weight: 700;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(255, 204, 51, 0.3);
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(255, 204, 51, 0.4);
}

.secondary-btn {
  --el-button-bg-color: transparent;
  --el-button-border-color: white;
  --el-button-text-color: white;
  --el-button-hover-bg-color: rgba(255, 255, 255, 0.1);
  --el-button-hover-border-color: white;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.2);
}



/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 滚动提示 */
.slide-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 100;
}
.indicator-text { color: rgba(255,255,255,0.9); margin-bottom:8px; font-size:14px; }
.indicator-arrow {
  width: 20px; height: 20px; border:2px solid rgba(255,255,255,0.85);
  border-left: none; border-top: none; transform: rotate(45deg);
  animation: scrollIndicator 1.5s infinite ease-in-out;
}
@keyframes scrollIndicator {
  0% { transform: translateY(0) rotate(45deg); opacity:0.7; }
  50% { transform: translateY(10px) rotate(45deg); opacity:1; }
  100% { transform: translateY(0) rotate(45deg); opacity:0.7; }
}

/* ---------- 第二屏：多媒体样式（基于你提供的 HTML/CSS） ---------- */
.multi-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 60px; /* 保留你原始的页面 padding（放在内部容器） */
  box-sizing: border-box;
  color: #3a3a2e;
}

/* 每行卡片 */
.multi-row {
  display: flex;
  background: #fffaf0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 60, 45, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100px;
}
.multi-row:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(74, 60, 45, 0.2);
}

/* 左侧标签 */
.multi-label {
  flex: 0 0 180px;
  background-color: #8da87f;
  color: #fffaf0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 右侧内容 */
.multi-content {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #556b2f;
  position: relative;
}

/* iframe */
.multi-content iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

/* slideshow（老照片） */
.slideshow {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f4e1;
}
.slideshow img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0; left: 0;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
}
.slideshow img.active {
  opacity: 1;
  transform: scale(1);
}

/* audio 宽度 */
.multi-content audio {
  width: 100%;
}

/* 文字模块 */
.text-box {
  max-height: 100%;
  overflow-y: auto;
  line-height: 1.6;
  width: 100%;
  padding-right: 8px;
  box-sizing: border-box;
}

/* footer */
.multi-footer {
  text-align: center;
  margin-top: 0;
  color: #7c6b49;
  font-size: 14px;
}

/* 响应式（保留原 HTML 的 media rules） */
@media (max-width: 1200px) {
  .hero-content {
    padding: 1.5rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
  }
  
  .hero-carousel {
    width: 90%;
    height: 50%;
    max-height: 400px;
  }
  
  .hero-text-container {
    width: 90%;
    text-align: center;
    align-items: center;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-tags {
    justify-content: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    width: 95%;
    height: 45%;
  }
  
  .hero-text-container {
    width: 95%;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .explore-btn,
  .secondary-btn {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 700px) {
  .multi-container { padding: 24px; }
  .multi-row { flex-direction: column; height: auto; }
  .multi-label { flex: none; width: 100%; padding: 14px 12px; }
  .multi-content { padding: 20px; }
}

@media (max-width: 480px) {
  .hero-carousel {
    width: 100%;
    height: 40%;
    border-radius: 15px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .carousel-arrow {
    width: 35px;
    height: 35px;
  }
  
  .carousel-indicators {
    bottom: 15px;
  }
}

/* 滚动条样式（仅在 text-box 内） */
.multi-container .text-box::-webkit-scrollbar {
  width: 8px; height: 8px;
}
.multi-container .text-box::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.12);
  border-radius: 6px;
}
</style>
