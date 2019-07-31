<template>
	<div class="row">
		<div class="col-md-12 col-sm-12 col-xs-12">
	      	<div class="x_panel">
	      		<div class="x_title">
                    <h2>{{name}}</h2>
                    <div class="clearfix"></div>
                </div>
                <div>
                  	<div v-show="look" style="width:300px;" class="col-md-5 col-sm-5 col-xs-12 form-group top_search">
	                  <div class="input-group">
	                    <input type="text" class="form-control" placeholder="输入设备编号" v-model="devName">
	                    <span class="input-group-btn">
	                      <button class="btn btn-default" type="button">搜索</button>
	                    </span>
	                  </div>
	                  
	                </div>
	                <div style="width:70px" class="col-md-9 col-sm-9 col-xs-12">
                  		<button type="button" class="btn btn-success" @click="toshow('','添加')">添加</button>
                  	</div>
                      <!-- <div v-show="excel" style="width:70px" class="col-md-9 col-sm-9 col-xs-12">
                      	<button type="button" class="btn btn-primary">导出</button>
                      </div> -->
                </div>
                <div class="x_content">
                    <div class="table-responsive">
                      <table class="table table-striped jambo_table bulk_action">
                        <thead>
                          <tr class="headings">
                            <!-- <th>
                              <input type="checkbox" id="check-all" class="flat">
                            </th> -->
                            <th class="column-title">id</th>
                            <th class="column-title">dictionarytype</th>
                            <th class="column-title">dictionaryname</th>
                            <th class="column-title">name</th>
                            <th class="column-title">value</th>
                            <th class="column-title">del_flg</th>
                            <th class="column-title">操作</th>
                            <!-- <th class="bulk-actions" colspan="7">
                              <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
                            </th> -->
                          </tr>
                        </thead>

                        <tbody>          
                          <tr class="odd pointer" v-for="tableValue in tables">
                            <!-- <td class="a-center ">
                              <input type="checkbox" class="flat" name="table_records">
                            </td> -->
                            <td class=" ">{{tableValue.id}}</td>
                            <td class=" ">{{tableValue.dictionarytype}}</td>
                            <td class=" ">{{tableValue.dictionaryname}}</td>
                            <td class=" ">{{tableValue.name}}</td>
                            <td class=" ">{{tableValue.value}}</td>
                            <td class=" ">{{tableValue.del_flg}}</td>
                            <td class=" ">
                              <a style="margin-right:10px;cursor: pointer;" v-show="edit" @click="toshow(tableValue,'修改')">修改</a>
                              <a style="cursor: pointer;" v-show="edit" data-toggle="modal" data-target=".bs-example-modal-sm" @click="toshow(tableValue,'删除')">删除</a>
                            </td>
                          </tr>
                          
                        </tbody>
                      </table>
                      <div style="overflow: hidden;">
  						            <el-pagination
  						              style="float: right;"
  					                 @current-change="pageNo"
  					                 :current-page="current"
  					                 :page-sizes="[10]"
  					                 :page-size="10"
  					                 layout="total, sizes, prev, pager, next, jumper"
  					                 :total="totals ">
  					               </el-pagination>
  					           </div>
                  </div>
                </div>
			</div>
		</div>
    <el-dialog :title="txtTab" :visible.sync="showTab" @close='closeWin' width="500px">
      <el-form v-if="txtTab == '添加' || txtTab == '修改'" :model="form">
        <el-form-item class="save" label="id：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item class="save" label="dictionarytype：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.dictionarytype"></el-input>
        </el-form-item>
        <el-form-item class="save" label="dictionaryname：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.dictionaryname"></el-input>
        </el-form-item>
        <el-form-item class="save" label="name：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="save" label="value：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item class="save" label="del_flg：" :label-width="formLabelWidth">
          <el-input size="mini" style="width:280px;" v-model="form.del_flg"></el-input>
        </el-form-item>
      </el-form>
      <div v-else-if="txtTab=='删除'">
        <p>确认删除此条记录？</p>
      </div>
      <div slot="footer" class="dialog-footer">
            <el-button @click="closeWin">取 消</el-button>
            <el-button type="primary" @click.native="toDev(form,txtTab)">确 定</el-button>
          </div>
    </el-dialog>
	</div>
</template>

<script>
	export default{
		name:'status',
		data(){
			return{
				tables:[{
					"id": 2,
					"dictionarytype": "judge",
					"dictionaryname": "正确",
					"name": "判断",
					"value": "1",
					"del_flg": "N"
				}],
				devName:"",
				total:0,
        display:10,
        current:1,
        look:true,
        edit:true,
        excel:true,
        totals:"",
        name:"菜单名",
        saveUrl:"",
        delUrl:"",
        searchUrl:"",
        editUrl:"",
        tableName:"",
        form:[],
        txtTab:"",
        showTab:false,
        formLabelWidth: '150px',
			}
		},
		created(){
			
		},
		methods:{
        closeWin(){
          this.form = [];
          this.showTab = false;
        },
        search(){
            var data = {
              page:this.currentPage,
              pageSize:this.display,
              name:this.tableName+this.devName
            }
            this.$axios({
              method:"POST",
              url:this.searchUrl,
              data:JSON.stringify(data),
              headers:{'Content-Type':'application/json'}
            })
            .then(re => {
                console.log(re);
              
            })
            .catch(err =>{
                console.log(err);
            });
        },
        toDev(item,txt){
          switch(txt){
              case"添加":
                  var data = {
                    id:item.id,
                    dictionarytype:item.dictionarytype,
                    dictionaryname:item.dictionaryname,
                    name:item.name,
                    value:item.value,
                    del_flg:item.del_flg
                  }
                  this.$axios({
                    method:"POST",
                    url:this.saveUrl,
                    data:JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                  })
                  .then(re => {
                      console.log(re);
                      this.closeWin();
                  })
                  .catch(err =>{
                      console.log(err);
                      this.closeWin();
                  });
                  return;
              case"修改":
                  var data = {
                    id:item.id,
                    dictionarytype:item.dictionarytype,
                    dictionaryname:item.dictionaryname,
                    name:item.name,
                    value:item.value,
                    del_flg:item.del_flg
                  }
                  this.$axios({
                    method:"POST",
                    url:this.editUrl,
                    data:JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                  })
                  .then(re => {
                      console.log(re);
                      this.closeWin();
                  })
                  .catch(err =>{
                      console.log(err);
                      this.closeWin();
                  });
                  return;
              case"删除":
                  var data = {
                    id:item.id,
                  }
                  this.$axios({
                    method:"POST",
                    url:this.delUrl,
                    data:JSON.stringify(data),
                    headers:{'Content-Type':'application/json'}
                  })
                  .then(re => {
                      console.log(re);
                      this.closeWin();
                  })
                  .catch(err =>{
                      console.log(err);
                      this.closeWin();
                  });
                  return;
              default:
                  return;
          }
        },
        toshow(item,txt){
            switch(txt){
              case"添加":
                  this.txtTab = "添加";
                  this.showTab = true;
                  return;
              case"修改":
                  this.txtTab = "修改";
                  this.form = item;
                  this.showTab = true;
                  return;
              case"删除":
                  this.txtTab = "删除";
                  this.form = item;
                  this.showTab = true;
                  return;
              default:
                  return;
            }
        },
        pageNo(){
            var data = {
              page:this.currentPage,
              pageSize:this.display,
              name:this.tableName+this.devName
            }
            this.$axios({
              method:"POST",
              url:this.searchUrl,
              data:JSON.stringify(data),
              headers:{'Content-Type':'application/json'}
            })
            .then(re => {
                console.log(re);
                
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