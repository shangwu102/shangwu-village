<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomeScreen1 from './home/HomeScreen1.vue'
import HomeScreen2 from './home/HomeScreen2.vue'
import HomeScreen3 from './home/HomeScreen3.vue'
import HomeScreen4 from './home/HomeScreen4.vue' // 导入第四屏组件 - 示例如何添加新屏幕

// --- 状态与配置 ---
const currentScreen = ref(0)
const lastScrollTime = ref(0)
const scrollDebounceTime = 500
const scrollThreshold = 50
const isAnimating = ref(false)
const containerRef = ref(null)

// 屏幕配置 - 未来添加更多屏幕时只需修改这里
const totalScreens = ref(4) // 更新为4个屏幕（示例如何添加第四屏）

// 获取所有屏幕元素的动态方法
const getAllScreens = () => {
  const screens = []
  for (let i = 0; i < totalScreens.value; i++) {
    const screen = document.querySelector(`.screen-${i + 1}`)
    if (!screen) return null // 如果任何一个屏幕元素不存在，则返回null
    screens.push(screen)
  }
  return screens
}

// 切换到指定屏幕的动态方法
const switchToScreen = (index) => {
  if (isAnimating.value || currentScreen.value === index || index < 0 || index >= totalScreens.value) return
  isAnimating.value = true
  if (containerRef.value) containerRef.value.classList.add('animating')

  // 获取所有屏幕元素
  const screens = getAllScreens()
  if (!screens) {
    isAnimating.value = false
    if (containerRef.value) containerRef.value.classList.remove('animating')
    return
  }

  // 移除所有屏幕的active类
  screens.forEach(screen => screen.classList.remove('active'))

  // 确定方向和相关屏幕
  const direction = index > currentScreen.value ? 'down' : 'up'
  const fromScreen = screens[currentScreen.value]
  const toScreen = screens[index]

  // 确保所有屏幕的transition属性正确设置
  screens.forEach(screen => {
    screen.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease'
  })

  // 设置目标屏幕初始位置
  toScreen.style.opacity = '0'
  toScreen.style.transform = direction === 'down'
    ? `translateY(${window.innerHeight}px) scale(0.98)`
    : `translateY(-${window.innerHeight}px) scale(0.98)`

  // 强制回流
  void toScreen.offsetHeight

  // 执行动画
  fromScreen.style.transform = direction === 'down'
    ? `translateY(-${window.innerHeight}px) scale(0.98)`
    : `translateY(${window.innerHeight}px) scale(0.98)`
  fromScreen.style.opacity = '0.7'
  toScreen.style.transform = 'translateY(0) scale(1)'
  toScreen.style.opacity = '1'

  // 更新当前屏幕
  setTimeout(() => toScreen.classList.add('active'), 120)
  currentScreen.value = index

  // 完成动画 - 重置所有屏幕的位置
  setTimeout(() => {
    isAnimating.value = false
    if (containerRef.value) containerRef.value.classList.remove('animating')
    
    // 动态设置所有屏幕的最终位置和透明度
    screens.forEach((screen, screenIndex) => {
      const translateY = (screenIndex - index) * window.innerHeight
      const opacity = Math.max(0.8, 1 - Math.abs(screenIndex - index) * 0.1)
      
      screen.style.transform = `translateY(${translateY}px)`
      screen.style.opacity = opacity.toString()
    })
  }, 820)
}

// 处理窗口大小变化
const handleResize = () => {
  const screens = getAllScreens()
  if (!screens) return
  
  // 动态设置所有屏幕的位置和透明度
  screens.forEach((screen, screenIndex) => {
    const translateY = (screenIndex - currentScreen.value) * window.innerHeight
    const opacity = Math.max(0.8, 1 - Math.abs(screenIndex - currentScreen.value) * 0.1)
    
    screen.style.transform = `translateY(${translateY}px)`
    screen.style.opacity = opacity.toString()
  })
}

// 处理探索按钮点击 - 跳转到第二个屏幕
const handleExploreClick = () => {
  switchToScreen(1)
}

// 屏幕组件配置数组
const screenComponents = [
  { id: 'screen-1', component: HomeScreen1, props: { onExploreClick: handleExploreClick } },
  { id: 'screen-2', component: HomeScreen2 },
  { id: 'screen-3', component: HomeScreen3 },
  { id: 'screen-4', component: HomeScreen4 } // 已添加第四屏组件作为示例
  // 未来添加第五屏、更多屏幕时在这里继续添加配置项
  // { id: 'screen-5', component: HomeScreen5 },
  // { id: 'screen-6', component: HomeScreen6 }
]

// 监听容器内滚轮切屏
const handleWheel = (e) => {
  const now = Date.now()
  if (now - lastScrollTime.value < scrollDebounceTime) return
  lastScrollTime.value = now
  if (isAnimating.value) return
  const scrollAmount = Math.abs(e.deltaY)
  if (scrollAmount < scrollThreshold) return

  // 动态处理滚轮切换，支持任意数量的屏幕
  if (e.deltaY > 0 && currentScreen.value < totalScreens.value - 1) {
    // 向下滚动，切换到下一个屏幕
    switchToScreen(currentScreen.value + 1)
  } else if (e.deltaY < 0 && currentScreen.value > 0) {
    // 向上滚动，切换到上一个屏幕
    switchToScreen(currentScreen.value - 1)
  }
}

onMounted(() => {
  // 仅在组件内隐藏默认浏览器滚动（在卸载时恢复）
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'

  // 获取所有屏幕并设置初始状态
  setTimeout(() => {
    const screens = getAllScreens()
    if (screens && screens.length > 0) {
      // 激活第一个屏幕
      screens[0].classList.add('active')
      
      // 动态设置所有屏幕的初始位置和透明度
      screens.forEach((screen, screenIndex) => {
        const translateY = screenIndex * window.innerHeight
        const opacity = Math.max(0.8, 1 - screenIndex * 0.1)
        
        screen.style.transform = `translateY(${translateY}px)`
        screen.style.opacity = opacity.toString()
      })
    }
  }, 100) // 延迟一下确保组件已经渲染

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
    <!-- 动态渲染所有屏幕组件 -->
    <component
      v-for="(screen, index) in screenComponents"
      :key="screen.id"
      :is="screen.component"
      :class="[screen.id, { active: currentScreen === index }]"
      v-bind="screen.props || {}"
    />
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

/* 屏幕通用样式 - 支持任意数量的屏幕 */
[class^="screen-"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease;
  will-change: transform, opacity;
  z-index: 1;
  /* 确保每个屏幕都能正确显示动画 */
  visibility: visible;
  opacity: 1;
}

[class^="screen-"].active {
  z-index: 2;
}
</style>
