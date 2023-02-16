import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
       name: 'LoginPage', 
       data () {
        return {
            userData: {
                email: '',
                password: '',
            },
            userStatus: false
        }
       },
       computed: {
        ...mapGetters(["storedToken","storedUserData"])
       },
       methods: {
              home(){
                     this.$router.push({
                         name: 'home'
                     });
                 },
         
                 login(){
                     this.$router.push({
                         name:'Login',
                     })
                 },

                 accountLogin(){
                    axios
                    .post('http://localhost:8000/api/user/login',this.userData)
                    .then((response)=>{
                        if(response.data.token == null){
                            this.userStatus = true;
                            this.$store.dispatch('setToken','');
                        }else{
                            this.userData = {
                                email: '',
                                password: '',
                            };
                            this.$store.dispatch("setToken",response.data.token);
                            this.$store.dispatch('setUserData',response.data.user);
                            this.home();
                        }
                    }).catch((e)=>console.log(e));
                 },

                 check(){
                    console.log(this.storedToken,this.storedUserData);
                 }
       }
}