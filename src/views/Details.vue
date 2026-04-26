<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import { computed, ref, watchEffect } from 'vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const studentID = Number(route.params.id)
const student = computed(() => userStore.students.find(s => s.id === studentID))

// Form verilerini öğrenci bilgilerine göre dolduruyoruz
// watchEffect kullanarak sayfa yüklendiğinde verilerin gelmesini garanti ediyoruz
const grades = ref({
    firstGrade: 0,
    lastGrade: 0,
    firstOralGrade: 0,
    lastOralGrade: 0
})

watchEffect(() => {
    if (student.value) {
        grades.value = {
            firstGrade: student.value.firstGrade,
            lastGrade: student.value.lastGrade,
            firstOralGrade: student.value.firstOralGrade,
            lastOralGrade: student.value.lastOralGrade
        }
    }
})

const handleUpdate = (field: 'firstGrade' | 'lastGrade' | 'firstOralGrade' | 'lastOralGrade') => {
    const newValue = grades.value[field];
    
    if(newValue < 0 || newValue > 100){
        alert("Hatalı not! 0-100 arası giriniz.")
        return
    }

    // Store'daki dinamik updateGrade fonksiyonunu çağırıyoruz
    userStore.updateGrade(studentID, field, newValue)
    alert(`${field} başarıyla güncellendi!`)
}

const saveAllAndExit = () => {
    // Hepsini birden güncellemek istersen döngüyle de yapabilirsin
    userStore.updateGrade(studentID, 'firstGrade', grades.value.firstGrade)
    userStore.updateGrade(studentID, 'lastGrade', grades.value.lastGrade)
    userStore.updateGrade(studentID, 'firstOralGrade', grades.value.firstOralGrade)
    userStore.updateGrade(studentID, 'lastOralGrade', grades.value.lastOralGrade)
    
    router.push('/')
}
</script>

<template>
    <div v-if="student" class="details-card">
        <h1>Student Details: {{ student.firstname }}</h1>
        
        <div class="info-grid">
            <div class="grade-edit-box">
                <label>1. Yazılı</label>
                <div class="input-group">
                    <input type="number" v-model.number="grades.firstGrade">
                    <button @click="handleUpdate('firstGrade')">Update</button>
                </div>
            </div>

            <div class="grade-edit-box">
                <label>2. Yazılı</label>
                <div class="input-group">
                    <input type="number" v-model.number="grades.lastGrade">
                    <button @click="handleUpdate('lastGrade')">Update</button>
                </div>
            </div>

            <div class="grade-edit-box">
                <label>1. Sözlü</label>
                <div class="input-group">
                    <input type="number" v-model.number="grades.firstOralGrade">
                    <button @click="handleUpdate('firstOralGrade')">Update</button>
                </div>
            </div>

            <div class="grade-edit-box">
                <label>2. Sözlü</label>
                <div class="input-group">
                    <input type="number" v-model.number="grades.lastOralGrade">
                    <button @click="handleUpdate('lastOralGrade')">Update</button>
                </div>
            </div>
        </div>

        <div class="footer-actions">
            <button @click="saveAllAndExit" class="save-all-btn">Save & Close</button>
            <button @click="router.push('/')" class="back-btn">Cancel</button>
        </div>
    </div>

    <div v-else class="error-state">
        <p>Öğrenci bulunamadı!</p>
        <button @click="router.push('/')">Ana Sayfaya Dön</button>
    </div>
</template>

<style scoped>
.details-card { max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 12px; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
.grade-edit-box { display: flex; flex-direction: column; gap: 5px; }
.grade-edit-box label { font-weight: bold; color: #666; font-size: 0.9rem; }

.input-group { display: flex; gap: 5px; }
input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }

button { cursor: pointer; transition: 0.2s; }
.update-btn { background: #3498db; color: white; border: none; padding: 8px; border-radius: 4px; font-size: 0.8rem; }
.save-all-btn { background: #42b883; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; }
.back-btn { background: #eee; border: none; padding: 12px 25px; border-radius: 6px; color: #666; }

.footer-actions { display: flex; gap: 10px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
</style>