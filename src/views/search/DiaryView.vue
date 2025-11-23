<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import diary1 from '@/assets/search/1/1.jpg'
import diary2 from '@/assets/search/1/2.jpg'
import diary3 from '@/assets/search/1/3.jpg'

const router = useRouter()

// 乡村文化探索数据
const culturalItems = ref([
  {
    id: 1,
    title: '农耕文化体验',
    category: '体验活动',
    description: '参与传统农耕活动，了解二十四节气与农业生产的紧密联系，感受劳动的乐趣和收获的喜悦。',
    imageUrl: diary1,
    icon: '🌾',
    participants: 156,
    rating: 4.8,
    tags: ['农耕', '体验', '互动']
  },
  {
    id: 2,
    title: '乡村手工艺传承',
    category: '文化传承',
    description: '探访当地手工艺人，学习传统编织、陶艺、剪纸等技艺，亲手制作独特的乡村手工艺品。',
    imageUrl: diary2,
    icon: '🎨',
    participants: 89,
    rating: 4.9,
    tags: ['手工艺', '传承', '学习']
  },
  {
    id: 3,
    title: '乡土美食寻味',
    category: '美食文化',
    description: '品尝地道农家菜，学习传统烹饪技艺，了解食材的季节性和当地饮食文化的历史渊源。',
    imageUrl: diary3,
    icon: '🍲',
    participants: 203,
    rating: 4.7,
    tags: ['美食', '烹饪', '传统']
  }
])

// 类别筛选
const selectedCategory = ref('全部')
const categories = ['全部', '体验活动', '文化传承', '美食文化', '民俗节庆', '自然风光']

// 筛选后的文化项目
const filteredItems = computed(() => {
  if (selectedCategory.value === '全部') {
    return culturalItems.value
  }
  return culturalItems.value.filter(item => item.category === selectedCategory.value)
})

// 切换类别
const handleCategoryChange = (category) => {
  selectedCategory.value = category
}

// 滚动动画状态
const animatedItems = ref([])

// 观察元素进入视口
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animatedItems.value.push(parseInt(entry.target.dataset.id))
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(observerCallback, observerOptions)
  document.querySelectorAll('.cultural-item').forEach(item => {
    observer.observe(item)
  })
  
  return () => {
    observer.disconnect()
  }
})

// 查看详情
const viewDetails = (itemId) => {
  // 这里可以导航到详情页或显示详情模态框
  console.log('查看详情:', itemId)
  // router.push(`/cultural-detail/${itemId}`)
}
</script>

<template>
  <div class="cultural-exploration-container">
    
    <!-- 文化项目展示 -->
    <div class="cultural-items-grid">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="cultural-item"
        :data-id="item.id"
        :class="{ 'animate-in': animatedItems.includes(item.id) }"
        @click="viewDetails(item.id)"
      >
        <!-- 项目图片区域 -->
        <div class="item-image-container">
          <img :src="item.imageUrl" :alt="item.title" class="item-image" />
          <div class="item-category-badge">{{ item.category }}</div>
        </div>
        
        <!-- 项目内容 -->
        <div class="item-content">
          <!-- 项目标题和图标 -->
          <div class="item-header">
            <span class="item-icon">{{ item.icon }}</span>
            <h3 class="item-title">{{ item.title }}</h3>
          </div>
          
          <!-- 项目描述 -->
          <p class="item-description">{{ item.description }}</p>
          
          <!-- 项目标签 -->
          <div class="item-tags">
            <span v-for="tag in item.tags" :key="tag" class="item-tag">{{ tag }}</span>
          </div>
          
          <!-- 项目统计信息 -->
          <div class="item-stats">
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{{ item.participants }}人参与</span>
            </div>
            <div class="stat-item rating">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>{{ item.rating }}</span>
            </div>
          </div>
        </div>
        
        <!-- 查看详情按钮 -->
        <div class="view-details-btn">
          <span>探索详情</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局容器样式 */
.cultural-exploration-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 2rem 0;
}

/* 文化项目网格 */
.cultural-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 文化项目卡片 */
.cultural-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
}

.cultural-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.cultural-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

/* 项目图片区域 */
.item-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.cultural-item:hover .item-image {
  transform: scale(1.1);
}

.item-category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #657e49;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

/* 项目内容 */
.item-content {
  padding: 1.5rem;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.item-icon {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.3;
}

.item-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
}

/* 项目标签 */
.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.item-tag {
  background-color: #f0f4e8;
  color: #657e49;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 项目统计信息 */
.item-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #888;
  font-size: 0.9rem;
}

.stat-item.rating {
  color: #f5a623;
}

/* 查看详情按钮 */
.view-details-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.cultural-item:hover .view-details-btn {
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .cultural-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .cultural-items-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .item-image-container {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .cultural-items-grid {
    margin: 1rem auto;
    gap: 1.5rem;
  }
  
  .cultural-item {
    margin: 0 0.5rem;
  }
  
  .item-content {
    padding: 1.2rem;
  }
  
  .item-title {
    font-size: 1.2rem;
  }
}

/* 动画延迟 */
.cultural-item:nth-child(1) {
  transition-delay: 0.1s;
}

.cultural-item:nth-child(2) {
  transition-delay: 0.2s;
}

.cultural-item:nth-child(3) {
  transition-delay: 0.3s;
}
</style>