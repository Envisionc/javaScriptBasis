<template>
  <div class="t-main">
    <div class="t-header">{{ msg }}</div>
    <div class="t-body">
      <div class="t-left-body" :style="{ 'min-height': mh + 'px' }">
        <div class="search-modal" v-show="searchShow">
          <div
            class="search-list"
            v-for="item in newItems"
            :key="item.id"
            @click="searchSub(item)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="search-box">
          <div class="search-body">
            <el-input
              class="search"
              placeholder="请输入搜索"
              suffix-icon="el-icon-search"
              v-model="keyword"
            >
            </el-input>
          </div>
          <i class="el-icon-upload import-org"></i>
        </div>
        <div class="org-pannel">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="activeArr"
            @node-click="handleNodeClick"
            :render-content="renderContent"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <i
                class="el-icon-folder-opened"
                v-show="data.nodeType == 0 ? true : false"
              ></i>
              <!-- <i class="el-icon-s-custom" v-show="data.nodeType == 0 ? false : true"></i> -->
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="t-right-body" :style="{ 'min-height': mh + 'px' }">
        <div class="class-stds">{{className}}({{rowConut}}人)</div>
        <div class="teacher-set">
          <div class="t-name">班主任：<span>朱雯丽</span></div>
          <div class="t-name">任课老师：<span class="rt">梅志文</span></div>
          <div class="t-edit" @click="openEdit()">编辑</div>
          <div class="t-edit" @click="openSet()">设置</div>
        </div>
        <div class="oprates">
          <div class="lf-area">
            <div class="add-tearch">
              <el-button type="primary" class="ad-primary add" @click="add()"
                ><i class="el-icon-circle-plus"></i> 添加学生</el-button
              >
            </div>
            <div class="in-out">
              <div class="title">
                快捷操作 <i class="el-icon-arrow-down arrow-down"></i>
              </div>
              <ul class="import-box">
                <li class="i-item" @click="delStudentAll('2')">删除</li>
                <!-- <li class="i-item">调班</li>
                <li class="i-item">迁出</li>
                <li class="i-item">退休学</li> -->
              </ul>
            </div>
            <div class="in-out">
              <div class="title"><i class="el-icon-upload2"></i> 导入/导出</div>
              <ul class="import-box">
                <li class="i-item" @click="importNum('/class/importstudent')">
                  导入学生
                </li>
                <li class="i-item" @click="importNum('/class/importparent')">
                  导入家长
                </li>
                <!-- <li class="i-item" @click="importNum('/class/importteacher')">导入班级教师</li> -->
                <!-- <li class="i-item" @click="importNum('/class/importnum')">导入学生卡号</li> -->
                <li class="i-item" @click="importNum('/class/importimg')">
                  导入一寸照
                </li>
                <!-- <li class="i-item" @click="exportNum()">导出学生卡号</li> -->
                <li class="i-item" @click="exportNum('1')">导出学生</li>
                <!-- <li class="i-item" @click="exportNum('2')">导出学生和家长</li> -->
              </ul>
            </div>
            <!-- <div class="in-out">
              <div class="title"><i class="el-icon-s-tools"></i> 设置</div>
              <ul class="import-box">
                <li class="i-item"  @click="goSet()">学生毕业</li>
              </ul>
            </div> -->
          </div>
          <div class="rl-area">
            <el-input
              class="search"
              placeholder="请输入搜索"
              suffix-icon="el-icon-search"
              v-model="nameOrNo"
            >
            </el-input>
          </div>
        </div>
        <el-table
          :data="tableData"
          stripe
          border
          v-loading="tableLoad"
          element-loading-background="rgba(0, 0, 0, 0)"
          element-loading-text="正在加载中"
          element-loading-spinner="el-icon-loading"
          :header-cell-style="{
            background: '#eaf1f7',
            color: '#606266',
            fontweight: 'bold',
          }"
          style="width: 100%"
          header-row-class-name="tableHead"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="studentName" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="studentNo" label="学号"> </el-table-column>
          <el-table-column prop="studentOrg" label="班级"> </el-table-column>
          <!-- <el-table-column
              prop="studentCardNo"
              label="学生卡号">
              </el-table-column> -->
          <el-table-column prop="parents" label="家长">
            <template slot-scope="scope">
              <div
                class="show-parents"
                @click="showParents(scope.row)"
                v-if="scope.row.parents.length > 0"
              >
                <div>
                  <div>
                    <span
                      ><i class="el-icon-s-custom" style="color: #409eff"></i
                      >{{
                        [
                          "爸爸",
                          "妈妈",
                          "爷爷",
                          "奶奶",
                          "姥爷",
                          "姥姥",
                          "家长",
                        ][scope.row.parents[0].parentRole]
                      }}：</span
                    ><span>{{ scope.row.parents[0].parentName }}</span>
                  </div>
                  <div>{{ scope.row.parents[0].parentPhone }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="微信账号绑定">
            <template slot-scope="scope">
              <span v-if="scope.row.isBandWechat" class="yes">已绑定</span>
              <span v-if="!scope.row.isBandWechat" class="no">未绑定</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="op-item" @click="editStudent(scope.row)"
                ><i class="el-icon-edit"></i>编辑</span
              >
              <span class="op-item" @click="delStudent(scope.row, '1')"
                ><i class="el-icon-delete"></i>删除</span
              >
              <span class="op-item" @click="editParents(scope.row)"
                ><i class="el-icon-edit"></i>编辑家长</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagi">
          <el-pagination
            class="page-bg"
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :page-size="pageSize"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 删除dialog -->
    <el-dialog title="确认提示" :visible.sync="dialogVisibleDel">
      <div class="del-box flex">
        <div class="del-icon"><i class="el-icon-question"></i></div>
        <div>是否确定删除？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">取 消</el-button>
        <el-button class="btn" @click="delItem()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 添加组织架构 -->
    <el-dialog
      title="添加组织架构"
      :visible.sync="dialogOrgAdd"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleFormAddOrg"
        :rules="rulesAddOrg"
        ref="ruleFormAddOrg"
        label-width="120px"
        class="demo-ruleForm"
      >
        <template v-if="level == 0 && optWay == 0">
          <el-form-item label="所属层级：" prop="level">
            <el-select
              v-model="ruleFormAddOrg.level"
              placeholder="请选择所属层级"
            >
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学部名称："
            prop="orgName"
            v-if="ruleFormAddOrg.level == 2"
          >
            <el-input
              v-model="ruleFormAddOrg.orgName"
              placeholder="请填写学生学部名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入学年份："
            prop="entranceYear"
            v-if="ruleFormAddOrg.level == 3"
          >
            <el-select
              v-model="ruleFormAddOrg.entranceYear"
              placeholder="请选择学生入学年份"
              @change="onEntranceYear()"
            >
              <el-option
                v-for="(item, index) in yearArr"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学段："
            prop="divisionType"
            class="learn-period"
            v-if="ruleFormAddOrg.level == 2"
          >
            <el-radio-group v-model="ruleFormAddOrg.divisionType">
              <el-radio
                :label="item.value"
                v-for="(item, index) in learningPeriods"
                :key="index"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </template>

        <template v-if="level == 2 && optWay == 0">
          <el-form-item label="所属层级：">
            <el-select
              v-model="gradeLevel"
              disabled
              placeholder="请选择所属层级"
            >
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学年份：" prop="entranceYear">
            <el-select
              v-model="ruleFormAddOrg.entranceYear"
              placeholder="请选择学生入学年份"
              @change="onEntranceYear()"
            >
              <el-option
                v-for="(item, index) in yearArr"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="level == 3 && optWay == 0">
          <el-form-item label="年级名称：">
            <el-select
              v-model="gradeName"
              disabled
              placeholder="请选择所属层级"
            >
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称：" prop="orgName">
            <el-input
              v-model="ruleFormAddOrg.orgName"
              placeholder="请填写学生班级名称"
            ></el-input>
          </el-form-item>
        </template>

        <!-- 编辑 -->
        <template v-if="level == 2 && optWay == 1">
          <el-form-item label="所属层级：">
            <el-select v-model="level" disabled placeholder="请选择所属层级">
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学部名称：" prop="orgName">
            <el-input
              v-model="ruleFormAddOrg.orgName"
              placeholder="请填写学生学部名称"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="入学年份：" prop="entranceYear" v-if="ruleFormAddOrg.level == 3">
            <el-select v-model="ruleFormAddOrg.entranceYear" placeholder="请选择学生入学年份" @change="onEntranceYear()">
              <el-option
                v-for="(item, index) in yearArr"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="班级名称：" prop="orgName">
            <el-input v-model="ruleFormAddOrg.orgName" placeholder="请填写学生班级名称"></el-input>
          </el-form-item> -->
        </template>

        <template v-if="level == 3 && optWay == 1">
          <el-form-item label="所属层级：">
            <el-select v-model="level" disabled placeholder="请选择所属层级">
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学年份：" prop="entranceYear">
            <el-select
              v-model="ruleFormAddOrg.entranceYear"
              placeholder="请选择学生入学年份"
              @change="onEntranceYear()"
            >
              <el-option
                v-for="(item, index) in yearArr"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="班级名称：" prop="orgName">
            <el-input v-model="ruleFormAddOrg.orgName" placeholder="请填写学生班级名称"></el-input>
          </el-form-item> -->
        </template>

        <template v-if="level == 4 && optWay == 1">
          <el-form-item label="所属层级：">
            <el-input
              v-model="hierarchy"
              disabled
              placeholder="请填写学生班级名称"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="入学年份：" prop="entranceYear">
            <el-select v-model="ruleFormAddOrg.entranceYear" placeholder="请选择学生入学年份" @change="onEntranceYear()">
              <el-option
                v-for="(item, index) in yearArr"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="班级名称：" prop="orgName">
            <el-input
              v-model="ruleFormAddOrg.orgName"
              placeholder="请填写学生班级名称"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrgAdd = false">取 消</el-button>
        <el-button class="btn" @click="addSubmit('ruleFormAddOrg', optWay)"
          >保存</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑组织架构部门 -->
    <el-dialog title="编辑组织架构部门" :visible.sync="dialogOrgEdit">
      <span style="color: #f00">*</span> 部门名称：

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrgEdit = false">取 消</el-button>
        <el-button class="btn" @click="editSubmit">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认删除" :visible.sync="dialogOrgDel">
      <div class="del-box flex">
        <div class="del-icon"><i class="el-icon-question"></i></div>
        <div>是否确定删除？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrgDel = false">取 消</el-button>
        <el-button class="btn" @click="delSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 家长列表dailog  -->
    <el-dialog title="家长信息" :visible.sync="dialogParentsVisable">
      <el-table
        :data="parentsTable"
        stripe
        border=""
        :header-cell-style="{ background: '#eaf1f7', color: '#606266' }"
        style="width: 100%"
      >
        <el-table-column prop="parentName" label="家长" width="80">
        </el-table-column>
        <el-table-column prop="parentPhone" label="联系方式"> </el-table-column>
        <el-table-column prop="parentRole" label="关系">
          <template slot-scope="scope">
            <span>{{ scope.row.parentRole }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workUnit" label="工作单位"> </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 编辑家长 -->
    <el-dialog
      title="学生家长（最多可添加10名家长)"
      :visible.sync="dialogParentsVisableEdit"
      width="50%"
    >
      <div class="parents-table">
        <ul class="head-list">
          <li class="head-item"><span>*</span>家长姓名</li>
          <li class="head-item"><span>*</span>手机号</li>
          <li class="head-item"><span>*</span>关系</li>
          <li class="head-item">工作单位</li>
        </ul>
        <div class="parents-body" v-if="parentsList.length > 0">
          <ul class="body-list" v-for="(x, index) in parentsList" :key="index">
            <li class="body-item">
              <el-input
                v-model="x.parentName"
                placeholder="请填写家长真实姓名"
              ></el-input>
            </li>
            <li class="body-item">
              <el-input
                v-model="x.parentMobilePhone"
                placeholder="请填写有效手机号"
              ></el-input>
            </li>
            <li class="body-item">
              <el-select
                v-model="x.parentRole"
                style="margin-right: 12px"
                placeholder="请选择与学生关系"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </li>
            <li class="body-item">
              <el-input
                v-model="x.workUnit"
                placeholder="请输入家长的工作单位"
              ></el-input>
            </li>
            <li class="del-btn" @click="delThis(index)">
              <i class="el-icon-remove-outline minus-icon"></i>
            </li>
          </ul>
        </div>
        <div class="parents-footer">
          <el-button class="submit" @click="addRole()"
            ><i class="el-icon-plus"></i> 添加更多家长</el-button
          >
          <el-button class="reset" @click="chooseRole()"
            >选择已有用户增加家长身份</el-button
          >
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParentsVisableEdit = false">取 消</el-button>
        <el-button class="btn" @click="saveParents()">保存</el-button>
      </span>
    </el-dialog>
    <!-- 选择已有用户增加家长身份 -->
    <select-schema
      @dialogFun="dialogFive"
      @dialogClose="closeFive"
      :post-type="dialogFiveType"
      :post-visible="dialogVisibleFive"
      :post-person="parentsPerson"
      :post-frame="parentsCount"
      :post-user="parentsCountu"
    ></select-schema>
    <!-- 查看/设置班主任 -->
    <el-dialog title="查看/设置班主任" :visible.sync="techerEditVisible" width="540px">
      <div class="content">
        <div class="t-title">班主任(最多2名) ：</div>
        <div class="t-list">
          <div class="t-lt">
            <div class="t-head">班主任</div>
            <el-select
                v-model="selectTags"
                multiple
                filterable
                allow-create
                default-first-option
                :multiple-limit="limit"
                placeholder="请输入关键字搜索...">
                <el-option
                    v-for="item in teacherOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <!-- <div class="search-wrap">
              <el-input placeholder="请输入关键字搜索..." v-model="teacherTag"></el-input>
              <div class="over-tags">
                <div class="tag-teacher">
                  <i class="el-icon-s-custom"></i>
                  <span>杨帆</span>
                  <span>×</span>
                </div>
                <div class="tag-teacher">
                  <i class="el-icon-s-custom"></i>
                  <span>杨帆</span>
                  <span>×</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="techerEditVisible = false">取 消</el-button>
        <el-button class="btn" @click="tEditSave">保存</el-button>
      </span>
    </el-dialog>
    <!-- 设置班级老师 -->
    <el-dialog title="设置班级老师" :visible.sync="techerSetVisible" width="800px">
      <div class="content">
        <el-table :data="teacherSetData" stripe border :header-cell-style="{background:'#eaf1f7',color:'#606266'}" style="width: 100%">
          <el-table-column
            prop="department"
            label="学部"
            min-width="20%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="inClass"
            label="年级/课程班级"
            min-width="30%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="teacherCharge"
            label="班主任"
            min-width="50%"
            align="center">
            <template slot-scope="scope">
              <div class="row-bd">
                <div class="search-wrap">
                  <el-input placeholder="请输入关键字搜索..." v-model="teacherTag" class="search-box"></el-input>
                  <div class="over-tags">
                      <div class="tag-item">
                      <i class="el-icon-s-custom"></i>
                      <span>杨帆</span>
                      <span>×</span>
                    </div>
                    <div class="tag-item">
                      <i class="el-icon-s-custom"></i>
                      <span>杨帆</span>
                      <span>×</span>
                    </div>  
                  </div>
                </div>
                <div class="input-tip"> 最多两名</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="techerSetVisible = false">取 消</el-button>
        <el-button class="btn" @click="tEditSave">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import selectSchema from "@/page/common/select-schema";
import SearchModule from "@/page/common/search-module";
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  name: "ClassList",
  data() {
    return {
      msg: "班级管理",
      keyword: "",
      allItems: [],
      newItems: [],
      searchShow: false,
      nameOrNo: "",
      tableLoad: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      treeData: [
        {
          label: "教师",
          children: [
            {
              label: "教务处",
              children: [
                {
                  label: "教务处-1",
                },
              ],
            },
            {
              label: "后勤处",
            },
            {
              label: "学生管理处",
            },
          ],
        },
      ], //树形渲染
      defaultProps: {
        children: "children",
        label: "label",
      },
      activeArr: [],
      str: "",
      studentIds: [],
      studentId: "",
      dialogVisibleDel: false,
      dialogOrgAdd: false,
      dialogOrgEdit: false,
      dialogOrgDel: false,
      parentOrgId: "",
      ruleFormAddOrg: {
        parentOrgId: "",
        level: "",
        levelTwo: "3",
        orgName: "",
        divisionType: "",
        entranceYear: "",
      },
      rulesAddOrg: {
        level: [
          {
            required: true,
            message: "请填写学生所属层级",
            trigger: "blur",
          },
        ],
        orgName: [
          {
            required: true,
            message: "请填写学部名称",
            trigger: "blur",
          },
        ],
        entranceYear: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "blur",
          },
        ],
        divisionType: [
          {
            required: true,
            message: "请选择学段",
            trigger: "change",
          },
        ],
      },
      levels: [
        {
          value: 2,
          label: "学部",
        },
        {
          value: 3,
          label: "年级",
        },
      ],
      learningPeriods: [
        {
          value: "0",
          label: "本科",
        },
        {
          value: "1",
          label: "初中",
        },
        {
          value: "2",
          label: "高中",
        },
        {
          value: "3",
          label: "小学",
        },
        {
          value: "4",
          label: "幼儿园",
        },
        {
          value: "5",
          label: "中职",
        },
        {
          value: "6",
          label: "高职",
        },
      ],
      orgId: "",
      isBeyondNine: false,
      yearArr: [],
      level: 0,
      gradeLevel: 3,
      divisionType: "",
      gradeName: "",
      entranceYear: "",
      optWay: 0,
      hierarchy: "", // 层级
      parentsTable: [],
      dialogParentsVisable: false,
      dialogParentsVisableEdit: false,
      parentsList: [],
      roles: [
        {
          value: "0",
          label: "爸爸",
        },
        {
          value: "1",
          label: "妈妈",
        },
        {
          value: "2",
          label: "爷爷",
        },
        {
          value: "3",
          label: "奶奶",
        },
        {
          value: "4",
          label: "姥爷",
        },
        {
          value: "5",
          label: "姥姥",
        },
        {
          value: "6",
          label: "家长",
        },
      ],
      dialogFiveType: 5, //家长
      dialogVisibleFive: false,
      parentsPerson: [],
      parentsCount: 0,
      parentsCountu: 0,
      mh: 600,
      techerEditVisible: false,
      techerSetVisible: false,
      teacherSetData: [
        { id: "1", department: "小学", inClass: "小学/2019级/1班", teacherCharge: [] },
        { id: "2", department: "小学", inClass: "小学/2019级/2班", teacherCharge: [] },
      ],
      showList: [],
      teacherTag: "",
      className: "学生",
      rowConut: 0,
      teacherOptions: [{
        value: '1',
        label: 'HTML'
        }, {
        value: '2',
        label: 'CSS'
        }, {
        value: '3',
        label: 'JavaScript'
      }],
      selectTags: [],
      limit: 2
    };
  },
  components: {
    "select-schema": selectSchema,
    SearchModule
  },
  computed: {
    ...mapGetters(["$getToken"]),
    token () {
      return this.$getToken
    }
  },
  watch: {
    keyword: {
      handler(newName, oldName) {
        let list = this.allItems;
        //console.log('all = '+JSON.stringify(list));
        let newList = [];
        list.forEach((item, index) => {
          //console.log(item)
          if (
            newName != "" &&
            (item.label.indexOf(newName) !== -1 ||
              item.label.indexOf(newName.toLowerCase()) !== -1)
          ) {
            newList.push(item);
          }
        });
        this.newItems = newList;
        if (newList.length > 0) {
          this.searchShow = true;
        } else {
          this.searchShow = false;
        }
        //console.log('new = '+JSON.stringify(newList));
        //this.newItems = this.allItems.filter((item) => {return item.name.toLowerCase().indexOf(newName) !== -1})
      },
      immediate: true,
      deep: true,
    },
    nameOrNo() {
      delay(() => {
        this.queryStudentList();
      }, 1000);
    },
    selectTags: {
      handler(nv, ov) {
        console.log(nv);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.fetchData();
    this.getFirst();
    this.isBeyond();
    this.yearList();
  },
  mounted() {
    this.mh = document.body.scrollHeight - 180;
    this.getTeacherSearch();
  },
  methods: {
    openEdit() {
      console.log("查看/设置班主任");
      this.techerEditVisible = true;
    },
    tEditSave() {
      this.techerEditVisible = false;
    },
    openSet() {
      console.log("设置班级老师");
      this.techerSetVisible = true;
    },
    tSetSave() {
      this.techerSetVisible = false;
    },
    // 根据班级id获取班级主任以及任课老师
    getTeacherDetail() {
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          id: that.orgId,
        },
      };
      //console.log(JSON.stringify(params));
      this.http.post(this.api.teacherDetail, params).then(
        (res) => {
          
          if (res.code == 0) {
            console.log(JSON.stringify(res));
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    // 根据关键词搜索教师列表
    getTeacherSearch() {
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          keyword: "",
        },
      };
      //console.log(JSON.stringify(params));
      this.http.post(this.api.teacherSearch, params).then(
        (res) => {
          if (res.code == 0) {
            console.log(JSON.parse(JSON.stringify(res)));
            let newList = JSON.parse(JSON.stringify(res.data.teachers));
            let list = [];
            newList.forEach((element) => {
              let _obj = {};
              _obj.value = element.id;
              _obj.label = element.name;
              list.push(_obj);
            });
            that.teacherOptions = list;
            console.log(that.teacherOptions);
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    // 批量添加班主任
    batchAddTeachers() {
      let that = this;
      let ids = that.selectTags;
      let params = {
        userToken: this.token,
        data: {
          classTeacherParams: ids,
        },
      };
      //console.log(JSON.stringify(params));
      this.http.post(this.api.teachersBatchAdd, params).then(
        (res) => {
          
          if (res.code == 0) {
            console.log(JSON.stringify(res));
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    dialogOne(data) {
      console.log(data);
    },
    closeOne(data) {
      console.log(data);
    },
    showParents(row) {
      console.log(row);
      this.dialogParentsVisable = true;
      if (row.parents.length > 0) {
        this.parentsTable = row.parents;
      }
    },
    getOrgData() {
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          orgTypes: "1",
          showType: 1,
        },
      };
      //console.log(JSON.stringify(params));
      this.http.post(this.api.wholeAll, params).then(
        (res) => {
          // console.log(JSON.stringify(res));
          if (res.code == 0) {
            this.treeData = res.data;
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    renderContent(h, { node, data, store }) {
      let that = this;
      if (data.level == 0) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span class="icon-more">
              <el-dropdown trigger="click">
                <el-button type="text">
                  <i class="el-icon-more more"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="jsx-ul">
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.addOrgLevel(data, "0")}>
                      添加
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        );
      } else if (data.level == 2) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span class="icon-more">
              <el-dropdown trigger="click">
                <el-button type="text">
                  <i class="el-icon-more more"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="jsx-ul">
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.addOrgLevel(data, "2")}>
                      添加
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.editOrgLevel(data, "2")}>
                      编辑
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.delOrgLevel(data, "2")}>
                      删除
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        );
      } else if (data.level == 3) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span class="icon-more">
              <el-dropdown trigger="click">
                <el-button type="text">
                  <i class="el-icon-more more"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="jsx-ul">
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.addOrgLevel(data, "3")}>
                      添加
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.editOrgLevel(data, "3")}>
                      编辑
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.delOrgLevel(data, "3")}>
                      删除
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        );
      } else if (data.level == 4) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span class="icon-more">
              <el-dropdown trigger="click">
                <el-button type="text">
                  <i class="el-icon-more more"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="jsx-ul">
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.editOrgLevel(data, "4")}>
                      编辑
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item class="jsx-li">
                    <span on-click={() => that.delOrgLevel(data, "4")}>
                      删除
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        );
      }
    },
    // 添加组织架构
    addOrg(data) {
      console.log("data: " + data.id);
      console.log("level: " + data.level);
      this.dialogOrgAdd = true;
      this.parentOrgId = data.id;
      this.level = data.level;
    },
    // 添加组织架构
    addOrgLevel(data, str) {
      this.optWay = 0; // 0:新增  1:编辑  2:删除
      if (str == "0") {
        console.log("data: " + data.id);
        console.log("level: " + data.level);
        this.dialogOrgAdd = true;
        this.parentOrgId = data.id;
        this.level = data.level;
      } else if (str == "2") {
        this.dialogOrgAdd = true;
        this.parentOrgId = data.id;
        this.level = data.level;
        console.log("部门下添加年级-------" + data.label);
      } else if (str == "3") {
        this.dialogOrgAdd = true;
        this.parentOrgId = data.id;
        this.level = data.level;
        this.gradeName = data.label;
        // this.divisionType = data.label;
        console.log("年级下添加班级-------" + data.label);
      } else if (str == "4") {
        this.$router.push({ path: "/class/add" });
      }
    },
    // 编辑组织架构
    editOrgLevel(data, str) {
      console.log(data);
      this.optWay = 1; // 0:新增  1:编辑  2:删除
      this.dialogOrgAdd = true;
      this.orgId = data.id;
      this.level = data.level;
      this.ruleFormAddOrg.orgName = data.label;
      this.ruleFormAddOrg.entranceYear = data.label.substring(0, 4);
      if (this.level == 4) {
        this.hierarchy = "班级";
      }
    },
    // 删除组织架构
    delOrgLevel(data, str) {
      this.optWay = 2; // 0:新增  1:编辑  2:删除
      this.dialogOrgDel = true;
      this.parentOrgId = data.id;
    },
    // 添加组织架构部门
    addSubmit(formName, way) {
      console.log(way);
      let that = this;
      if (way == 0) {
        // 新增
        this.$refs[formName].validate((valid) => {
          if (that.level == 0) {
            // that.divisionType = that.ruleFormAddOrg.divisionType
            let params = {
              userToken: that.token,
              data: {
                orgName: that.ruleFormAddOrg.orgName,
                level: that.ruleFormAddOrg.level,
              },
            };
            if (that.ruleFormAddOrg.level == 2) {
              params.data.divisionType = that.ruleFormAddOrg.divisionType;
            }
            params.data.parentOrgId = that.parentOrgId ? that.parentOrgId : "";
            if (that.ruleFormAddOrg.level == 3) {
              params.data.entranceYear = that.ruleFormAddOrg.entranceYear;
            }
            console.log(JSON.stringify(params));
            this.http.post(this.api.studentOrgAdd, params).then(
              (res) => {
                if (res.code == 0) {
                  console.log(JSON.stringify(res.data));
                  that.dialogOrgAdd = false;
                  that.ruleFormAddOrg = {
                    parentOrgId: "",
                    level: "",
                    orgName: "",
                    divisionType: "",
                    entranceYear: "",
                  };
                  that.getOrgData();
                  setTimeout(() => {
                    that.$message.success("新增成功！");
                  }, 500);
                }
              },
              (error) => {
                that.$message({
                  showClose: true,
                  message: error.message,
                  type: "error",
                  duration: 1500,
                });
                if (error.code == 3) {
                  setTimeout(() => {
                    that.$router.push({ path: "/" });
                  }, 1500);
                }
              }
            );
          }
          if (that.level == 2) {
            let params = {
              userToken: that.token,
              data: {
                orgName: that.ruleFormAddOrg.orgName,
                level: that.ruleFormAddOrg.levelTwo,
                divisionType: that.divisionType,
              },
            };
            params.data.parentOrgId = that.parentOrgId ? that.parentOrgId : "";
            params.data.entranceYear = that.ruleFormAddOrg.entranceYear;
            console.log(JSON.stringify(params));
            this.http.post(this.api.studentOrgAdd, params).then(
              (res) => {
                if (res.code == 0) {
                  that.dialogOrgAdd = false;
                  that.ruleFormAddOrg = {
                    parentOrgId: "",
                    level: "",
                    orgName: "",
                    divisionType: "",
                    entranceYear: "",
                  };
                  that.getOrgData();
                  setTimeout(() => {
                    that.$message.success("新增成功！");
                  }, 500);
                }
              },
              (error) => {
                that.$message({
                  showClose: true,
                  message: error.message,
                  type: "error",
                  duration: 1500,
                });
                if (error.code == 3) {
                  setTimeout(() => {
                    that.$router.push({ path: "/" });
                  }, 1500);
                }
              }
            );
          }

          if (that.level == 3) {
            let params = {
              userToken: that.token,
              data: {
                orgName: that.ruleFormAddOrg.orgName,
                level: that.ruleFormAddOrg.levelTwo,
              },
            };
            params.data.parentOrgId = that.parentOrgId ? that.parentOrgId : "";
            console.log(JSON.stringify(params));
            this.http.post(this.api.studentOrgAdd, params).then(
              (res) => {
                if (res.code == 0) {
                  that.dialogOrgAdd = false;
                  that.ruleFormAddOrg = {
                    parentOrgId: "",
                    level: "",
                    orgName: "",
                    divisionType: "",
                    entranceYear: "",
                  };
                  that.getOrgData();
                  setTimeout(() => {
                    that.$message.success("新增成功！");
                  }, 500);
                }
              },
              (error) => {
                that.$message({
                  showClose: true,
                  message: error.message,
                  type: "error",
                  duration: 1500,
                });
                if (error.code == 3) {
                  setTimeout(() => {
                    that.$router.push({ path: "/" });
                  }, 1500);
                }
              }
            );
          }
        });
      } else if (way == 1) {
        //编辑
        console.log("编辑");
        console.log(this.level);
        let that = this;
        let params = {};
        if (this.level == 2) {
          params = {
            userToken: that.token,
            data: {
              orgId: that.orgId,
              orgName: that.ruleFormAddOrg.orgName,
            },
          };
        } else if (this.level == 3) {
          params = {
            userToken: that.token,
            data: {
              orgId: that.orgId,
              orgName: that.ruleFormAddOrg.orgName,
              entranceYear: that.ruleFormAddOrg.entranceYear,
            },
          };
        } else if (this.level == 4) {
          params = {
            userToken: that.token,
            data: {
              orgId: that.orgId,
              orgName: that.ruleFormAddOrg.orgName,
            },
          };
        }

        console.log(JSON.stringify(params));
        this.http.post(this.api.studentOrgEdit, params).then(
          (res) => {
            if (res.code == 0) {
              that.dialogOrgAdd = false;
              that.getOrgData();
              setTimeout(() => {
                that.$message.success("新增成功！");
              }, 500);
            }
          },
          (error) => {
            that.$message({
              showClose: true,
              message: error.message,
              type: "error",
              duration: 1500,
            });
            if (error.code == 3) {
              setTimeout(() => {
                that.$router.push({ path: "/" });
              }, 1500);
            }
          }
        );
      }
    },
    // 编辑组织架构部门
    editSubmit(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {});
      if (!that.inputTwo) {
        that.$message.error("部门名称必填!");
      } else {
        console.log("部门名称不为空");
        let params = {
          userToken: that.token,
          data: {
            orgName: that.inputTwo,
          },
        };
        params.data.orgId = that.parentOrgId ? that.parentOrgId : "";
        this.http.post(this.api.teacherOrgEdit, params).then(
          (res) => {
            if (res.code == 0) {
              console.log(JSON.stringify(res.data));
              that.dialogOrgDepartEdit = false;
              that.parentOrgId = "";
              that.getOrgData();
              setTimeout(() => {
                that.$message.success("编辑成功！");
              }, 500);
            }
          },
          (error) => {
            //console.log(error.message)
            that.$message({
              showClose: true,
              message: error.message,
              type: "error",
              duration: 1500,
            });
            if (error.code == 3) {
              setTimeout(() => {
                that.$router.push({ path: "/" });
              }, 1500);
            }
          }
        );
      }
    },
    // 删除组织架构部门
    delSubmit() {
      let that = this;
      let params = {
        userToken: that.token,
        data: {
          orgId: that.parentOrgId,
        },
      };
      this.http.post(this.api.studentOrgDelete, params).then(
        (res) => {
          if (res.code == 0) {
            console.log(JSON.stringify(res.data));
            that.dialogOrgDel = false;
            that.parentOrgId = "";
            that.getOrgData();
            setTimeout(() => {
              that.$message.success("删除成功！");
            }, 500);
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    onEntranceYear() {
      this.ruleFormAddOrg.orgName = this.ruleFormAddOrg.entranceYear + "级";
    },
    fetchData() {
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          showType: "1", //0人员和架构，1架构
          orgTypes: "1", //1学生，2老师，3家长，12学生和老师，13学生和家长，23老师和家长
        },
      };
      this.http.post(this.api.wholeAll, params).then(
        (res) => {
          //console.log(res.data)
          function createList(roles) {
            roles.forEach((item) => {
              //一级目录
              let obj = {
                id: item.id,
                label: item.label,
                nodeType: item.nodeType,
                orgType: item.orgType,
                level: item.level,
              };
              that.allItems.push(obj);
              if (item.hasOwnProperty("children") && item.children.length > 0) {
                //二级目录
                createList(item.children);
              }
            });
          }
          createList(res.data);
          // console.log('all = '+JSON.stringify(that.allItems))
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    getFirst() {
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          orgTypes: "1",
          showType: 1,
        },
      };
      this.http.post(this.api.wholeAll, params).then(
        (res) => {
          if (res.data && res.data.length > 0) {
            that.treeData = res.data;
            that.getTable(res.data[0].id, 1);
          }
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    searchSub(e) {
      let that = this;
      console.log("点击搜索 = ", e);
      this.keyword = e.label;
      let id = e.id;
      setTimeout(() => {
        that.searchShow = false;
      }, 500);
      this.activeArr = [id];
      this.getTable(id, 1);
    },
    getTable(i, p) {
      this.tableLoad = true;
      let that = this;
      let id = i;
      let page = p;
      let params = {
        userToken: this.token,
        data: {
          orgId: id,
          pageNo: page,
          pageSize: 10,
        },
      };
      this.http.post(this.api.studentList, params).then(
        (res) => {
          //console.log(res.data)
          that.orgId = id;
          that.currentPage = page;
          that.total = res.data.pageBean.rowCount;
          if (res.data.students && res.data.students.length > 0) {
            that.tableData = res.data.students;
            that.rowConut = res.data.pageBean.rowCount;
          }
          that.tableLoad = false;
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    importOrg() {
      this.$router.push({ path: "/class/importstructure" });
    },
    add() {
      this.$router.push({ path: "/class/add" });
    },
    changePage(val) {
      console.log(val);
      this.currentPage = val;
      this.queryStudentList();
    },
    handleNodeClick(data) {
      console.log(data);
      this.className = data.label;
      this.orgId = data.id;
      this.queryStudentList();
      this.getTeacherDetail();
    },
    importWorker() {
      console.log("click");
      this.$router.push({ path: "/teacher/importworker" });
    },
    importNum(e) {
      this.$router.push({ path: e });
    },
    importImg() {
      this.$router.push({ path: "/teacher/importimg" });
    },
    exportWorker() {
      this.$router.push({ path: "/teacher/importnum" });
    },
    // TODO
    exportNum(e) {
      if (e == "1") {
        let that = this;
        // window.location.href = this.api.domain + this.api.studentExport + '?userToken=' + this.token
        this.http
          .download(this.api.studentExport, { userToken: this.token })
          .then(
            (res) => {
              //console.log('res = ',res)
            },
            (error) => {
              console.log(error);
            }
          );
      }
      // this.$router.push({path: '/teacher/importnum'});
    },
    goSet() {
      this.$router.push({ path: "/class/set" });
    },
    queryStudentList() {
      let that = this;
      this.tableLoad = true;
      let params = {
        userToken: this.token,
        data: {
          orgId: that.orgId,
        },
      };
      params.data.keyword = that.nameOrNo ? that.nameOrNo : "";
      params.data.pageNo = that.currentPage;
      params.data.pageSize = 10;
      // console.log(JSON.stringify(params));
      this.http.post(this.api.studentList, params).then(
        (res) => {
          // console.log(JSON.stringify(res));
          that.total = res.data.pageBean.rowCount;
          if (res.data.students && res.data.students.length > 0) {
            that.tableData = res.data.students;
            that.rowConut = res.data.pageBean.rowCount;
          } else {
            that.tableData = res.data.students;
          }
          that.tableLoad = false;
        },
        (error) => {
          //console.log(error.message)
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    formatDate(strTime) {
      var date = new Date(strTime);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    isBeyond() {
      var today = new Date();
      var today_time = this.formatDate(today);
      if (today_time > "2020-9-01") {
        this.isBeyondNine = true;
      } else {
        this.isBeyondNine = false;
      }
    },
    yearList() {
      var myDate = new Date();
      var thisYear = myDate.getFullYear(); // 获取当年年份

      if (!this.isBeyondNine) {
        thisYear = thisYear - 1; // 声明一个变量 获得当前年份至想获取年份差 eg.2008
      }
      var Section = thisYear - 2014;
      var arrYear = []; // 声明一个空数组 把遍历出的年份添加到数组里
      for (var i = 0; i <= Section; i++) {
        arrYear.push(thisYear--);
      }
      this.yearArr = arrYear;
    },
    handleClose() {
      this.dialogOrgAdd = false;
      this.ruleFormAddOrg.orgName = "";
      this.ruleFormAddOrg.entranceYear = "";
    },
    handleSelectionChange(val) {
      console.log(val);
      this.delStdNum = val.length;
      let arr = [];
      val.forEach((element) => {
        arr.push(element.studentId);
      });
      arr = [...new Set(arr)];
      console.log(arr);
      this.studentIds = arr;
    },
    editStudent(row) {
      this.$router.push({
        path: "/class/add",
        query: { studentNo: row.studentNo },
      });
    },
    delStudent(row, str) {
      this.dialogVisibleDel = true;
      this.str = str;
      this.studentId = row.studentId;
    },
    delStudentAll(str) {
      if (this.studentIds.length < 1) {
        this.$message.error("未选中任何一行！");
        return false;
      }
      this.dialogVisibleDel = true;
      this.str = str;
    },
    delItem() {
      let that = this;
      let personIds = [];
      if (that.str == "1") {
        // 单项删除
        personIds.push(that.studentId);
      } else if (that.str == "2") {
        // 批量删除
        personIds = that.studentIds;
      }

      let params = {
        userToken: this.token,
        data: {
          personIds: personIds,
        },
      };
      this.http.post(this.api.deletePerson, params).then(
        (res) => {
          if (res.code == 0) {
            that.dialogVisibleDel = false;
            that.queryStudentList();
          }
        },
        (error) => {
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    dialogFive(data) {
      console.log(data);
      this.dialogVisibleFive = data.emita;
      let that = this;
      if (data.emitd.length > 0) {
        console.log("aaaaaaaaaaa");
        data.emitd.forEach((idx) => {
          that.studentParentDetail(idx);
        });
      }
    },
    closeFive(data) {
      console.log(data);
      this.dialogVisibleFive = data;
    },
    studentParentDetail(idx) {
      console.log(this.parentsList);
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          parentId: idx,
        },
      };
      this.http.post(this.api.studentParentDetail, params).then(
        (res) => {
          if (res.code == 0) {
            console.log(res.data);
            let ary = [];
            let obj = {
              parentName: res.data.name,
              parentRole: "",
              parentMobilePhone: res.data.mobilePhone,
              workUnit: res.data.workUnit,
            };
            if (that.parentsList.length > 0) {
              for (let i = 0, len = that.parentsList.length; i < len; i++) {
                if (
                  that.parentsList[i].parentMobilePhone === res.data.mobilePhone
                ) {
                  that.parentsList.splice(i, 1, obj);
                } else {
                  that.parentsList.push(obj);
                }
              }
            } else {
              that.parentsList.push(obj);
            }

            console.log(that.parentsList);
          }
        },
        (error) => {
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
    editParents(row) {
      let that = this;
      if (row.parents.length > 0) {
        that.studentId = row.studentId;
        this.dialogParentsVisableEdit = true;
        let params = {
          userToken: this.token,
          data: {
            studentId: row.studentId,
          },
        };
        this.http.post(this.api.editParents, params).then(
          (res) => {
            if (res.code == 0) {
              console.log(res.data);
              let ary = [];
              if (res.data.length > 0) {
                res.data.forEach((item) => {
                  let obj = {
                    parentName: "",
                    parentRole: "",
                    parentMobilePhone: "",
                    workUnit: "",
                  };
                  obj.parentName = item.name;
                  obj.parentRole = item.parentRole;
                  obj.parentMobilePhone = item.mobilePhone;
                  obj.workUnit = item.workUnit;
                  ary.push(obj);
                });
              }
              that.parentsList = ary;
            }
          },
          (error) => {
            that.$message({
              showClose: true,
              message: error.message,
              type: "error",
              duration: 1500,
            });
            if (error.code == 3) {
              setTimeout(() => {
                that.$router.push({ path: "/" });
              }, 1500);
            }
          }
        );
      } else {
        this.$message.error("该学生还未添加家长！");
      }
    },
    addRole() {
      if (this.parentsList.length > 9) {
        this.$message.error("最多只能添加10个家长！");
        return false;
      }
      let obj = {
        parentName: "",
        parentRole: "",
        parentMobilePhone: "",
        workUnit: "",
      };
      this.parentsList.push(obj);
    },
    chooseRole() {
      this.dialogVisibleFive = true;
    },
    delThis(i) {
      this.parentsList.splice(i, 1);
    },
    saveParents() {
      console.log(this.parentsList);
      let that = this;
      let params = {
        userToken: this.token,
        data: {
          studentId: that.studentId,
        },
      };
      params.data.parents = that.parentsList;
      this.http.post(this.api.updateParents, params).then(
        (res) => {
          if (res.code == 0) {
            that.$message.success("编辑家长成功！");
            that.dialogParentsVisableEdit = false;
            that.queryStudentList();
          }
        },
        (error) => {
          that.$message({
            showClose: true,
            message: error.message,
            type: "error",
            duration: 1500,
          });
          if (error.code == 3) {
            setTimeout(() => {
              that.$router.push({ path: "/" });
            }, 1500);
          }
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.t-main {
  min-width: 970px;
}
.t-header {
  min-width: 970px;
  // width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #686868;
  background: #eaf1f7;
}
.t-body {
  padding: 20px;
  display: flex;
}
.t-left-body {
  position: relative;
  width: 240px;
  height: 100%;
  border: 1px solid #ccc;
  margin-right: 20px;
  padding: 15px;
  .search-modal {
    z-index: 2;
    position: absolute;
    top: 55px;
    left: 15px;
    width: 180px;
    max-height: 140px;
    border: 1px solid #409eff;
    border-radius: 5px;
    background: #fff;
    overflow: auto;
    cursor: pointer;
    .search-list {
      padding: 10px;
      font-size: 14px;
      color: #606266;
      border-bottom: 1px dashed #ddd;
      &:hover {
        color: #409eff;
      }
      &:last-child {
        border: none;
      }
    }
  }
}
.class-stds {
  font-size: 14px;
  font-weight: bold;
}
.teacher-set {
  display: flex;
  width: 100%;
  height: 46px;
  align-items: center;
  border: 1px solid #ccc;
  margin: 10px 0;
  background: #f2f2f2;
  font-size: 14px;
}
.t-name {
  padding: 0 15px;
  font-size: 14px;
}
.t-name span {
  color: #409EFF;
}
.t-name .rt {
  margin-right: 30px;
}
.t-edit {
  margin-right: 20px;
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.t-edit:hover {
  color: #409EFF;
  border-color: #409EFF;
}
.search-box {
  display: flex;
  align-items: center;
}
.search-body {
  width: 180px;
  position: relative;
}
/deep/ .search.el-input.is-active .el-input__inner,
/deep/ .search .el-input__inner:focus,
/deep/ .search .el-input__inner:hover {
  border-color: #409eff;
}
.search-body >>> .el-input__inner {
  width: 180px;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #dcdfe6;
}
.import-org {
  margin-left: 10px;
  font-size: 20px;
  color: #888;
  cursor: pointer;
}
.org-pannel {
  margin-top: 12px;
  /deep/ .el-tree {
    // padding-left: 32px;
    .el-tree-node__content {
      height: 40px;
    }
  }
}
.org-pannel /deep/ .custom-tree-node {
  display: inline-block;
  width: 90%;
  line-height: 40px;
}
.org-pannel /deep/ .icon-more {
  float: right;
  transform: rotate(90deg);
}
.org-pannel /deep/ .el-button--text {
  color: #409eff;
}
.t-right-body {
  flex: 1;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
}
.oprates {
  display: flex;
  justify-content: space-between;
}
.show-parents {
  cursor: pointer;
}
.lf-area {
  display: flex;
}
.ad-default {
  color: #ccc;
  background-color: #fff;
  border: 1px solid #ccc;
}
.ad-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.add {
  margin-right: 12px;
}
.all-oprate {
  margin-right: 12px;
}
.in-out {
  position: relative;
  width: 120px;
  height: 60px;
  margin-right: 12px;
  font-size: 14px;
  color: #aaa;
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  .arrow-down {
    font-size: 14px;
    font-weight: bold;
  }
}
.in-out:hover .title {
  color: #409eff;
  border: 1px solid #409eff;
}
.in-out:hover .import-box {
  display: block;
  position: absolute;
  top: 48px;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
}
.import-box {
  display: none;
  position: absolute;
  top: 48px;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
}
.i-item {
  height: 30px;
  line-height: 30px;
  text-align: left;
  cursor: pointer;
}
.set {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  color: #ccc;
  cursor: pointer;
}
.rl-area {
  width: 270px;
  height: 40px;
  position: relative;
}
.rl-area >>> .el-input__inner {
  width: 270px;
}
.tableHead {
  font-weight: bold;
}
.yes {
  color: #409eff;
}
.no {
  color: orange;
}
.op-item {
  color: #409eff;
  cursor: pointer;
}
.pagi {
  margin-top: 40px;
  float: right;
}
.el-pagination {
  padding: 20px 0;
  text-align: right;
}
/deep/ .el-pager li.active {
  color: #409eff;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #409eff;
}
/deep/ .el-pagination.is-background .btn-next,
/deep/ .el-pagination.is-background .btn-prev,
/deep/ .el-pagination.is-background .el-pager li {
  border: 1px solid #eee;
  border-radius: 2px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #409eff;
  border: none;
  color: #fff;
}
// .pagi /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
//   background-color: #409EFF;
//   border: none;
//   color: #fff;
// }
// .pagi /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
//   color: #409EFF;
// }
/deep/ .el-dialog {
  width: 500px;
  /deep/ .el-dialog__header {
    background: #eaf1f7;
  }
  /deep/ .el-dialog__title {
    color: #6e7d8f;
    font-size: 16px;
  }
  /deep/ .el-dialog__footer {
    border-top: 1px solid #ddd;
  }
  .dialog-pro {
    padding: 30px 0;
    font-size: 20px;
    font-weight: 700;
  }
  .dialog-desc {
    color: #999;
  }
  .dialog-check {
    font-size: 50px;
  }
  .dialog-col {
    padding: 0 0 20px;
    text-align: center;
  }
  .dialog-tip {
    padding: 10px 20px;
    color: #ff6a00;
    border: 1px solid #e9e9e9;
    background: #fbfbfb;
  }
  .dialog-t {
    padding: 6px 0;
    font-weight: 700;
  }
  .dialog-c {
    padding: 6px 0;
    font-size: 14px;
  }
  .el-input {
    // width: 260px;
  }
  .el-button.el-button--default {
    padding: 6px 20px;
    color: #409eff;
    background-color: #fff;
    border-color: #409eff;
  }
  .el-button.el-button--default:focus,
  .el-button.el-button--default:hover {
    background-color: #fff;
    border-color: #66b1ff;
    color: #66b1ff;
  }
  .el-button.btn {
    padding: 6px 20px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .el-button.btn:focus,
  .el-button.btn:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .del-box {
    align-items: center;
    .del-icon {
      padding-right: 10px;
      font-size: 40px;
      color: #ff6a00;
    }
    .del-tip {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .t-title {
    font-size: 12px;
    font-weight: bold;
  }
  .t-list {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .t-head {
    margin: 8px 0;
  }
  .row-bd {
    display: flex;
    align-items: center;
  }
  .search-wrap {
    position: relative;
  }
  .over-tags {
    display: block;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .tag-teacher {
    display: inline-block;
    padding: 5px 5px;
    background: #eee;
    margin-right: 8px;
    border-radius: 3px;
    cursor: pointer;
  }
  .tag-item {
    display: inline-block;
    padding: 2px 5px;
    background: #eee;
    margin-right: 8px;
    border-radius: 3px;
    cursor: pointer;
  }
  .tag-teacher i {
    color: #409EFF;
  }
  .tag-item i {
    color: #409EFF;
  }
  .input-tip {
    margin-left: 10px;
  }
  .learn-period /deep/ .el-radio {
    margin-bottom: 12px;
  }
}
.parents-table {
  .head-list {
    display: flex;
    margin-bottom: 20px;
    .head-item {
      width: 25%;
      text-align: left;
      span {
        color: #f00;
      }
    }
  }
  .parents-body {
    .body-list {
      display: flex;
      margin-bottom: 10px;
      .body-item {
        width: 25%;
        .el-input {
          width: 95%;
        }
        .el-select {
          width: 95%;
          .el-input--suffix {
            width: 100%;
          }
        }
      }
      .del-btn {
        width: 24px;
        line-height: 40px;
        cursor: pointer;
        .minus-icon {
          font-size: 16px;
          color: #f00;
          font-weight: bold;
        }
      }
    }
  }
  .parents-footer {
    margin-top: 30px;
    .el-button.submit {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .el-button.reset {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  }
  
}
</style>
