<script setup>
import { ref, computed } from "vue"

// 模拟产品数据
const allProducts = ref([
  { id: 1, name: "外婆米香", tags: ["外婆的味道"], image: "../assets/shouye1.png", hasStory: true },
  { id: 2, name: "老槐树茶", tags: ["季节限定"], image: "../assets/shouye2.png", hasStory: true },
  { id: 3, name: "手工竹编", tags: ["爷爷的手艺"], image: "../assets/shouye3.png", hasStory: true },
  { id: 4, name: "竹制风车", tags: ["童年的玩具"], image: "../assets/shouye3.png", hasStory: true },
  { id: 5, name: "手工布鞋", tags: ["外婆的味道", "季节限定"], image: "../assets/shouye2.png", hasStory: true },
  { id: 6, name: "草编蚂蚱", tags: ["童年的玩具", "爷爷的手艺"], image: "../assets/shouye1.png", hasStory: true },
  { id: 7, name: "桂花糕", tags: ["外婆的味道", "季节限定"], image: "../assets/shouye1.png", hasStory: true },
  { id: 8, name: "木雕摆件", tags: ["爷爷的手艺"], image: "../assets/shouye2.png", hasStory: true },
])

// 情感标签
const emotionTags = ["全部", "外婆的味道", "童年的玩具", "爷爷的手艺", "季节限定"]
const activeEmotionTag = ref("全部")

// 过滤逻辑
const filteredProducts = computed(() => {
  return allProducts.value.filter((p) => {
    return activeEmotionTag.value === "全部" || p.tags.includes(activeEmotionTag.value)
  })
})

// 故事按钮点击事件
function handleStoryClick(product) {
  // 这里可以实现查看产品故事的逻辑
  console.log('查看产品故事:', product.name)
}
</script>

<template>
  <div class="culture-view-container">

    <div class="culture-content">
      <!-- A区 - 情感标签筛选 -->
      <div class="emotion-filter-section">
        <div class="emotion-tags">
          <button
            v-for="tag in emotionTags"
            :key="tag"
            :class="['emotion-tag-btn', { active: activeEmotionTag === tag }]"
            @click="activeEmotionTag = tag"
          >
            <span class="tag-icon">•</span>
            <span class="tag-text">{{ tag }}</span>
          </button>
        </div>
      </div>

      <!-- B区 - 产品画廊(瀑布流) -->
      <div class="product-gallery-section">
        <div class="product-gallery">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="gallery-item"
          >
            <div class="gallery-image-container">
              <img 
                :src="`/src/assets/${product.image}`" 
                :alt="product.name"
                class="gallery-image"
              />
            </div>
            <div class="gallery-item-info">
              <h4 class="gallery-item-name">{{ product.name }}</h4>
              <button v-if="product.hasStory" class="story-btn" @click="handleStoryClick(product)">
                故事▶
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
</template>

<style scoped>
.culture-view-container {
  min-height: calc(100vh - 60px);
  background-color: #f5f9f2;
  padding: 2rem;
}

/* header */
.page-header {
  text-align: left;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}
.page-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

/* A区情感标签筛选 */
.emotion-filter-section {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  border: none;
}
.emotion-filter-section h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: normal;
}
.emotion-tags {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 0;
}
.emotion-tag-btn {
  background: none;
  border: none;
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  color: #666;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.tag-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.emotion-tag-btn.active .tag-icon {
  background: linear-gradient(135deg, #5f8ccf, #84b854);
  color: white;
  box-shadow: 0 4px 8px rgba(45, 143, 64, 0.3);
}

.tag-text {
  transition: all 0.3s ease;
}

.emotion-tag-btn:hover .tag-text {
  color: #5f8ccf;
}

.emotion-tag-btn.active .tag-text {
  color: #5f8ccf;
  font-weight: 600;
}

.emotion-tag-btn:hover {
  color: #5f8ccf;
  background-color: rgba(45, 143, 64, 0.05);
}

.emotion-tag-btn.active {
  color: #5f8ccf;
  font-weight: 600;
  background-color: rgba(45, 143, 64, 0.05);
}

.emotion-tag-btn.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  border-radius: 3px;
}

.emotion-tag-btn.active::before {
  display: none;
}
/* 搜索框 + 分类 */
.search-and-filter {
  text-align: center;
  margin-bottom: 2rem;
}
.search-input {
  width: 60%;
  max-width: 600px;
  padding: 0.8rem 1.2rem;
  border: 2px solid #cde8d1;
  border-radius: 30px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  margin-bottom: 1rem;
}
.search-input:focus {
  border-color: #5f8ccf;
}
.culture-categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.category-btn {
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 25px;
  background: white;
  color: #5f8ccf;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.category-btn.active,
.category-btn:hover {
  background: linear-gradient(90deg, #5f8ccf, #84b854);
  color: white;
}

/* B区产品画廊瀑布流 */
.product-gallery-section {
  margin-top: 2rem;
}
.product-gallery-section h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: normal;
}
.product-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.gallery-item {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}
.gallery-item:hover {
  transform: translateY(-2px);
}
.gallery-image-container {
  background: #ffffff;
  border: 1px solid #d0d0d0;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}
.gallery-item:hover .gallery-image-container {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.gallery-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery-item:hover .gallery-image {
  transform: scale(1.02);
}
.gallery-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.gallery-item-name {
  font-size: 1.05rem;
  color: #333;
  margin: 0;
  font-weight: 500;
  transition: color 0.3s ease;
}
.gallery-item:hover .gallery-item-name {
  color: #ff4757;
}
.story-btn {
  align-self: flex-start;
  background: transparent;
  border: 1px solid #ff4757;
  color: #ff4757;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  font-weight: 500;
}
.story-btn:hover {
  background: #ff4757;
  color: white;
  text-decoration: none;
  transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .gallery-image {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .product-gallery {
    grid-template-columns: 1fr;
  }
  .emotion-tags {
    flex-direction: column;
    gap: 0.5rem;
  }
  .emotion-tag-btn {
    text-align: left;
  }
}
</style>
