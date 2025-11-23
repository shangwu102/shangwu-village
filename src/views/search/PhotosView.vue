<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import photos1 from '@/assets/search/2/1.jpg'
import photos2 from '@/assets/search/2/2.webp'
import photos3 from '@/assets/search/2/3.jpg'
import photos4 from '@/assets/search/2/4.webp'
import photos5 from '@/assets/search/2/5.webp'
import photos6 from '@/assets/search/2/6.webp'

// 3D画廊图片数据
const galleryData = [
  {
    id: 1,
    title: '乡村自然风光',
    subtitle: '未被雕琢的乡村原始美景。',
    imageUrl: photos1
  },
  {
    id: 2,
    title: '传统村落建筑',
    subtitle: '乡村生活的建筑文化遗产。',
    imageUrl: photos2
  },
  {
    id: 3,
    title: '农耕文化传承',
    subtitle: '守护乡村传统与习俗。',
    imageUrl: photos3
  },
  {
    id: 4,
    title: '乡村振兴新貌',
    subtitle: '现代化农村建设成果。',
    imageUrl: photos4
  },
  {
    id: 5,
    title: '农业科技创新',
    subtitle: '现代科技助力乡村农业发展。',
    imageUrl: photos5
  },
  {
    id: 6,
    title: '基础设施建设',
    subtitle: '连接乡村与城市的桥梁。',
    imageUrl: photos6
  }
]

// 当前显示的图片索引
const currentIndex = ref(0)
// 动画状态
const isAnimating = ref(false)
// 动画方向
const animationDirection = ref('')
// 3D倾斜效果变量
const tiltX = ref(0)
const tiltY = ref(0)
const maxTilt = 3 // 最大倾斜角度

// 获取当前图片
const currentImage = computed(() => galleryData[currentIndex.value])

// 切换到上一张
const previousImage = () => {
  if (isAnimating.value) return
  
  animationDirection.value = 'left'
  isAnimating.value = true
  
  setTimeout(() => {
    currentIndex.value = (currentIndex.value - 1 + galleryData.length) % galleryData.length
    // 延迟一小段时间再重置动画状态，确保动画完全播放
    setTimeout(() => {
      isAnimating.value = false
    }, 50)
  }, 450)
}

// 切换到下一张
const nextImage = () => {
  if (isAnimating.value) return
  
  animationDirection.value = 'right'
  isAnimating.value = true
  
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % galleryData.length
    // 延迟一小段时间再重置动画状态，确保动画完全播放
    setTimeout(() => {
      isAnimating.value = false
    }, 50)
  }, 450)
}

// 跳转到指定图片
const goToImage = (index) => {
  if (isAnimating.value || index === currentIndex.value) return
  
  // 确定动画方向
  animationDirection.value = index > currentIndex.value ? 'right' : 'left'
  isAnimating.value = true
  
  setTimeout(() => {
    currentIndex.value = index
    // 延迟一小段时间再重置动画状态，确保动画完全播放
    setTimeout(() => {
      isAnimating.value = false
    }, 25)
  }, 45)
}

// 处理鼠标移动，实现3D效果
const handleMouseMove = (e) => {
  const container = e.currentTarget
  const rect = container.getBoundingClientRect()
  
  // 计算鼠标相对于容器中心的位置（范围：-1 到 1）
  const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
  const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
  
  // 计算倾斜角度，增大倾斜角度以增强效果
  tiltX.value = -x * maxTilt * 5
  tiltY.value = y * maxTilt * 5
}

// 重置3D效果
const reset3D = () => {
  tiltX.value = 0
  tiltY.value = 0
}

// 计算图片变换样式
const imageTransformStyle = computed(() => {
  return {
    transform: `perspective(1200px) rotateX(${tiltY.value}deg) rotateY(${tiltX.value}deg) scale(1.1)`,
    transition: 'transform 0.1s ease-out'
  }
})

// 监听键盘事件
onMounted(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      previousImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  
  return () => {
    window.removeEventListener('keydown', handleKeyPress)
  }
})

// 添加自动轮播功能
const autoPlay = ref(false)
let autoPlayInterval = null

const startAutoPlay = () => {
  if (!autoPlay.value) {
    autoPlay.value = true
    autoPlayInterval = setInterval(() => {
      nextImage()
    }, 5000)
  }
}

const stopAutoPlay = () => {
  if (autoPlay.value) {
    autoPlay.value = false
    clearInterval(autoPlayInterval)
  }
}

watch(autoPlay, (newVal) => {
  if (newVal) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
})

// 组件挂载时启动自动轮播
onMounted(() => {
  startAutoPlay()
})
</script>

<template>
  <!-- 3D画廊容器 -->
  <div class="gallery-container" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
      <!-- 左侧预览 -->
      <div class="gallery-side left-side">
        <div class="side-preview" @click="previousImage">
          <div class="preview-image-container">
            <img 
              :src="galleryData[(currentIndex - 1 + galleryData.length) % galleryData.length].imageUrl" 
              alt="Previous preview"
              class="preview-image"
            />
          </div>
        </div>
      </div>
      
      <!-- 主图片显示区 -->
      <div class="gallery-main">
        <div class="gallery-header">
          <span class="gallery-title"> 3D 画廊</span>
        </div>
        
        <div class="main-image-container" @mousemove="handleMouseMove" @mouseleave="reset3D">
          <div class="image-wrapper" :style="imageTransformStyle">
            <img 
              :src="currentImage.imageUrl" 
              :alt="currentImage.title"
              class="main-image"
              :class="{
                'animate-in-right': isAnimating && animationDirection === 'right',
                'animate-in-left': isAnimating && animationDirection === 'left'
              }"
              :key="currentImage.id"
            />
          </div>
        </div>
        
        <div class="gallery-caption">
          <h2 class="image-title">{{ currentImage.title }}</h2>
          <p class="image-subtitle">{{ currentImage.subtitle }}</p>
        </div>
        
        <!-- 导航控制 -->
        <div class="gallery-controls">
          
          <!-- 分页指示器 -->
          <div class="pagination">
            <span 
              v-for="(item, index) in galleryData" 
              :key="item.id"
              class="pagination-dot"
              :class="{ active: index === currentIndex }"
              @click="goToImage(index)"
            ></span>
          </div>
        </div>
      </div>
      
      <!-- 右侧预览 -->
      <div class="gallery-side right-side">
        <div class="side-preview" @click="nextImage">
          <div class="preview-image-container">
            <img 
              :src="galleryData[(currentIndex + 1) % galleryData.length].imageUrl" 
              alt="Next preview"
              class="preview-image"
            />
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
/* 全局容器样式 */
/* 将archive-gallery-3d的样式合并到gallery-container */
.gallery-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  height: 50vh;
  position: relative;
  margin: 0 auto;
  min-height: 60vh;
  background-color: #ffffff;
  /* padding: 2rem; */
  font-family: 'Arial', sans-serif;
}

/* 画廊容器样式已合并到上面 */

/* 侧边预览 */
.gallery-side {
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.gallery-side:hover {
  opacity: 0.9;
}

.side-preview {
  width: 100%;
  height: 80%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.side-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.3);
}

.preview-image-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.side-preview:hover .preview-image {
  filter: brightness(0.9);
}

/* 主图片区域 */
.gallery-main {
  width: 70%;
  height: 100%;
  margin: 0 1rem;
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
}

/* 画廊标题 */
.gallery-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);
  z-index: 10;
}

.gallery-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #e6b422;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* 主图片容器 */
.main-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  perspective: 1200px;
  cursor: pointer;
}

/* 图片包装器，用于应用3D变换 */
.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: center center;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  will-change: transform;
}

/* 确保变换样式应用正确 */
.gallery-main:hover .image-wrapper {
  transform: perspective(1200px) rotateX(0) rotateY(0) scale(1.1);
}

/* 图片切换动画 */
.main-image {
  transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform, opacity;
}

.main-image.animate-in-right {
  opacity: 0;
  transform: translateX(80px) scale(0.95);
}

.main-image.animate-in-left {
  opacity: 0;
  transform: translateX(-80px) scale(0.95);
}

/* 确保图片切换时的初始状态 */
.main-image:not(.animate-in-right):not(.animate-in-left) {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* 图片说明文字过渡动画 */
.gallery-caption {
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* 确保3D变换和过渡效果正常工作 */
.image-wrapper {
  transition: transform 0.15s ease-out;
}

/* 图片说明文字 */
.gallery-caption {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  padding: 0 2rem;
  z-index: 10;
  text-align: left;
  color: white;
}

.image-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.image-subtitle {
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* 控制按钮和分页 */
.gallery-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 10;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-button:hover {
  background-color: rgba(230, 180, 34, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.pagination-dot.active {
  width: 12px;
  height: 8px;
  border-radius: 4px;
  background-color: #e6b422;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .gallery-container {
    height: 60vh;
  }
  
  .gallery-side {
    width: 10%;
  }
  
  .gallery-main {
    width: 80%;
  }
  
  .image-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .archive-gallery-3d {
    padding: 1rem;
  }
  
  .gallery-container {
    height: 50vh;
  }
  
  .gallery-side {
    display: none;
  }
  
  .gallery-main {
    width: 100%;
    margin: 0;
  }
  
  .gallery-caption {
    bottom: 70px;
    padding: 0 1.5rem;
  }
  
  .image-title {
    font-size: 1rem;
  }
  
  .image-subtitle {
    font-size: 0.8rem;
  }
  
  .gallery-controls {
    gap: 1.5rem;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .gallery-container {
    height: 40vh;
  }
  
  .gallery-title {
    font-size: 0.8rem;
  }
  
  .gallery-caption {
    bottom: 60px;
  }
  
  .nav-button {
    width: 30px;
    height: 30px;
  }
  
  .pagination {
    gap: 0.3rem;
  }
  
  .pagination-dot {
    width: 6px;
    height: 6px;
  }
  
  .pagination-dot.active {
    width: 10px;
    height: 6px;
  }
}
</style>