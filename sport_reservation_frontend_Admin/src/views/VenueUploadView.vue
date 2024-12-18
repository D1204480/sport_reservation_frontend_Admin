<template>
  <div class="venue-form">
    <div class="form-layout">
      <!-- 左側上傳區域 -->
      <div class="upload-section">
        <div class="upload-label">上傳圖片</div>
        <div class="upload-container" @click="triggerFileUpload">
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileChange" 
            accept="image/*" 
            class="hidden"
          >
          <div v-if="!previewImage && !currentCourt.image" class="upload-placeholder">
            <div class="upload-icon">📷</div>
            <div>點擊選擇圖片</div>
          </div>
          <img 
            v-else
            :src="previewImage || currentCourt.image" 
            class="preview-image" 
            alt="場地圖片"
          >
        </div>
      </div>

      <!-- 右側表單區域 -->
      <div class="form-section">
        <div class="form-group">
          <label>場地名稱</label>
          <input 
            type="text" 
            :value="currentCourt.title" 
            readonly
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>營業時間</label>
          <input 
            type="text" 
            v-model="formData.operatingHours" 
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>收費標準</label>
          <div class="price-info">
            <div>尖峰時段：每節{{ formData.peakPrice }}元/時</div>
            <div>離峰時段：每節{{ formData.offPeakPrice }}元/時</div>
          </div>
        </div>
      </div>
    </div>

    <div class="button-group">
          <button class="btn-cancel" @click="handleCancel">返回</button>
          <button class="btn-submit" @click="handleSubmit">確定新增</button>
        </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const courts = ref([
  {
    id: 'A',
    title: '籃球A場',
    image: '/courts/b01.png'
  },
  {
    id: 'B',
    title: '籃球B場',
    image: '/courts/b02.png'
  },
  {
    id: 'C',
    title: '籃球C場',
    image: '/courts/b03.png'
  },
  {
    id: 'D',
    title: '籃球D場',
    image: '/courts/b04.png'
  },
  {
    id: 'E',
    title: '籃球E場',
    image: '/courts/b05.png'
  },
  {
    id: 'F',
    title: '籃球F場',
    image: '/courts/b06.png'
  }
])

const currentCourt = computed(() => {
  return courts.value.find(court => court.id === route.params.id) || courts.value[0]
})

const formData = ref({
  operatingHours: '06:00-22:00',
  peakPrice: 1500,
  offPeakPrice: 1000,
})

const previewImage = ref(null)
const uploadedFile = ref(null)
const fileInput = ref(null)

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  console.log('提交表單數據:', {
    courtId: currentCourt.value.id,
    title: currentCourt.value.title,
    ...formData.value,
    image: uploadedFile.value || currentCourt.value.image
  })
  router.push(`/`)
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  return () => {
    if (previewImage.value) {
      URL.revokeObjectURL(previewImage.value)
    }
  }
})
</script>

<style scoped>
.venue-form {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
}

.form-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  align-items: start;
}

/* 左側上傳區域 */
.upload-section {
  position: sticky;
  padding: 20px;
}

.upload-label {
  font-weight: bold;
  margin-bottom: 8px;
}

.upload-container {
  border: 2px dashed #ccc;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.hidden {
  display: none;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  object-fit: contain;
}

/* 右側表單區域 */
.form-section {
  flex: 1;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.price-info {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.price-info > div {
  margin-bottom: 8px;
}

.price-info > div:last-child {
  margin-bottom: 0;
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

/* 響應式設計 */
@media (max-width: 768px) {
  .form-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .upload-section {
    position: static;
  }
}
</style>