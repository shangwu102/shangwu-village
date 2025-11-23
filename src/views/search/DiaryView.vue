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
    description: '参与传统农耕活动，了解二十四节气与农业生产的紧密联系，感受劳动的乐趣和收获的喜悦',
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
          

        </div>
        
        <!-- 查看详情按钮 -->
        <!-- <div class="view-details-btn">
          <span>探索详情</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div> -->
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
}

/* 英雄区域样式 */
.hero-section {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(101, 126, 73, 0.8) 0%, rgba(188, 165, 98, 0.8) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.hero-divider {
  width: 80px;
  height: 3px;
  background-color: #fff;
  margin: 0 auto 1.5rem;
  border-radius: 3px;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* 分类筛选样式 */
.category-filter {
  background-color: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.category-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.category-btn {
  padding: 0.6rem 1.4rem;
  border: 1px solid #e0e0e0;
  background-color: white;
  color: #666;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.category-btn:hover {
  background-color: #f8f9fa;
  border-color: #d0d0d0;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.category-btn.active {
  background-color: #657e49;
  color: white;
  border-color: #657e49;
  box-shadow: 0 3px 15px rgba(101, 126, 73, 0.3);
}

/* 文化项目网格 */
.cultural-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 3rem auto;
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

/* 文化探索特色 */
.exploration-features {
  background-color: #f0f4e8;
  padding: 4rem 1.5rem;
  text-align: center;
}

.section-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #657e49;
  border-radius: 3px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  background-color: white;
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background-color: #657e49;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  background-color: #8ba66e;
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

/* 底部号召性按钮 */
.cta-section {
  background-color: #657e49;
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  background-color: white;
  color: #657e49;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #f8f9fa;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.8rem;
  }
  
  .cultural-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .features-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 450px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .category-wrapper {
    justify-content: center;
  }
  
  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .cultural-items-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .item-image-container {
    height: 180px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .category-filter {
    padding: 1rem 0;
  }
  
  .category-wrapper {
    gap: 0.5rem;
  }
  
  .cultural-items-grid {
    margin: 2rem auto;
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
  
  .exploration-features {
    padding: 3rem 1rem;
  }
  
  .feature-item {
    padding: 2rem 1rem;
  }
  
  .cta-section {
    padding: 3rem 1rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .cta-subtitle {
    font-size: 1rem;
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

.feature-item:nth-child(1) {
  transition-delay: 0.1s;
}

.feature-item:nth-child(2) {
  transition-delay: 0.2s;
}

.feature-item:nth-child(3) {
  transition-delay: 0.3s;
}
</style>