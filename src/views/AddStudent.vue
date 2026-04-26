<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const form = ref({
    firstname: '',
    lastname: '',
    firstGrade: 0,
    lastGrade: 0,
    firstOralGrade: 0,
    lastOralGrade: 0
})

const submitForm = () => {
    if (!form.value.firstname || !form.value.lastname) {
        alert("Lütfen isim ve soyisim alanlarını doldurun!");
        return;
    }

    const grades = [form.value.firstGrade, form.value.lastGrade, form.value.firstOralGrade, form.value.lastOralGrade];
    const isInvalid = grades.some(g => g < 0 || g > 100);

    if (isInvalid) {
        alert("Lütfen tüm notları 0 ile 100 arasında giriniz!");
        return;
    }

    userStore.addStudent({ ...form.value });
    alert("Öğrenci başarıyla eklendi!");
    router.push('/');
}
</script>

<template>
    <div class="form-container">
        <h2>Add New Student</h2>
        
        <div class="form-grid">
            <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="form.firstname" placeholder="firstname...">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="form.lastname" placeholder="lastname...">
            </div>

            <div class="form-group">
                <label>Grade 1</label>
                <input type="number" v-model.number="form.firstGrade" min="0" max="100">
            </div>
            <div class="form-group">
                <label>Grade 2</label>
                <input type="number" v-model.number="form.lastGrade" min="0" max="100">
            </div>

            <div class="form-group">
                <label>Oral 1</label>
                <input type="number" v-model.number="form.firstOralGrade" min="0" max="100">
            </div>
            <div class="form-group">
                <label>Oral 2</label>
                <input type="number" v-model.number="form.lastOralGrade" min="0" max="100">
            </div>
        </div>

        <div class="actions">
            <button @click="submitForm" class="save-btn">Save Student</button>
            <button @click="router.push('/')" class="cancel-btn">Cancel</button>
        </div>
    </div>
</template>

<style scoped>
.form-container { 
    max-width: 600px; 
    margin: 40px auto; 
    padding: 30px; 
    background: white; 
    border-radius: 12px; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
}

h2 { margin-bottom: 25px; color: #2c3e50; text-align: center; }

.form-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 20px; 
    margin-bottom: 30px;
}

.form-group { display: flex; flex-direction: column; }
.form-group label { margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; color: #666; }

input { 
    padding: 12px; 
    border: 1px solid #ddd; 
    border-radius: 8px; 
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: #42b883;
}

.actions { 
    display: flex; 
    justify-content: flex-end; 
    gap: 15px; 
    border-top: 1px solid #eee;
    padding-top: 20px;
}

.save-btn { 
    background: #42b883; 
    color: white; 
    border: none; 
    padding: 12px 25px; 
    cursor: pointer; 
    border-radius: 8px; 
    font-weight: bold;
}

.cancel-btn { 
    background: #f8f9fa; 
    color: #666;
    border: 1px solid #ddd; 
    padding: 12px 25px; 
    cursor: pointer; 
    border-radius: 8px; 
}

.save-btn:hover { background: #3aa876; }
.cancel-btn:hover { background: #eee; }
</style>
