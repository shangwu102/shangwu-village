<script setup>
import { ref, computed } from 'vue'
import music from '@/test/music/天后.mp3'
import imageUrl from '@/assets/shouye1.png'
// 子栏目导航数据
const subCategories = ref([
  { id: 'history', name: '🔊口述历史' },
  { id: 'photos', name: '📼老照片馆' },
  { id: 'scenery', name: '🏞️风物志' },
  { id: 'diary', name: '📝村民日记' }
])
const selectedCategory = ref('history')

// 模拟数据源 - 针对不同子栏目的内容
const contentData = ref({
  // 口述历史内容
  history: [
    {
      id: 1,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    },
    {
      id: 2,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    },
    {
      id: 3,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    },
    {
      id: 4,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    },
    {
      id: 5,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    },
    {
      id: 6,
      title: '我记忆中的村口大榕树...',
      duration: '25:30',
      type: 'audio',
      imageUrl: imageUrl,
      audioUrl: music // 使用示例音频URL
    }
  ],
  // 老照片馆内容
  photos: [
    {
      id: 1,
      year: '1980',
      title: '村口',
      imageUrl: imageUrl
    },
    {
      id: 2,
      year: '1995',
      title: '祠堂',
      imageUrl: imageUrl
    },
    {
      id: 3,
      year: '2008',
      title: '老街',
      imageUrl: imageUrl
    },
    {
      id: 4,
      year: '2024',
      title: '新貌',
      imageUrl: imageUrl
    },
    {
      id: 5,
      year: '2024',
      title: '新貌',
      imageUrl: imageUrl
    },
    {
      id: 6,
      year: '2024',
      title: '新貌',
      imageUrl: imageUrl
    }
  ],
  // 风物志内容
  scenery: [
    {
      id: 1,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    },
    {
      id: 2,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    },
    {
      id: 3,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    },
    {
      id: 4,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    },
    {
      id: 5,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    },
    {
      id: 6,
      title: '乡村自然风光',
      description: '记录乡村四季变换的美丽风景',
      imageUrl: 'imageUrl'
    }
  ],
  // 村民日记内容
  diary: [
    {
      id: 1,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    },
    {
      id: 2,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    },
    {
      id: 3,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    },
    {
      id: 4,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    },
    {
      id: 5,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    },
    {
      id: 6,
      title: '村民日常生活记录',
      date: '2024-05-20',
      author: '张三',
      content: '今天村里来了考察团...'
    }
  ]
})

// 筛选年份（老照片馆特有）
const selectedYear = ref('all')
const years = ['1980', '1995', '2008', '2024']

// 当前显示的内容
const currentContent = computed(() => {
  return contentData.value[selectedCategory.value] || []
})

// 筛选后的照片内容
const filteredPhotos = computed(() => {
  if (selectedCategory.value !== 'photos') return []
  if (selectedYear.value === 'all') return contentData.value.photos
  return contentData.value.photos.filter(photo => photo.year === selectedYear.value)
})

/* 时间轴切换函数 */
const timelineVisible = ref(false)
const toggleTimeline = () => {
  timelineVisible.value = !timelineVisible.value
}

// 分类切换
const handleCategoryChange = (categoryId) => {
  selectedCategory.value = categoryId
}

// 音频播放状态管理
const audioPlayers = ref({})
const isPlaying = ref({})
const currentTime = ref({})
const duration = ref({})

// 播放/暂停音频
const toggleAudio = (id, audioUrl) => {
  if (!audioPlayers.value[id]) {
    audioPlayers.value[id] = new Audio(audioUrl)

    // 监听播放结束事件
    audioPlayers.value[id].onended = () => {
      isPlaying.value[id] = false
    }

    // 监听音频元数据加载完成事件
    audioPlayers.value[id].onloadedmetadata = () => {
      duration.value[id] = audioPlayers.value[id].duration
    }

    // 监听时间更新事件，更新进度条
    audioPlayers.value[id].ontimeupdate = () => {
      currentTime.value[id] = audioPlayers.value[id].currentTime
    }
  }

  const player = audioPlayers.value[id]
  if (isPlaying.value[id]) {
    player.pause()
  } else {
    player.play()
  }
  isPlaying.value[id] = !isPlaying.value[id]
}

// 处理进度条点击事件，跳转到指定位置
const handleProgressClick = (event, id) => {
  if (!audioPlayers.value[id]) return

  const progressBar = event.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * (duration.value[id] || 0)

  audioPlayers.value[id].currentTime = newTime
  currentTime.value[id] = newTime
}

// 格式化时间为 MM:SS 格式
const formatTime = (timeInSeconds) => {
  if (!timeInSeconds || isNaN(timeInSeconds)) return '00:00'

  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// 组件卸载时清理音频资源
import { onUnmounted } from 'vue'
onUnmounted(() => {
  Object.values(audioPlayers.value).forEach(player => {
    player.pause()
    player.src = ''
  })
})
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
            {{ category.id === 'history' ? '🎵' : category.name.charAt(0) }}
          </span>
          <span class="tab-text">{{ category.name.substring(2) }}</span>
        </button>
      </div>
    </div>

    <!-- B区 - 内容展示区(时间轴+卡片) -->
    <div class="content-section">
      <!-- 口述历史内容 -->
      <div v-if="selectedCategory === 'history'" class="history-content">
        <div class="timeline-container">
          <div class="timeline-axis"></div>
          <div class="audio-cards">
            <div v-for="item in currentContent" :key="item.id" class="audio-card">
              <div class="audio-card-content">
                <img :src="item.imageUrl" alt="" class="audio-placeholder audio-button">
                <div class="audio-info">
                  <div class="audio-title">老信纸样式音频卡片</div>
                  <div class="audio-description">"{{ item.title }}"</div>
                  <div class="audio-player">
                    <button @click="toggleAudio(item.id, item.audioUrl)" class="play-button">
                      {{ isPlaying[item.id] ? '⏸️' : '▶️' }}
                    </button>
                    <!-- 音频进度条 -->
                    <div class="progress-container" @click="handleProgressClick($event, item.id)">
                      <div class="progress-bar"
                        :style="{ width: `${(currentTime[item.id] / (duration[item.id] || 1)) * 100}%` }"></div>
                    </div>
                    <!-- 时间显示 -->
                    <div class="time-display">
                      <span class="current-time">{{ formatTime(currentTime[item.id]) }}</span>
                      <span class="separator">/</span>
                      <span class="total-time">{{ formatTime(duration[item.id]) || item.duration }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 老照片馆内容 -->
      <div v-else-if="selectedCategory === 'photos'" class="photos-content">
        <div class="timeline-nav">
          <button class="timeline-control" @click="toggleTimeline">
            时间轴导航
          </button>
        </div>
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

      <!-- 风物志内容 -->
      <div v-else-if="selectedCategory === 'scenery'" class="scenery-content">
        <div class="timeline-container">
          <div class="timeline-axis"></div>
          <div class="scenery-cards">
            <div v-for="item in currentContent" :key="item.id" class="scenery-card">
              <div class="scenery-card-content">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 村民日记内容 -->
      <div v-else-if="selectedCategory === 'diary'" class="diary-content">
        <div class="timeline-container">
          <div class="timeline-axis"></div>
          <div class="diary-entries">
            <div v-for="item in currentContent" :key="item.id" class="diary-entry">
              <div class="timeline-marker"></div>
              <div class="diary-entry-content">
                <div class="diary-header">
                  <h4>{{ item.title }}</h4>
                  <div class="diary-meta">{{ item.date }} · {{ item.author }}</div>
                </div>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
}

.category-tabs {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
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
  transition: all 0.3s ease;
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
}

.category-tab.active .tab-icon {
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  color: white;
  box-shadow: 0 4px 8px rgba(45, 143, 64, 0.3);
}

.tab-text {
  transition: all 0.3s ease;
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
}

.category-tab.active {
  color: #5f8ccf;
  font-weight: 600;
  background-color: rgba(45, 143, 64, 0.05);
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
}

/* B区 - 内容展示区样式 */
.content-section {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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

.timeline-control {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;
  transition: all 0.3s ease;
}

.timeline-control:hover {
  background-color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  .timeline-nav {
    flex-direction: column;
    align-items: flex-start;
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
