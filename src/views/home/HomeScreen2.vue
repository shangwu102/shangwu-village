<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 轮播图相关引用和计时器
const slideshowRef = ref(null)
let slideshowTimer = null

onMounted(() => {
  // 初始化轮播
  const slides = slideshowRef.value
    ? slideshowRef.value.querySelectorAll('img')
    : document.querySelectorAll('.slideshow img')

  if (slides && slides.length > 0) {
    let idx = 0
    slideshowTimer = setInterval(() => {
      slides[idx].classList.remove('active')
      idx = (idx + 1) % slides.length
      slides[idx].classList.add('active')
    }, 4000)
  }
})

onUnmounted(() => {
  if (slideshowTimer) {
    clearInterval(slideshowTimer)
    slideshowTimer = null
  }
})
</script>

<template>
  <section class="slider-screen screen-2">
    <div class="multi-container">
      <div class="multi-row">
        <div class="multi-label">360°</div>
        <div class="multi-content">
          <iframe src="https://app.cloudpano.com/tours/TQl4SzPOaX" allowfullscreen frameborder="0"></iframe>
        </div>
      </div>

      <div class="multi-row">
        <div class="multi-label">老照片</div>
        <div class="multi-content">
          <div class="slideshow" ref="slideshowRef">
            <img src="../assets/test1.jpg" class="active" />
            <img src="../assets/test2.jpg" />
            <img src="../assets/test3.jpg" />
            <img src="../assets/test4.jpg" />
          </div>
        </div>
      </div>
      <div class="multi-row">
        <div class="multi-label">录音</div>
        <div class="multi-content">
          <audio controls>
            <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
            您的浏览器不支持音频播放。
          </audio>\]
        </div>
      </div>
      <div class="multi-row">
        <div class="multi-label">土特产</div>
        <div class="multi-content">
          <div class="text-box">
            <p>这是一段示例说明文字。这里可以展示历史背景、人物故事或展览内容的详细文字介绍。用户可以滚动查看更多内容。</p>
            <p>文字模块支持长文本展示，并可结合其他多媒体模块共同构成完整的信息体验。设计上注重可读性与层次感。</p>
            <p>在真实项目中，这部分可以接入数据库或后台CMS内容管理系统。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 第二屏样式 */
.slider-screen {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease;
  overflow: hidden;
}

.screen-2 {
  transform: translateY(100vh);
  opacity: 0.95;
  overflow: auto;
  /* 允许第二屏内部滚动 */
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f0f4eb;
}

/* 第二屏：多媒体样式 */
.multi-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 60px;
  /* 保留原始的页面 padding（放在内部容器） */
  box-sizing: border-box;
  color: #3a3a2e;
}

/* 每行卡片 */
.multi-row {
  display: flex;
  background: #fffaf0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 60, 45, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100px;
}

.multi-row:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(74, 60, 45, 0.2);
}

/* 左侧标签 */
.multi-label {
  flex: 0 0 180px;
  background-color: #8da87f;
  color: #fffaf0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 右侧内容 */
.multi-content {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #556b2f;
  position: relative;
}

/* iframe */
.multi-content iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

/* slideshow（老照片） */
.slideshow {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f4e1;
}

.slideshow img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  left: 0;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
}

.slideshow img.active {
  opacity: 1;
  transform: scale(1);
}

/* audio 宽度 */
.multi-content audio {
  width: 100%;
}

/* 文字模块 */
.text-box {
  max-height: 100%;
  overflow-y: auto;
  line-height: 1.6;
  width: 100%;
  padding-right: 8px;
  box-sizing: border-box;
}

/* footer */
.multi-footer {
  text-align: center;
  margin-top: 0;
  color: #7c6b49;
  font-size: 14px;
}

/* 第二屏响应式 */
@media (max-width: 700px) {
  .multi-container {
    padding: 24px;
  }

  .multi-row {
    flex-direction: column;
    height: auto;
  }

  .multi-label {
    flex: none;
    width: 100%;
    padding: 14px 12px;
  }

  .multi-content {
    padding: 20px;
  }
}

/* 滚动条样式（仅在 text-box 内） */
.multi-container .text-box::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.multi-container .text-box::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
</style>