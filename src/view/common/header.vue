<template>
	<div class="top_nav">
        <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="../../assets/user.png" alt="">{{name}}
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <!-- <li><a href="javascript:;"> Profile</a></li>
                    <li>
                      <a href="javascript:;">
                        <span class="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                    </li> -->
                    <!-- <li><a href="javascript:;">帮助</a></li> -->
                    <li><a @click="back()"><i class="fa fa-sign-out pull-right"></i>退出</a></li>
                  </ul>
                </li>

                <li role="presentation" class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="iconfont">&#xe608;</i>
                    <span class="badge bg-green">{{dangerCount}}</span>
                    <audio id="auto" src="../../../static/警报.wav" controls hidden="true"></audio>
                  </a>
                  <ul v-show="showDanger" id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                    <li v-for="danger in dangers">
                      <router-link to="/danger/realtime">
                        <span class="image"><img src="../../assets/user.png" alt="Profile Image" /></span>
                        <span>
                          <span>{{name}}</span>
                          <span class="time">{{danger.alarmTime | formatDate}}</span>
                        </span>
                        <span class="message">
                          设备名称：{{danger.device.deviceName}}，详情：{{danger.alarmCode}}！
                        </span>
                      </router-link>
                    </li>
                    <li>
                      <div class="text-center">
                        <router-link to="/danger/realtime">
                          <strong>查看更多</strong>
                          <i class="fa fa-angle-right"></i>
                        </router-link>
                      </div>
                    </li>
                  </ul>
                </li>
                
                <li v-if="dangerCount > 0" class=" ">
                  <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false" @click="plays">
                    <img v-if="playFull == false" src="../../../static/warning.gif" height="16" width="16">
                    <img v-else src="../../../static/warningOff.png" height="16" width="16">
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
</template>

<script>
	import axios from 'axios'
	import {formatDate} from '../../assets/date.js'
	export default{
		name:'topNav',
		data(){
			return{
				module:[],
				msg:'模拟项目',
				show:false,
				useri:[],
				name:"",
				dangers:[],
				dangerCount:"",
				playFull:false,
			}
		},
		created(){
			//this.ready();
			//this.Time();
		},
		filters:{
	      formatDate(time){
	        let date = new Date(time);
	        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
	      }
	    },
		methods:{
			plays(){
		      var a = this.playFull;
		      var b = document.getElementById("auto");
		      if(a==false){
		        this.playFull = true;
		        b.pause();
		      }
		      else{
		        this.playFull = false;
		        b.play();
		      }
		    },
			back:function(){
				window.location.href=this.baseURL+'/userLogin/#/MMain';
			},
			ready(){
				//console.log(window.location.href);
		        let url = window.location.href.split("?data=");
		        //console.log(url);
		        var a = url[1];
		        //console.log(a)
		        var b = a.split(",");
		        //console.log(b);
		        var ab ={
		          identity:b[0],
		          token:b[1],
		          menuName:"模拟项目"
		        }
		        this.useri = ab;
		        var A = JSON.stringify(ab);
		        localStorage.getItem("xinxi",ab);

		        this.$axios({
		          method:"POST",
		          url:this.baseURL+'/login/login/list',
		          data:{
		            token:ab.token
		          },
		          headers:{'Content-Type':'application/json'}
		        })
		        .then(re => {
		            console.log(re);
		            var a = re.data.loginName;
		            if(a!=""||a!=null){
		              this.name = a;
		            }
		            else{
		              this.name="暂无";
		            }
		          })
		          .catch(err =>{
		            console.log(err);
		            this.name="暂无";
		          });

		        var PageJson = {
		          page:1,
		          pageSize:5,
		          alarmStatus:'0',
		          token:ab.token,
		        }
		        console.log(PageJson);
		        var page = JSON.stringify(PageJson);
		        console.log(page);
		        this.$axios.post(this.baseURL+'/indoor/alarms/list',
		          page,
		          {headers:{'Content-Type':'application/json'}}
		        )
		        .then(re =>{
		          console.log(re);
		          var a = re.data.data;
		          var b = re.data.list;
		          if(a==0){
		            this.dangerCount = a;
		            this.showDanger = false;
		          }
		          else{
		            this.showDanger = true;
		            this.dangerCount = b.length;
		            this.dangers = b;
		            var realtimes = b[0].alarmTime;
		            var realtime = this.realtime;
		            if(realtime!=""){
		              if(realtimes>realtime){
		                this.realtime = realtimes;
		                this.$message({
		                    message:"有新的报警记录！",
		                    duration:3000,
		                    showClose:true,
		                });
		              }
		            }
		            else{
		              this.realtime = realtimes;
		            }
		          }
		          console.log(b);
		        })
		        .catch(err =>{
		          console.log(err);
		        });
			}
		}
	}
</script>

<style>
	
</style>