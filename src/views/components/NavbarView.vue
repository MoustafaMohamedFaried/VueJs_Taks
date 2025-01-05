<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse container" id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </div>
                <div class="d-flex">
                    <!-- Conditionally render these based on user authentication -->
                    <button class="btn btn-primary me-2" @click.prevent="handleLogin" type="button">Login</button>
                    <button class="btn btn-secondary me-2" @click.prevent="handleRegister" type="button">Register</button>
                    <button class="btn btn-danger" type="button">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        homePage(){
            this.$router.push('/');
        },
        handleLogin() {
            // Redirect to the login page
            this.$router.push('/login');
        },
        handleRegister() {
            // Redirect to the registration page
            this.$router.push('/register');
        },
    },
};
</script>