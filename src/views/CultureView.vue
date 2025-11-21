<script setup>
import { ref, computed } from "vue"
import imageUrl1 from "@/assets/culture/1.jpg"
import imageUrl2 from "@/assets/culture/2.jpg"
import imageUrl3 from "@/assets/culture/3.jpg"
import imageUrl4 from "@/assets/culture/4.webp"
import imageUrl5 from "@/assets/culture/5.jpg"
import imageUrl6 from "@/assets/culture/6.jpg"
import { ElDialog, ElButton, ElDivider, ElTag, ElEmpty } from 'element-plus'

// 模拟产品数据
// 弹窗相关响应式数据
const dialogVisible = ref(false)
const currentStory = ref(null)

const allProducts = ref([
  {
    id: 1, 
    name: "外婆米香", 
    tags: ["外婆的味道"], 
    image: imageUrl1, 
    hasStory: true,
    story: {
      title: "外婆的糯米香",
      author: "李小花",
      date: "2023-09-15",
      content: `小时候的秋天，总带着一种金黄的温度。夕阳照在稻田上，风一吹，稻浪一层又一层地涌过来，像在和我们这些孩子打招呼。而外婆，就是站在田间那片金色海洋尽头的灯塔。她总能一眼挑出最饱满最润泽的糯米稻谷，那是她几十年种田积累下来的本领。

收割后，外婆会把糯米一遍遍筛洗，装进那口用了很久的木蒸桶里——木桶经历了岁月的熏染，已带着淡淡的清香。蒸饭之前，她会仔仔细细地调整灶火的大小，说火太旺糯米会“炸腰”，火太小又蒸不透，只有恰到好处，才能让米香慢慢升起来。

等蒸汽从桶缝里弥漫出来时，整个屋子就像装进了一个甜而温暖的世界。
我总是悄悄凑过去，踮着脚尖想偷看、甚至偷尝一点。那一天，我终于忍不住掀开木盖，结果被一股热气烫得往后跳，吓得眼泪都出来了。外婆笑得前仰后合，把我抱到怀里，一边给我揉着手背一边说：“小馋猫，好东西得耐心等。”

那时我不懂外婆话里的含义，只觉得香气实在太诱人。可再长大一点，我明白了——外婆的耐心，是从每一粒米、每一顿饭、每一次生活的小事里沉淀出来的。她说：“做饭，是把日子蒸得香一点，把家人暖一点。”

如今外婆已离开多年。
每到秋天，我仍会买些糯米，学着她的方法蒸上一锅。蒸汽升起来的那一刻，我仿佛又看见她坐在灶台前，眼角带笑地望着我。糯米香钻进每一寸空气，也钻进我心里最柔软的地方。

那香味里，有热气、有稻田、有岁月的温度；有外婆慈祥的脸，也有她一生沉稳温暖的爱。`
    }
  },
  {
    id: 2, 
    name: "老槐树茶", 
    tags: ["季节限定"], 
    image: imageUrl2, 
    hasStory: true,
    story: {
      title: "老槐树下的茶香",
      author: "王大山",
      date: "2023-04-20",
      content: `村口那棵老槐树，似乎比村子里的任何一个人年龄都大。树皮皴裂如沟壑，枝干虬曲有力。每年清明前后，它都会准时开花，白得像刚落下的雪，又香得恰到好处，让人忍不住深吸几口气。

小时候的清晨，空气带着露水的湿意，村里的老人们便提着竹篮去采槐花。爷爷总是其中最早的那一个。他说：“露水没干，花才嫩。”我跟在他后头，踩在湿湿的土地上，小小的脚印一个接一个。爷爷的手大而粗糙，却能异常轻巧地捏住花蕾，生怕弄痛了它。

采回来的槐花要先清洗，再放到屋檐下的阴影里晾着。清香随着微风在屋里四处飘，仿佛连空气都变得轻盈。晾到半干时，爷爷便会把花倒入铁锅，用文火慢慢焙。锅里不时发出轻响，香味也越发柔和、醇厚。

泡一壶槐树茶，是爷爷最喜欢的悠闲。他常坐在老槐树下，竹椅吱呀作响，茶杯热气缭绕。他会慢悠悠地讲很多故事，有的我听过几十遍，但每次也都听得津津有味。那时的日子，是缓的、软的，像风吹过槐花一样轻松。

爷爷走后，老槐树却依旧年年开花。村里的人说，树越老，花越香。
我偶尔回村，总会站在槐树下，看着风吹花落。再冲上一壶槐树茶，闭上眼，耳边似乎又响起爷爷低沉的嗓音。

茶香是清淡的，却能把旧时光泡得格外清晰。
就像爷爷在我心里，永远不会枯萎。`
    }
  },
  {
    id: 3, 
    name: "手工竹编", 
    tags: ["爷爷的手艺"], 
    image: imageUrl3, 
    hasStory: true,
    story: {
      title: "爷爷的竹编人生",
      author: "张小明",
      date: "2023-11-05",
      content: `爷爷的竹编手艺，是村里出了名的。他十五岁开始学手艺，六十多年间，竹子在他手里从来没有不服气的。家里院子后面有一片竹林，那些竹子仿佛都知道它们会变成篮子、席子、风箱或工艺品，于是长得格外挺拔。

挑竹是竹编最讲究的一步。爷爷会把竹子从根部到尾部摸一遍，用指腹感受柔韧度，再用耳朵听轻轻敲击发出的声响。他常说：“竹子也有脾气，要跟它处好关系。”说得我总觉得竹子真的会听话。

爷爷削竹篾时的样子最让我着迷。柴刀在他手里稳得像画笔，竹子被剖开、劈条、刨薄，每一道工序都带着节奏。竹篾在他指尖灵巧地穿插、翻折，像织进一张无形的网，慢慢成型。那专注的神情，让人看了心也跟着静下来。

小时候，我总蹲在他腿边，看他编得入迷。爷爷偶尔会停下来，把一条竹篾递给我，手把手教我最简单的“十字纹”。可我小小的手笨得不得了，总是编歪，他却从不责怪，只笑着说：“慢慢来，不急。”

爷爷的作品不仅精致，还带着一种朴实的美。他说竹编是生活，也是与自己对话的方式——沉得住气，放得下急躁，日子才能过得顺。

如今爷爷老了，手背上的青筋凸起，老茧也更多。但他依然每天坐在堂屋门口的木凳上，捧着竹子，一篾一篾地编着。他说：“只要这双手还能动，我就想继续编。竹子陪了我一辈子，我要让更多人喜欢它。”

竹林依旧年年抽新笋，而爷爷的手艺，也在悄悄生长。`
    }
  },
  {
    id: 4, 
    name: "竹制风车", 
    tags: ["童年的玩具"], 
    image: imageUrl4, 
    hasStory: true,
    story: {
      title: "会转的童年记忆",
      author: "陈小华",
      date: "2023-06-10",
      content: `春天的风是软的，吹过田野生出一层层新绿。那时候，村里没有琳琅满目的玩具，也没有电子屏幕亮着孩子的眼睛。我们奔跑在田埂上的理由，很简单——一只竹制风车。

风车的骨架，是从山脚下砍来的细竹。老人们会把竹节隔开的薄膜刮得干干净净，然后在火上轻烤，让竹子变得更柔韧。彩纸是从旧年里留下的糖纸、烟盒纸或是被太阳褪过色的包装纸上剪下来的。简单，却带着春天独有的明亮。

我最期待的，是隔壁李爷爷做风车的日子。他的背弯得像一张老旧的弓，手却稳得能把纸裁成最薄的弯月。风车的叶片总是对得精准，插在竹杆上，轻轻一吹便能转个不停。李爷爷说：“风能吹动风车，也能吹亮孩子的眼睛。”我当时听不太懂，只觉得他做的风车比别人的都转得欢。

微风从山那头的树林里吹来，风车在手心里快速旋转，哗啦啦的声音像在为春天伴奏。我们一群孩子，追着风跑，跑到气喘吁吁，跑到夕阳把影子拉得长长的。风车转得越快，我们就笑得越大声，好像那一刻整个春天都跟着我们一起奔跑。

后来，村子里有了塑料玩具，五颜六色，动不动还会发光。孩子们手里拿着那些新奇的东西，很少再来找李爷爷。老人坐在屋檐下，竹片在指间慢慢打卷，像是在怀念什么。

直到我长大离家后的某一年春天，回村时又看见李爷爷在雕竹。他抬头，对我笑得像以前一样慈祥：“你小时候最喜欢风车了，我给你做一个新的。”那是我第一次意识到，原来风车不只是玩具，它藏着一个村庄的风、一个老人的心意，还有一整个童年的温柔。

我拿着风车站在田边，春风再次吹起，叶片哗哗旋转，像是一段回不去却永远不散的时光。`
    }
  },
  {
    id: 5, 
    name: "手工布鞋", 
    tags: ["外婆的味道", "季节限定"], 
    image: imageUrl5, 
    hasStory: true,
    story: {
      title: "千层底里的爱",
      author: "林小丽",
      date: "2023-02-14",
      content: `冬天的风从山缝里吹下来，总带着刺骨的清冽。那时家里没有暖气，冷总是从地板慢慢渗到脚心。外婆每到这个季节，就会开始做布鞋。她说：“脚暖了，心才不会冷。”

做布鞋的工序繁琐得惊人。首先是选布，外婆会把夏天收来的旧棉布洗得雪白，再叠成一层又一层，压平、刷浆、晾干。她总说：“千层底，得一层都不马虎。”在昏黄的煤油灯下，她把布裁成鞋底形状，再一针一线往上纳。针脚细密得像雨落在田埂上，一颗颗、一个个，有声却不急。

夜深时，外婆的背影最让人心安。灯光落在她银白的发丝上，缝纫的声音轻轻响着，那是一种让人安定的节奏。我常在旁边打着瞌睡，迷迷糊糊听到外婆轻声说：“给你做的鞋子，要穿得暖暖的。”

上帮的时候，她会挑花布，说是让鞋子“好看一点，热闹一点”，好像一双布鞋也能带来好运气。她把鞋面缝得圆润，把鞋底纳得坚韧。每一针都像是连着她的心意，密密地缝住家人一年四季的冷暖。

长大后离家，常常在冬天的地铁口与寒风对峙。城市的脚步声急促，街灯冷得像冰。我低头看着自己脚上的皮鞋，忽然想起外婆给我的那双布鞋——柔软、贴脚，带着棉布独有的温度。那温度像是从故乡吹来的风，带着稻谷的香和旧屋前斑驳树影的光。

再回家时，外婆的手已经不如从前灵活，针线老是扎偏。可她坚持要再给我做一双，说：“你穿着我做的鞋，走到哪都不怕冷。”那一刻，我忽然懂了千层底的意义。这不是布叠的层数，而是时间叠出来的深情。

外婆的布鞋，就是她用一生的耐心、柔软与爱，把我裹住。`
    }
  },
  {
    id: 6, 
    name: "草编蚂蚱", 
    tags: ["童年的玩具", "爷爷的手艺"], 
    image: imageUrl6, 
    hasStory: true,
    story: {
      title: "会跳的草编艺术",
      author: "赵小龙",
      date: "2023-07-28",
      content: `夏天的田埂是热闹的。蝉鸣在空气里铺成一层无形的网，狗尾巴草在风里轻轻摇晃。只要看到那些青绿的穗子，我就知道爷爷又要开始编蚂蚱了。

爷爷的手掌宽厚，皮肤粗糙，却能把一根草变成活灵活现的小精灵。他会先挑最柔软的草叶，在膝盖上轻轻揉顺，然后开始缠、绕、折。几分钟的功夫，一只“草蚂蚱”就立在他掌心，细腿、翅膀、触角俱全，像真蚂蚱刚捕来的那样灵巧。

最神奇的是，爷爷做的草蚂蚱会跳。他把一片细竹片悄悄塞在“肚子”里，只需轻轻一按，蚂蚱便“嗖”地蹦出去，落在不远的田埂上，让我们一群孩子追得满身汗。我们比赛谁的蚂蚱跳得远，谁的跳得高，而爷爷总坐在石头上乐呵呵地看，像个心软的裁判。

狗尾巴草是夏天的礼物，而爷爷是把这个礼物变得更有趣的魔法师。
他常说：“草做出来的东西，比买的玩具更有生气。”那时我不懂，只觉得草味儿有种特别的清甜，现在回头看，那是一种朴素得不能再朴素的快乐。

岁月慢慢带走了草原的青绿，也带走了那些陪我们玩耍的童年友伴。如今再回到田间，狗尾巴草依然年年长起，可愿意蹲在地上编草蚂蚱的人却少得可怜。爷爷老了，手也不像过去那样利索，可他依然能把草编得像要飞起来一样。

他把最后一只草蚂蚱递到我手里时，夕阳正落在他的背影上——有点弯，有点薄，却依旧温暖。
我忽然明白，那些会跳的草蚂蚱，不只是玩具，而是爷爷把他的一生、他的耐心、他的巧手、他的乡土气息，都悄悄塞进了那根细竹片里。

所以它们能跳。

跳得轻盈、跳得响亮，跳进我的童年，也跳到了记忆最柔软的地方。`
    }
  }
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

// 处理故事点击事件
const handleStoryClick = (product) => {
  if (product.story) {
    currentStory.value = product.story
    dialogVisible.value = true
  }
}

// 处理弹窗关闭事件
const handleClose = () => {
  dialogVisible.value = false
  currentStory.value = null
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
                :src="`${product.image}`" 
                :alt="product.name"
                class="gallery-image"
                @click="handleStoryClick(product)"
                style="cursor: pointer;"
              />
            </div>
            <div class="gallery-item-info">
              <h4 class="gallery-item-name">{{ product.name }}</h4>
              <button v-if="product.story" class="story-btn" @click="handleStoryClick(product)">
                故事▶
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>
  </div>

  <!-- 故事弹窗组件 -->
  <ElDialog
    v-model="dialogVisible"
    :title="currentStory ? `产品故事：${currentStory.title}` : '产品背后的故事'"
    width="80%"
    :before-close="handleClose"
    top="15vh"
    append-to-body
    custom-class="story-dialog"
  >
    <div v-if="currentStory" class="story-content">
      <h2 class="story-title">{{ currentStory.title }}</h2>
      <ElDivider />
      <div class="story-meta">
        <ElTag size="medium" class="author-tag">作者：{{ currentStory.author }}</ElTag>
        <ElTag size="medium" class="date-tag" effect="plain">发布日期：{{ currentStory.date }}</ElTag>
      </div>
      <div class="story-text" v-html="currentStory.content"></div>
    </div>
    <div v-else class="story-empty">
      <ElEmpty description="加载中..." />
    </div>
    <template #footer>
      <ElButton @click="handleClose" type="primary" size="large">
        关闭
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped>
.story-dialog {
  width: 80% !important;
  max-width: 800px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease-in-out;
}

.story-dialog :deep(.el-dialog__body) {
  padding: 0 !important;
  overflow: visible !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.story-content {
  padding: 10px;
  line-height: 1.8;
  height: 50vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.story-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.story-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
}

.author-tag {
  background-color: #409eff;
  color: white;
}

.date-tag {
  background-color: #f0f9eb;
  color: #67c23a;
}

.story-text {
  white-space: pre-line;
  color: #333;
  font-size: 16px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 20px;
  /* 移除固定高度，让内容在父容器中自然滚动 */
}

.story-text p {
  margin-bottom: 16px;
}

.story-text p:last-child {
  margin-bottom: 0;
}

.story-empty {
  text-align: center;
  padding: 60px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .story-dialog {
    width: 95% !important;
    max-width: none;
    top: 10vh !important;
  }
  
  .story-content {
    height: 60vh !important;
  }
  
  .story-dialog :deep(.el-dialog__body) {
    padding: 0 !important;
    overflow: visible !important;
  }
  
  .story-title {
    font-size: 24px;
  }
  
  .story-text {
    font-size: 14px;
    padding: 15px;
  }
  
  .story-meta {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

/* 原有样式 */
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
