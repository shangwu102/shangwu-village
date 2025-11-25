<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const showFeatures = ref(false)
const scrollProgress = ref(0)

// 组件挂载时执行的动画
onMounted(() => {
  // 页面加载动画效果
  setTimeout(() => {
    showFeatures.value = true
  }, 500)
})

// 处理特征卡片点击
const handleFeatureClick = (feature) => {
  console.log('用户点击了特征:', feature)
  // 这里可以添加导航到相应页面的逻辑
}

// 第四屏的主题特征数据
const futureFeatures = [
  {
    id: 'feature-1',
    title: '社区共创',
    description: '用户可贡献自己的乡村故事、照片和回忆',
    icon: '🌱',
    color: '#4a9e7e'
  },
  {
    id: 'feature-2', 
    title: 'AR体验',
    description: '通过AR技术，让用户在现实环境中看到乡村历史变迁',
    icon: '📱',
    color: '#8c69c6'
  },
  {
    id: 'feature-3',
    title: '音频导览',
    description: '专业解说员带您聆听乡村历史的声音',
    icon: '🎧',
    color: '#f7b756'
  },
  {
    id: 'feature-4',
    title: '数据可视化',
    description: '直观展示乡村发展历程和文化变迁',
    icon: '📊',
    color: '#5780c1'
  }
]
</script>

<template>
  <div class="future-screen">
    <!-- 页面标题 -->
    <div class="screen-header">
      <h1 class="main-title">未来展望</h1>
      <p class="subtitle">持续丰富的乡村记忆探索体验</p>
    </div>
    
    <!-- 主内容区 -->
    <div class="content-wrapper">
      <!-- 未来功能卡片网格 -->
      <div class="features-grid">
        <div 
          v-for="feature in futureFeatures"
          :key="feature.id"
          class="feature-card"
          :style="{ borderColor: feature.color }"
          :class="{ 'animate-in': showFeatures }"
          @click="handleFeatureClick(feature)"
        >
          <div class="feature-icon" :style="{ backgroundColor: feature.color + '20' }">
            {{ feature.icon }}
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="arrow-icon">→</div>
        </div>
      </div>
      
      <!-- 底部提示 -->
      <div class="footer-hint">
        <p>我们正在持续开发更多功能，敬请期待...</p>
      </div>
    </div>
    
    <!-- 背景装饰 -->
    <div class="background-decor">
      <div class="decor-circle large"></div>
      <div class="decor-circle medium"></div>
      <div class="decor-circle small"></div>
    </div>
  </div>
</template>

<style scoped>
/* 第四屏样式 */
.future-screen {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 页面标题 */
.screen-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeIn 1s ease-out;
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

/* 内容包装器 */
.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  position: relative;
  z-index: 2;
}

/* 功能卡片网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

/* 功能卡片 */
.feature-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  overflow: hidden;
}

.feature-card.animate-in {
  transform: translateY(0);
  opacity: 1;
}

/* 为卡片添加不同的延迟动画 */
.feature-card:nth-child(1).animate-in {
  transition-delay: 0.1s;
}

.feature-card:nth-child(2).animate-in {
  transition-delay: 0.2s;
}

.feature-card:nth-child(3).animate-in {
  transition-delay: 0.3s;
}

.feature-card:nth-child(4).animate-in {
  transition-delay: 0.4s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

/* 卡片内容 */
.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.feature-description {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.arrow-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: #bdc3c7;
  transition: all 0.3s ease;
}

.feature-card:hover .arrow-icon {
  color: inherit;
  transform: translateX(5px);
}

/* 底部提示 */
.footer-hint {
  text-align: center;
  color: #95a5a6;
  font-size: 1rem;
  padding: 20px;
}

/* 背景装饰 */
.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.decor-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  filter: blur(50px);
}

.decor-circle.large {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
}

.decor-circle.medium {
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: 10%;
}

.decor-circle.small {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 5%;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.2rem;
  }
  
  .content-wrapper {
    padding: 0 20px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature-card {
    padding: 25px 20px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  
  .feature-title {
    font-size: 1.3rem;
  }
}
</style>