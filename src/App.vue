<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> | 
      <router-link to="/goal">Update Goals</router-link>
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
#nav {
  text-align: right;
  margin-right: 3%;
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
