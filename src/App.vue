<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <span class="icon">🎓</span> 
        <strong>EduTrack Pro</strong>
      </div>
      
      <div class="links">
        <RouterLink to="/" class="nav-link">Students</RouterLink>
        <RouterLink to="/add-student" class="nav-link add-btn">Add New</RouterLink>
      </div>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style>
/* Uygulama Genelindeki Fontlar ve Reset */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: #f9f9f9;
  color: #2c3e50;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* Navbar Tasarımı */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  margin-left: 20px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #42b883;
}

/* Aktif olan linkin rengini değiştirir */
.router-link-active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}

.add-btn {
  background-color: #42b883;
  color: white !important;
  padding: 8px 16px;
  border-radius: 6px;
  border-bottom: none !important;
}

.add-btn:hover {
  background-color: #3aa876;
}
</style>