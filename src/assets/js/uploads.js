export default {
   data() {
      return {
         images: [],
         newImage: { image: "" },
         authToken: this.$authToken,
         apiKey: this.$apiKey,
         username: this.$userName,
      };
   },

   methods: {
      showNotifi(title, text, icon) {
         this.$swal.fire(title, text, icon);
      },
      truncateText(text, length) {
         return text.length > length ? text.substring(0, length) + "..." : text;
      },
      handleFileChange(event) {
         const file = event.target.files[0]; // Get the first selected file
         if (file) {
            this.newImage.image = file; // Update the newImage object with the selected file
         }
      },
      fetchImages() {
         // Retrieve posts from API
         this.$axios
            .get("http://localhost:8001/api/uploads/getImages", {
               headers: {
                  "x-api-key": `${this.apiKey}`,
                  Authorization: `Bearer ${this.authToken}`,
               },
            })
            .then((response) => {
               // console.log(response.data.data);

               this.images = response.data.data.map((path) => `http://localhost:8001${path}`);

               console.log(this.images);
            })
            .catch((error) => {
               console.error("Failed to fetch posts:", error);
               this.showNotifi("Error", "Failed to fetch posts", "error");
            });
      },
      uploadImage() {
         // console.log(this.newImage.image);
         const formData = new FormData();
         formData.append("image", this.newImage.image); // Append the image file

         this.$axios
            .post("http://localhost:8001/api/uploads/upload", formData, {
               headers: {
                  'x-api-key': `${this.apiKey}`,
                  'Authorization': `Bearer ${this.authToken}`, // Use the token dynamically
                  "Content-Type": "multipart/form-data",
               }
            })
            .then((response) => {
               const closeCreateModalBtn = document.getElementById(
                  "closeCreateModalBtn"
               );

               const imagePath = `http://localhost:8001${response.data.data.path}`

               this.images.push(imagePath);

               this.newImage.image = "";

               closeCreateModalBtn.click();

               this.showNotifi("success", response.data.message, "success");
            })
            .catch((error) => {
               console.log(error);

               if (error.response) {
                  console.log("Server Response:", error.response.data); // Log server errors
               }
               this.showNotifi("Error", "Failed to upload image", "error");
            });

      },

   },

   mounted() {
      this.fetchImages();
   },
};