<template>
	 <div class="col-md-3 left_col leftnav">
          <div class="left_col scroll-view">
            <div class="navbar nav_title border_nav">
              <router-link to="/" class="site_title">
                <span v-if="logoUrl!=null&&logoUrl!=''">
                  <img  :src="logoUrl" height="30"/>
                </span>
                <span v-else>
                  <i class="fa icon-icon iconfont"></i>
                  <span>{{txtContent}}</span>
                </span>
                
              </router-link>
            </div>

            <div class="clearfix"></div>
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="../../assets/user.png" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>{{txtContent}}</span>
                <h2>欢迎，{{name}}</h2>
              </div>
            </div>

            <br />

            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                  <li v-for="item in leftItem">
                    <a><i class="fa iconfont" :class="item.icon"></i>{{item.name}}<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li v-for="liS in item.list"><router-link :to="liS.url">{{liS.name}}</router-link></li>
                    </ul>
                  </li>
                </ul>
              </div>
              

            </div>
          </div>
        </div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	export default{
		name:'Nav',
		props:[],
		data(){
			return{
				LB:{},
				mys:[],
				show:false,
				username:'',
				shuju:false,
				baojing:false,
				jichu:false,
				logoUrl:"",
				txtContent:"模拟项目",
				name:"",
				leftItem:[],
				useri:[],
			}
		},
		created(){
			this.ready();
		},
		methods:{
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
		        // console.log(a);
		        this.$axios.post(this.baseURL+'/login/toMenu',A,
		              {headers:{'Content-Type':'application/json'}}
		            )
		            .then(re =>{
		            //console.log(re);
		            var c = re.data.data;
		            var logo = re.data.logo;
		            if(logo!=""&&logo!=null){
		              this.logoUrl = logo;
		            }
		            if(c!=null){
		              this.leftItem = c;
		            }
		            else{
		              window.location.href=this.baseURL+'/userLogin/#/MMain';
		            }
		            console.log(this.leftItem);
		            //this.navclass = nav(this.leftItem,this.txtContent,this.logoUrl,this.name);
		           	//console.log(this.navclass);
		        })
		        .catch(err =>{
		            console.log(err);
		        });
			}
		},
		mounted:function(){
  			
  		}
	}
</script>

<style>
	
</style>