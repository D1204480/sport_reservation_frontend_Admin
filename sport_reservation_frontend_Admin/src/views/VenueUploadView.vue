<template>
  <div class="max-w-2xl mx-auto p-4">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-4">
        <!-- Venue Name Display -->
        <div>
          <label class="block text-sm font-medium mb-1">場地名稱</label>
          <div class="p-2 bg-gray-50 rounded">{{ selectedCourt?.title || '' }}</div>
        </div>

        <!-- Image Upload -->
        <div>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div v-if="!previewImage" class="flex flex-col items-center">
              <img src="/img/upload.svg" alt="上傳圖片" class="w-12 h-12 mb-2">
              <span class="text-gray-600">+ 上傳圖片</span>
            </div>
            <img v-else :src="previewImage" alt="預覽圖片" class="max-h-64 mx-auto">
            <input type="file" @change="handleImageUpload" accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
          </div>
        </div>

        <!-- Operating Hours -->
        <div>
          <label class="block text-sm font-medium mb-1">營業時間</label>
          <input v-model="operatingHours" type="text" class="w-full p-2 border rounded" placeholder="06:00-22:00">
        </div>

        <!-- Pricing -->
        <div>
          <label class="block text-sm font-medium mb-1">收費標準</label>
          <div class="space-y-2">
            <div>
              <input v-model="peakHourRate" type="text" class="w-full p-2 border rounded" placeholder="尖峰時段：每個1500元/時">
            </div>
            <div>
              <input v-model="offPeakRate" type="text" class="w-full p-2 border rounded" placeholder="離峰時段：每個1000元/時">
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between">
        <button type="button" @click="goBack" class="px-4 py-2 border rounded">
          返回
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
          確定新增
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// State
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

const selectedCourt = ref(null)
const previewImage = ref(null)
const operatingHours = ref('06:00-22:00')
const peakHourRate = ref('尖峰時段：每個1500元/時')
const offPeakRate = ref('離峰時段：每個1000元/時')

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  // Here you would typically send the data to your backend
  const formData = {
    courtId: selectedCourt.value?.id,
    courtTitle: selectedCourt.value?.title,
    image: previewImage.value,
    operatingHours: operatingHours.value,
    peakHourRate: peakHourRate.value,
    offPeakRate: offPeakRate.value
  }

  console.log('Form submitted:', formData)
  // Add your API call here

  // Navigate back or to success page
  router.push('/venues')
}

const goBack = () => {
  router.back()
}

// Lifecycle
onMounted(() => {
  const courtId = route.params.id
  selectedCourt.value = courts.value.find(court => court.id === courtId)
})
</script>