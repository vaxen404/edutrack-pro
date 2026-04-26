import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const students = ref([
        { id: 1, firstname: 'ahmet', lastname: 'yılmaz', firstGrade: 55, lastGrade: 50, firstOralGrade: 60, lastOralGrade: 55},
        { id: 2, firstname: 'mehmet', lastname: 'zengin', firstGrade: 75, lastGrade: 50, firstOralGrade: 80, lastOralGrade: 60},
        { id: 3, firstname: 'ali', lastname: 'kaya', firstGrade: 40, lastGrade: 50, firstOralGrade: 50, lastOralGrade: 55}
    ])

    const addStudent = (newStudent: { firstname: string, lastname: string, firstGrade: number, lastGrade: number, firstOralGrade: number, lastOralGrade: number}) => {
        const newID = students.value.length > 0 ? Math.max(...students.value.map(s => s.id)) + 1 : 1
        students.value.push({
            id: newID,
            ...newStudent
        })
    }

    const deleteStudent = (id: number) => {
        students.value = students.value.filter(s => s.id !== id)
    }

    const updateGrade = (id: number, field: string, newGrade: number) => {
        const student = students.value.find(s => s.id === id)
        if(student){
            (student as any)[field] = newGrade
        }
    }

    return { students, addStudent, deleteStudent, updateGrade }
})
