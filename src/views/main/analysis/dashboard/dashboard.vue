<template>
  <div class="dashboard">
    <!-- 1.顶部数据的展示 -->
    <el-row :gutter="10">
      <template v-for="item in analysisStore.amountData" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间的图标 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <chart-card header="分类商品数量(饼图)">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="分类商品数量(玫瑰图)">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部的图标 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <chart-card>
          <line-echart
            :labels="showGoodsCategorySale.labels"
            :values="showGoodsCategorySale.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart
            :labels="showGoodsCategoryFavor.labels"
            :values="showGoodsCategoryFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import CountCard from '@/components/count-card/count-card.vue'
import ChartCard from '@/components/chart-card/chart-card.vue'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'

import useAnalysisStore from '@/store/analysis/analysis'

const analysisStore = useAnalysisStore()
analysisStore.fetchDashboardDataAction()

const {
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
}
</style>
