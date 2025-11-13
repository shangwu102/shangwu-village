<script setup>
import { ref, onMounted } from 'vue';

// 乡村VR场景数据
const vrScenes = [
  {
    id: 1,
    title: "古村风貌",
    description: "探索具有百年历史的传统村落，感受原汁原味的乡村生活",
    videoSrc: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4", // 测试视频
    thumbnail: "",
    location: "浙江省杭州市"
  },
  {
    id: 2,
    title: "田园风光",
    description: "沉浸式体验乡村田园风光，感受四季更迭的自然之美",
    videoSrc: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4", // 测试视频
    thumbnail: "",
    location: "江苏省苏州市"
  },
  {
    id: 3,
    title: "乡村建筑",
    description: "360°全方位欣赏传统乡村建筑的精湛工艺和独特魅力",
    videoSrc: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/480/Big_Buck_Bunny_480_10s_1MB.mp4", // 测试视频
    thumbnail: "",
    location: "安徽省黄山市"
  }
];

// 当前选中的VR场景
const currentScene = ref(vrScenes[0]);
const isPlaying = ref(false);
const videoElement = ref(null);
const isFullscreen = ref(false);

// 切换场景
const changeScene = (scene) => {
  currentScene.value = scene;
  isPlaying.value = false;
  if (videoElement.value) {
    videoElement.value.pause();
    videoElement.value.currentTime = 0;
  }
};

// 播放/暂停控制
const togglePlay = () => {
  if (videoElement.value) {
    if (isPlaying.value) {
      videoElement.value.pause();
    } else {
      videoElement.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

// 全屏控制
const toggleFullscreen = () => {
  const container = document.querySelector('.vr-player-container');
  if (!document.fullscreenElement) {
    container.requestFullscreen().then(() => {
      isFullscreen.value = true;
    }).catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false;
    });
  }
};

// 监听视频播放状态
const handleVideoPlaying = () => {
  isPlaying.value = true;
};

const handleVideoPause = () => {
  isPlaying.value = false;
};

onMounted(() => {
  // 组件挂载后的初始化逻辑
});
</script>

<template>
  <div class="vr-view-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1>乡村360°VR体验</h1>
      <p>沉浸式探索中国传统村落的魅力</p>
    </div>

    <!-- VR播放器区域 -->
    <div class="vr-player-section">
      <div class="vr-player-container">
        <!-- VR视频播放器 -->
        <div class="vr-video-wrapper">
          <video
            ref="videoElement"
            :src="currentScene.videoSrc"
            class="vr-video"
            playsinline
            @playing="handleVideoPlaying"
            @pause="handleVideoPause"
          ></video>
          
          <!-- VR控制覆盖层 -->
          <div class="vr-controls-overlay">
            <div class="play-pause-button" @click="togglePlay">
              <svg v-if="!isPlaying" width="60" height="60" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              <svg v-else width="60" height="60" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            </div>
            
            <div class="fullscreen-button" @click="toggleFullscreen">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                <path d="M7 14H5v5h5v-2H7v-3z"/>
                <path d="M14 7v2h3v3h2V7h-5z"/>
                <path d="M17 14h2v5h-5v-2h3v-3z"/>
                <path d="M7 10V5H5v5h2V7h3z"/>
              </svg>
            </div>
          </div>
          
          <!-- VR提示 -->
          <div class="vr-hint">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5">
              <path d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
            <span>拖动鼠标或触摸屏幕以360°查看</span>
          </div>
        </div>
      </div>

      <!-- 当前场景信息 -->
      <div class="current-scene-info">
        <h2>{{ currentScene.title }}</h2>
        <p class="scene-location">{{ currentScene.location }}</p>
        <p class="scene-description">{{ currentScene.description }}</p>
      </div>
    </div>

    <!-- 场景选择列表 -->
    <div class="scenes-section">
      <h3>选择乡村场景</h3>
      <div class="scenes-grid">
        <div
          v-for="scene in vrScenes"
          :key="scene.id"
          class="scene-card"
          :class="{ active: currentScene.id === scene.id }"
          @click="changeScene(scene)"
        >
          <div class="scene-thumbnail">
            <!-- 缩略图占位 -->
            <div class="thumbnail-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="#2d8f40">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
          </div>
          <div class="scene-details">
            <h4>{{ scene.title }}</h4>
            <p>{{ scene.location }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- VR体验指南 -->
    <div class="vr-guide-section">
      <h3>VR体验指南</h3>
      <div class="guide-content">
        <div class="guide-item">
          <div class="guide-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#2d8f40">
              <path d="M20.37 8.91l-1.24 1.86a8 8 0 01-2.28 2.28l-1.86 1.24a8 8 0 01-8 0l-1.86-1.24A8 8 0 013.63 10.8l1.24-1.86a8 8 0 012.28-2.28l1.86-1.24a8.014 8.014 0 018 0l1.86 1.24a8 8 0 012.28 2.28zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
          </div>
          <div class="guide-text">
            <h4>PC端</h4>
            <p>使用鼠标拖动可以360°旋转视角，滚轮可以放大缩小</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#2d8f40">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12" y2="18"/>
            </svg>
          </div>
          <div class="guide-text">
            <h4>移动端</h4>
            <p>使用手指滑动屏幕可以360°旋转视角，双指缩放可以调整大小</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#2d8f40">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <div class="guide-text">
            <h4>VR设备</h4>
            <p>支持VR眼镜，提供更身临其境的沉浸式体验</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器样式 */
.vr-view-container {
  min-height: calc(100vh - 60px);
  background-color: #f5f9f2;
  padding: 2rem;
  color: #333;
}

/* 页面头部样式 */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem 0;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2d8f40;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

/* VR播放器区域 */
.vr-player-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.vr-player-container {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
}

.vr-video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.vr-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* VR控制覆盖层 */
.vr-controls-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.vr-video-wrapper:hover .vr-controls-overlay {
  opacity: 1;
}

.play-pause-button {
  cursor: pointer;
  background: rgba(45, 143, 64, 0.8);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  margin: 0 auto;
}

.play-pause-button:hover {
  background: rgba(45, 143, 64, 1);
  transform: scale(1.05);
}

.fullscreen-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.fullscreen-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* VR提示 */
.vr-hint {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 15px;
  border-radius: 25px;
  color: white;
  font-size: 0.9rem;
}

/* 当前场景信息 */
.current-scene-info {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.current-scene-info h2 {
  color: #2d8f40;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.scene-location {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.scene-description {
  color: #444;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* 场景选择列表 */
.scenes-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.scenes-section h3 {
  color: #2d8f40;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.scenes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.scene-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.scene-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.scene-card.active {
  border-color: #2d8f40;
  box-shadow: 0 0 0 2px rgba(45, 143, 64, 0.2);
}

.scene-thumbnail {
  height: 180px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f9f2 0%, #e8f5e9 100%);
}

.scene-details {
  padding: 1.5rem;
}

.scene-details h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.scene-details p {
  color: #666;
  font-size: 0.95rem;
}

/* VR体验指南 */
.vr-guide-section {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.vr-guide-section h3 {
  color: #2d8f40;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.guide-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.guide-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.guide-icon {
  flex-shrink: 0;
}

.guide-text h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.guide-text p {
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vr-view-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .vr-player-container {
    height: 400px;
  }

  .play-pause-button {
    width: 60px;
    height: 60px;
  }

  .play-pause-button svg {
    width: 40px;
    height: 40px;
  }

  .fullscreen-button {
    width: 40px;
    height: 40px;
  }

  .fullscreen-button svg {
    width: 24px;
    height: 24px;
  }

  .vr-hint {
    font-size: 0.8rem;
    padding: 8px 12px;
  }

  .vr-hint svg {
    width: 24px;
    height: 24px;
  }

  .guide-content {
    grid-template-columns: 1fr;
  }

  .guide-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .vr-player-container {
    height: 300px;
  }

  .scenes-grid {
    grid-template-columns: 1fr;
  }

  .current-scene-info,
  .vr-guide-section {
    padding: 1.5rem;
  }
}
</style>