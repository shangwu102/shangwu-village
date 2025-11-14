

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'
import videoSrc from '@/assets/videos/360VR.mp4'

const container = ref(null)
let viewer = null

onMounted(() => {
  viewer = new Viewer({
    container: container.value,
    adapter: [EquirectangularVideoAdapter],
    panorama: {
      source: videoSrc, // 可换为你的 360° 视频链接
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

  // ✅ 新版 API：监听 ready 事件
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
.viewer-wrap {
  width: 100%;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>

<style scoped>
/* 全局样式，禁止页面滚动 */
body, html {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* 确保viewer-wrap占满整个视口 */
.viewer-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 禁止所有滚动条显示 */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

*::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
