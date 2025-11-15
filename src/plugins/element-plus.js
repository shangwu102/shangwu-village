// Element Plus 按需引入配置

// 按需导入需要的组件
import {
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElDialog,
  ElMessageBox,
  ElMessage,
  ElNotification,
  ElIcon
  // 可以根据项目需要添加更多组件
} from 'element-plus'

// 导入图标
import { View } from '@element-plus/icons-vue'

// 导入组件样式（按需引入时也需要导入对应的样式）
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/icon/style/css'

/**
 * 安装Element Plus组件
 * @param app Vue应用实例
 */
export function setupElementPlus(app) {
  // 注册组件
  app.use(ElButton)
  app.use(ElInput)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElDialog)
  app.use(ElIcon)
  
  // 全局注册图标组件
  app.component('View', View)
  
  // 挂载消息类组件到全局属性
  app.config.globalProperties.$msgbox = ElMessageBox
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  
  // 配置Element Plus的全局选项
  app.config.globalProperties.$ELEMENT = {
    size: 'default', // 组件默认尺寸
    zIndex: 3000 // 弹层的初始 z-index
  }
}

// 导出组件供直接使用
export {
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElDialog,
  ElMessageBox,
  ElMessage,
  ElNotification,
  ElIcon,
  View
}