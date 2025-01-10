<template>
   <div class="container mt-5">
      <!-- Add Post Button -->
      <div class="row align-items-center mb-4">
         <!-- Centered H1 -->
         <div class="col-12 col-md-6 text-center text-md-start">
            <h1 class="mb-0">Latest uploads</h1>
         </div>
         <!-- Button on the Right -->
         <div class="col-12 col-md-6 text-center text-md-end">
            <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal"
               data-bs-target="#uploadImageModal">
               <i class="bi bi-person-plus-fill me-2"></i>Upload Image
            </button>
         </div>
      </div>

      <!--Uploads cards -->
      <div class="row">
         <!-- Loop through posts and display each as a card -->
         <div v-for="image in images" :key="image.id" class="col-md-4 mb-4">
            <div class="card shadow-sm" style="height: 100%;">
               <!-- Image Placeholder -->
               <!-- <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Post image" /> -->
               <img :src="image" class="card-img-top" alt="Post image"
                  width="200" height="300" />

               <div class="card-body d-flex flex-column">
                  <span class="card-text mb-3">uploaded_by => <span class="text-danger fw-bold">{{ username }}
                     </span></span>
               </div>
            </div>
         </div>
      </div>

      <!-- Upload imnage Modal -->
      <div class="modal fade" id="uploadImageModal" tabindex="-1" aria-labelledby="uploadImageModalLabel"
         aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header bg-primary text-white">
                  <h5 class="modal-title" id="uploadImageModalLabel"><i class="bi bi-person-plus-fill me-2"></i>Upload
                     Image
                  </h5>
                  <button type="button" class="btn-close" id="closeCreateModalBtn" data-bs-dismiss="modal"
                     aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="uploadImage">
                     <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input @change="handleFileChange" type="file" class="form-control" id="image" required
                           accept="image/*" />
                     </div>
                     <div class="text-end">
                        <button type="submit" class="btn btn-primary"><i class="bi bi-save me-2"></i>Save</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>


<script>
// Importing the external uploads.js file
import uploadsScript from '@/assets/js/uploads.js';

export default {
   mixins: [uploadsScript], // Using the methods and data from the uploads.js file
};
</script>

<style scoped>
/* Style the card */
.card {
   border-radius: 10px;
   overflow: hidden;
   transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover effect */
.card:hover {
   transform: translateY(-5px);
   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Style the "Read More" button */
.btn-primary {
   background-color: #007bff;
   border: none;
}

.btn-primary:hover {
   background-color: #0056b3;
}
</style>