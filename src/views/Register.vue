<template>
  <div class="container mt-2">
  <b-form class="p-3">
    <h1>Criar empresa</h1>
    <hr>
    <h5>Preencha os dados abaixo</h5>
      <b-form-group label="" label-for="title" class="mt-2">
        <b-form-text>Razão social</b-form-text>
        <b-form-input 
          class="mb-3"
          id="businessName" 
          type="text"
          placeholder="Razão social"
          required
          autocomplete="off"
          v-model.trim="$v.form.businessName.$model"
          :state="getValidation('businessName')"
          >
        ></b-form-input>
        <b-form-text>CNPJ</b-form-text>
        <b-form-input 
          class="mb-3"
          id="cnpj" 
          type="text"
          placeholder="Informe o CNPJ da empresa"
          required
          autocomplete="off"
          v-model.trim="$v.form.cnpj.$model"
          :state="getValidation('cnpj')"
        ></b-form-input>
        <b-form-text>Endereço</b-form-text>
        <b-form-input 
          class="mb-3"
          id="address" 
          type="text"
          placeholder="Endereço"
          required
          autocomplete="off"
          v-model.trim="$v.form.address.$model"
          :state="getValidation('address')"
          >
        ></b-form-input>
        
        <b-button
          class="col-12" 
          type="submit" 
          :disabled='isDisabled'
          variant="outline-primary" 
          @click="createCompany"
        >
          Salvar
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>
<style>

</style>
<script>
import { required, minLength, maxLength, decimal, integer } from "vuelidate/lib/validators";
import ToastMixin from "@/mixins/toastMixin.js";
import axios from "axios";

export default {
  name: "Register",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        businessName: "",
        cnpj: "",
        address: ""
      }
    }
  },

  mixins: [ToastMixin],

  
  validations: {
    form: {
      businessName: {
        required,
        minLength: minLength(3),
      },
      cnpj: {
        required,
        minLength: minLength(14),
        maxLength: maxLength(14),
        integer
      },
      address: {
        required,
        minLength: minLength(5),
      }
    },
  },

  methods: {

    getToday() {
      return new Date().toISOString().split("T")[0];
    },

    getValidation(field) {
      if(this.$v.form[field].$dirty === false) {
        return null;
      }
      return !this.$v.form[field].$error;
      //if(this.$v.form[field].$dirty === false) {
      //  return false;
      //}
      //return !this.$v.form[field].$error;
    },

    createCompany() {

      var body = {
        businessName: this.form.businessName,
        cnpj: this.form.cnpj,
        address: this.form.address
      }
        
      axios
        .post(`http://localhost:3000/api/company`, body)
        .then(function (response) {
            if(response.data.id){
              this.showToast("success", "Sucesso!", "Empresa criada com suceso");
              this.$router.push({ name: "companies" })
            } else {
              this.showToast("danger", "Erro!", "Não foi possível criar a empresa");
            }
          }.bind(this)
        )
        .catch(function (error) {
          this.showToast("danger", "Erro!", "Não foi possível criar a empresa");
        });  
       this.$router.push({ name: "companies" });
      }
  },
  computed: {
    isDisabled: function(){
      if(this.$v.form.businessName.$model.length < 3 || 
      this.$v.form.address.$model.length < 5 ||
      this.$v.form.cnpj.$model.toString().length !== 14
      ) {
        return true
      } else {
        return false
      }     
    }   
  },
}
</script>
  