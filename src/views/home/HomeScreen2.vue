<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const showQuote = ref(false)

// 页面加载动画效果
onMounted(() => {
  // 渐入效果
  setTimeout(() => {
    const container = document.querySelector('.immersive-container')
    if (container) {
      container.classList.add('fade-in')
    }
  }, 100)
})
</script>

<template>
  <section class="slider-screen screen-2 immersive-screen">
    <div class="immersive-container">
      <!-- 左侧图片展示 -->
      <div class="immersive-image-container">
        <img 
          src="@/assets/search/3/3.jpg" 
          alt="乡村全景" 
          class="immersive-image"
          @mouseenter="showQuote = true"
          @mouseleave="showQuote = false"
        />
        <!-- 悬浮引用 -->
        <div class="immersive-quote show">
          <p>"青石板路上的苔痕，是时间的脚印。"</p>
          <span class="audio-indicator">Audio immersive</span>
        </div>
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="immersive-content">
        <div class="immersive-header">
          <span class="immersive-subtitle">IMMERSIVE EXPERIENCE</span>
          <h1 class="immersive-title">乡忆漫游</h1>
          <p class="immersive-description">
            在这里，沉浸于田园的诗意。不再是走马观花的过客，而是成为这段静谧时光的归人。
          </p>
        </div>
        
        <!-- 体验项目列表 -->
        <div class="immersive-features">
          <div class="feature-item">
            <div class="feature-number">01</div>
            <div class="feature-content">
              <h3 class="feature-title">VR全景漫步</h3>
              <p class="feature-desc">360°还原古村落真实风貌</p>
            </div>
          </div>
          
          <div class="feature-item">
            <div class="feature-number">02</div>
            <div class="feature-content">
              <h3 class="feature-title">空间音频</h3>
              <p class="feature-desc">采集真实环境音，听见风吹麦浪</p>
            </div>
          </div>
          
          <div class="feature-item">
            <div class="feature-number">03</div>
            <div class="feature-content">
              <h3 class="feature-title">时空对话</h3>
              <p class="feature-desc">与原住民讲述那段往事</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 沉浸式体验屏幕样式 */
.immersive-screen {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, opacity;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease;
  overflow: hidden;
  background: linear-gradient(135deg, #172d33 0%, #546c12 40%, #131413 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-2 {
  transform: translateY(100vh);
  opacity: 0.95;
}

/* 容器样式 */
.immersive-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.immersive-container.fade-in {
  opacity: 1;
}

/* 左侧图片区域 */
.immersive-image-container {
  position: relative;
  width: 40%;
  height: 70%;
  cursor: pointer;
}

.immersive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  transition: transform 0.5s ease;
}

.immersive-image:hover {
  transform: scale(1.02);
}

/* 悬浮引用样式 */
.immersive-quote {
  position: absolute;
  bottom: -60px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  max-width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.immersive-quote.show {
  opacity: 1;
  transform: translateY(0);
}

.immersive-quote p {
  font-style: italic;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.audio-indicator {
  font-size: 0.75rem;
  color: #87CEEB;
  display: block;
  text-align: right;
}

/* 右侧内容区域 */
.immersive-content {
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding-left: 4rem;
}

/* 标题部分 */
.immersive-header {
  margin-bottom: 3rem;
}

.immersive-subtitle {
  color: #87CEEB;
  font-size: 0.85rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: block;
}

.immersive-title {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  color: white;
}

.immersive-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  max-width: 80%;
}

/* 体验项目列表 */
.immersive-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateX(10px);
}

.feature-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: #87CEEB;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.feature-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

/* 开始漫游按钮 */
.start-button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.start-button:hover {
  background-color: white;
  color: #0a0a0a;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .immersive-container {
    padding: 0 2rem;
  }
  
  .immersive-title {
    font-size: 3.5rem;
  }
  
  .immersive-description {
    max-width: 100%;
  }
}

@media (max-width: 992px) {
  .immersive-container {
    flex-direction: column;
    padding: 4rem 2rem;
    text-align: center;
  }
  
  .immersive-image-container {
    width: 80%;
    height: 40%;
    margin-bottom: 4rem;
  }
  
  .immersive-content {
    width: 100%;
    padding-left: 0;
  }
  
  .immersive-quote {
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    right: auto;
  }
  
  .immersive-quote.show {
    transform: translateX(-50%) translateY(0);
  }
  
  .feature-item {
    flex-direction: column;
    text-align: left;
    gap: 0.5rem;
  }
  
  .start-button {
    align-self: center;
  }
}

@media (max-width: 600px) {
  .immersive-title {
    font-size: 2.5rem;
  }
  
  .immersive-image-container {
    width: 90%;
    height: 35%;
  }
  
  .immersive-quote {
    max-width: 250px;
  }
  
  .immersive-header {
    margin-bottom: 2rem;
  }
  
  .immersive-features {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>