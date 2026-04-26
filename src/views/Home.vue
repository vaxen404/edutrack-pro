<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const sortedStudents = computed(() => {
    return [...userStore.students].sort((a, b) => a.id - b.id)
})

const calculateAverage = (s: any) => {
    const n1 = Number(s.firstGrade) || 0;
    const n2 = Number(s.lastGrade) || 0;
    const o1 = Number(s.firstOralGrade) || 0;
    const o2 = Number(s.lastOralGrade) || 0;

    const total = n1 + n2 + o1 + o2;
    return (total / 4).toFixed(1);
}

const confirmDelete = (id: number, name: string) => {
    if(confirm(`${name} isimli öğrenciyi silmek istediğinize emin misiniz?`)){
        userStore.deleteStudent(id)
    }
}
</script>

<template>
    <div class="home-container">
        <div class="header">
            <h1>🎓 Student List</h1>
            <button class="add-btn" @click="router.push('/add-student')">New Student</button>
        </div>

        <div class="list">
            <div v-if="sortedStudents.length === 0" class="empty-msg">Henüz öğrenci bulunmuyor.</div>
            
            <div v-for="student in sortedStudents" :key="student.id" class="item">
                <div class="id-badge">#{{ student.id }}</div>
                
               <div class="details">
                    <strong class="name">{{ student.firstname }} {{ student.lastname }}</strong>
                    <div class="grades-row">
                        <span class="grade-tag">Exams: {{ student.firstGrade }} / {{ student.lastGrade }}</span>
                        <span class="grade-tag">Oral: {{ student.firstOralGrade }} / {{ student.lastOralGrade }}</span>
                    </div>
                </div>

               <div class="average-box" :style="{ color: Number(calculateAverage(student)) < 50 ? '#ff4d4d' : '#2ecc71' }">
                    <small>AVG</small>
                    <strong>{{ calculateAverage(student) }}</strong>
                </div>

                <div class="btns">
                    <button class="edit-btn" @click="router.push('/details/' + student.id)">Edit</button>
                    <button @click="confirmDelete(student.id, student.firstname)" class="del">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-container { max-width: 900px; margin: 0 auto; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.list { background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }

.item { 
  display: flex; 
  align-items: center; 
  gap: 20px; 
  padding: 15px 20px; 
  border-bottom: 1px solid #f0f0f0; 
}

.id-badge { color: #888; font-size: 0.9rem; font-weight: bold; width: 30px; }
.details { flex-grow: 1; }
.name { font-size: 1.1rem; color: #2c3e50; text-transform: capitalize; }

.grades-row { display: flex; gap: 15px; margin-top: 5px; }
.grade-tag { font-size: 0.85rem; color: #666; background: #f8f9fa; padding: 2px 8px; border-radius: 4px; }

.average-box { 
    text-align: center; 
    padding: 5px 15px; 
    background: #eefaf4; 
    color: #42b883; 
    border-radius: 8px;
    min-width: 60px;
}
.average-box small { display: block; font-size: 0.7rem; font-weight: bold; }

.btns { display: flex; gap: 8px; }
.edit-btn { background: #f0f4f8; color: #3498db; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500; }
.add-btn { background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
.del { color: #e74c3c; background: #fdf2f2; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; }
.del:hover { background: #e74c3c; color: white; }
.empty-msg { padding: 40px; text-align: center; color: #999; }
</style>
