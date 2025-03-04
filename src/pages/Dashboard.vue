<template>
  <div class="dashboard">
    <!-- 顶部卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics" :key="index">
        <el-card class="stat-card" :body-style="{ padding: '20px' }">
          <div class="card-content">
            <el-icon :size="40" :class="item.iconClass">
              <component :is="item.icon"></component>
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-label">{{ item.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card>
          <div ref="lineChartRef" style="height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div ref="pieChartRef" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { User, Shop, Goods, Money } from '@element-plus/icons-vue'

const statistics = [
  { label: '总用户数', value: '1,234', icon: 'User', iconClass: 'blue-icon' },
  { label: '商品总数', value: '890', icon: 'Goods', iconClass: 'green-icon' },
  { label: '订单总数', value: '238', icon: 'Shop', iconClass: 'orange-icon' },
  { label: '总收入', value: '￥89,232', icon: 'Money', iconClass: 'red-icon' }
]

const lineChartRef = ref(null)
const pieChartRef = ref(null)

onMounted(() => {
  // 初始化折线图
  const lineChart = echarts.init(lineChartRef.value)
  lineChart.setOption({
    title: { text: '销售趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  })

  // 初始化饼图
  const pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption({
    title: { text: '销售分布' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' }
      ]
    }]
  })
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stat-card {
  margin-bottom: 20px;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-info {
  flex-grow: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
}

.chart-row {
  margin-top: 20px;
}

.blue-icon { color: #409EFF; }
.green-icon { color: #67C23A; }
.orange-icon { color: #E6A23C; }
.red-icon { color: #F56C6C; }
</style> 