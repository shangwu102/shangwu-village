<script setup>
import { ref, computed } from 'vue'

// 分类标签
const categories = ["全部乡村", "历史古村", "民俗村落", "生态示范村", "传统手工艺村"]
const activeCategory = ref("全部乡村")

// 村落数据
const allVillages = ref([
  {
    id: 1,
    name: "乌镇西栅",
    tag: "历史古村",
    location: "浙江省嘉兴市桐乡市",
    description: "乌镇西栅是典型的江南水乡古镇，保存了完整的明清建筑风貌，以河成街，街桥相连，依河筑屋，水镇一体，是中国江南水乡文化的重要代表。",
    features: ["古建筑群", "水乡风光", "民俗文化"],
    icon: "★"
  },
  {
    id: 2,
    name: "宏村",
    tag: "民俗村落",
    location: "安徽省黄山市黟县",
    description: "宏村被誉为“画里的乡村”，以其独特的牛形村落布局、徽派建筑和古水系工程闻名，展现了古代人与自然的和谐共生智慧。",
    features: ["徽派建筑", "水利工程", "世界遗产"],
    icon: "⛰️"
  },
  {
    id: 3,
    name: "余村",
    tag: "生态示范村",
    location: "浙江省湖州市安吉县",
    description: "余村是“绿水青山就是金山银山”理念的发源地，通过生态转型实现了从靠山吃山到养山富山的转变，是生态文明建设的典范。",
    features: ["生态旅游", "绿色发展", "乡村振兴"],
    icon: "🌿"
  },
  {
    id: 4,
    name: "景德镇古窑村",
    tag: "传统手工艺村",
    location: "江西省景德镇市浮梁县",
    description: "景德镇古窑村保留了完整的传统制瓷工艺流程，从制胎、绘画到烧窑展现了千年瓷都的手工技艺与工匠精神。",
    features: ["陶瓷工艺", "非遗传承", "工匠精神"],
    icon: "🏺"
  }
])

// ======= 动态逻辑 =======
const itemsPerPage = 2
const currentPage = ref(1)

const filteredVillages = computed(() => {
  return allVillages.value.filter(
    v => activeCategory.value === "全部乡村" || v.tag === activeCategory.value
  )
})
const displayedVillages = computed(() =>
  filteredVillages.value.slice(0, currentPage.value * itemsPerPage)
)

function loadMore() {
  if (displayedVillages.value.length < filteredVillages.value.length) {
    currentPage.value++
  }
}

// 模态框逻辑
const selectedVillage = ref(null)
const showModal = ref(false)

function openVillage(village) {
  selectedVillage.value = village
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="villages-view-container">
    <div class="page-header">
      <h1>乡墨风采</h1>
      <p>展现乡村独特魅力与文化底蕴</p>
    </div>

    <div class="villages-content">
      <!-- 分类 -->
      <div class="village-categories">
        <button
          v-for="c in categories"
          :key="c"
          :class="['category-btn', { active: activeCategory === c }]"
          @click="activeCategory = c; currentPage = 1"
        >
          {{ c }}
        </button>
      </div>

      <!-- 展示 -->
      <div class="villages-showcase">
        <div
          v-for="village in displayedVillages"
          :key="village.id"
          class="village-card"
          @click="openVillage(village)"
        >
          <div class="village-image">
            <div class="image-placeholder">
              <span style="font-size: 2.5rem">{{ village.icon }}</span>
            </div>
            <div class="village-tag">{{ village.tag }}</div>
          </div>
          <div class="village-info">
            <h3 class="village-name">{{ village.name }}</h3>
            <div class="village-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#84b854">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
                     7-13c0-3.87-3.13-7-7-7zm0 
                     9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
                     2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              {{ village.location }}
            </div>
            <p class="village-description">{{ village.description }}</p>
            <div class="village-features">
              <span v-for="f in village.features" :key="f" class="feature-tag">{{ f }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more" v-if="displayedVillages.length < filteredVillages.length">
        <button class="load-more-btn" @click="loadMore">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#2d8f40">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          加载更多乡村
        </button>
      </div>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>{{ selectedVillage?.name }}</h3>
        <p><strong>类型：</strong>{{ selectedVillage?.tag }}</p>
        <p><strong>位置：</strong>{{ selectedVillage?.location }}</p>
        <p style="margin-top: 1rem">{{ selectedVillage?.description }}</p>
        <div class="feature-box">
          <span v-for="f in selectedVillage?.features" :key="f" class="feature-tag">{{ f }}</span>
        </div>
        <button class="close-btn" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 乡墨页面样式 */
.villages-view-container { min-height: calc(100vh - 60px); background-color: #f5f9f2; padding: 2rem; } .page-header { text-align: center; margin-bottom: 2rem; } .page-header h1 { font-size: 2.5rem; color: #2d8f40; margin-bottom: 0.5rem; } .page-header p { color: #666; font-size: 1.1rem; } .villages-content { max-width: 1200px; margin: 0 auto; } .village-categories { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; } .category-btn { padding: 0.75rem 1.5rem; border: none; background: white; color: #666; border-radius: 25px; cursor: pointer; font-size: 1rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .category-btn:hover, .category-btn.active { background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(45, 143, 64, 0.3); } .villages-showcase { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; } .village-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; cursor: pointer; } .village-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); } .village-image { position: relative; height: 200px; overflow: hidden; } .image-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #e8f5e9 0%, #d0f0c0 100%); display: flex; align-items: center; justify-content: center; } .village-tag { position: absolute; top: 1rem; left: 1rem; background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500; } .village-info { padding: 1.5rem; } .village-name { font-size: 1.3rem; color: #2d8f40; margin-bottom: 0.5rem; } .village-location { display: flex; align-items: center; gap: 0.5rem; color: #666; font-size: 0.9rem; margin-bottom: 1rem; } .village-description { color: #666; line-height: 1.6; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; } .village-features { display: flex; flex-wrap: wrap; gap: 0.5rem; } .feature-tag { background: #e8f5e9; color: #2d8f40; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; } .load-more { text-align: center; margin-top: 3rem; } .load-more-btn { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem; background: white; border: 2px solid #2d8f40; color: #2d8f40; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; } .load-more-btn:hover { background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(45, 143, 64, 0.3); } @media (max-width: 768px) { .village-categories { flex-wrap: wrap; } .category-btn { padding: 0.6rem 1.2rem; font-size: 0.9rem; } .villages-showcase { grid-template-columns: 1fr; } .page-header h1 { font-size: 2rem; } }
/* 模态框增强 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 480px;
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.close-btn {
  margin-top: 1.5rem;
  background: #2d8f40;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.close-btn:hover {
  background: #84b854;
}
.feature-box {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
