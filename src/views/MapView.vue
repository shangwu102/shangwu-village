<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'

// 直接使用绝对路径字符串
const videoSrc = '/videos/360VR.mp4'

const container = ref(null)
let viewer = null

onMounted(() => {
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
    navbar: [], // 隐藏播放条
    caption: '360° 视频',
    size: { width: '100%', height: '100vh' },
  })

  viewer.addEventListener('ready', () => {
    const video = viewer.getPlugin(VideoPlugin)?.video
    if (video) {
      video.muted = true
      video.play().catch(err => console.warn('Autoplay blocked:', err))
    }
  })
})

onBeforeUnmount(() => {
  if (viewer) viewer.destroy()
})
</script>

<template>
  <div ref="container" class="viewer-wrap"></div>
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

/* 禁止所有滚动条显示（游览器差异） */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
*::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
