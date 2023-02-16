import axios from 'axios';
import { mapGetters} from 'vuex';

export default {
    name: "HomePage",
    data () {
        return {
            postLists: {},
            categoryList: {},
            searchKey: '',
            tokenStatus: false
        }
    },
    computed: {
        ...mapGetters(["storedToken","storedUserData"])
       },
    methods: {
        getAllPost () {
            axios.get("http://localhost:8000/api/allPostList").then((response) => {
                // console.log(response.data.posts);                       
                // this.postLists = response.data.posts;

                for (let i = 0; i < response.data.posts.length; i++){
                    if (response.data.posts[i].image != null) {
                        response.data.posts[i].image = `http://localhost:8000/postImage/${response.data.posts[i].image}`;
                    } else {
                         response.data.posts[i].image = `http://localhost:8000/default/default_img/webp`;
                   }
                }
                this.postLists = response.data.posts;
               
            });
        },

        loadCategory() {
            axios.get('http://localhost:8000/api/allCategory')
                .then((response) => {
                    this.categoryList = response.data.categories;
                })
                .catch((e) => {
                    console.log(e);
                })
        },

        search() {
            let search = {
                key: this.searchKey,
            };
            
            axios.post('http://localhost:8000/api/post/search', search).then((response) => {
                for (let i = 0; i < response.data.posts.length; i++){
                    if (response.data.posts[i].image != null) {
                        response.data.posts[i].image = `http://localhost:8000/postImage/${response.data.posts[i].image}`;
                    } else {
                         response.data.posts[i].image = `http://localhost:8000/default/default_img/webp`;
                   }
                }
                this.postLists = response.data.posts;
            })
        },

        newsDetails(id){
            this.$router.push({
                name: 'newsDetails',
                params: {
                    newsId: id,
                    
                },
            });
        },

        categorySearch(searchKey){
            let search = {
                key: searchKey
            }
            axios.post('http://localhost:8000/api/category/search',search).then((response)=>{
                for (let i = 0; i < response.data.posts.length; i++){
                    if (response.data.posts[i].image != null) {
                        response.data.posts[i].image = `http://localhost:8000/postImage/${response.data.posts[i].image}`;
                    } else {
                         response.data.posts[i].image = `http://localhost:8000/default/default_img/webp`;
                   }
                }
                this.postLists = response.data.posts;
            }).catch((e)=>console.log(e));
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
        }

        
    },
    mounted() {
       this.checkToken();
        this.getAllPost();
        this.loadCategory();
    }
    
    }