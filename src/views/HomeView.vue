<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomeScreen1 from './home/HomeScreen1.vue'
import HomeScreen2 from './home/HomeScreen2.vue'

// --- 状态与配置 ---
const currentScreen = ref(0)
const lastScrollTime = ref(0)
const scrollDebounceTime = 500
const scrollThreshold = 50
const isAnimating = ref(false)
const containerRef = ref(null)

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

  const s1 = document.querySelector('.screen-1')
  if (s1) s1.classList.add('active')

  // container wheel
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', handleWheel, { passive: true })
  }

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (containerRef.value) containerRef.value.removeEventListener('wheel', handleWheel)
  window.removeEventListener('resize', handleResize)
  // 恢复默认滚动
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})
</script>
<template>
  <div class="slider-container" ref="containerRef">
    <!-- 第一屏组件 -->
    <HomeScreen1 :onExploreClick="handleExploreClick" />
    
    <!-- 第二屏组件 -->
    <HomeScreen2 />
  </div>
</template>

<style scoped>
/* ---------- 容器 ---------- */
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
</style>
