<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">DashBoard</router-link> | 
      <router-link to="/goal">Goals</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.padding-top-sm {
  padding-top: 10px;
}
ol {
    text-align: initial;
}
#goals-table thead {
    background-color:  #66C89C;
}
</style>
