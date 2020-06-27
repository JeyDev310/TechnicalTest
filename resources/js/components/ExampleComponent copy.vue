<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Company Detail List</div>
                    {{this.selectedData}}
                    <div class="card-body">
                        <div class="flex my-2">
                            <button type="button" class="btn btn-primary mr-2" data-toggle="modal" data-target="#formModal" @click="onAdd()">Add</button>
                            <button type="button" class="btn btn-primary mr-2" data-toggle="modal" data-target="#formModal" @click="onEdit()">Edit</button>
                            <button type="button" class="btn btn-primary mr-2" @click="onDelete()">delete</button>
                        </div>
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr class="d-flex">
                                    <th scope="col" class="col-1">#</th>
                                    <th scope="col" class="col-1">Name</th>
                                    <th scope="col" class="col-4">Description</th>
                                    <th scope="col" class="col-2">Tag</th>
                                    <th scope="col" class="col-4">File</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="item.id" class="d-flex" :class="{'table-active': index==selectedIndex}" @click="onRowClicked(index)" style="cursor:pointer">
                                    <th scope="row" class="col-1">{{index+1}}</th>
                                    <td class="col-1">{{item.name}}</td>
                                    <td class="col-4">{{item.desc}}</td>
                                    <td class="col-2">{{item.tag}}</td>
                                    <td class="col-4">{{item.file}}</td>
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
                                <textarea class="form-control" id="company-desc" v-model="selectedData.desc"></textarea>
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
import data from './data.json'
import _ from 'lodash'

import { mapGetters, mapActions } from "vuex";

export default {
    data () {
        return {
        data,
        selectedIndex: 0,
        selectedData: {},
        editMode: 'add'
        }
    },        
    mounted() {
        console.log('Component mounted.')
        this.selectedData = this.data[this.selectedIndex]
    },
    computed: {
        // ...mapGetters("CompaniesIndex", [
        // "data",
        // "total",
        // "loading",
        // "relationships"
        // ])
    },
    methods: {
        onRowClicked(index) {
            this.selectedIndex = index
            this.selectedData = this.data[this.selectedIndex]
        },
        onAdd() {
            this.editMode = 'add'
            this.selectedData = {};
            document.getElementById("company-file").value = ""
            console.log('--------onAdd')
        },
        onEdit() {
            this.editMode = 'edit'
            this.selectedData = _.clone(this.data[this.selectedIndex])
            document.getElementById("company-file").value = ""
            console.log('--------onModify')
        },
        onDelete() {
            this.data.splice(this.selectedIndex, 1);
        },
        onFileChanged(event) {
            console.log('---------fileChanged:', event.target.files[0])
            if (event.target.files && event.target.files.length> 0) {
                this.selectedData.file = event.target.files[0].name
            }
            else 
                this.selectedData.file = ''
        },
        onOK() {
            this.selectedData.id = Math.floor(Math.random() * 1000)
            if (this.editMode == 'add') {
                this.data.push(this.selectedData)
            }
            else {
                this.data[this.selectedIndex] = this.selectedData
            }
            console.log('--------onOK:', this.data)
        }
    }
}
</script>
