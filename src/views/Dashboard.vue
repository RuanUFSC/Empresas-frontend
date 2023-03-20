
<template>
  <div class="container mt-2 p-3">
    
    <b-card-group class="col-8 mt-2">
        <b-card class="d-flex mb-2">
         Quantidade de empresas: {{ companies.length }}
        </b-card>
    </b-card-group>
    <b-card-group class="col-8 mt-2">
        <b-card class="d-flex mb-2">
         Quantidade de Ramos: {{ lines.length }}
        </b-card>
    </b-card-group>
    <b-card-group deck v-for="line in lines" :key="line" class="col-8 mt-2">
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
    </b-card-group>

    <h1>Empresas</h1>
    <b-card-group deck v-for="company in companies" :key="company.id" class="col-8 mt-2">
        <b-card class="d-flex mb-2" v-if="company.businessName">
          <div class="container-companies">
            <b-list-group flush class="col-company col-10">
              <div class="d-flex flex-row justify-content-between">
                <b-list-group-item class="col-12"><strong>Razão Social:</strong> {{ company.businessName }}</b-list-group-item>
              </div>              
              <div class="d-flex justify-content-between">
                <b-list-group-item class="col-12"><strong>CNPJ:</strong> {{  company.cnpj }}</b-list-group-item>
              </div>
              <div class="d-flex justify-content-between">
                <b-list-group-item  class="col-12"><strong>Endereço</strong> {{company.address}}</b-list-group-item>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <b-list-group-item class="col-12"><strong>Ramo:</strong> {{ company.businessLine }}</b-list-group-item>
              </div>          
            </b-list-group>
           </div>
        </b-card>
    </b-card-group>
  </div>
</template>
<style>

.container {
  display: grid;
  justify-items: center;
}

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