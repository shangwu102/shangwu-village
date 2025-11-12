<script setup>
import { ref, computed, watch } from 'vue'

// 模拟数据源
const allResults = ref([
  {
    id: 1,
    title: '江南水乡传统村落建筑特色研究',
    description: '介绍江南水乡村落的建筑风格与自然和谐之美...',
    type: '文化遗产',
    date: '2024-01-15',
    location: '江苏省苏州市'
  },
  {
    id: 2,
    title: '非遗文化：江南丝竹演奏技艺',
    description: '江南丝竹作为中国传统音乐的重要组成部分...',
    type: '非遗文化',
    date: '2024-02-20',
    location: '浙江省杭州市'
  },
  {
    id: 3,
    title: '徽州古村落群保护名录',
    description: '徽州古村落以徽派建筑和深厚文化底蕴著称...',
    type: '传统村落',
    date: '2024-03-10',
    location: '安徽省黄山市'
  },
  {
    id: 4,
    title: '苗族刺绣艺术与现代创新',
    description: '探讨苗族刺绣技艺的传承与现代设计结合...',
    type: '民俗活动',
    date: '2024-04-05',
    location: '贵州省黔东南州'
  }
])

// 搜索状态
const query = ref('')
const selectedFilter = ref('全部结果')
const sortOption = ref('相关性')
const currentPage = ref(1)
const pageSize = 3
const loading = ref(false)

// 模拟搜索逻辑
const filteredResults = computed(() => {
  let results = [...allResults.value]

  // 关键字过滤
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    )
  }

  // 分类过滤
  if (selectedFilter.value !== '全部结果') {
    results = results.filter((r) => r.type === selectedFilter.value)
  }

  // 排序
  if (sortOption.value.includes('时间')) {
    results.sort((a, b) =>
      sortOption.value.includes('最新')
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    )
  }

  return results
})

// 分页
const pagedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredResults.value.slice(start, start + pageSize)
})
const totalPages = computed(() =>
  Math.ceil(filteredResults.value.length / pageSize)
)

// 搜索动作（带防抖）
let debounceTimer = null
const handleSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      currentPage.value = 1
    }, 500)
  }, 300)
}

// 监听输入变化自动搜索
watch(query, handleSearch)

// 翻页
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="search-view-container">
    <div class="page-header">
      <h1>搜索资源</h1>
      <p>查找乡村文化相关内容和资源</p>
    </div>

    <div class="search-content">
      <!-- 搜索框 -->
      <div class="search-box-container">
        <div class="search-box">
          <input
            v-model="query"
            type="text"
            placeholder="搜索乡村文化、历史、民俗、建筑等关键词..."
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button class="search-button" @click="handleSearch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            搜索
          </button>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <div class="filter-tabs">
          <button
            v-for="tab in ['全部结果','文化遗产','传统村落','民俗活动','非遗文化']"
            :key="tab"
            :class="['filter-tab', { active: selectedFilter === tab }]"
            @click="selectedFilter = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div class="sort-options">
          <label>排序：</label>
          <select v-model="sortOption">
            <option>相关性</option>
            <option>时间（最新）</option>
            <option>时间（最早）</option>
          </select>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div class="search-results">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="pagedResults.length === 0" class="no-result">
          没有找到相关内容 😢
        </div>
        <div v-else>
          <div v-for="item in pagedResults" :key="item.id" class="search-result-item">
            <div class="result-thumbnail">
              <div class="thumbnail-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#84b854">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="result-content">
              <h3 class="result-title">{{ item.title }}</h3>
              <p class="result-description">{{ item.description }}</p>
              <div class="result-meta">
                <span class="result-type">{{ item.type }}</span>
                <span class="result-date">{{ item.date }}</span>
                <span class="result-location">{{ item.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination" v-if="totalPages > 1">
        <button class="page-btn prev" @click="changePage(currentPage - 1)">上一页</button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button class="page-btn next" @click="changePage(currentPage + 1)">下一页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view-container {
  min-height: calc(100vh - 60px);
  background-color: #f5f9f2;
  padding: 2rem;
}
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}
.page-header h1 {
  font-size: 2.5rem;
  color: #2d8f40;
}
.page-header p {
  color: #666;
  font-size: 1.1rem;
}
.search-content {
  max-width: 1200px;
  margin: 0 auto;
}
.search-box {
  display: flex;
  max-width: 800px;
  margin: 0 auto 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}
.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1.1rem;
}
.search-button {
  background: linear-gradient(90deg, #2d8f40, #84b854);
  color: white;
  border: none;
  padding: 0 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
  font-weight: 500;
  transition: all .3s ease;
}
.search-button:hover {
  opacity: .9;
  transform: translateX(2px);
}
.filter-bar {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.filter-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.filter-tab {
  padding: .5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  transition: all .3s;
}
.filter-tab.active,
.filter-tab:hover {
  background: #e8f5e9;
  color: #2d8f40;
}
.search-results {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.search-result-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  transition: all .3s;
}
.search-result-item:hover {
  transform: translateX(5px);
}
.result-thumbnail {
  width: 120px;
  height: 120px;
}
.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.result-content {
  flex: 1;
}
.result-title {
  font-size: 1.3rem;
  color: #2d8f40;
  cursor: pointer;
  margin-bottom: .5rem;
}
.result-title:hover {
  color: #84b854;
}
.result-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.result-meta {
  display: flex;
  gap: 1rem;
  font-size: .9rem;
  color: #888;
}
.result-type {
  background: #e8f5e9;
  color: #2d8f40;
  padding: .25rem .75rem;
  border-radius: 12px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: .5rem;
}
.page-btn {
  padding: .5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: white;
}
.page-btn.active,
.page-btn:hover {
  background: #2d8f40;
  color: white;
}
.loading, .no-result {
  text-align: center;
  padding: 2rem;
  color: #888;
}
</style>
