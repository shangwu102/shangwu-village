<script setup>
import { ref, computed } from "vue"

// 模拟产品数据
const allProducts = ref([
  { id: 1, name: "传统竹编工艺灯罩", category: "传统工艺", price: 199 },
  { id: 2, name: "手绘青花瓷笔记本套装", category: "创意设计", price: 128 },
  { id: 3, name: "乡村风情纯棉抱枕套", category: "生活用品", price: 89 },
  { id: 4, name: "手工刺绣书签礼盒", category: "文创礼品", price: 68 },
  { id: 5, name: "徽州木雕笔筒", category: "传统工艺", price: 299 },
  { id: 6, name: "江南风手绘帆布袋", category: "创意设计", price: 158 },
  { id: 7, name: "茶香文创礼盒", category: "文创礼品", price: 229 },
  { id: 8, name: "竹艺茶具套装", category: "生活用品", price: 189 },
])

// 分类标签
const categories = ["全部产品", "传统工艺", "创意设计", "生活用品", "文创礼品"]
const activeCategory = ref("全部产品")

// 搜索关键词
const searchKeyword = ref("")

// 分页逻辑
const itemsPerPage = 4
const currentPage = ref(1)
const showCount = computed(() => currentPage.value * itemsPerPage)

// 过滤逻辑
const filteredProducts = computed(() => {
  return allProducts.value.filter((p) => {
    const matchCategory =
      activeCategory.value === "全部产品" || p.category === activeCategory.value
    const matchKeyword = p.name.includes(searchKeyword.value.trim())
    return matchCategory && matchKeyword
  })
})

// 显示当前页的产品
const displayedProducts = computed(() =>
  filteredProducts.value.slice(0, showCount.value)
)

// 加载更多
function loadMore() {
  if (showCount.value < filteredProducts.value.length) {
    currentPage.value++
  }
}

// 模态框查看详情
const selectedProduct = ref(null)
const showModal = ref(false)
function viewDetails(product) {
  selectedProduct.value = product
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="culture-view-container">
    <div class="page-header">
      <h1>文创产品</h1>
      <p>传统工艺与现代设计的完美融合</p>
    </div>

    <div class="culture-content">
      <!-- 搜索与分类 -->
      <!-- <div class="search-and-filter">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索产品名称..."
          class="search-input"
        />
        <div class="culture-categories">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['category-btn', { active: activeCategory === cat }]"
            @click="activeCategory = cat; currentPage = 1"
          >
            {{ cat }}
          </button>
        </div>
      </div> -->

      <!-- 产品列表 -->
      <div class="products-section">
        <!-- <h2 class="section-title">精选产品</h2> -->
        <div class="products-grid">
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            class="product-card"
            @click="viewDetails(product)"
          >
            <div class="product-image">
              <div class="image-placeholder">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="#2d8f40">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                     9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="product-category">{{ product.category }}</div>
              <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- 加载更多 -->
        <!-- <div class="load-more" v-if="showCount < filteredProducts.length">
          <button class="load-more-btn" @click="loadMore">加载更多</button>
        </div>
        <div v-else-if="filteredProducts.length === 0" class="no-result">
          未找到匹配的产品 😢
        </div> -->
      </div>
    </div>

    <!-- 模态框（查看详情） -->
    <!-- <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>{{ selectedProduct?.name }}</h3>
        <p>分类：{{ selectedProduct?.category }}</p>
        <p>价格：¥{{ selectedProduct?.price.toFixed(2) }}</p>
        <p>这是一款融合传统与现代的文创产品，欢迎了解更多详情！</p>
        <button class="close-btn" @click="closeModal">关闭</button>
      </div>
    </div> -->
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
  text-align: center;
  margin-bottom: 2rem;
}
.page-header h1 {
  font-size: 2.4rem;
  color: #2d8f40;
}
.page-header p {
  color: #666;
  font-size: 1.1rem;
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
  border-color: #2d8f40;
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
  color: #2d8f40;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.category-btn.active,
.category-btn:hover {
  background: linear-gradient(90deg, #2d8f40, #84b854);
  color: white;
}

/* 产品网格 */
.products-section {
  max-width: 1200px;
  margin: 0 auto;
}
.section-title {
  font-size: 1.8rem;
  color: #2d8f40;
  text-align: center;
  margin-bottom: 1.5rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.image-placeholder {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e8f5e9;
}
.product-info {
  padding: 1.2rem;
}
.product-name {
  font-size: 1.1rem;
  color: #2d8f40;
  margin-bottom: 0.3rem;
}
.product-category {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}
.product-price {
  font-weight: bold;
  color: #ff6b00;
}

/* 加载更多 */
.load-more {
  text-align: center;
  margin-top: 2rem;
}
.load-more-btn {
  padding: 0.8rem 2rem;
  border: 2px solid #2d8f40;
  color: #2d8f40;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.load-more-btn:hover {
  background: linear-gradient(90deg, #2d8f40, #84b854);
  color: white;
}
.no-result {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.close-btn {
  margin-top: 1rem;
  background: #2d8f40;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>
