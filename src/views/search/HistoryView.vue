<script setup>
import { ref, onUnmounted } from 'vue'
import music from '@/test/music/天后.mp3'
import imageUrl1 from '@/assets/search/1/1.jpg'
import imageUrl2 from '@/assets/search/1/2.jpg'
import imageUrl3 from '@/assets/search/1/3.jpg'
import imageUrl4 from '@/assets/search/1/4.jpg'
import imageUrl5 from '@/assets/search/1/5.jpg'
import imageUrl6 from '@/assets/search/1/6.webp'

// 口述历史内容数据
const historyData = [
  {
    id: 1,
    title: '老茶亭里的故事与回忆',
    duration: '18:45',
    type: 'audio',
    imageUrl: imageUrl1,
    audioUrl: music // 使用示例音频URL
  },
  {
    id: 2,
    title: '村里的老匠人讲述传统手工艺',
    duration: '22:10',
    type: 'audio',
    imageUrl: imageUrl2,
    audioUrl: music // 使用示例音频URL
  },
  {
    id: 3,
    title: '回忆公社时期的集体劳动生活',
    duration: '25:30',
    type: 'audio',
    imageUrl: imageUrl3,
    audioUrl: music // 使用示例音频URL
  },
  {
    id: 4,
    title: '村头老榕树见证的百年变迁',
    duration: '19:20',
    type: 'audio',
    imageUrl: imageUrl4,
    audioUrl: music // 使用示例音频URL
  },
  {
    id: 5,
    title: '传统节日习俗与庆典活动',
    duration: '28:15',
    type: 'audio',
    imageUrl: imageUrl5,
    audioUrl: music // 使用示例音频URL
  },
  {
    id: 6,
    title: '乡村教师讲述教育变迁历程',
    duration: '23:50',
    type: 'audio',
    imageUrl: imageUrl6,
    audioUrl: music // 使用示例音频URL
  }
]

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
onUnmounted(() => {
  Object.values(audioPlayers.value).forEach(player => {
    player.pause()
    player.src = ''
  })
})
</script>

<template>
  <div class="history-content category-content">
    <div class="timeline-container">
      <div class="timeline-axis"></div>
      <div class="audio-cards">
        <div v-for="item in historyData" :key="item.id" class="audio-card">
          <div class="audio-card-content">
            <img :src="item.imageUrl" alt="" class="audio-placeholder audio-button">
            <div class="audio-info">
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
</template>

<style scoped>
.history-content {
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

.audio-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.audio-description {
  color: #4a5c3d;
  margin-bottom: 1rem;
  font-style: italic;
  font-family: 'SimSun', serif;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.audio-card:hover .audio-description {
  color: #5f8ccf;
  transition: all 0.3s ease;
}

.audio-player {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.play-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.play-button:hover {
  background-color: rgba(106, 142, 35, 0.1);
  transform: scale(1.1);
}

.progress-container {
  flex: 1;
  height: 6px;
  background-color: rgba(45, 143, 64, 0.2);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  transition: width 0.1s ease;
}

.time-display {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.separator {
  margin: 0 0.2rem;
}
</style>