<template>
  <div class="container mt-2">
    <b-form class="p-3">
    <h1>Editar empresa</h1>
    <hr>
    <h5>Personalize os dados abaixo</h5>
      <b-form-group label="Razão Social" label-for="businessName">
        <b-form-input
          id="businessName"
          type="text"
          required
          autocomplete="off"
          v-model.trim="$v.form.businessName.$model"
          :state="getValidation('businessName')"
        ></b-form-input>
      </b-form-group>   
      <b-form-group label="CNPJ" label-for="cnpj">
        <b-form-input
          id="cnpj"
          v-model.trim="$v.form.cnpj.$model"
          type="text"
          required
          autocomplete="off"
          :state="getValidation('cnpj')"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Endereço" label-for="address">      
        <b-form-input
          id="address"
          type="text"
          required
          autocomplete="off"
          v-model.trim="$v.form.address.$model"
          :state="getValidation('address')"
        ></b-form-input>
      </b-form-group>   
      <b-form-group>
      <b-button type="submit" :disabled='isDisabled'
      class="col-12" variant="outline-primary" @click="saveCompany">
        Salvar
      </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { required, minLength, maxLength, decimal, integer } from "vuelidate/lib/validators";
import ToastMixin from "@/mixins/toastMixin.js";
import axios from 'axios';

export default {
  name: "Edit",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        businessName: "",
        address: "",  
        cnpj: ""   
      },
    };
  },

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

  async created() {
    if (this.$route.params.companyId) {
      this.form = {
        businessName: this.$route.params.companyId.businessName,
        cnpj: this.$route.params.companyId.cnpj,
        address: this.$route.params.companyId.address
      }
      console.log(this.form)
    } else{
        this.$router.push({ name: "companies" })
    }
  },
  methods: {
    getValidation(field) {
      return !this.$v.form[field].$error;
    },
    saveCompany() {

        var body = {
          businessName: this.form.businessName,
          cnpj: this.form.cnpj,
          address: this.form.address
        }

        axios
        .put(`http://localhost:3000/api/company/${this.$route.params.companyId.id}`, body)
        .then(function (response) {
          console.log(response.data)
            if(response.data.message == 'Empresa atualizada com sucesso.'){
              this.showToast("success", "Sucesso!", "Informações da empresa atualizadas com suceso");
              this.$router.push({ name: "companies" })
            } else {
              this.showToast("danger", "Erro!", "Não foi possível atualizar a empresa");
            }
          }.bind(this)
        )
        .catch(function (error) {
          this.showToast("danger", "Erro!", "Não foi possível atualizar a empresa");
        });  
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
};
</script>
