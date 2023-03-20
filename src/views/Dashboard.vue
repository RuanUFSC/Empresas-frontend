
<template>
  <div class="container mt-2 p-3 d-flex flex-row justify-content-between">
    
    <div class="col-6 mt-2 card-body text-center">
        <div class="d-flex mb-2">
          <span class="h5 m-auto">Quantidade de empresas: {{ companies.length }}</span>
        </div>
        <table class="table" >
          <thead class="thead-dark">
            <tr>
              <th scope="col">Razão Social</th>
              <th scope="col">CNPJ</th>
              <th scope="col">Ramo</th>
              <th scope="col">Endereço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in companies" :key="company.id">
              <td>{{ company.businessName }}</td>
              <td>{{ company.cnpj }}</td>
              <td>{{ company.businessLine }}</td>
              <td>{{ company.address }}</td>
            </tr>
          </tbody>
        </table>
    </div>

    <div class="col-6 mt-2 card-body text-center">
        <div class="d-flex mb-2">
          <span class="h5 m-auto">Quantidade de Ramos: {{ lines.length }}</span>
        </div>
      

        <table class="table" >
          <thead class="thead-dark">
            <tr>
              <th scope="col">Ramo</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in lines" :key="line">
              <td>{{line}}</td>
              <td>{{  companies.filter(company => company.businessLine == line).length }}</td>
            </tr>
          </tbody>
        </table>


        <!-- <b-card-group deck v-for="line in lines" :key="line" class="col-8 mt-2">
            <b-card class="d-flex mb-2">
              <div class="container-companies">
                <b-list-group flush class="col-company col-10">
                  <div class="d-flex flex-row justify-content-between">
                    <b-list-group-item class="col-12"><strong>Ramo:</strong> {{ line }}</b-list-group-item>
                  </div>              
                  <div class="d-flex justify-content-between">
                    <b-list-group-item class="col-12"><strong>Quantidade de empresas:</strong> {{  companies.filter(company => company.businessLine == line).length }}</b-list-group-item>
                  </div>        
                </b-list-group>
              </div>
            </b-card>
        </b-card-group>   -->
    </div>
  </div>
</template>
<style>

.container-companies {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.col-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 10%;
}
</style>

<script>

import ToastMixin from "@/mixins/toastMixin.js";
import axios from "axios";

export default {
  name: "Companies",

  mixins: [ToastMixin],

  data() {
    return {
      companies: [],
      lines: [],
      isLoading: false,
      }
  },
  async created() {
    this.companies = await this.getCompanies();
    this.companies.forEach(company => {
      if(!this.lines.includes(company.businessLine)) {
        this.lines.push(company.businessLine);
      }
    })
  },
  methods: {
    
    async getCompanies() {
      this.isLoading = true;
      let self = this;
      setTimeout(function () {
        self.isLoading = false;
      }, 3000);

      var companies = 
      axios
      .get(`http://localhost:3000/api/companies`)
      .then(function (response) {
        if(response.data.title == 'Nenhuma empresa localizada') {
          return ''
        } else {
          console.log(response.data)
          return response.data
        }
          
        }.bind(this)
      )
      .catch(function (error) {
        return ([{title: 'Não localizamos empresas'}])
      });    
      return companies;
    }

  },
}
</script>