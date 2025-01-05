<template>
    <div class="login-form-container">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter your email"
                    required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" v-model="password"
                    placeholder="Enter your password" required />
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Login</button>
                <a href="#" class="btn btn-link" @click.prevent="handleRegister">
                    Register
                </a>
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
            email: '',
            password: '',
            token: '',
        };
    },
    methods: {
        showNotifi(title, text, icon) {
            Swal.fire(title, text, icon);
        },
        handleLogin() {
            // Example: Add your authentication logic here
            if (this.email && this.password) {
                console.log('Logging in with:', this.email, this.password);
                // Replace with API call
                localStorage.setItem('authToken', 'dummyToken'); // Simulating login
                this.$router.push('/dashboard'); // Redirect after login
            } else {
                alert('Please fill in all fields');
            }
        },
        handleRegister() {
            // Redirect to the registration page
            this.$router.push('/register');
        },
    },
};
</script>

<style scoped>
.login-form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form-container h2 {
    margin-bottom: 20px;
}

.login-form .btn-primary {
    width: 100px;
}
</style>
