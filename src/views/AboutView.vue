<script setup>
import { ref } from 'vue'

// 团队成员数据
const teamMembers = [
  {
    id: 1,
    name: "xx",
    position: "项目负责人",
    expertise: "数字乡村建设、乡村规划",
    bio: "北京大学城乡规划博士，深耕数字乡村建设领域十余年，主导多个国家级数字乡村试点项目。"
  },
  {
    id: 2,
    name: "xx",
    position: "技术总监",
    expertise: "地理信息系统、大数据分析",
    bio: "清华大学计算机科学硕士，专注于GIS技术在乡村发展中的应用，曾参与多个省级数字乡村平台建设。"
  },
  {
    id: 3,
    name: "xx",
    position: "文化顾问",
    expertise: "传统文化保护、乡村遗产",
    bio: "南京大学文化遗产研究院研究员，致力于传统村落文化遗产的数字化保护与传承研究。"
  }
]

// 项目目标数据
const projectGoals = [
  {
    id: 1,
    title: "数字化赋能",
    description: "通过数字技术赋能乡村发展，促进乡村产业升级和经济增长。"
  },
  {
    id: 2,
    title: "文化传承",
    description: "记录和保护传统村落文化遗产，实现乡村文化的数字化保存与传播。"
  },
  {
    id: 3,
    title: "资源整合",
    description: "整合乡村各类资源，搭建乡村发展服务平台，促进乡村可持续发展。"
  }
]

</script>

<template>
  <div class="about-view-container">
    <!-- 页头 -->
    <div class="page-header">
      <h1>关于我们</h1>
      <p>数字乡建，连接传统与未来</p>
    </div>

    <!-- 简介部分 -->
    <div class="about-section about-intro">
      <div class="section-content">
        <h2>项目简介</h2>
        <p>数字乡建平台致力于运用数字技术赋能乡村振兴，通过整合乡村资源、传承传统文化、促进产业发展，为乡村振兴提供数字化解决方案。我们的使命是搭建连接城市与乡村的桥梁，让更多人了解乡村、关注乡村、参与乡村建设，共同推动乡村可持续发展。</p>
      </div>
    </div>

    <!-- 项目目标 -->
    <div class="about-section about-goals">
      <div class="section-content">
        <h2>项目目标</h2>
        <div class="goals-container">
          <div v-for="goal in projectGoals" :key="goal.id" class="goal-card">
            <div class="goal-icon">{{ goal.id }}</div>
            <h3>{{ goal.title }}</h3>
            <p>{{ goal.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队介绍 -->
    <div class="about-section about-team">
      <div class="section-content">
        <h2>核心团队</h2>
        <div class="team-container">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="member-avatar">{{ member.name.charAt(0) }}</div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-expertise">{{ member.expertise }}</p>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="about-section about-contact">
      <div class="section-content">
        <h2>联系我们</h2>
        <div class="contact-info">
          <p><strong>邮箱：</strong>xxx</p>
          <p><strong>电话：</strong>xxx</p>
          <p><strong>地址：</strong>xxx</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
    background-color: #f5f9f2;
}

/* 页头样式 */
.page-header {
  text-align: center;
  /* margin-bottom: 3rem; */
  padding: 0 0;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2d8f40;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.2rem;
  color: #666;
}

/* 通用部分样式 */
.about-section {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  margin-left: 0;
  margin-right: 0;
}

.section-content h2 {
  color: #2d8f40;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  padding-left: 0;
  text-align: left;
}

/* 简介部分 */
.section-content p {
  line-height: 1.8;
  font-size: 1.1rem;
}

/* 项目目标 */
.goals-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.goal-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.goal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.goal-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.goal-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.goal-card p {
  color: #666;
  line-height: 1.6;
}

/* 团队介绍 */
.team-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.member-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(90deg, #2d8f40 0%, #84b854 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

.member-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.member-position {
  color: #2d8f40;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.member-expertise {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.member-bio {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 联系我们 */
.contact-info {
  text-align: left;
  padding-left: 0;
}

.contact-info p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-view-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .goals-container,
  .team-container {
    grid-template-columns: 1fr;
  }

  .team-card {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .section-content p,
  .goal-card p,
  .member-bio {
    font-size: 1rem;
  }
}
</style>
