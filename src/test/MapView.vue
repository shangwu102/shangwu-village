<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// --- PhotoSphereViewer v6 ---
import { Viewer } from '@photo-sphere-viewer/core'
import { EquirectangularAdapter } from '@photo-sphere-viewer/equirectangular-adapter'
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter'
import { MarkersPlugin } from '@photo-sphere-viewer/markers'
import { VideoPlugin } from '@photo-sphere-viewer/video'

import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers/index.css'
import '@photo-sphere-viewer/video/index.css'

const container = ref(null)
let viewer = null

// 多场景列表
const scenes = {
  scene1: '/pano/pano1.jpg',
  scene2: '/pano/pano2.jpg',
  scene3: '/pano/pano3.jpg',
}

// 视频文件
const videoSrc = '/videos/360VR.mp4'

// 预加载视频
const videoEl = document.createElement('video')
videoEl.src = videoSrc
videoEl.preload = 'auto'
videoEl.muted = true
videoEl.loop = true
videoEl.playsInline = true
videoEl.crossOrigin = 'anonymous'


onMounted(() => {
  viewer = new Viewer({
    container: container.value,
    adapter: [EquirectangularAdapter],

    // 默认场景
    panorama: scenes.scene1,

    plugins: [
      [MarkersPlugin, {}],
      [VideoPlugin, {}],
    ],

    navbar: [],
  })

  const markers = viewer.getPlugin(MarkersPlugin)

  // ========== 1. 热点：点击切换场景 ==========
  markers.addMarker({
    id: 'goto_scene2',
    longitude: 0,
    latitude: 0,
    image: '/icons/arrow.png',
    width: 48,
    height: 48,
    tooltip: '前往场景 2',
  })

  viewer.on('select-marker', (e, marker) => {
    if (marker.id === 'goto_scene2') {
      viewer.setPanorama(scenes.scene2)
    }
  })


  // ========== 2. 点击 marker 播放 360 视频 ==========
  markers.addMarker({
    id: 'play_video',
    longitude: 1.2,
    latitude: -0.1,
    image: '/icons/play.png',
    width: 64,
    height: 64,
    tooltip: '播放 360° 视频',
  })

  viewer.on('select-marker', (e, marker) => {
    if (marker.id === 'play_video') {
      viewer.setPanorama({
        source: videoEl,
        options: {
          autoplay: true,
          muted: true,
          loop: true,
          controls: false,
        },
      }, {
        transition: false,  // 立即切换不卡顿
      })

      videoEl.play().catch(() => {})
    }
  })


  // ========== 3. 自定义 HTML Marker ==========
  markers.addMarker({
    id: 'html_marker',
    longitude: -1.0,
    latitude: 0.2,
    html: `<div class="custom-marker">INFO</div>`,
    anchor: 'bottom center',
    tooltip: '自定义 HTML 热点',
  })

  // HTML 样式
  const style = document.createElement('style')
  style.innerHTML = `
    .custom-marker {
      padding: 6px 10px;
      background: rgba(255,255,255,0.9);
      border-radius: 6px;
      color: #000;
      font-weight: bold;
      border: 2px solid #333;
    }
  `
  document.head.appendChild(style)



  // ========== 4. 悬停显示 tooltip 已默认支持 ==========
  // marker 添加 tooltip 字段即可自动启用

})

onBeforeUnmount(() => {
  viewer?.destroy()
})
</script>


<template>
  <div ref="container" class="viewer"></div>
</template>

<style scoped>
.viewer {
  width: 100vw;
  height: 100vh;
  background: #000;
}
</style>
