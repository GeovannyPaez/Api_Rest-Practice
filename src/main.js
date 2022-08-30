// import axios from "axios";
//  import { axios } from "axios"


let page= 2;
let maxPage;



const URL_API = 'https://api.themoviedb.org/3/'
const Url_Api_img= 'https://image.tmdb.org/t/p/w300'
///instancia de axios
const api = axios.create({
    baseURL: URL_API,
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
        // 'language':lang
    }
});

//local storage
    const likedMoviesList=()=>{
        const item=JSON.parse( localStorage.getItem('liked-movieList'));
        let movies;
        if(item){
            movies= item
        }else{
            movies= {}
        }

        return movies;
    }
    const likeMovie=movie=>{
        // movie.id

        const likesMovies= likedMoviesList();
        console.log(likesMovies)
        if(likesMovies[movie.id]){
            likesMovies[movie.id]= undefined
        }else{
            likesMovies[movie.id]= movie
        }
        localStorage.setItem('liked-movieList',JSON.stringify(likesMovies));
        getMoviesLikedList();
    }

//Utils


const loadingImg=(entries)=>{
    entries.forEach(entry=>{
        if (entry.isIntersecting) {
            const url= entry.target.getAttribute('data-img');
            entry.target.setAttribute('src',url);
            entry.target.classList.remove('opacity');

            lazzyLoader.unobserve(entry.target)
        }
        
    });
}
const lazzyLoader= new IntersectionObserver(loadingImg);

const getImgstrendingMovies= async()=>{

    try{
        // consumo con Fetch
    /*const res = await fetch(URL_API+'trending/movie/day?api_key='+API_KEY);
    */
   //consumo con axios 
    const { data }= await api('trending/movie/day')
    // const data = await res.json();
    const movies = data.results;
        
    const containerMoviesTrending = document.querySelector('#trendingPreview .trendingPreview-movieList');

    renderMovies(containerMoviesTrending,movies,{lazzyLoade:false});
    }catch(err){
        console.log(err);
    }
    
}

const getListCategoriesMovies= async()=>{
    try {
        //consumo con fetch
    // const res= await fetch( URL_API+'genre/movie/list?api_key='+API_KEY);
    // const data = await res.json();

    // consumo con axios
    const {data} =  await api('genre/movie/list');
    const catagories = data.genres;

    const containerCategriesList= document.querySelector(
        '#categoriesPreview .categoriesPreview-list'
    );
        renderCategoriesList(containerCategriesList,catagories);

    
    } catch (error) {
        console.log(error);
    }
    
}

const getMoviesCategoryId= async(id)=>{
    try {
        const {data }= await api('discover/movie',{
            params:{
                with_genres: id,
            }
        });
        maxPage= data.total_pages;
        const movies = data.results;
        console.log(page);

        renderMovies(genericSection,movies);
        
    } catch (error) {
        console.log(error)
    }
}

const getMoviesCategoryIdPages= async(id)=>{
    const {
        scrollTop, //es el escroll hecho por el usuario 
        scrollHeight,// devuelve el escroll total que tiene el documento html
        clientHeight//es el scroll o heigh que tiene el dispositivo del usuario
    }= document.documentElement;
    // console.log(scrollHeight,scrollTop)

    const isScrollButtom= (scrollTop+clientHeight)>= (scrollHeight - 100);
    const isPageNotMax= page< maxPage ;
    
    if(scrollTop>=680){
        renderArrowUopScroll();
        
    }else{
        arrowUpScroll.classList.add('inactive__arrow');
    }

    // console.log(isScrollButtom,isPageNotMax)
    if(isScrollButtom && isPageNotMax){
        page++;
    const {data}= await api('discover/movie',{
        params: {
            with_genres: id,
            page
        }
    });
    // console.log(page);
    const movies = data.results;
    

    renderMovies(genericSection,movies,{clean: false, lazzyLoade: true});
    }
}


const getSearchMovies= async(query)=>{
    try {
        const {data}= await api('search/movie',{
            params:{
                query
            }
        });
        const movies= data.results;
        maxPage= data.total_pages;
        renderMovies(genericSection,movies,{
            lazzyLoade:true
        });
    } catch (error) {
        console.log(error)
    }
    
}

const getMoviesSearchByPages= async(query)=>{
        const {
            scrollTop, //es el escroll hecho por el usuario 
            scrollHeight,// devuelve el escroll total que tiene el documento html
            clientHeight//es el scroll o heigh que tiene el dispositivo del usuario
        }= document.documentElement;
        // console.log(scrollHeight,scrollTop)
    
        const isScrollButtom= (scrollTop+clientHeight)>= (scrollHeight - 100);
        const isPageNotMax= page< maxPage ;
        
        if(scrollTop>=680){
            renderArrowUopScroll();
            
        }else{
            arrowUpScroll.classList.add('inactive__arrow');
        }
        // console.log(isScrollButtom,isPageNotMax)
        if(isScrollButtom && isPageNotMax){
            page++;
        const {data}= await api('search/movie',{
            params: {
                query,
                page
            }
        });
        // console.log(page);
        const movies = data.results;
    
        renderMovies(genericSection,movies,{clean: false, lazzyLoade: true});
        }
    }





const getMoviesTrends=async()=>{
    headerCategoryTitle.innerText='Tendencias';
    const {data}= await api('trending/movie/day');
    
    maxPage= data.total_pages;
    console.log(maxPage);
    const movies = data.results;
    renderMovies(genericSection,movies,{lazzyLoade: true});

    
    
    // const btnMoreMovies= document.createElement('button');
    // btnMoreMovies.innerText= 'Mostrar Más';

    // btnMoreMovies.addEventListener('click',getMoviesByPages);
    // genericSection.insertAdjacentElement('afterend',btnMoreMovies);
}
const getMoviesByPages= async()=>{
    // console.log(num);
    const {
        scrollTop, //es el escroll hecho por el usuario 
        scrollHeight,// devuelve el escroll total que tiene el documento html
        clientHeight//es el scroll o heigh que tiene el dispositivo del usuario
    }= document.documentElement;
    // console.log(scrollHeight,scrollTop)

    const isScrollButtom= (scrollTop+clientHeight)>= (scrollHeight - 20);
    const isPageNotMax= page< maxPage ;
    
    if(scrollTop>=680){
        renderArrowUopScroll();
        
    }else{
        arrowUpScroll.classList.add('inactive__arrow');
    }
    if(isScrollButtom && isPageNotMax){
        page++;
    const {data}= await api('trending/movie/day',{
        params: {
            page: page 
        }
    });
    console.log(page);
    const movies = data.results;

    renderMovies(genericSection,movies,{clean: false, lazzyLoade: true});
    }


}

const getMovieDetailById=async(id)=>{
    const { data: movie }= await api('movie/'+id);
    const urlBackground= 'https://image.tmdb.org/t/p/w500'+ movie.poster_path;

    movieDetailTitle.textContent= movie.title;
    movieDetailDescription.textContent= movie.overview;
    movieDetailScore.textContent=movie.vote_average;
    renderCategoriesList(movieDetailCategoriesList,movie.genres);
    
    headerSection.style.background= `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        
    url(${urlBackground})`;

    getSimilarMoviesById(id);
}

const getSimilarMoviesById=async(id)=>{
    const {data}= await api('movie/'+id+'/similar');
    const  movies= data.results;

    renderMovies(relatedMoviesContainer,movies,{lazzyLoade:true});
}

const getMoviesLikedList= ()=>{
    const listOfMovies= JSON.parse(localStorage.getItem('liked-movieList'));
    const listOfMoviesArray= Object.values(listOfMovies);

    renderMovies(likedMoviesListArticle,listOfMoviesArray,{
        clean:true,
        lazzyLoade:false
    });
   
}



const renderArrowUopScroll=()=>{
        arrowUpScroll.classList.remove('inactive__arrow');
}
const removeEventScroll= (callback)=>{
    window.removeEventListener('scroll',callback);
}
//funciones que renderizan las peliculas en un contenedor;

const renderMovies= (
    container,
    movies,
    {
        clean= true,
        lazzyLoade= false
    }   =   {}
)=>{
    if(clean){
        container.innerHTML= '';
    }
        
    
    movies.forEach(movie=>{
        const urlImg= Url_Api_img + movie.poster_path;
        const containerMovie= document.createElement('div');
        containerMovie.classList.add('movie-container');
        containerMovie.addEventListener('click',()=>{
            location.hash='movie='+movie.id;
        }
        );

        const imgMovie= document.createElement('img');
        imgMovie.classList.add('movie-img');
        imgMovie.alt= movie.title;
        

        imgMovie.setAttribute( lazzyLoade?'data-img':'src', urlImg);
        if(lazzyLoade){
            imgMovie.classList.add('opacity');
            lazzyLoader.observe(imgMovie);
        }else{
            imgMovie.classList.remove('opacity');
        }

        const movieBtn= document.createElement('button');
        movieBtn.classList.add('movieBtn');
        if(likedMoviesList()[movie.id]){
            movieBtn.classList.add('movieBtn__click')
        }
        movieBtn.addEventListener('click',(e)=>{
            //para quitar la propagacion de enventos del contenedor;
            // console.log(e);
            e.stopPropagation();
            e.target.classList.toggle('movieBtn__click');
            likeMovie(movie);
            getImgstrendingMovies();
            viewMoviesLiked();

        });
        // evento si ocurre un error colocar una imagen por defecto;
        imgMovie.addEventListener('error',()=>{
            imgMovie.setAttribute('src',`https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`);
        })
        containerMovie.appendChild(movieBtn);
        containerMovie.appendChild(imgMovie);
        container.appendChild(containerMovie);
    });
}

const renderCategoriesList= (container,categories)=>{
    container.innerHTML= '';
    categories.forEach(category => {
        const containerCategory= document.createElement('div');
        containerCategory.classList.add('category-container');

        const titleCategory= document.createElement('h3');
        titleCategory.classList.add('category-title');
        titleCategory.innerText= category.name;
        titleCategory.setAttribute('id','id'+category.id);
        
        titleCategory.addEventListener('click',()=>{
            location.hash='category='+`${category.id}-${category.name}`
            headerCategoryTitle.innerText=category.name;
        });

        containerCategory.appendChild(titleCategory);
        container.appendChild(containerCategory);
    });
}

const viewMoviesLiked=()=>{
    if(!likedMoviesListArticle.hasChildNodes()){
        movieListLikedSection.classList.add('inactive')
    }else{
        movieListLikedSection.classList.remove('inactive')
    }
}


// arrouwUp Event

    const scrollUp=()=>{
        let currentScroll= document.documentElement.scrollTop;
        if(currentScroll>0){
            window.requestAnimationFrame(scrollUp);
            window.scrollTo(0,currentScroll-(currentScroll/10));

            arrowUpScroll.classList.add('inactive__arrow');
        }
    }
    arrowUpScroll.addEventListener('click',scrollUp);
