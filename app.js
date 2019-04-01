const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
/**
 * engine 定義樣板使用的引擎(')
 * (樣板名稱,預設的佈局（default layout)的檔案名稱)
 *
 */
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//  * 告訴 Express 說要設定的 view engine 是 handlebars
app.set("view engine", "handlebars");
// 引入靜態檔案的位置
app.use(express.static("public"));
//引入 json 檔案
const movieList = require('./movies.json')

app.listen(port, () => {
  console.log(`${port}`);
});

app.get('/', (req, res) => {
  // create a variable to store movies

  // 陣列 資料
  const movieArray = [
    {
      id: 1,
      title: 'Jurassic World: Fallen Kingdom',
      image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
    },
    {
      id: 2,
      title: 'THIS IS MOVIE TITLE',
      image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg'
    }, {
      id: 3,
      title: "Thor: Ragnarok",
      image: "https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
    },
    {
      id: 4,
      title: "Avengers: Infinity War",
      image: "https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    },
    {
      id: 5,
      title: "Mission: Impossible - Fallout",
      image: "https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
    },
    {
      id: 6,
      title: "Incredibles 2",
      image: "https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg"
    },
    {
      id: 7,
      title: "Fifty Shades Freed",
      image: "https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg"
    },
    {
      id: 8,
      title: "The First Purge",
      image: "https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg"
    },
  ]

  // past the movie data into 'index' partial template
  res.render('index', { movies: movieList.results });
});

//show.handlebars
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.filter(movie => movie.id == req.params.movie_id);
  res.render('show', { movie: movie[0] });
});

app.get('/search', (req, res) => {
  console.log('req.query', req.query.keyword);
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  });
  res.render('index', { movies: movies, keyword: keyword })
});