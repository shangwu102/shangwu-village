<script setup>
import { ref, onMounted } from 'vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAnimating = ref(false)

// 添加页面元素动画
const animateElements = () => {
  setTimeout(() => {
    isAnimating.value = true
  }, 100)
}

// 返回首页
const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  animateElements()
})
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content" :class="{ 'animate-in': isAnimating }">
      <!-- 错误码 -->
      <div class="error-code">404</div>
      
      <!-- 错误信息 -->
      <h1 class="error-title">页面未找到</h1>
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      
      <!-- 装饰性元素 -->
      <div class="decorative-elements">
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
      </div>
      
      <!-- 返回按钮 -->
      <ElButton size="large" class="back-home-btn" @click="goToHome">
        返回首页
      </ElButton>
    </div>
  </div>
</template>

<style scoped>
/* 404页面容器 */
.not-found-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fffaf0 0%, #f5f4e1 100%);
  position: relative;
  overflow: hidden;
}

/* 404内容区域 */
.not-found-content {
  text-align: center;
  padding: 40px;
  max-width: 600px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: relative;
  z-index: 10;
}

.not-found-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* 错误码样式 */
.error-code {
  font-size: 10rem;
  font-weight: 800;
  color: #8da87f;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.error-code::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: #7c6b49;
  border-radius: 2px;
}

/* 错误标题 */
.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a3a2e;
  margin: 30px 0 20px;
}

/* 错误描述 */
.error-description {
  font-size: 1.1rem;
  color: #7c6b49;
  line-height: 1.6;
  margin-bottom: 40px;
  padding: 0 20px;
}

/* 返回按钮 */
.back-home-btn {
  background-color: #8da87f;
  border-color: #8da87f;
  color: #fffaf0;
  font-size: 1.1rem;
  padding: 12px 36px;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(141, 168, 127, 0.3);
}

.back-home-btn:hover {
  background-color: #7c956b;
  border-color: #7c956b;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(141, 168, 127, 0.4);
}

/* 装饰性叶子元素 */
.decorative-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.leaf {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.15;
}

.leaf-1 {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 10%;
  background-image: url('../assets/test4.jpg');
  transform: rotate(-15deg);
  animation: float 15s ease-in-out infinite;
}

.leaf-2 {
  width: 120px;
  height: 120px;
  bottom: 10%;
  right: 10%;
  background-image: url('../assets/test5.jpg');
  transform: rotate(15deg);
  animation: float 12s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% {
    transform: rotate(-15deg) translate(0, 0);
  }
  50% {
    transform: rotate(5deg) translate(15px, 15px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code {
    font-size: 8rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .leaf-1 {
    width: 100px;
    height: 100px;
  }
  
  .leaf-2 {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 20px;
  }
  
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 0.9rem;
    padding: 0 10px;
  }
  
  .back-home-btn {
    font-size: 1rem;
    padding: 10px 24px;
  }
}
</style>