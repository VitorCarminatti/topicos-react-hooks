import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
const { Meta } = Card;

function App() {
  const [movies, setMovies] = useState([]);
  // const [likes, setLikes] = useState(0);
  const [title, setTitle] = useState("");

  const searchMovies = () => {
    fetch(`http://www.omdbapi.com/?apikey=c5e2aa30&s=${title}`)
      .then(response => response.json())
      .then(result => setMovies(result.Search))
      .catch(e => setMovies([]));
  };

  const handleSubmit = e => {
    e.preventDefault();

    searchMovies();
  };

  // const handleClick = id => {
  //   const novosPosts = posts.map(post => {
  //     return post.id === id ? { ...post, like: !post.like } : post;
  //   });

  //   setPosts(novosPosts);
  // };

  // useEffect(() => {
  //   const curtidas = posts.filter(post => post.like).length;
  //   setLikes(curtidas);
  // }, [posts]);

  return (
    <>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do filme"
            value={title}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Form.Item>
      </Form>

      <ul>
        {movies.length > 0 &&
          movies.map(movie => {
            console.log(movie);
            return (
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="poster" src={movie.Poster} />}
              >
                <Meta title={movie.Title} description={movie.Year} />
              </Card>
            );
          })}
      </ul>
    </>
  );
}

export default App;
