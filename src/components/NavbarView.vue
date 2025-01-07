<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse container" id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                    <a class="nav-link active" aria-current="page" href="#"
                        @click.prevent="this.$router.push('/')">Users</a>
                    <a class="nav-link active" aria-current="page" href="#"
                        @click.prevent="this.$router.push('/posts')">Posts</a>
                </div>
                <div class="d-flex">
                    <!-- Conditionally render login and register buttons -->
                    <button v-if="!isAuth" class="btn btn-primary me-2" @click.prevent="this.$router.push('/login')"
                        type="button">
                        Login
                    </button>
                    <button v-if="!isAuth" class="btn btn-secondary me-2"
                        @click.prevent="this.$router.push('/register')" type="button">
                        Register
                    </button>

                    <!-- Conditionally render the user dropdown when authenticated -->
                    <div v-if="isAuth" class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ username }} 
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button class="dropdown-item" @click.prevent="handleLogout">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
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
            // authToken: this.$cookies.get("authToken")
            authToken: this.$authToken,
            username: this.$userName,
        };
    },
    methods: {
        checkAuthStatus() {
            this.isAuth = !!this.authToken; // Set isAuth to true if authToken exists, otherwise false
        },
        handleLogout() {
            // Remove auth token and update isAuth status
            // localStorage.removeItem("authToken");

            this.$cookies.remove("userData", { path: "/" });

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
