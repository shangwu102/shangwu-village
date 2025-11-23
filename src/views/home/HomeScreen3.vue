<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 页面加载动画效果
onMounted(() => {
  // 渐入效果
  setTimeout(() => {
    const container = document.querySelector('.search-screen-container')
    if (container) {
      container.classList.add('fade-in')
    }
  }, 100)
})

// 搜索分类数据
const searchCategories = [
  { id: 'history', name: '口述历史', icon: '🔊', description: '聆听村民讲述过去的故事，记录珍贵的历史记忆' },
  { id: 'photos', name: '老照片馆', icon: '📸', description: '穿越时光的影像，感受乡村变迁与发展的历史足迹' },
  { id: 'scenery', name: '风物志', icon: '🏞️', description: '探索乡村独特的自然风光与人文景观，发现隐藏的美丽' },
  { id: 'diary', name: '手艺传承', icon: '📝', description: '记录传统手工艺的精湛技艺，传承非物质文化遗产' }
]

// 导航到搜索页面的对应分类
const navigateToCategory = (categoryId) => {
  router.push(`/search/${categoryId}`)
}
</script>

<template>
  <section class="slider-screen screen-3 search-screen">
    <div class="search-screen-container">
    
      <!-- 分类卡片网格 -->
      <div class="search-categories-grid">
        <div 
          v-for="category in searchCategories" 
          :key="category.id"
          class="category-card"
          @click="navigateToCategory(category.id)"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-hover">
            <span>探索</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* 第三屏幕基础样式 */
.search-screen {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease;
  overflow: hidden;
  background: linear-gradient(135deg, #66acc0 0%, #8fad3e 40%, #2ebe2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-3 {
  transform: translateY(200vh);
  opacity: 0.95;
}

/* 容器样式 */
.search-screen-container {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
  color: white;
}

.search-screen-container.fade-in {
  opacity: 1;
}

/* 页面标题 */
.search-screen-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
}

.search-screen-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #b8e694 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.search-screen-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 搜索框样式 */
.search-box-container {
  width: 100%;
  max-width: 700px;
  margin-bottom: 4rem;
  animation: floatUp 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes floatUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-input-wrapper {
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.search-input-wrapper:hover {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.search-input {
  flex: 1;
  padding: 1.2rem 2rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.1rem;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-button {
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  color: white;
  border: none;
  padding: 0 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* 分类卡片网格 */
.search-categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  animation: floatUp 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.category-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  transform: scaleX(0);
  transition: transform 0.4s ease;
  transform-origin: left;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
}

.category-name {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: white;
}

.category-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem 0;
}

.category-hover {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #84b854;
  transform: translateX(-20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.category-card:hover .category-hover {
  transform: translateX(0);
  opacity: 1;
}

/* 统计数据 */
.search-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  animation: floatUp 0.8s ease-out 0.9s forwards;
  opacity: 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #84b854;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .search-categories-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .search-screen-title {
    font-size: 3rem;
  }
  
  .search-stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .search-screen-container {
    padding: 2rem;
  }
  
  .search-screen-title {
    font-size: 2.5rem;
  }
  
  .search-screen-subtitle {
    font-size: 1rem;
  }
  
  .search-input {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
  
  .search-button {
    padding: 0 1.5rem;
  }
  
  .category-card {
    padding: 2rem;
  }
  
  .search-stats {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .search-screen-title {
    font-size: 2rem;
  }
  
  .category-card {
    padding: 1.5rem;
  }
  
  .category-icon {
    font-size: 2.5rem;
  }
  
  .category-name {
    font-size: 1.5rem;
  }
  
  .search-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>