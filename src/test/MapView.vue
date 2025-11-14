<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'

// 直接使用绝对路径字符串
const videoSrc = '/videos/360VR.mp4'

const container = ref(null)
const nativeVideo = ref(null)
let viewer = null
let isViewerReady = false

onMounted(async () => {
  // 确保原生视频立即播放
  await nextTick()
  if (nativeVideo.value) {
    nativeVideo.value.play().catch(() => {
      // 忽略自动播放限制错误
    })
  }

  // 延迟初始化Photo Sphere Viewer，让视频先播放
  setTimeout(() => {
    initViewer()
  }, 500)
})

const initViewer = () => {
  if (!container.value || isViewerReady) return

  viewer = new Viewer({
    container: container.value,
    adapter: [EquirectangularVideoAdapter],
    panorama: {
      source: videoSrc,
    },
    plugins: [
      [VideoPlugin, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
      }],
    ],
    navbar: [],
    caption: '',
    size: { width: '100%', height: '100vh' },
    loadingImg: null,
    loadingTxt: '',
    loadingSpinner: false,
    transition: false,
    loadingDelay: 0,
  })

  isViewerReady = true

  // Viewer准备好后隐藏原生视频
  viewer.addEventListener('ready', () => {
    if (nativeVideo.value) {
      nativeVideo.value.style.opacity = '0'
      setTimeout(() => {
        if (nativeVideo.value) {
          nativeVideo.value.style.display = 'none'
        }
      }, 300)
    }

    const video = viewer.getPlugin(VideoPlugin)?.video
    if (video) {
      video.muted = true
      video.play().catch(() => { })
    }
  })
}

onBeforeUnmount(() => {
  if (viewer) viewer.destroy()
})
</script>

<template>
  <div class="viewer-container">
    <!-- 原生视频元素 - 优先显示 -->
    <video ref="nativeVideo" class="native-video" src="/videos/360VR.mp4" autoplay muted loop playsinline></video>
    <!-- Photo Sphere Viewer容器 -->
    <div ref="container" class="viewer-wrap"></div>
  </div>
</template>

<style scoped>
/* 禁止本页面滚动 */
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: black;
}

/* 容器样式 */
.viewer-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: black;
}

/* 原生视频 - 优先显示，全屏 */
.native-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 2;
  /* 比viewer高，确保先显示 */
  transition: opacity 0.3s ease;
}

/* Photo Sphere Viewer容器 */
.viewer-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: black;
  overflow: hidden;
}

/* 禁止所有滚动条显示 */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

*::-webkit-scrollbar {
  display: none;
}
</style>