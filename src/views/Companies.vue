
<template>
  <div class="container mt-2 p-3">
    <h1>Empresas</h1>
    <template>
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
            <div class="col-menu">
              
              <b-button
                variant="outline-secondary"
                class="mr-2"
                @click="edit(company)"
                v-b-tooltip.hover
                title="Editar"
              >
                <i class="fas fa-edit"></i>
              </b-button>
              <b-button
                variant="outline-danger"
                class="mr-2"
                @click="remove(company.id)"
                v-b-tooltip.hover
                title="Excluir"
              >
              <i class="fas fa-times"></i>
              </b-button>
            </div>
          </div>
        </b-card>
        <b-card class="d-flex mt-4 align-items-center" v-else>
          <div class="d-flex flex-column align-items-center">
            <h3>Sem empresas cadastrados</h3>
            <b-button
                variant="outline-secondary"
                class="my-2"
                @click="$router.push('register')"
                v-b-tooltip.hover
                title="Cadastrar um empresa"
              >     Quero cadastrar um empresa
              </b-button>       
          </div>
        </b-card>
    </b-card-group>
  </template>
    <b-modal ref="modalRemove" hide-footer title="Exclusão de empresa">
      <div class="d-block text-center">
        Deseja realmente excluir essa empresa? <!-- {{ companySelected.title }} -->
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveCompany"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>

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
      isLoading: false,
      }
  },
  async created() {
    this.companies = await this.getCompanies();
  },
  methods: {
    edit(companyId) {
      console.log(companyId);
      this.$router.push({ name: "edit", params: { companyId } });
    },

    async remove(companyId) {
      this.companySelected = companyId;
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    async confirmRemoveCompany() {

      axios
      .delete(`http://localhost:3000/api/company/${this.companySelected}`)
      .then( async function (response) {
        console.log(response.data)
          if(response.data.message == 'Empresa apagada com sucesso.'){
            this.companies = await this.getCompanies();
            this.hideModal();
          } else {
            this.showToast("danger", "Erro!", "Não foi possível deletar o empresa");
            this.hideModal();
          }
        }.bind(this)
      )
      .catch(async function (error) {
        this.showToast("danger", "Erro!", "Não foi possível deletar o empresa");
        this.companies = await this.getCompanies();
        this.hideModal();
      });  
    },

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
    },

  },
}
</script>