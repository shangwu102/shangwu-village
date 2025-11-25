<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const showFeatures = ref(false)

// 组件挂载时执行的动画
onMounted(() => {
  setTimeout(() => {
    showFeatures.value = true
  }, 300)
})

// 乡村推荐数据
const villages = [
  {
    id: 1,
    name: "青山渔村",
    description: "青山渔村位于风景秀丽的沿海地区，以其独特的海洋文化和传统渔业而闻名。这里保留了完整的渔村生活方式和民俗文化，是体验传统海洋文化的理想之地。"
  },
  {
    id: 2,
    name: "大渔岛村",
    description: "大渔岛村坐落在美丽的海岛之上，拥有丰富的海洋资源和独特的岛民文化。这里的海产品远近闻名，尤其是新鲜的海鲜和传统的腌制食品深受游客喜爱。"
  },
  {
    id: 3,
    name: "周戈庄村",
    description: "周戈庄村历史悠久，保存了大量明清时期的古建筑和传统文化。这里的传统手工艺和民俗表演极具特色，每年吸引大量游客前来体验传统文化魅力。"
  }
]
</script>

<template>
  <div class="creative-about-screen">
    <!-- 乡村推荐 - 3D卡片翻转设计 -->
    <section id="villages" class="villages-section" :class="{ 'animate-in': showFeatures }">
      <div class="section-header">
        <div class="section-number">02</div>
        <h2 class="section-title">乡村推荐</h2>
        <div class="section-divider"></div>
      </div>
      
      <div class="villages-grid">
        <div 
          v-for="village in villages" 
          :key="village.id"
          class="village-card-3d"
          :style="{ animationDelay: `${village.id * 0.2}s` }"
        >
          <div class="village-card-inner">
            <div class="village-card-front">
              <div class="village-image-container">
                <img src="@/assets/search/3/1.jpg" alt="乡村风光" class="village-image">
              </div>
              <h3 class="village-name-3d">{{ village.name }}</h3>
              <div class="flip-hint">翻转查看详情</div>
            </div>
            <div class="village-card-back">
              <h3 class="village-name-back">{{ village.name }}</h3>
              <p class="village-description-back">{{ village.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 创意风格主容器 */
.creative-about-screen {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/search/3/1.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #f1f5f9;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 100px 20px;
  /* 添加背景遮罩以确保文字可读性 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  * {
    position: relative;
    z-index: 2;
  }
}

/* 通用部分样式 */
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
}

.section-number {
  font-size: 1.5rem;
  color: #5f8ccf;
  font-weight: 700;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
}

.section-divider {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, #5f8ccf, transparent);
}

.villages-section {
  max-width: 1200px;
  margin: 0 auto;
  transform: translateY(50px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.3s;
}

.animate-in {
  transform: translateY(0);
  opacity: 1;
}

/* 乡村推荐 - 3D卡片翻转 */
.villages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 50px;
}

.village-card-3d {
  perspective: 1000px;
  opacity: 0;
  transform: translateY(50px);
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.village-card-inner {
  width: 100%;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
}

.village-card-3d:hover .village-card-inner {
  transform: rotateY(180deg);
}

.village-card-front,
.village-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.village-card-front {
  background: rgba(30, 41, 59, 0.9);
  border: 2px solid rgba(95, 140, 207, 0.3);
}

.village-card-back {
  background: rgba(51, 65, 85, 0.95);
  border: 2px solid rgba(132, 184, 84, 0.3);
  transform: rotateY(180deg);
}

.village-image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 30px;
  border: 3px solid #5f8ccf;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.village-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.village-card-3d:hover .village-image {
  transform: scale(1.1);
}

.village-name-3d {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 20px;
}

.village-name-back {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 30px;
}

.village-description-back {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e2e8f0;
}

.flip-hint {
  font-size: 14px;
  color: #64748b;
  margin-top: 20px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 0.5; }
  51%, 100% { opacity: 1; }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .villages-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .creative-about-screen {
    padding: 80px 20px;
  }
}

@media (max-width: 480px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .section-divider {
    width: 100%;
  }
  
  .village-card-front,
  .village-card-back {
    padding: 25px;
  }
  
  .village-card-inner {
    height: 350px;
  }
  
  .village-image-container {
    width: 150px;
    height: 150px;
  }
}
</style>