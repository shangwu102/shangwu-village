<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ElButton } from 'element-plus'

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

// 添加页面元素动画
const animateElements = async () => {
  await nextTick()
  const heroText = document.querySelector('.hero-text')
  if (heroText) {
    setTimeout(() => {
      heroText.classList.add('animate-in')
    }, 300)
  }
}

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

  // 触发页面初始化动画
  animateElements()

  const s1 = document.querySelector('.screen-1')
  if (s1) s1.classList.add('active')

  // container wheel
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', handleWheel, { passive: true })
  }

  // 初始化轮播（使用 slideshowRef 优先）
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
  if (slideshowTimer) {
    clearInterval(slideshowTimer)
    slideshowTimer = null
  }
  // 恢复默认滚动
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>
<template>
  <div class="slider-container" ref="containerRef">
    <!-- 第一屏 -->
    <section class="slider-screen screen-1">
      <div class="hero-section">
        <div class="hero-content">
          <!-- 左侧文字内容 -->
          <div class="hero-text">
            <h1 class="hero-title">忆脉乡传</h1>
            <p class="hero-description">
              忆脉乡传
              每一座传统村落，都是一部镌刻在山水之间的厚重史书，承载着绵延千年的烟火气与人情味。
              然而，时代的洪流奔涌向前，这些散落在阡陌交错的记忆瑰宝，正悄然淡出我们的视野。
              为此，云行阡陌应运而生。在这里，每一次相逢，都藏着与乡土的心意相通——您品尝的是一方水土的滋味，
              您触摸的是一件器物承载的匠心，您听到的是一段被时光打磨的往事。在乡忆寻踪里，发现失落的坐标；
              在乡忆漫游中，沉浸于田园的诗意；在乡忆好物间，带走一份有故事的温暖。让我们一起“忆脉乡传”，开启乡忆之旅。
            </p>
            <!-- <ElButton size="large" class="explore-btn" @click="handleExploreClick">
              开启乡村之旅
            </ElButton> -->
          </div>

          <!-- 右侧乡村文创展示区域 -->
          <div class="creative-right-section">
            <!-- 左上圆形图片 -->
            <div class="creative-item top-left">
              <div class="creative-circle">
                <img src="../assets/shouye1.png" alt="文创扇子" class="creative-image">
              </div>
            </div>

            <!-- 右上圆形图片 -->
            <div class="creative-item top-right">
              <div class="creative-circle">
                <img src="../assets/shouye2.png" alt="文创T恤" class="creative-image">
              </div>
            </div>

            <!-- 下方圆形图片 -->
            <div class="creative-item bottom-center">
              <div class="creative-circle">
                <img src="../assets/shouye3.png" alt="文创书签" class="creative-image">
              </div>
            </div>

            <!-- 文创文字说明 -->
            <div class="creative-text-overlay">
              <h3 class="creative-mini-title">乡村味道</h3>
              <p class="creative-mini-desc">封存于方寸之间</p>
            </div>
          </div>
        </div>

        <!-- <div class="slide-indicator">
          <div class="indicator-text">向下滚动探索更多</div>
          <div class="indicator-arrow"></div>
        </div> -->
      </div>
    </section>

    <!-- 第二屏：多媒体展示（采用你提供的“大地色生态风格”样式） -->
    <!-- <section class="slider-screen screen-2">
      <div class="multi-container">
        <div class="multi-row">
          <div class="multi-label">360°</div>
          <div class="multi-content">
            <iframe src="https://app.cloudpano.com/tours/TQl4SzPOaX" allowfullscreen frameborder="0"></iframe>
          </div>
        </div>

        <div class="multi-row">
          <div class="multi-label">老照片</div>
          <div class="multi-content">
            <div class="slideshow" ref="slideshowRef">
              <img src="../assets/test1.jpg" class="active" />
              <img src="../assets/test2.jpg" />
              <img src="../assets/test3.jpg" />
              <img src="../assets/test4.jpg" />
            </div>
          </div>
        </div>
        <div class="multi-row">
          <div class="multi-label">录音</div>
          <div class="multi-content">
            <audio controls>
              <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
              您的浏览器不支持音频播放。
            </audio>
          </div>
        </div>
        <div class="multi-row">
          <div class="multi-label">土特产</div>
          <div class="multi-content">
            <div class="text-box">
              <p>这是一段示例说明文字。这里可以展示历史背景、人物故事或展览内容的详细文字介绍。用户可以滚动查看更多内容。</p>
              <p>文字模块支持长文本展示，并可结合其他多媒体模块共同构成完整的信息体验。设计上注重可读性与层次感。</p>
              <p>在真实项目中，这部分可以接入数据库或后台CMS内容管理系统。</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

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
  overflow: auto;
  /* 允许第二屏内部滚动 */
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f0f4eb;
}

/* ---------- 第一屏样式 ---------- */
.hero-section {
  background: linear-gradient(135deg, #87CEEB 0%, #E0F7FA 30%, #F5F5DC 60%, #DEB887 100%);
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.4) 0%, transparent 30%),
    radial-gradient(circle at 70% 25%, rgba(255, 255, 255, 0.3) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(160, 82, 45, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 85% 75%, rgba(34, 139, 34, 0.15) 0%, transparent 30%);
  opacity: 0.7;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

/* 左侧文字区域 */
.hero-text {
  max-width: 50%;
  color: #3a3a2e;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.8s ease;
  padding-right: 2rem;
  margin-bottom: 15rem;
}

.hero-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  color: #049dda;
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow:
    1px 1px 2px rgba(0, 0, 0, 0.2),
    2px 2px 4px rgba(0, 0, 0, 0.1);
  transform: perspective(500px) rotateX(2deg);
  letter-spacing: 1px;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 2;
  margin-bottom: 1.2rem;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
  text-indent: 2em;
  /* 添加首行缩进 */
  color: #3a3a2e;
  font-weight: 500;
}

.explore-btn {
  --el-button-bg-color: #ffcc33;
  --el-button-border-color: #ffcc33;
  --el-button-text-color: #333;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  transition: background-color 0.3s ease;
}

.explore-btn:hover {
  color: #84b854;
  background-color: #88e25f;
  /* --el-button-bg-color: #fff7b3; */
  /* --el-button-border-color: #fff7b3; */
}

/* 右侧乡村文创展示区域 */
.creative-right-section {
  position: relative;
  width: 50%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 圆形图片容器 */
.creative-item {
  position: absolute;
  transition: transform 0.3s ease;
}

.creative-item:hover {
  transform: scale(1.05);
}

/* 右侧区域内的圆形图片位置 */
.creative-right-section .top-left {
  top: 10%;
  left: 15%;
}

.creative-right-section .top-right {
  top: 10%;
  right: 15%;
}

.creative-right-section .bottom-center {
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
}

/* 圆形图片样式 */
.creative-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  /* 移除内边距，让图片完全填满圆形 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 3px solid rgba(255, 255, 255, 0.8);
}

.creative-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.creative-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 修改为cover使图片填满容器 */
  border-radius: 50%;
  transition: transform 0.5s ease;
}

.creative-item:hover .creative-image {
  transform: scale(1.1);
}

/* 文创文字覆盖层 */
.creative-text-overlay {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #2c5e1a;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  z-index: 10;
}

.creative-mini-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.5s forwards;
  color: #c5c090;
}

.creative-mini-desc {
  font-size: 1rem;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.8s forwards;
  color: #3a3a2e;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 中间文字区域 */
.creative-text-section {
  text-align: center;
  transform: translateY(-50px);
}

.creative-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #3a3a2e;
  margin-bottom: 0.8rem;
}

.creative-description {
  font-size: 1.1rem;
  color: #7c6b49;
  line-height: 1.6;
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

.indicator-text {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  font-size: 14px;
}

.indicator-arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
  animation: scrollIndicator 1.5s infinite ease-in-out;
}

@keyframes scrollIndicator {
  0% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.7;
  }

  50% {
    transform: translateY(10px) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.7;
  }
}

/* ---------- 第二屏：多媒体样式（基于你提供的 HTML/CSS） ---------- */
.multi-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 60px;
  /* 保留你原始的页面 padding（放在内部容器） */
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
  top: 0;
  left: 0;
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

/* 响应式设计 */
/* 中等屏幕 */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
    padding-right: 0;
    padding-bottom: 2rem;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .creative-right-section {
    width: 100%;
    max-width: 500px;
    height: 50vh;
  }

  .creative-circle {
    width: 160px;
    height: 160px;
  }
}

/* 小屏幕 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .creative-right-section .top-left,
  .creative-right-section .top-right {
    top: 15%;
  }

  .creative-right-section .top-left {
    left: 10%;
  }

  .creative-right-section .top-right {
    right: 10%;
  }

  .creative-circle {
    width: 130px;
    height: 130px;
  }
}

/* 移动设备 */
@media (max-width: 480px) {
  .hero-content {
    padding: 1rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .explore-btn {
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
  }

  .creative-circle {
    width: 100px;
    height: 100px;
    /* 移除内边距，让图片完全填满圆形 */
  }

  .creative-right-section .top-left {
    top: 20%;
    left: 5%;
  }

  .creative-right-section .top-right {
    top: 20%;
    right: 5%;
  }

  .creative-right-section .bottom-center {
    bottom: 25%;
  }

  .creative-mini-title {
    font-size: 1.4rem;
  }

  .creative-mini-desc {
    font-size: 0.85rem;
  }
}

/* 第二屏响应式（保留原设计） */
@media (max-width: 700px) {
  .multi-container {
    padding: 24px;
  }

  .multi-row {
    flex-direction: column;
    height: auto;
  }

  .multi-label {
    flex: none;
    width: 100%;
    padding: 14px 12px;
  }

  .multi-content {
    padding: 20px;
  }
}

/* 滚动条样式（仅在 text-box 内） */
.multi-container .text-box::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.multi-container .text-box::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
</style>
