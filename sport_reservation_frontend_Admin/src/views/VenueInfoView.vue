<template>
  <div>
    <div class="pageTitle">
      <h3>{{ sportTitle }}場地</h3>
    </div>

    <div class="container">
      <div class="courts-grid">
        <div v-for="court in filteredCourts" :key="court.id" class="court-container" @click="goToCourtDetail(court.id)">
          <div class="court">
            <img :src="court.image" :alt="court.title">
          </div>
          <div class="court-title">{{ court.title }}</div>
        </div>
      </div>

      <div class="button-group">
        <button class="btn-cancel" @click="handleCancel">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 使用 query 獲取參數
const sportId = Number(route.query.id)
const sportTitle = ref(route.query.title || '運動')

// 所有場地資料
const allCourts = {
  1: [ // 籃球
    { id: 'A', title: '籃球A場', image: '/courts/b01.png' },
    { id: 'B', title: '籃球B場', image: '/courts/b02.png' },
    { id: 'C', title: '籃球C場', image: '/courts/b03.png' },
    { id: 'D', title: '籃球D場', image: '/courts/b04.png' },
    { id: 'E', title: '籃球E場', image: '/courts/b05.png' },
    { id: 'F', title: '籃球F場', image: '/courts/b06.png' }
  ],
  2: [ // 桌球
    { id: 'A', title: '桌球A區', image: '/courts/b01.png' },
    { id: 'B', title: '桌球B區', image: '/courts/b02.png' },
    { id: 'C', title: '桌球C區', image: '/courts/b01.png' },
  ],
  3: [ // 游泳池
    { id: 'A', title: '游泳池', image: '/courts/b01.png' },
  ],
  4: [ // 羽球
    { id: 'A', title: '羽球A場', image: '/courts/b01.png' },
    { id: 'B', title: '羽球B場', image: '/courts/b02.png' },
    { id: 'C', title: '羽球C場', image: '/courts/b01.png' },
    { id: 'D', title: '羽球D區', image: '/courts/b02.png' },
    { id: 'E', title: '羽球E區', image: '/courts/b01.png' },
    { id: 'F', title: '羽球F區', image: '/courts/b02.png' },
  ],
  5: [ // 桌球
    { id: 'A', title: '排球A場', image: '/courts/b01.png' },
    { id: 'B', title: '排球B場', image: '/courts/b02.png' },
    { id: 'C', title: '排球C場', image: '/courts/b01.png' },
    { id: 'D', title: '排球D場', image: '/courts/b02.png' },
    { id: 'E', title: '排球E場', image: '/courts/b01.png' },
    { id: 'F', title: '排球F場', image: '/courts/b02.png' },
  ],
  6: [ // 桌球
    { id: 'A', title: '攀岩A場', image: '/courts/b01.png' },
    { id: 'B', title: '攀岩B場', image: '/courts/b02.png' },
    { id: 'C', title: '攀岩C場', image: '/courts/b01.png' },
    { id: 'D', title: '攀岩D場', image: '/courts/b02.png' },
  ],
  
}

// 根據運動ID篩選對應場地
const filteredCourts = computed(() => {
  console.log('當前 sportId:', sportId)
  return allCourts[sportId] || []
})

const goToCourtDetail = (courtId) => {
  router.push({
    path: `/venueUpload/${courtId}`,
    query: {
      id: route.query.id,  // 保持運動ID
      title: route.query.title  // 保持運動標題
    }
  })
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
/* 標題 */
.pageTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 10px 0px;
}

/* 球場 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.courts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.court-container {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.court-container:hover {
  transform: translateY(-5px);
}

.court {
  margin-bottom: 10px;
}

.court img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.court-title {
  font-family: sans-serif;
  margin-top: 10px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

button {
  padding: 8px 24px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  padding: 8px 34px;
  background-color: #f5f5f5;
  border: 1px solid #333;
}

.btn-submit {
  background-color: #333;
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .courts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .courts-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 16px;
  }
}
</style>