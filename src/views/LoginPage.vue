<template>
   <div class="d-flex justify-content-center py-3">
        <p class="btn btn-danger btn-sm me-3"  @click="home()">Home</p>
        
    </div>

    <div class="container " >
        <div class="alert alert-danger col-4 offset-4" v-if="userStatus">The Credential Do not Match!</div>
        <div class="row justify-content-center mb-5" >
            <div class="col-5 bg-dark text-white rounded-5 shadow p-5">
                
                    <legend style="border-bottom: 1px solid #ddd;">Login Form</legend>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Emial" v-model="userData.email">
                        
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" v-model="userData.password">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                    <button class="btn btn-primary" @click="accountLogin()">Login</button>
                   
            </div>
        </div>
        
    </div>
</template>

<script src="./../js/LoginPage.js"></script>

