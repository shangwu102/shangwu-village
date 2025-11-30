<script setup>
const props = defineProps({
  goal: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      title: '数字建档',
      description: '系统构建村落数字档案，实现文化活态传承。'
    })
  }
})
</script>

<template>
  <div class="goal-card-3d">
    <div class="goal-card-inner">
      <div class="goal-card-front">
        <div class="goal-icon-container">
          <!-- 根据不同目标显示不同图标 -->
          <div v-if="goal.id === 1" class="goal-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4a90e2" stroke-width="2" />
              <path d="M2 17L12 22L22 17" stroke="#4a90e2" stroke-width="2" />
              <path d="M2 12L12 17L22 12" stroke="#4a90e2" stroke-width="2" />
            </svg>
          </div>
          <div v-else-if="goal.id === 2" class="goal-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="#4a90e2" stroke-width="2" />
              <rect x="9" y="9" width="6" height="6" stroke="#4a90e2" stroke-width="2" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="#4a90e2" stroke-width="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="#4a90e2" stroke-width="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#4a90e2" stroke-width="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#4a90e2" stroke-width="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="#4a90e2" stroke-width="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="#4a90e2" stroke-width="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#4a90e2" stroke-width="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#4a90e2" stroke-width="2" />
            </svg>
          </div>
          <div v-else class="goal-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M18 13L12 19L6 13" stroke="#4a90e2" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="#4a90e2" stroke-width="2" />
            </svg>
          </div>
        </div>
        <h3 class="goal-name-3d">{{ goal.title }}</h3>
        <div class="flip-hint">翻转查看详情</div>
      </div>
      <div class="goal-card-back">
        <p class="goal-description-back">{{ goal.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 项目目标3D卡片样式 */
.goal-card-3d {
  /* 使用相对宽度以适应横向排列，最小宽度确保卡片不会太小 */
  width: calc(33.333% - 20px);
  min-width: 160px;
  height: 170px;
  perspective: 800px;
}

.goal-card-inner {
  position: relative;
  width: 100%;
  height: 90%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

/* 3D翻转效果 */
.goal-card-3d:hover .goal-card-inner {
  transform: rotateY(180deg);
}

.goal-card-front,
.goal-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}

.goal-card-front {
  background-color: #2a2a2a;
  border: 1px solid rgba(95, 140, 207, 0.3);
}

.goal-card-back {
  background-color: #4a90e2;
  color: white;
  transform: rotateY(180deg);
  text-orientation: mixed;
  writing-mode: horizontal-tb;
  border: 1px solid rgba(132, 184, 84, 0.3);
}

/* 图标容器样式 */
.goal-icon-container {
  margin-bottom: 5px;
}

.goal-name-3d {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.goal-name-back {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;
}

.goal-description-back {
  font-size: 0.85rem;
  line-height: 1.3;
  color: #ffffff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  text-align: center;
  width: 100%;
}

.flip-hint {
  font-size: 8px;
  color: #999;
  margin-top: 4px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 0.5;
  }
  51%,
  100% {
    opacity: 1;
  }
}
</style>