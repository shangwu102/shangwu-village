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
    category: '自然景观'
  },
  {
    id: 2,
    title: '古石桥',
    description: '始建于清朝道光年间，横跨村前小溪，见证了村庄的百年变迁。',
    imageUrl: scenery2,
    category: '人文景观'
  },
  {
    id: 3,
    title: '梯田景观',
    description: '村内梯田层层叠叠，春季油菜花海，秋季金黄稻浪，美不胜收。',
    imageUrl: scenery3,
    category: '自然景观'
  },
  {
    id: 4,
    title: '老祠堂',
    description: '保存完好的明清建筑群，是村内重要的文化活动场所。',
    imageUrl: scenery4,
    category: '人文景观'
  },
  {
    id: 5,
    title: '竹海景观',
    description: '村后大片竹林，四季常青，微风拂过，沙沙作响，宛如仙境。',
    imageUrl: scenery5,
    category: '自然景观'
  },
  {
    id: 6,
    title: '古井',
    description: '村内百年古井，水质清冽甘甜，至今仍在使用。',
    imageUrl: scenery6,
    category: '人文景观'
  }
]

// 直接使用原始数据
const filteredScenery = computed(() => sceneryData)
</script>

<template>
    <div class="scenery-content category-content">
      <!-- 风物志展示区域 -->
    <div class="scenery-gallery">
      <div v-for="item in filteredScenery" :key="item.id" class="scenery-card">
        <div class="scenery-image-container">
          <img :src="item.imageUrl" :alt="item.title" class="scenery-image" />
          <div class="category-tag">{{ item.category }}</div>
    </div>
        <div class="scenery-info">
          <h3 class="scenery-title">{{ item.title }}</h3>
          <p class="scenery-description">{{ item.description }}</p>
        </div>
      </div>
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

/* 响应式设计 */
@media (max-width: 768px) {
  .scenery-gallery {
    grid-template-columns: 1fr;
  }
}
</style>