<script setup>
import { ref, computed } from 'vue'

// ======= 研究方向标签 =======
const directions = ["全部研究", "乡村振兴", "文化保护", "可持续发展", "产业创新"]
const activeDirection = ref("全部研究")

// ======= 模拟研究成果数据 =======
const allPapers = ref([
  {
    id: 1,
    title: "数字乡村建设与乡村振兴战略融合路径研究",
    author: "李教授 等著",
    date: "2023年10月",
    area: "乡村振兴、数字经济",
    direction: "乡村振兴",
    abstract:
      "本研究探讨了数字技术在乡村振兴中的应用路径，分析了数字基础设施建设、数字经济发展和数字治理创新对乡村发展的影响机制..."
  },
  {
    id: 2,
    title: "传统村落文化遗产保护与旅游开发协调发展研究",
    author: "张研究员 等著",
    date: "2023年9月",
    area: "文化保护、旅游开发",
    direction: "文化保护",
    abstract:
      "基于多案例分析，本研究构建了传统村落文化遗产保护与旅游开发的协调发展模型，提出了基于社区参与的保护开发路径..."
  },
  {
    id: 3,
    title: "乡村生态农业可持续发展模式与政策支持体系研究",
    author: "王博士 等著",
    date: "2023年8月",
    area: "可持续发展、生态农业",
    direction: "可持续发展",
    abstract:
      "本研究系统梳理了乡村生态农业发展的典型模式，分析了政策支持体系的现状与不足，并提出了促进生态农业可持续发展的政策建议..."
  },
  {
    id: 4,
    title: "乡村手工艺的产业创新与市场转型",
    author: "赵教授 等著",
    date: "2023年7月",
    area: "产业创新、手工艺",
    direction: "产业创新",
    abstract:
      "通过对手工艺产业链的调研，本研究提出了手工艺产品创新设计与市场化发展的新模式，促进传统工艺与现代消费需求的结合。"
  }
])

// ======= 加载与筛选逻辑 =======
const itemsPerPage = 2
const currentPage = ref(1)

const filteredPapers = computed(() => {
  return allPapers.value.filter(
    p => activeDirection.value === "全部研究" || p.direction === activeDirection.value
  )
})

const displayedPapers = computed(() =>
  filteredPapers.value.slice(0, currentPage.value * itemsPerPage)
)

function loadMore() {
  if (displayedPapers.value.length < filteredPapers.value.length) {
    currentPage.value++
  }
}

// ======= 模态框：显示论文详情 =======
const selectedPaper = ref(null)
const showModal = ref(false)
function openPaper(paper) {
  selectedPaper.value = paper
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="academic-view-container">
    <!-- 页头 -->
    <div class="page-header">
      <h1>学术研究</h1>
      <p>探索乡村振兴与传统文化发展的理论与实践</p>
    </div>

    <div class="academic-content">
      <!-- 研究方向 -->
      <div class="research-directions">
        <button
          v-for="dir in directions"
          :key="dir"
          :class="['direction-btn', { active: activeDirection === dir }]"
          @click="activeDirection = dir; currentPage = 1"
        >
          {{ dir }}
        </button>
      </div>

      <!-- 最新研究成果 -->
      <div class="latest-research">
        <h2 class="section-title">最新研究成果</h2>
        <div class="research-papers">
          <div v-for="paper in displayedPapers" :key="paper.id" class="paper-card">
            <div class="paper-header">
              <h3 class="paper-title">{{ paper.title }}</h3>
              <div class="paper-meta">
                <span class="author">{{ paper.author }}</span>
                <span class="date">{{ paper.date }}</span>
              </div>
            </div>
            <div class="paper-abstract">
              <p>{{ paper.abstract }}</p>
            </div>
            <div class="paper-actions">
              <span class="research-area">{{ paper.area }}</span>
              <button class="read-paper-btn" @click="openPaper(paper)">阅读全文</button>
            </div>
          </div>
        </div>

        <div class="load-more" v-if="displayedPapers.length < filteredPapers.length">
          <button class="load-more-btn" @click="loadMore">查看更多研究成果</button>
        </div>
      </div>

      <!-- 重点研究项目 -->
      <div class="research-projects">
        <h2 class="section-title">重点研究项目</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#2d8f40">
                <path
                  d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                />
              </svg>
            </div>
            <div class="project-content">
              <h3 class="project-title">长三角乡村文化振兴战略研究</h3>
              <p class="project-description">探索长三角区域乡村文化资源整合与创新发展路径...</p>
              <div class="project-info">
                <span class="funding">国家级项目</span>
                <span class="duration">2022-2025年</span>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#2d8f40">
                <path
                  d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 
                   0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                />
              </svg>
            </div>
            <div class="project-content">
              <h3 class="project-title">乡村传统工艺数字化保护与传承研究</h3>
              <p class="project-description">利用数字技术保护乡村非物质文化遗产，推动传统工艺创新发展...</p>
              <div class="project-info">
                <span class="funding">省部级项目</span>
                <span class="duration">2023-2024年</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 学术动态 -->
      <div class="academic-news">
        <h2 class="section-title">学术动态</h2>
        <div class="news-list">
          <div class="news-item" v-for="(n, i) in 3" :key="i">
            <div class="news-date">{{ ['2023-11-15','2023-11-08','2023-10-30'][i] }}</div>
            <div class="news-content">
              <h3 class="news-title">
                {{ [
                  '我院举办“乡村振兴与数字经济”学术研讨会',
                  '我院学者在《中国农村经济》发表最新研究成果',
                  '乡村文化振兴青年学者论坛在我校顺利召开'
                ][i] }}
              </h3>
              <a href="#" class="read-more">详情 →</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>{{ selectedPaper?.title }}</h3>
        <p><strong>作者：</strong>{{ selectedPaper?.author }}</p>
        <p><strong>时间：</strong>{{ selectedPaper?.date }}</p>
        <p><strong>研究方向：</strong>{{ selectedPaper?.area }}</p>
        <p style="margin-top: 1rem">{{ selectedPaper?.abstract }}</p>
        <button class="close-btn" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 学术页面样式 */
.academic-view-container { min-height: calc(100vh - 60px); background-color: #f5f9f2; padding: 2rem; } .page-header { text-align: center; margin-bottom: 2rem; } .page-header h1 { font-size: 2.5rem; color: #2d8f40; margin-bottom: 0.5rem; } .page-header p { color: #666; font-size: 1.1rem; } .academic-content { max-width: 1200px; margin: 0 auto; } .research-directions { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; } .direction-btn { padding: 0.75rem 1.5rem; border: none; background: white; color: #666; border-radius: 25px; cursor: pointer; font-size: 1rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .direction-btn:hover, .direction-btn.active { background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(45, 143, 64, 0.3); } .section-title { font-size: 1.8rem; color: #2d8f40; margin-bottom: 1.5rem; text-align: center; } /* 研究成果样式 */ .latest-research { margin-bottom: 3rem; } .research-papers { display: flex; flex-direction: column; gap: 1.5rem; } .paper-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .paper-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); } .paper-header { margin-bottom: 1rem; } .paper-title { font-size: 1.3rem; color: #2d8f40; margin-bottom: 0.5rem; line-height: 1.4; } .paper-meta { display: flex; gap: 1.5rem; color: #666; font-size: 0.9rem; } .paper-abstract { color: #666; line-height: 1.6; margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #2d8f40; } .paper-actions { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; } .research-area { background: #e8f5e9; color: #2d8f40; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; } .read-paper-btn { background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; } .read-paper-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(45, 143, 64, 0.3); } /* 加载更多按钮 */ .load-more { text-align: center; margin-top: 2rem; } .load-more-btn { padding: 1rem 2rem; background: white; border: 2px solid #2d8f40; color: #2d8f40; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; } .load-more-btn:hover { background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%); color: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(45, 143, 64, 0.3); } /* 研究项目样式 */ .research-projects { margin-bottom: 3rem; } .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem; } .project-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); display: flex; padding: 1.5rem; gap: 1.5rem; transition: all 0.3s ease; } .project-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); } .project-icon { flex-shrink: 0; width: 80px; height: 80px; background: linear-gradient(135deg, #e8f5e9 0%, #d0f0c0 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; } .project-content { flex: 1; } .project-title { font-size: 1.2rem; color: #2d8f40; margin-bottom: 0.5rem; } .project-description { color: #666; line-height: 1.6; margin-bottom: 1rem; font-size: 0.95rem; } .project-info { display: flex; gap: 1rem; flex-wrap: wrap; } .funding, .duration { background: #f0f0f0; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: #666; } .funding { background: linear-gradient(90deg, #ffcc33 0%, #ffb300 100%); color: white; } /* 学术动态样式 */ .academic-news { margin-bottom: 2rem; } .news-list { display: flex; flex-direction: column; gap: 1rem; } .news-item { background: white; border-radius: 12px; padding: 1.5rem; display: flex; gap: 1.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .news-item:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); } .news-date { flex-shrink: 0; min-width: 80px; text-align: center; padding: 0.5rem; background: linear-gradient(135deg, #e8f5e9 0%, #d0f0c0 100%); border-radius: 8px; color: #2d8f40; font-weight: 600; font-size: 0.9rem; } .news-content { flex: 1; display: flex; justify-content: space-between; align-items: center; } .news-title { font-size: 1.1rem; color: #333; margin: 0; flex: 1; } .news-content .read-more { color: #2d8f40; font-weight: 500; text-decoration: none; transition: color 0.3s ease; margin-left: 1rem; } .news-content .read-more:hover { color: #84b854; } @media (max-width: 768px) { .academic-view-container { padding: 1.5rem; } .page-header h1 { font-size: 2rem; } .section-title { font-size: 1.5rem; } .research-directions { flex-wrap: wrap; } .direction-btn { padding: 0.6rem 1.2rem; font-size: 0.9rem; } .paper-title { font-size: 1.1rem; } .paper-meta { flex-direction: column; gap: 0.5rem; } .paper-actions { flex-direction: column; align-items: flex-start; } .projects-grid { grid-template-columns: 1fr; } .project-card { flex-direction: column; align-items: center; text-align: center; } .news-item { flex-direction: column; align-items: center; text-align: center; } .news-content { flex-direction: column; gap: 1rem; } }
/* 模态框新增 */
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
  max-width: 500px;
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.close-btn {
  margin-top: 1rem;
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
</style>
