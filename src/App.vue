<template>
  <div id="app">

    <Navbar></Navbar>

    <transition name="fade" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: { Navbar },
  data () { },
  created () { },
  mounted () { }
}
</script>


<style>
  .fade-enter-active, .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

  .menu {
    display: flex;
    text-align: center;
    justify-content: space-around;
  }
</style>
