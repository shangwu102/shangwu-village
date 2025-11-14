<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'

// 场景数据配置
const scenes = [
  {
    id: 'scene1',
    title: '主场景',
    source: '/videos/360VR.mp4'
  },
  {
    id: 'scene2',
    title: '场景2',
    source: '/videos/360VR.mp4' // 实际项目中应替换为不同视频
  },
  {
    id: 'scene3',
    title: '场景3',
    source: '/videos/360VR.mp4' // 实际项目中应替换为不同视频
  }
]

// 互动内容数据
const interactiveContents = {
  'info1': {
    title: '历史建筑介绍',
    content: '这是一座具有百年历史的古建筑，见证了当地的发展变迁。',
    images: []
  },
  'info2': {
    title: '特色景观',
    content: '这里是景区最具特色的观景点，可以欣赏到全景风光。',
    images: []
  },
  'info3': {
    title: '文化展览',
    content: '此处正在举办传统艺术展览，展示了丰富的文化遗产。',
    images: []
  }
}

// 热点配置 - 添加互动按钮类型
const sceneHotspots = {
  'scene1': [
    {
      id: 'hotspot1',
      type: 'scene',
      position: { yaw: 45, pitch: 0 },
      text: '前往场景2',
      targetScene: 'scene2',
      icon: 'arrow'
    },
    {
      id: 'hotspot2', 
      type: 'scene',
      position: { yaw: -45, pitch: 0 },
      text: '前往场景3',
      targetScene: 'scene3',
      icon: 'arrow'
    },
    {
      id: 'hotspot3',
      type: 'info',
      position: { yaw: 120, pitch: 10 },
      text: '查看建筑信息',
      contentId: 'info1',
      icon: 'info'
    },
    {
      id: 'hotspot4',
      type: 'info',
      position: { yaw: 0, pitch: 15 },
      text: '景点介绍',
      contentId: 'info2',
      icon: 'info'
    }
  ],
  'scene2': [
    {
      id: 'hotspot5',
      type: 'scene',
      position: { yaw: 180, pitch: 0 },
      text: '返回主场景',
      targetScene: 'scene1',
      icon: 'arrow'
    },
    {
      id: 'hotspot6',
      type: 'info',
      position: { yaw: 90, pitch: 5 },
      text: '展览信息',
      contentId: 'info3',
      icon: 'info'
    }
  ],
  'scene3': [
    {
      id: 'hotspot7',
      type: 'scene',
      position: { yaw: 180, pitch: 0 },
      text: '返回主场景',
      targetScene: 'scene1',
      icon: 'arrow'
    }
  ]
}

const container = ref(null)
let viewer = null
let currentSceneId = 'scene1'

// 切换场景函数
const switchScene = async (sceneId) => {
  if (!viewer || currentSceneId === sceneId) return
  
  // 查找目标场景
  const targetScene = scenes.find(s => s.id === sceneId)
  if (!targetScene) return
  
  // 更新当前场景ID
  currentSceneId = sceneId
  
  // 更新场景标题
  viewer.setOption('caption', targetScene.title)
  
  // 切换全景视频
  await viewer.setPanorama({
    source: targetScene.source
  })
  
  // 更新热点标记
  updateHotspots(sceneId)
  
  // 确保视频播放
  await nextTick()
  const video = viewer.getPlugin(VideoPlugin)?.video
  if (video) {
    video.muted = true
    video.play().catch(err => console.warn('Autoplay blocked:', err))
  }
}

// 互动弹窗状态
const isPopupVisible = ref(false)
const popupContent = ref({})

// 用户引导状态
const isTourVisible = ref(true) // 首次加载自动显示引导
const currentTourStep = ref(0)

// 引导步骤数据
const tourSteps = [
  {
    title: '欢迎体验360°全景',
    content: '通过拖拽屏幕可以360°查看全景内容，探索不同的视角。'
  },
  {
    title: '互动热点',
    content: '屏幕上闪烁的标记是互动热点，蓝色标记可以切换场景，橙色标记可以查看详细信息。'
  },
  {
    title: '开始探索',
    content: '点击热点开始您的探索之旅，随时可以通过底部按钮重新查看此引导。'
  }
]

// 显示互动弹窗
const showPopup = (contentId) => {
  const content = interactiveContents[contentId]
  if (content) {
    popupContent.value = content
    isPopupVisible.value = true
  }
}

// 关闭互动弹窗
const closePopup = () => {
  isPopupVisible.value = false
}

// 引导控制函数
const nextTourStep = () => {
  if (currentTourStep.value < tourSteps.length - 1) {
    currentTourStep.value++
  }
}

const skipTour = () => {
  isTourVisible.value = false
}

const endTour = () => {
  isTourVisible.value = false
  // 可以在这里添加用户完成引导的记录
}

const restartTour = () => {
  currentTourStep.value = 0
  isTourVisible.value = true
}

// 地图联动相关状态
  const isMiniMapVisible = ref(true)
  const currentFov = ref(70) // 初始视野角度
  const currentPosition = ref({ yaw: 0, pitch: 0 }) // 当前视角位置
  const miniMapMarkerRotation = ref(0) // 小地图标记旋转角度
  
  // 自动旋转相关状态
  const isAutoRotating = ref(false)
  const rotationSpeed = ref(0.5) // 默认旋转速度（度/秒）

  // 切换小地图显示状态
  const toggleMiniMap = () => {
    isMiniMapVisible.value = !isMiniMapVisible.value
  }

  // 获取当前场景的热点
  const getCurrentSceneHotspots = () => {
    return sceneHotspots[currentSceneId] || []
  }

  // 获取小地图上热点的位置样式
  const getMiniMapHotspotStyle = (position) => {
    // 将全景坐标转换为小地图2D坐标（简化处理）
    const centerX = 50
    const centerY = 50
    const radius = 40 // 小地图半径百分比
    
    // 将yaw角度转换为小地图上的位置
    const radians = (position.yaw * Math.PI) / 180
    const x = centerX + radius * Math.sin(radians)
    const y = centerY - radius * Math.cos(radians) // 注意y轴方向
    
    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)'
    }
  }

  // 获取视野范围指示器样式
  const getFovIndicatorStyle = () => {
    // 根据FOV计算扇形角度
    const fovDegrees = currentFov.value
    // 限制最大角度为180度
    const angle = Math.min(fovDegrees, 180)
    
    return {
      clipPath: `polygon(50% 50%, 0% 0%, 100% 0%)`,
      transform: `rotate(${-angle/2}deg) scale(${angle/60})`
    }
  }

  // 处理小地图点击，更新视角
  const handleMiniMapClick = (event) => {
    const miniMap = event.currentTarget
    const rect = miniMap.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // 计算点击位置相对于中心的坐标
    const x = event.clientX - rect.left - centerX
    const y = event.clientY - rect.top - centerY
    
    // 计算新的yaw角度
    const yaw = Math.atan2(x, -y) * (180 / Math.PI)
    
    // 设置新视角
    if (viewer) {
      viewer.animate({
        position: { yaw: yaw, pitch: 0 },
        speed: '1000ms'
      })
    }
  }
  
  // 切换自动旋转
  const toggleAutoRotation = () => {
    if (!viewer) return
    
    if (isAutoRotating.value) {
      // 停止自动旋转
      viewer.stopAutorotate()
    } else {
      // 开始自动旋转
      viewer.startAutorotate({ speed: rotationSpeed.value })
    }
    
    isAutoRotating.value = !isAutoRotating.value
  }
  
  // 调整旋转速度
  const adjustRotationSpeed = (newSpeed) => {
    rotationSpeed.value = newSpeed
    
    // 如果当前正在旋转，应用新速度
    if (isAutoRotating.value && viewer) {
      viewer.stopAutorotate()
      viewer.startAutorotate({ speed: newSpeed })
    }
  }

// 更新热点函数
const updateHotspots = (sceneId) => {
  const markersPlugin = viewer.getPlugin(MarkersPlugin)
  if (!markersPlugin) return
  
  // 清除所有现有标记
  markersPlugin.clearMarkers()
  
  // 获取当前场景的热点
  const hotspots = sceneHotspots[sceneId] || []
  
  // 添加热点标记
  hotspots.forEach(hotspot => {
    // 根据类型设置不同样式和颜色
    const isSceneType = hotspot.type === 'scene'
    const markerColor = isSceneType ? 'rgba(0, 128, 255, 0.8)' : 'rgba(255, 140, 0, 0.8)'
    const iconHtml = isSceneType ? 
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M5 12l10 6v-5h7v-2h-7V6z"/></svg>' : 
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>'
    
    markersPlugin.addMarker({
      id: hotspot.id,
      position: hotspot.position,
      html: `
        <div class="custom-marker ${isSceneType ? 'scene-marker' : 'info-marker'}" 
             style="width: 30px; height: 30px; background-color: ${markerColor}; 
             border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          ${iconHtml}
        </div>
      `,
      tooltip: {
        content: hotspot.text,
        position: 'right',
        className: 'custom-tooltip'
      },
      data: {
        type: hotspot.type,
        targetScene: hotspot.targetScene,
        contentId: hotspot.contentId
      },
      style: {
        transformOrigin: 'center'
      }
    })
  })
}

onMounted(async () => {
  viewer = new Viewer({
    container: container.value,
    adapter: [EquirectangularVideoAdapter],
    panorama: {
      source: scenes[0].source // 使用第一个场景作为初始场景
    },
    plugins: [
      [VideoPlugin, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false, // 隐藏播放控制
        clickToToggle: false, // 禁用点击切换播放/暂停
        showVideoControls: false, // 隐藏所有视频控制
        hideChromeControls: true, // 隐藏Chrome默认控制
      }],
      [MarkersPlugin, {
        markers: []
      }]
    ],
    navbar: [], // 隐藏导航栏
    caption: scenes[0].title,
    size: { width: '100%', height: '100vh' },
    loadingImg: null, // 禁用加载图片
    loadingTxt: '',
    loadingSpinner: false,
    transition: true
  })

  viewer.addEventListener('ready', () => {
    // 初始化热点
    updateHotspots(currentSceneId)
    
    // 设置标记点击事件
    const markersPlugin = viewer.getPlugin(MarkersPlugin)
    markersPlugin.addEventListener('select-marker', (e) => {
      const { marker } = e
      
      if (marker.data?.type === 'scene' && marker.data?.targetScene) {
        // 场景切换类型热点
        switchScene(marker.data.targetScene)
      } else if (marker.data?.type === 'info' && marker.data?.contentId) {
        // 信息互动类型热点
        showPopup(marker.data.contentId)
      }
    })
    
    // 确保视频播放
    const video = viewer.getPlugin(VideoPlugin)?.video
    if (video) {
      video.muted = true
      video.play().catch(err => console.warn('Autoplay blocked:', err))
    }
    
    // 监听视角位置变化，实现地图联动
        viewer.addEventListener('position-updated', (e) => {
          const { position, fov } = e
          currentPosition.value = { ...position }
          currentFov.value = fov
          
          // 更新小地图标记旋转角度
          miniMapMarkerRotation.value = -position.yaw
        })
        
        // 监听用户交互，停止自动旋转
        viewer.addEventListener('click', () => {
          if (isAutoRotating.value) {
            viewer.stopAutorotate()
            isAutoRotating.value = false
          }
        })
        
        viewer.addEventListener('mousedown', () => {
          if (isAutoRotating.value) {
            viewer.stopAutorotate()
            isAutoRotating.value = false
          }
        })
        
        viewer.addEventListener('touchstart', () => {
          if (isAutoRotating.value) {
            viewer.stopAutorotate()
            isAutoRotating.value = false
          }
        })
  })
})

onBeforeUnmount(() => {
  if (viewer) viewer.destroy()
})
</script>

<template>
  <div ref="container" class="viewer-wrap"></div>
  
  <!-- 互动弹窗 -->
  <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <div class="popup-header">
        <h3>{{ popupContent.title }}</h3>
        <button class="popup-close" @click="closePopup">×</button>
      </div>
      <div class="popup-body">
        <p>{{ popupContent.content }}</p>
        <!-- 可根据需要添加图片或其他内容 -->
      </div>
      <div class="popup-footer">
        <button class="popup-btn" @click="closePopup">关闭</button>
      </div>
    </div>
  </div>
  
  <!-- 用户引导UI -->
  <div v-if="isTourVisible" class="tour-overlay">
    <div class="tour-backdrop" @click="skipTour"></div>
    <div class="tour-step">
      <div class="tour-step-content">
        <div class="tour-step-header">
          <h3>{{ tourSteps[currentTourStep].title }}</h3>
          <button class="tour-close" @click="skipTour">×</button>
        </div>
        <div class="tour-step-body">
          <p>{{ tourSteps[currentTourStep].content }}</p>
          <!-- 可以根据需要添加示意图 -->
          <div v-if="currentTourStep === 0" class="tour-illustration">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <path d="M30,40 C45,30 75,30 90,40" stroke="#007bff" stroke-width="3" fill="none" />
              <circle cx="30" cy="40" r="8" fill="#007bff" opacity="0.7" />
              <circle cx="90" cy="40" r="8" fill="#007bff" opacity="0.7" />
              <path d="M25,35 L35,45 M25,45 L35,35" stroke="white" stroke-width="2" />
              <path d="M85,35 L95,45 M85,45 L95,35" stroke="white" stroke-width="2" />
            </svg>
            <span class="tour-illustration-text">拖拽示意</span>
          </div>
        </div>
        <div class="tour-step-footer">
          <div class="tour-progress">
            <div v-for="(step, index) in tourSteps" :key="index" 
                 :class="['tour-dot', { active: index === currentTourStep }]">
            </div>
          </div>
          <button v-if="currentTourStep < tourSteps.length - 1" 
                  class="tour-btn tour-next" @click="nextTourStep">
            下一步
          </button>
          <button v-else class="tour-btn tour-finish" @click="endTour">
            开始体验
          </button>
        </div>
      </div>
    </div>
    
    <!-- 引导提示箭头（可选） -->
    <div v-if="currentTourStep === 1" class="tour-arrow bottom">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      </svg>
    </div>
  </div>
  
  <!-- 底部控制栏 -->
  <div class="control-bar">
    <button class="control-btn" @click="restartTour" title="重新查看引导">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" />
        <path d="M9.5 12h5M7 12l3-3M7 12l3 3" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <button class="control-btn" @click="toggleMiniMap" title="显示/隐藏小地图">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" stroke-width="2" />
        <path d="M9 22V12h6v10" stroke="white" stroke-width="2" stroke-linecap="round" />
        <circle cx="12" cy="12" r="2" fill="white" />
      </svg>
    </button>
    <button 
      class="control-btn" 
      @click="toggleAutoRotation" 
      :class="{ active: isAutoRotating }"
      title="开始/停止自动旋转">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" />
        <path d="M12 4v4l3 3M7 12l3-3M7 12l3 3" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
  
  <!-- 自动旋转速度控制 -->
  <div v-if="isAutoRotating" class="rotation-speed-control">
    <label class="speed-label">旋转速度:</label>
    <input 
      type="range" 
      min="0.1" 
      max="2" 
      step="0.1" 
      v-model.number="rotationSpeed" 
      @input="adjustRotationSpeed(rotationSpeed)"
      class="speed-slider"
    >
    <span class="speed-value">{{ rotationSpeed.toFixed(1) }}°/s</span>
  </div>
  
  <!-- 小地图组件 -->
  <div v-if="isMiniMapVisible" class="mini-map-container">
    <div class="mini-map-header">
      <span class="mini-map-title">场景地图</span>
      <button class="mini-map-close" @click="toggleMiniMap">×</button>
    </div>
    <div class="mini-map" @click="handleMiniMapClick">
      <!-- 简化的等距矩形地图表示 -->
      <div class="mini-map-panorama">
        <!-- 中央标记表示当前视角 -->
        <div class="mini-map-marker" :style="{ transform: `translate(-50%, -50%) rotate(${miniMapMarkerRotation}deg)` }">
          <div class="mini-map-direction-indicator">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z"/>
            </svg>
          </div>
          <!-- 视野范围扇形 -->
          <div class="mini-map-fov-indicator" :style="getFovIndicatorStyle()"></div>
        </div>
        
        <!-- 场景热点标记 -->
        <div v-for="(hotspot, index) in getCurrentSceneHotspots()" :key="hotspot.id" 
             class="mini-map-hotspot" 
             :style="getMiniMapHotspotStyle(hotspot.position)">
          <div :class="['mini-map-hotspot-icon', hotspot.type === 'scene' ? 'scene' : 'info']"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 禁止本页面滚动 */
html, body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* 确保 viewer-wrap 占满整个视口 */
.viewer-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: black;
  overflow: hidden;
}

/* 禁止所有滚动条显示 */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
*::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 热点样式 */
:deep(.custom-marker) {
  animation: pulse 2s infinite;
  transition: all 0.3s ease;
}

:deep(.custom-marker:hover) {
  transform: scale(1.3);
  filter: brightness(1.2);
}

:deep(.scene-marker) {
  animation-delay: 0.5s;
}

:deep(.info-marker) {
  animation-delay: 0s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

/* 自定义提示框样式 */
:deep(.custom-tooltip) {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 8px 12px !important;
  font-size: 14px !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* 隐藏播放器相关UI */
:deep(.psv-video-plugin) {
  display: none !important;
}

/* 确保视频控制条完全隐藏 */
:deep(video) {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  pointer-events: none !important;
  outline: none !important;
}

/* 隐藏WebKit浏览器的视频控制 */
:deep(video::-webkit-media-controls) {
  display: none !important;
}

:deep(video::-webkit-media-controls-enclosure) {
  display: none !important;
}

:deep(video::-webkit-media-controls-panel) {
  display: none !important;
}

:deep(video::-webkit-media-controls-play-button) {
  display: none !important;
}

:deep(video::-webkit-media-controls-volume-slider) {
  display: none !important;
}

:deep(video::-webkit-media-controls-mute-button) {
  display: none !important;
}

:deep(video::-webkit-media-controls-timeline) {
  display: none !important;
}

:deep(video::-webkit-media-controls-current-time-display) {
  display: none !important;
}

/* Firefox 控制栏隐藏 */
:deep(video::-moz-range-track) {
  display: none !important;
}

/* 防止任何意外的控制元素出现 */
:deep(.psv-video-iframe),
:deep(.psv-video-element) {
  pointer-events: none !important;
}

/* 确保PSV容器不显示任何控制 */
:deep(.psv-container) {
  position: relative;
  z-index: 1;
}

/* 防止用户交互触发默认控制 */
:deep(.psv-panorama) {
  pointer-events: auto !important;
}

/* 隐藏加载指示器 */
:deep(.psv-loader) {
  display: none !important;
}

/* 确保热点始终可见 */
:deep(.psv-marker) {
  z-index: 1000 !important;
}

/* 互动弹窗样式 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.popup-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.popup-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.popup-close:hover {
  background-color: #f0f0f0;
  color: #333;
}

.popup-body {
  padding: 20px;
}

.popup-body p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.popup-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.popup-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.popup-btn:hover {
  background-color: #0056b3;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 用户引导样式 */
.tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.tour-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: auto;
}

.tour-step {
  position: relative;
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: bounceIn 0.5s ease;
  pointer-events: auto;
  z-index: 10;
}

.tour-step-content {
  padding: 0;
}

.tour-step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  border-bottom: none;
}

.tour-step-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.tour-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.tour-close:hover {
  background-color: #f0f0f0;
  color: #333;
}

.tour-step-body {
  padding: 20px;
}

.tour-step-body p {
  margin: 0 0 20px;
  color: #666;
  line-height: 1.6;
  font-size: 16px;
}

.tour-illustration {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.tour-illustration-text {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.tour-step-footer {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tour-progress {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.tour-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.3s ease;
}

.tour-dot.active {
  width: 24px;
  border-radius: 4px;
  background-color: #007bff;
}

.tour-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tour-next {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.tour-next:hover {
  background-color: #0056b3;
}

.tour-finish {
  background-color: #28a745;
  color: white;
  align-self: flex-end;
}

.tour-finish:hover {
  background-color: #218838;
}

.tour-arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: pulseArrow 2s infinite;
}

.tour-arrow.bottom {
  bottom: -50px;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  70% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulseArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 底部控制栏样式 */
.control-bar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1500;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.control-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* 自动旋转控制样式 */
.control-btn.active {
  background: rgba(0, 150, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
}

.rotation-speed-control {
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 85;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  animation: slideUp 0.3s ease;
}

.speed-label {
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.speed-slider {
  width: 120px;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none
}

.speed-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.speed-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  background: #0096ff;
}

.speed-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.speed-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  background: #0096ff;
}

.speed-value {
  color: white;
  font-size: 14px;
  font-weight: 600;
  min-width: 45px;
  text-align: center;
}

/* 滑动出现动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 小地图样式 */
.mini-map-container {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 200px;
  height: 220px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 90;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.mini-map-header {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mini-map-title {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.mini-map-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.mini-map-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mini-map {
  width: 100%;
  height: calc(100% - 45px);
  position: relative;
  cursor: pointer;
  padding: 15px;
}

.mini-map-panorama {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.mini-map-marker {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease;
}

.mini-map-direction-indicator {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: rgba(0, 120, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 2px solid white;
}

.mini-map-fov-indicator {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  background: rgba(0, 120, 255, 0.2);
  border-radius: 50%;
  transform-origin: center center;
  z-index: 1;
}

.mini-map-hotspot {
  position: absolute;
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
}

.mini-map-hotspot:hover {
  transform: translate(-50%, -50%) scale(1.3);
}

.mini-map-hotspot-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

.mini-map-hotspot-icon.scene {
  background: rgba(255, 150, 0, 0.9);
}

.mini-map-hotspot-icon.info {
  background: rgba(0, 200, 100, 0.9);
}

.control-btn:active {
  transform: scale(0.95);
}</style>