<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      
    <b-navbar-brand to="/companies">Company Manager</b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class="d-flex flex-row justify-content-left" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/companies">Minhas empresas</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/register">Criar empresa</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>  
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>