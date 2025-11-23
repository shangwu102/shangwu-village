<script setup>
import { ref, computed } from 'vue'
import photos1 from '@/assets/search/2/1.jpg'
import photos2 from '@/assets/search/2/2.webp'
import photos3 from '@/assets/search/2/3.jpg'
import photos4 from '@/assets/search/2/4.webp'
import photos5 from '@/assets/search/2/5.webp'
import photos6 from '@/assets/search/2/6.webp'

// 老照片馆内容数据
const photosData = [
  {
    id: 1,
    year: '1980',
    title: '公社时期的村部办公楼',
    imageUrl: photos1
  },
  {
    id: 2,
    year: '1995',
    title: '老祠堂重修竣工典礼',
    imageUrl: photos2
  },
  {
    id: 3,
    year: '2008',
    title: '改革开放后的老街改造',
    imageUrl: photos3
  },
  {
    id: 4,
    year: '2024',
    title: '乡村振兴后的文化广场',
    imageUrl: photos4
  },
  {
    id: 5,
    year: '2024',
    title: '现代化农业示范基地',
    imageUrl: photos5
  },
  {
    id: 6,
    year: '2024',
    title: '村道硬化工程完工仪式',
    imageUrl: photos6
  }
]

// 筛选年份
const selectedYear = ref('all')
const years = ['1980', '1995', '2008', '2024']

// 筛选后的照片内容
const filteredPhotos = computed(() => {
  if (selectedYear.value === 'all') return photosData
  return photosData.filter(photo => photo.year === selectedYear.value)
})

// 切换年份筛选
const handleYearChange = (year) => {
  selectedYear.value = year
}
</script>

<template>
  <div class="photos-content category-content">
    <!-- 年份筛选器 -->
    <div class="year-filter">
      <button 
        v-for="year in ['all', ...years]" 
        :key="year" 
        :class="['year-btn', { active: selectedYear === year }]"
        @click="handleYearChange(year)"
      >
        {{ year === 'all' ? '全部' : year }}
      </button>
    </div>
    
    <!-- 照片展示区域 -->
    <div class="timeline-container">
      <div class="timeline-axis"></div>
      <div class="photo-gallery">
        <div v-for="item in filteredPhotos" :key="item.id" class="photo-card">
          <div class="timeline-marker"></div>
          <img :src="item.imageUrl" :alt="item.title" class="photo-image" />
          <div class="photo-year">{{ item.year }}</div>
          <div class="photo-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photos-content {
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

.year-filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: center;
}

.year-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.year-btn:hover {
  background-color: #5f8ccf;
  color: white;
  border-color: #5f8ccf;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(95, 140, 207, 0.2);
}

.year-btn.active {
  background-color: #5f8ccf;
  color: white;
  border-color: #5f8ccf;
  box-shadow: 0 3px 8px rgba(95, 140, 207, 0.2);
}

.timeline-container {
  position: relative;
  padding-left: 40px;
}

.timeline-axis {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(45, 143, 64, 0.2);
}

.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.photo-card {
  position: relative;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 20px;
  width: 12px;
  height: 12px;
  background-color: #5f8ccf;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(95, 140, 207, 0.2);
}

.photo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}

.photo-year {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(95, 140, 207, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
}

.photo-title {
  padding: 1rem;
  font-weight: 600;
  color: #333;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
  transition: color 0.3s ease;
}

.photo-card:hover .photo-title {
  color: #5f8ccf;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-gallery {
    grid-template-columns: 1fr;
  }
  
  .timeline-container {
    padding-left: 30px;
  }
  
  .timeline-marker {
    left: -25px;
  }
}
</style>