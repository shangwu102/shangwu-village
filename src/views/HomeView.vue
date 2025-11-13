<template>
  <div class="slider-container" ref="containerRef">
    <!-- 第一屏 -->
    <section class="slider-screen screen-1">
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">香溢乡村</h1>
            <p class="hero-description">
              香溢乡村，一场寻味自然的旅程。在这里，我们带您漫游田园风光，
              寻踪乡村记忆，探索自然好物。每一处风景都承载着乡土情怀，
              每一件好物都凝聚着匠人心血。让我们一起感受乡村的自然之美，
              品味土地的馈赠，聆听乡野的故事，体验最纯粹的生态生活方式。
            </p>
            <ElButton type="primary" size="large" class="explore-btn" @click="handleExploreClick">
                开启香溢之旅
              </ElButton>
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

/* ---------- 第一屏样式保留 ---------- */
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}
.hero-text {
  max-width: 600px;
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}
.hero-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}
.hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}
.hero-description {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.15);
}
.explore-btn {
  --el-button-bg-color: #ffcc33;
  --el-button-border-color: #ffcc33;
  --el-button-text-color: #333;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
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
@media (max-width: 700px) {
  .multi-container { padding: 24px; }
  .multi-row { flex-direction: column; height: auto; }
  .multi-label { flex: none; width: 100%; padding: 14px 12px; }
  .multi-content { padding: 20px; }
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
