<template>
    <div id="app">
      <div class="container body">
        <div class="main_container">
          <v-nav></v-nav>
          <v-top></v-top>
          <div class="right_col" role="main">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//import $ from 'jquery'
//import {init_sidebar} from "../static/js/custom.min.js";
import leftnav from '../src/view/common/nav.vue'
import topnav from '../src/view/common/header.vue'
import axios from 'axios'
import {formatDate} from '../src/assets/date.js'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  created(){
  },
  methods:{
    
  },
  mounted(){
  },
  components:{
      'v-nav':leftnav,
      'v-top':topnav,
  },
}
</script>

<style>
.el-input__inner{
  height: 35px;
}
.border_nav{
  border: 0;
}
.col-md-3 .left_col .leftnav{
  position:fixed;
}
</style>