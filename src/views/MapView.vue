<template>
  <div ref="container" class="viewer-wrap"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/video-plugin/index.css'

const container = ref(null)
let viewer = null

onMounted(() => {
  viewer = new Viewer({
    container: container.value,
    adapter: [EquirectangularVideoAdapter],
    panorama: {
      source: '/public/videos/1715847307882e9z.mp4', // 可换为你的 360° 视频链接
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

<style scoped>
.viewer-wrap {
  width: 100%;
  height: 100vh;
  background: black;
}
</style>
