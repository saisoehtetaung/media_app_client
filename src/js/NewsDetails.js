import axios from "axios";
import { mapGetters } from "vuex";

export default {
    name: "NewsDetails",
    data () {
        return {
            postId: 0,
            post : {},
            tokenStatus: false,
            viewCount: 0
        }
    },
    computed: {
        ...mapGetters(["storedToken","storedUserData"])
       },
    methods: {
        
        loadPost () {
            let posts = {
                postId: this.postId,
            };
            axios.post('http://localhost:8000/api/post/details', posts).then((response) => {

                
               
                    if (response.data.posts.image != null) {
                        response.data.posts.image = `http://localhost:8000/postImage/${response.data.posts.image}`;
                    } else {
                         response.data.posts.image = `http://localhost:8000/default/default_img/webp`;
                   }
                

                this.post = response.data.posts;
                // console.log(this.post);
            });
            
        },

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
        logout(){
            this.$store.dispatch("setToken",null);
            this.login();
        },

        checkToken(){
            if(this.storedToken != null && this.storedToken != undefined && this.storedToken != ''){
                this.tokenStatus = true;
            }else{
                this.tokenStatus = false;
            }
        },

        viewCountLoad(){
            let data = {
                user_id : this.storedUserData.id,
                post_id: this.postId
            };
            axios.post('http://localhost:8000/api/post/actionLog',data).then(
                (response) => {
                    
                    this.viewCount = response.data.viewData.length;
                    
                }
            );
        },

        back(){
            history.back();
        }
    },
    mounted () {
        
        this.checkToken();
        this.postId = this.$route.params.newsId;
        this.loadPost(this.postId);
        this.viewCountLoad();
        
    }
}