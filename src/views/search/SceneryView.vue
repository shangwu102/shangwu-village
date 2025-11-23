<script setup>
import { ref, computed } from 'vue'
import scenery1 from '@/assets/search/3/1.jpg'
import scenery2 from '@/assets/search/3/2.webp'
import scenery3 from '@/assets/search/3/3.jpg'
import scenery4 from '@/assets/search/3/4.jpg'
import scenery5 from '@/assets/search/3/5.jpg'
import scenery6 from '@/assets/search/3/6.webp'

// 风物志内容数据
const sceneryData = [
  {
    id: 1,
    title: '千年古银杏树',
    description: '村内有一棵千年古银杏，树龄超过1200年，枝繁叶茂，是村民心中的神树。',
    imageUrl: scenery1,
    category: '自然景观',
    highlight: true
  },
  {
    id: 2,
    title: '古石桥',
    description: '始建于清朝道光年间，横跨村前小溪，见证了村庄的百年变迁。',
    imageUrl: scenery2,
    category: '人文景观',
    highlight: false
  },
  {
    id: 3,
    title: '梯田景观',
    description: '村内梯田层层叠叠，春季油菜花海，秋季金黄稻浪，美不胜收。',
    imageUrl: scenery3,
    category: '自然景观',
    highlight: true
  },
  {
    id: 4,
    title: '老祠堂',
    description: '保存完好的明清建筑群，是村内重要的文化活动场所。',
    imageUrl: scenery4,
    category: '人文景观',
    highlight: true
  },
  {
    id: 5,
    title: '竹海景观',
    description: '村后大片竹林，四季常青，微风拂过，沙沙作响，宛如仙境。',
    imageUrl: scenery5,
    category: '自然景观',
    highlight: false
  },
  {
    id: 6,
    title: '古井',
    description: '村内百年古井，水质清冽甘甜，至今仍在使用。',
    imageUrl: scenery6,
    category: '人文景观',
    highlight: false
  }
]

// 筛选分类
const selectedCategory = ref('all')
const categories = ['自然景观', '人文景观']

// 是否只显示精选
const showOnlyHighlights = ref(false)

// 筛选后的风物志内容
const filteredScenery = computed(() => {
  let result = sceneryData
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(item => item.category === selectedCategory.value)
  }
  
  if (showOnlyHighlights.value) {
    result = result.filter(item => item.highlight)
  }
  
  return result
})

// 切换分类筛选
const handleCategoryChange = (category) => {
  selectedCategory.value = category
}

// 切换精选显示
const toggleHighlights = () => {
  showOnlyHighlights.value = !showOnlyHighlights.value
}
</script>

<template>
  <div class="scenery-content category-content">
    <!-- 筛选器 -->
    <div class="scenery-filters">
      <div class="category-filter">
        <button 
          v-for="category in ['all', ...categories]" 
          :key="category" 
          :class="['category-btn', { active: selectedCategory === category }]"
          @click="handleCategoryChange(category)"
        >
          {{ category === 'all' ? '全部' : category }}
        </button>
      </div>
      
      <div class="highlight-toggle">
        <label class="highlight-checkbox">
          <input type="checkbox" v-model="showOnlyHighlights" @change="toggleHighlights" />
          <span class="checkmark"></span>
          <span class="text">仅显示精选</span>
        </label>
      </div>
    </div>
    
    <!-- 风物志展示区域 -->
    <div class="scenery-gallery">
      <div v-for="item in filteredScenery" :key="item.id" class="scenery-card">
        <div class="scenery-image-container">
          <img :src="item.imageUrl" :alt="item.title" class="scenery-image" />
          <div v-if="item.highlight" class="highlight-badge">精选</div>
          <div class="category-tag">{{ item.category }}</div>
        </div>
        <div class="scenery-info">
          <h3 class="scenery-title">{{ item.title }}</h3>
          <p class="scenery-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 无结果提示 -->
    <div v-if="filteredScenery.length === 0" class="no-results">
      <p>暂无符合条件的风物志内容</p>
    </div>
  </div>
</template>

<style scoped>
.scenery-content {
  animation: tabContentSwap 0.5s ease-out;
}

@keyframes tabContentSwap {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.scenery-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.category-btn:hover {
  background-color: #5f8ccf;
  color: white;
  border-color: #5f8ccf;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(95, 140, 207, 0.2);
}

.category-btn.active {
  background-color: #5f8ccf;
  color: white;
  border-color: #5f8ccf;
  box-shadow: 0 3px 8px rgba(95, 140, 207, 0.2);
}

.highlight-toggle {
  display: flex;
  align-items: center;
}

.highlight-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.highlight-checkbox input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 20px;
  width: 20px;
  background-color: #f1f1f1;
  border-radius: 4px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

.highlight-checkbox:hover input ~ .checkmark {
  background-color: #e1e1e1;
}

.highlight-checkbox input:checked ~ .checkmark {
  background-color: #5f8ccf;
  border-color: #5f8ccf;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.highlight-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.highlight-checkbox .checkmark:after {
  left: 8px;
  top: 4px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.highlight-checkbox .text {
  margin-left: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}

.scenery-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.scenery-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.scenery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.scenery-image-container {
  position: relative;
  overflow: hidden;
}

.scenery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.scenery-card:hover .scenery-image {
  transform: scale(1.05);
}

.highlight-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(237, 100, 166, 0.9);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.category-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.scenery-info {
  padding: 1.2rem;
}

.scenery-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.scenery-card:hover .scenery-title {
  color: #5f8ccf;
}

.scenery-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: #666;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .scenery-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .scenery-gallery {
    grid-template-columns: 1fr;
  }
}
</style>