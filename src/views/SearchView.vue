<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 子栏目导航数据
const subCategories = ref([
  { id: 'history', name: '口述历史', icon: '🔊' },
  { id: 'photos', name: '老照片馆', icon: '📸' },
  { id: 'scenery', name: '风物志', icon: '🏞️' },
  { id: 'diary', name: '手艺传承', icon: '📝' }
])

const route = useRoute()
const router = useRouter()

// 根据当前路由确定选中的分类
const selectedCategory = computed(() => {
  const path = route.path.split('/').pop() || 'history'
  return subCategories.value.find(c => c.id === path)?.id || 'history'
})

// 分类切换，使用路由导航
const handleCategoryChange = (categoryId) => {
  router.push(`/search/${categoryId}`)
}


</script>

<template>
  <div class="search-view-container">
    <!-- A区 - 子栏目导航(标签式) -->
    <div class="category-section">
      <div class="category-tabs">
        <button v-for="category in subCategories" :key="category.id"
          :class="['category-tab', { active: selectedCategory === category.id }]"
          @click="handleCategoryChange(category.id)">
          <span class="tab-icon">
                {{ category.icon }}
          </span>
          <span class="tab-text">{{ category.name }}</span>
        </button>
      </div>
    </div>

    <!-- B区 - 内容展示区 - 使用路由视图显示子组件 -->
    <div class="content-section">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.search-view-container {
  min-height: calc(100vh - 60px);
  background-color: #f5f9f2;
  padding: 2rem;
}

/* A区 - 子栏目导航样式 */
.category-section {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  animation: slideDownFadeIn 0.6s ease-out;
}

@keyframes slideDownFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-tabs {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.category-tab {
  background: none;
  border: none;
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  color: #666;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.category-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(45, 143, 64, 0.1), transparent);
  transition: left 2s ease;
}

.tab-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.category-tab.active .tab-icon {
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  color: white;
  box-shadow: 0 4px 8px rgba(45, 143, 64, 0.3);
  transform: scale(1.05);
}

.tab-text {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.category-tab:hover .tab-text {
  color: #5f8ccf;
}

.category-tab.active .tab-text {
  color: #5f8ccf;
  font-weight: 600;
}

.category-tab:hover {
  color: #5f8ccf;
  background-color: rgba(45, 143, 64, 0.05);
  transform: translateY(-2px);
}

.category-tab:hover::before {
  left: 100%;
}

.category-tab.active {
  color: #5f8ccf;
  font-weight: 600;
  background-color: rgba(45, 143, 64, 0.05);
  animation: tabActivate 0.3s ease-out;
}

@keyframes tabActivate {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.category-tab.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: #5f8ccf;
  border-radius: 2px;
  animation: slideInUnderline 0.4s ease-out;
}

@keyframes slideInUnderline {
  0% {
    width: 0;
  }
  100% {
    width: 30px;
  }
}

/* 内容切换动画 */
.category-content {
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

/* B区 - 内容展示区样式 */
.content-section {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  animation: contentFadeIn 0.5s ease-out;
}

@keyframes contentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.audio-card {
  position: relative;
  background-color: #f7f9f1;
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #d8ddc9;
  /* 添加榕树主题的纸质纹理 */
  background-image:
    linear-gradient(rgba(45, 143, 64, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 143, 64, 0.03) 1px, transparent 1px),
    linear-gradient(#f7f9f1 1px, transparent 1px),
    linear-gradient(90deg, #f7f9f1 1px, transparent 1px);
  background-size: 15px 15px, 15px 15px, 5px 5px, 5px 5px;
  background-position: -1px -1px, -1px -1px, -0.5px -0.5px, -0.5px -0.5px;
  /* 添加榕树叶子的微妙图案 */
  background-image:
    radial-gradient(circle at 25px 25px, rgba(45, 143, 64, 0.05) 2px, transparent 0),
    radial-gradient(circle at 75px 75px, rgba(45, 143, 64, 0.05) 2px, transparent 0),
    radial-gradient(circle at 125px 125px, rgba(45, 143, 64, 0.05) 2px, transparent 0);
  background-size: 150px 150px;
}

.audio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  height: 100%;
  width: 2px;
  background-color: rgba(45, 143, 64, 0.1);
}

.audio-card::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(106, 142, 35, 0.2), transparent);
  border-radius: 1.5px;
}

.audio-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transform: translateX(5px);
}

.audio-card-content {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  position: relative;
}

.audio-placeholder {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(106, 142, 35, 0.15);
  border-radius: 50%;
  border: 2px solid #6a8e23;
  transition: all 0.3s ease;
}

.audio-placeholder:hover {
  background-color: #6a8e23;
  color: white;
  transform: scale(1.1);
}

.audio-info {
  flex: 1;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: unifiedTitleTransition 0.6s ease-out;
}

@keyframes unifiedTitleTransition {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.audio-title {
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #78adad;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 1.1rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.3rem;
}

.audio-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #6a8e23, transparent);
}

.audio-description {
  color: #4a5c3d;
  margin-bottom: 1rem;
  font-style: italic;
  font-family: 'SimSun', serif;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.audio-card-title {
  transition: all 0.3s ease;
  animation: unifiedTitleTransition 0.6s ease-out;
}

.audio-card:hover .audio-description {
  color: #5f8ccf;
  transition: all 0.3s ease;
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
  box-shadow: 0 3px 8px rgba(45, 143, 64, 0.2);
}

.year-btn.active {
  background-color: #5f8ccf;
  color: white;
  border-color: #5f8ccf;
  box-shadow: 0 3px 8px rgba(45, 143, 64, 0.2);
}

.timeline-container {
  position: relative;
  padding-left: 40px;
  margin-top: 2rem;
  padding-bottom: 2rem;
}

.timeline-axis {
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom,
      rgba(45, 143, 64, 0.1),
      rgba(45, 143, 64, 0.8),
      rgba(45, 143, 64, 0.1));
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(45, 143, 64, 0.1);
}

.timeline-marker {
  position: absolute;
  left: 15px;
  transform: translateX(-50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle, #4caf50, #5f8ccf);
  border: 4px solid white;
  box-shadow: 0 0 0 2px rgba(45, 143, 64, 0.3), 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1;
}

.photo-card:hover .timeline-marker {
  transform: translateX(-50%) scale(1.15);
  box-shadow: 0 0 0 3px rgba(45, 143, 64, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3);
}

.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.photo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.2rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.photo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #5f8ccf, #84b854);
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.photo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.photo-year {
  font-size: 0.9rem;
  color: #5f8ccf;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background-color: rgba(45, 143, 64, 0.05);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}

.photo-title {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

.scenery-card {
  position: relative;
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.scenery-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.scenery-card-content h4 {
  color: #5f8ccf;
  margin-top: 0;
  margin-bottom: 0.8rem;
}

.scenery-card-content p {
  color: #666;
  line-height: 1.6;
}

/* 村民日记样式 */
.diary-content {
  position: relative;
}

.diary-entries {
  position: relative;
}

.diary-entry {
  position: relative;
  background-color: #fff9e6;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #f0ad4e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.diary-entry:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.diary-header h4 {
  color: #333;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.diary-meta {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.diary-entry-content p {
  color: #666;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-tabs {
    gap: 1rem;
  }

  .category-tab {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .photo-gallery {
    grid-template-columns: 1fr;
  }

  .audio-card-content {
    flex-direction: column;
    text-align: center;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #5f8ccf;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: unifiedTitleTransition 0.6s ease-out;
}

@keyframes unifiedTitleTransition {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.search-content {
  max-width: 1200px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  max-width: 800px;
  margin: 0 auto 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1.1rem;
}

.search-button {
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  color: white;
  border: none;
  padding: 0 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
  font-weight: 500;
  transition: all .3s ease;
}

.search-button:hover {
  opacity: .9;
  transform: translateX(2px);
}

.filter-bar {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: .5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  transition: all .3s;
}

.filter-tab.active,
.filter-tab:hover {
  background: #e8f5e9;
  color: #5f8ccf;
}

.search-results {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-result-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  transition: all .3s;
}

.search-result-item:hover {
  transform: translateX(5px);
}

.result-thumbnail {
  width: 120px;
  height: 120px;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-content {
  flex: 1;
}

.result-title {
  font-size: 1.3rem;
  color: #5f8ccf;
  cursor: pointer;
  margin-bottom: .5rem;
}

.result-title:hover {
  color: #84b854;
}

.result-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-meta {
  display: flex;
  gap: 1rem;
  font-size: .9rem;
  color: #888;
}

.result-type {
  background: #e8f5e9;
  color: #5f8ccf;
  padding: .25rem .75rem;
  border-radius: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: .5rem;
}

.page-btn {
  padding: .5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: white;
}

.page-btn.active,
.page-btn:hover {
  background: #5f8ccf;
  color: white;
}

.loading,
.no-result {
  text-align: center;
  padding: 2rem;
  color: #888;
}

.audio-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.play-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.play-button:hover {
  background-color: rgba(95, 140, 207, 0.1);
  transform: scale(1.1);
}

/* 音频进度条样式 */
.progress-container {
  flex: 1;
  height: 6px;
  background-color: rgba(95, 140, 207, 0.2);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.progress-container:hover {
  background-color: rgba(95, 140, 207, 0.3);
  height: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  border-radius: 3px;
  transition: width 0.1s ease;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 12px;
  height: 12px;
  background-color: #5f8ccf;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 0 4px rgba(95, 140, 207, 0.5);
}

.progress-container:hover .progress-bar::after {
  opacity: 1;
  transform: translate(50%, -50%) scale(1);
}

.time-display {
  font-size: 0.85rem;
  color: #666;
  min-width: 80px;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.current-time,
.total-time {
  transition: color 0.3s ease;
}

.time-display:hover .current-time {
  color: #5f8ccf;
}
</style>
