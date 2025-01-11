export default {
   data() {
      return {
         user: {
            email: '',
            password: '',
         },
         apiKey: this.$apiKey
      };
   },
   methods: {
      showNotifi(title, text, icon) {
         this.$swal.fire(title, text, icon);  // Use the globally provided Swal
      },
      handleLogin() {
         this.$axios
            .post(
               "http://localhost:8000/api/login",
               this.user, // Request body containing user data
               {
                  headers: {
                     'x-api-key': `${this.apiKey}`,
                  },
               }
            )
            .then((response) => {
               const access_token = response.data.data;
               console.log(access_token);

               const user = this.$decodeToken(access_token).user;
               console.log(user);

               // Create the user data object
               const userData = {
                  name: user.name,
                  id: user.id,
                  email: user.email,
                  access_token: access_token,
               };

               // Store the userData in cookies
               this.$cookies.set("userData", JSON.stringify(userData), {
                  expires: 7, // Cookie will expire in 7 days
                  secure: true,
                  sameSite: "Strict",
               });

               // Show success notification
               this.showNotifi("Success", response.data.message, "success");

               // Redirect to the home page
               this.$router.push("/uploads");
            })
            .catch((error) => {
               console.error(error);

               // Show error notification
               if (error.response && error.response.data.message) {
                  this.showNotifi("Error", error.response.data.message, "error");
               } else {
                  this.showNotifi("Error", "Failed to create user", "error");
               }
            });
      },
      handleRegister() {
         // Redirect to the registration page
         this.$router.push('/register');
      },
   },
};