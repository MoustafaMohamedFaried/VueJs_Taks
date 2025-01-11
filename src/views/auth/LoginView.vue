<template>
    <div class="login-form-container">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
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
                <button type="submit" class="btn btn-primary">Login</button>
                <a href="#" class="btn btn-link" @click.prevent="handleRegister">
                    Register
                </a>
            </div>
        </form>
    </div>
</template>

<script>
// Importing the external login.js file
import LoginScript from '@/assets/js/auth/login';

export default {
   mixins: [LoginScript], // Using the methods and data from the login.js file
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
