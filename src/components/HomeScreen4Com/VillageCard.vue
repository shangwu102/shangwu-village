<script setup>
const props = defineProps({
  village: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: "青山渔村",
      description: "风景秀丽的沿海渔村，保存着完整的海洋文化和传统渔业生活方式。"
    })
  }
})
</script>

<template>
  <div class="village-card-3d">
    <div class="village-card-inner">
      <div class="village-card-front">
        <div class="village-image-container">
          <img src="@/assets/search/3/1.jpg" alt="乡村风光" class="village-image">
        </div>
        <h3 class="village-name-3d">{{ village.name }}</h3>
        <div class="flip-hint">翻转查看详情</div>
      </div>
      <div class="village-card-back">
        <p class="village-description-back">{{ village.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 3D卡片样式 */
.village-card-3d {
  width: 180px;
  height: 150px;
  perspective: 800px;
  flex-shrink: 0;
}

.village-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

/* 3D翻转效果 */
.village-card-3d:hover .village-card-inner {
  transform: rotateY(180deg);
}

.village-card-front,
.village-card-back {
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

.village-card-front {
  background-color: #2a2a2a;
  border: 1px solid rgba(95, 140, 207, 0.3);
}

.village-card-back {
  background-color: #4a90e2;
  color: white;
  transform: rotateY(180deg);
  border: 1px solid rgba(132, 184, 84, 0.3);
  text-orientation: mixed;
  writing-mode: horizontal-tb;
}

.village-image-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 4px;
  border: 1px solid #4a90e2;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
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
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.village-name-back {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.village-description-back {
  font-size: 0.75rem;
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