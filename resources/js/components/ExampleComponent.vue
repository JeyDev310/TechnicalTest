<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Company Detail List</div>
                    <div class="card-body">
                        <div class="d-flex justify-content-end my-2">
                            <button type="button" class="btn btn-primary mr-2" @click="importCSV()">Import CSV</button>
                            <button type="button" class="btn btn-primary mr-0" style="width:80px" data-toggle="modal" data-target="#formModal" @click="onAdd()">Add</button>
                            <input id="fileUpload" type="file" accept=".csv" hidden  @change="onImportCSV">
                        </div>
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr class="d-flex">
                                    <th scope="col" class="col-1 d-flex justify-content-center align-items-center">#</th>
                                    <th scope="col" class="col-2 d-flex justify-content-center align-items-center">Name</th>
                                    <th scope="col" class="col-3 d-flex justify-content-center align-items-center">Description</th>
                                    <th scope="col" class="col-1 d-flex justify-content-center align-items-center">Tag</th>
                                    <th scope="col" class="col-3 d-flex justify-content-center align-items-center">File</th>
                                    <th scope="col" class="col-2 d-flex justify-content-center align-items-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="item.id" class="d-flex" :class="{'table-active': index==selectedIndex}" @click="onRowClicked(index)" style="cursor:pointer">
                                    <th scope="row" class="col-1">{{index+1}}</th>
                                    <td class="col-2">{{item.name}}</td>
                                    <td class="col-3">{{item.description}}</td>
                                    <td class="col-1">{{item.tag}}</td>
                                    <td class="col-3"><a :href="getUploadFilePath(item.file)">{{item.file}}</a></td>
                                    <td class="col-2 d-flex justify-content-center align-items-center">
                                        <button type="button" class="btn btn-primary mr-2" data-toggle="modal" data-target="#formModal" @click="onEdit(index)">Edit</button>
                                        <button type="button" class="btn btn-primary mr-2" @click="onDelete(index)">delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Company Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="company-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="company-name" v-model="selectedData.name">
                            </div>
                            <div class="form-group">
                                <label for="company-desc" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="company-desc" v-model="selectedData.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="company-tag" class="col-form-label">Tag:</label>
                                <input type="text" class="form-control" id="company-tag" v-model="selectedData.tag">
                            </div>
                            <div class="form-group">
                                <label for="company-file" class="col-form-label">File:</label>
                                <input type="file" class="form-control" id="company-file" @change="onFileChanged">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onOK">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import api from '../services/api'
import { mapGetters, mapActions } from "vuex";

export default {
    data () {
        return {
        data:{},
        selectedIndex: 0,
        selectedData: {},
        editMode: 'add'
        }
    },
    created() {
    },
    mounted() {
        this.getCompanies();
    },
    computed: {
    },
      watch: {
    },
    methods: {
        getCompanies() {
            api.getCompanies((err, res) => {
                if (err == null) {
                    this.data = res
                }
            })            
        },
        insertCompany() {
            api.insertCompany(this.selectedData, (err, res) => {
                if (err == null) {
                    this.data.push(res.data)
                }
            })
        },
        updateCompany() {
            api.updateCompany(this.selectedData, (err, res) => {
                if (err == null) {
                    Vue.set(this.data, this.selectedIndex, res.data)
                }
            })           
        },
        deleteCompany() {
            if (this.selectedData == null) return
            api.deleteCompany(this.selectedData.id, (err, res) => {
                if (err == null) {
                    this.data.splice(this.selectedIndex, 1);
                    this.selectedIndex = 0
                    this.selectedData = this.data[this.selectedIndex]
                }
            })
        },
        onRowClicked(index) {
            this.selectedIndex = index
            // this.selectedData = this.data[this.selectedIndex]
        },
        importCSV() {
            document.getElementById("fileUpload").click()
        },
        onAdd() {
            this.editMode = 'add'
            this.selectedData = {};
            document.getElementById("company-file").value = ""
        },
        onEdit(index) {
            this.editMode = 'edit'
            this.selectedData = _.clone(this.data[index])
            document.getElementById("company-file").value = ""
        },
        onDelete(index) {
            this.selectedIndex = index
            this.selectedData = this.data[this.selectedIndex]
            this.deleteCompany();
        },
        onFileChanged(event) {
            if (event.target.files && event.target.files.length> 0) {
                this.selectedData.fileInput = event.target.files[0]
            }
            else 
                this.selectedData.file = ''
        },
        onImportCSV(event) {
            
        },
        getUploadFilePath(fileName) {
            return api.getUploadFilePath(fileName)
        },
        onOK() {
            if (this.editMode == 'add') {
                this.insertCompany();
            }
            else {
                this.updateCompany();
            }
        }
    }
}
</script>
