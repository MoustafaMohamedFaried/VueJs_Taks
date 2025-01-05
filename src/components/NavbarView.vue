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
                    <!-- Conditionally render login and register buttons -->
                    <button v-if="!isAuth" class="btn btn-primary me-2" @click.prevent="handleLogin" type="button">
                        Login
                    </button>
                    <button v-if="!isAuth" class="btn btn-secondary me-2" @click.prevent="handleRegister" type="button">
                        Register
                    </button>

                    <!-- Conditionally render logout button -->
                    <button v-if="isAuth" class="btn btn-danger" @click.prevent="handleLogout" type="button">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isAuth: false, // Default is not authenticated
            authToken: localStorage.getItem("authToken")
        };
    },
    methods: {
        checkAuthStatus() {
            this.isAuth = !!this.authToken; // Set isAuth to true if authToken exists, otherwise false
        },
        handleLogin() {
            // Redirect to the login page
            this.$router.push('/login');
        },
        handleRegister() {
            // Redirect to the registration page
            this.$router.push('/register');
        },
        handleLogout() {
            // Remove auth token and update isAuth status
            localStorage.removeItem("authToken");
            this.isAuth = false;
            this.$router.push('/login'); // Optionally redirect to home
        },
    },
    mounted() {
        // Check auth status when the component is mounted
        this.checkAuthStatus();
    },
};
</script>
