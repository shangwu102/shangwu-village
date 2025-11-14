<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'

const videoSrc = '/videos/360VR.mp4'

const container = ref(null)
let viewer = null
let isViewerReady = false

onMounted(() => {
  initViewer()
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
        controls: false, // 隐藏控件
      }],
    ],
    navbar: [],        // 隐藏工具栏
    caption: '',
    size: { width: '100%', height: '100vh' },
    loadingImg: null,
    loadingTxt: '',
    loadingSpinner: false,
    transition: false,
    loadingDelay: 0,
  })

  isViewerReady = true

  viewer.addEventListener('ready', () => {
    const video = viewer.getPlugin(VideoPlugin)?.video
    if (video) {
      video.muted = true
      video.play().catch(() => {})
    }
  })
}

onBeforeUnmount(() => {
  if (viewer) viewer.destroy()
})
</script>

<template>
  <div class="viewer-container">
    <!-- Photo Sphere Viewer 容器 -->
    <div ref="container" class="viewer-wrap"></div>
  </div>
</template>

<style scoped>
html, body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: black;
}

/* 容器 */
.viewer-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: black;
}

/* Viewer 容器 */
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

/* 禁止滚动条 */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
*::-webkit-scrollbar {
  display: none;
}
</style>
