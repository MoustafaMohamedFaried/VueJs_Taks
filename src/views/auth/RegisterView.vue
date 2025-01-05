<template>
    <div class="register-form-container">
        <h2 class="text-center">Register</h2>
        <form class="register-form" @submit.prevent="handleRegister">
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" id="name" class="form-control" v-model="user.name" placeholder="Enter your full name"
                    required />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="user.email" placeholder="Enter your email"
                    required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" v-model="user.password"
                    placeholder="Enter your password" required />
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Register</button>
                <a href="#" @click.prevent="handleLogin" class="btn btn-link">Already have an account? Login</a>
            </div>
        </form>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import axios from "axios";

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
            },
            token: "",
        };
    },
    methods: {
        showNotifi(title, text, icon) {
            Swal.fire(title, text, icon);
        },
        handleRegister() {
            axios
                .post("http://localhost:8000/api/register", this.user)
                .then((response) => {
                    // Access the token from response.data.data.access_token
                    localStorage.setItem('authToken', response.data.data.access_token);
                    
                    this.token = response.data.data.access_token;

                    // Redirect to the home page
                    this.$router.push('/');

                    // Show success notification
                    this.showNotifi("success", response.data.message, "success");
                })
                .catch((error) => {
                    console.error(error);

                    // Show error notification
                    this.showNotifi("Error", "Failed to create user", "error");
                });
        },
        handleLogin() {
            // Redirect to the registration page
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.register-form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.register-form-container h2 {
    margin-bottom: 20px;
}

.register-form .btn-primary {
    width: 100px;
}
</style>
