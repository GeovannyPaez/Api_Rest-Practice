
let querrriiii;
let ideee;

searchFormBtn.addEventListener('click', () => {
    if(searchFormInput.value==''){
        alert('por favor digite una busqueda valida');
    }else{
        location.hash = "#search="+searchFormInput.value.trim();
        headerCategoryTitle.textContent= `Search: ${searchFormInput.value}`
    }
   
});

trendingBtn.addEventListener('click', () => {
    location.hash = "#trends";
});

arrowBtn.addEventListener('click', () => {

    ///el hystory back() nos permite obtner la url anterior visitada a la actual
    location.hash= window.history.back();
    searchForm.reset();
});

    window.addEventListener("DOMContentLoaded", navigator, false)
    window.addEventListener("hashchange", navigator, false)
    
    function navigator() {
        if (location.hash.startsWith("#trends")) {
            trendsPage();
            
        } else if (location.hash.startsWith("#search=")) {
            searchPage();
        } else if (location.hash.startsWith("#movie=")) {
            movieDetailsPage();
        } else if (location.hash.startsWith("#category=")) {
            categoriesPage();
            
        } else {
            homePage();
        }

        document.body.scrollTop= 0;
        document.documentElement.scrollTop= 0;
    }
   
        
    
    function homePage() {
        // location.hash='home';
        console.log("Home!!");

        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.add('inactive');
        headerTitle.classList.remove('inactive');
        headerCategoryTitle.classList.add('inactive');
        searchForm.classList.remove('inactive');
  
        trendingPreviewSection.classList.remove('inactive');
        categoriesPreviewSection.classList.remove('inactive');
        genericSection.classList.add('inactive');
        movieDetailSection.classList.add('inactive');
        // movieListLikedSection.classList.add('inactive');
        
        getImgstrendingMovies();
        getListCategoriesMovies();
        getMoviesLikedList();
        viewMoviesLiked();
        // delete event of scroll;

        removeEventScroll(addEjecuteEventScrollSearch);
        removeEventScroll(getMoviesByPages);
        removeEventScroll(addEjecuteEventScrollCategory);
        

    }

    function categoriesPage() {
        console.log("Categories!!")
    
        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.remove('inactive');
        arrowBtn.classList.remove('header-arrow--white');
        headerTitle.classList.add('inactive');
        headerCategoryTitle.classList.remove('inactive');
        searchForm.classList.add('inactive');
  
        trendingPreviewSection.classList.add('inactive');
        categoriesPreviewSection.classList.add('inactive');
        genericSection.classList.remove('inactive');
        movieDetailSection.classList.add('inactive');
        movieListLikedSection.classList.add('inactive')
  

        const [_, nameAndId]= location.hash.split('=');
        const [id,name]= nameAndId.split('-');
        // console.log(id);
        ideee= id;
        getMoviesCategoryId(id);

        removeEventScroll(addEjecuteEventScrollSearch);
        removeEventScroll(getMoviesByPages);

        window.addEventListener('scroll',addEjecuteEventScrollCategory);
    }

  function movieDetailsPage() {
    console.log("Movie!!")
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    movieListLikedSection.classList.add('inactive')
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    const [_, id]= location.hash.split('=');

    getMovieDetailById(id);
  }

  function searchPage() {
    console.log("Search!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    movieListLikedSection.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,query]= location.hash.split('=');
    
    getSearchMovies(query);
    querrriiii= query;
 
    removeEventScroll(getMoviesByPages);
    removeEventScroll(addEjecuteEventScrollCategory);


    window.addEventListener('scroll',addEjecuteEventScrollSearch);
    
  
  }
  
  function trendsPage() {
    console.log("TRENDS!!");
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    movieListLikedSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    getMoviesTrends();


    removeEventScroll(addEjecuteEventScrollSearch);
    removeEventScroll(addEjecuteEventScrollCategory)
    
    window.addEventListener('scroll',getMoviesByPages);

  }

  // funciones que ejecutan funcuiones que reciben parametros para el 
  //addEventListener;
const addEjecuteEventScrollSearch= ()=> getMoviesSearchByPages(querrriiii);

const addEjecuteEventScrollCategory=()=> getMoviesCategoryIdPages(ideee);


//lenguage
optionsLenguage.addEventListener('click', ()=>{
    lang = optionsLenguage.value;
    console.log(lang)
    homePage();
});