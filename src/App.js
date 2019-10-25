import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon, List, Avatar, Modal } from "antd";
import {
  Container,
  Header,
  Body,
  MovieList,
  MovieItem,
  MovieCard,
  ListWrapper,
  ModalContentWrapper,
  Title,
  ComparisonList,
  CustomSider,
  UpperBody
} from "./styles";

import _ from "lodash";

const { Meta } = MovieCard;
const noImageUrl = "https://static.thenounproject.com/png/340719-200.png";

function App() {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [movieToCompare, setMovieToCompare] = useState({});
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const searchMovies = () => {
    setError("");
    fetch(`http://www.omdbapi.com/?apikey=c5e2aa30&s=${title}`)
      .then(response => response.json())
      .then(result => {
        result.Response === "True"
          ? setMovies(result.Search)
          : setError(result.Error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    searchMovies();
  };

  const handleClick = id => {
    const newMovies = movies.map(movie => {
      return movie.imdbID === id ? { ...movie, like: !movie.like } : movie;
    });

    setMovies(newMovies);
  };

  const handleOk = () => {
    setMovieToCompare({});
    setVisible(false);
  };
  const handleCancel = () => {
    setMovieToCompare({});
    setVisible(false);
  };

  const openModal = id => {
    const movie = movies.find(movie => movie.imdbID === id);
    setSelectedMovie(movie);
    setVisible(true);
  };

  const setComparison = id => {
    const movie = movies.find(movie => movie.imdbID === id);
    setMovieToCompare(movie);
  };

  const onCollapse = () => setCollapsed(!collapsed);

  useEffect(() => {
    const likedOnes = movies.filter(movie => movie.like);
    setLikedMovies(likedOnes);
  }, [movies]);

  return (
    <Body>
      <Title>Search, Compare and Like movies</Title>
      <Header>
        <Form layout="inline" onSubmit={handleSubmit}>
          <Form.Item>
            <Input
              onChange={e => setTitle(e.target.value)}
              placeholder="Movie Title"
              value={title}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Form>
      </Header>
      <Container>
        <MovieList>
          {error !== "" ? (
            <h3>{error}</h3>
          ) : (
            movies.map(movie => {
              return (
                <MovieItem key={movie.imdbID}>
                  <MovieCard
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <img
                        onClick={() => openModal(movie.imdbID)}
                        alt="poster"
                        src={movie.Poster === "N/A" ? noImageUrl : movie.Poster}
                        height={300}
                      />
                    }
                    actions={[
                      <Icon
                        onClick={() => handleClick(movie.imdbID)}
                        theme={movie.like ? "filled" : "outlined"}
                        type="like"
                        key={Math.random(movie.imdbID)}
                      />,
                      <Icon
                        onClick={() => console.log("Implementar dislike")}
                        type="dislike"
                        key={Math.random(movie.Year)}
                      />
                    ]}
                  >
                    <Meta
                      title={movie.Title}
                      description={`${movie.Year} | ${movie.Type}`}
                    />
                  </MovieCard>
                </MovieItem>
              );
            })
          )}
        </MovieList>
        {likedMovies.length > 0 && (
          <ListWrapper>
            <h3>Liked Movies</h3>
            <List
              dataSource={likedMovies}
              renderItem={item => (
                <List.Item key={item.imdbID}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.Poster === "N/A" ? noImageUrl : item.Poster}
                      />
                    }
                    title={<p>{item.Title}</p>}
                    description={item.Year}
                  />
                </List.Item>
              )}
            />
          </ListWrapper>
        )}
      </Container>
      <Modal
        title="Compare movies"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalContentWrapper>
          <MovieCard
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="poster"
                src={
                  selectedMovie.Poster === "N/A"
                    ? noImageUrl
                    : selectedMovie.Poster
                }
                height={300}
              />
            }
          >
            <Meta
              title={selectedMovie.Title}
              description={`${selectedMovie.Year} | ${selectedMovie.Type}`}
            />
          </MovieCard>
          {!!_.isEmpty(movieToCompare) ? (
            <ListWrapper>
              <h3>Liked Movies</h3>
              <List
                dataSource={likedMovies}
                renderItem={item => (
                  <List.Item key={item.imdbID}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={item.Poster === "N/A" ? noImageUrl : item.Poster}
                        />
                      }
                      title={<p>{item.Title}</p>}
                      description={item.Year}
                    />
                  </List.Item>
                )}
              />
            </ListWrapper>
          )}
        </CustomSider>
        <Title>Search, Compare and Like movies</Title>
        <Header>
          <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item>
              <Input
                onChange={e => setTitle(e.target.value)}
                placeholder="Movie Title"
                value={title}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Header>
        <Container>
          <MovieList>
            {error !== "" ? (
              <h3>{error}</h3>
            ) : (
              movies.map(movie => {
                return (
                  <MovieItem key={movie.imdbID}>
                    <MovieCard
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          onClick={() => openModal(movie.imdbID)}
                          alt="poster"
                          src={
                            movie.Poster === "N/A" ? noImageUrl : movie.Poster
                          }
                          height={300}
                        />
                      }
                      actions={[
                        <Icon
                          onClick={() => handleClick(movie.imdbID)}
                          theme={movie.like ? "filled" : "outlined"}
                          type="like"
                          key="like"
                        />
                      ]}
                    >
                      <Meta
                        title={movie.Title}
                        description={`${movie.Year} | ${movie.Type}`}
                      />
                    </MovieCard>
                  </MovieItem>
                );
              })
            )}
          </MovieList>
        </Container>
        <Modal
          title="Compare movies"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ModalContentWrapper>
            <MovieCard
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="poster"
                  src={
                    selectedMovie.Poster === "N/A"
                      ? noImageUrl
                      : selectedMovie.Poster
                  }
                  height={300}
                />
              }
            >
              <Meta
                title={selectedMovie.Title}
                description={`${selectedMovie.Year} | ${selectedMovie.Type}`}
              />
            </MovieCard>
            {!!_.isEmpty(movieToCompare) ? (
              <ListWrapper>
                <h4>Select a movie to compare</h4>
                <ComparisonList
                  dataSource={movies.filter(
                    movie => movie.imdbID !== selectedMovie.imdbID
                  )}
                  renderItem={item => (
                    <ComparisonList.Item
                      onClick={() => setComparison(item.imdbID)}
                      key={item.imdbID}
                    >
                      <ComparisonList.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item.Poster === "N/A" ? noImageUrl : item.Poster
                            }
                          />
                        }
                        title={<p>{item.Title}</p>}
                        description={item.Year}
                      />
                    </ComparisonList.Item>
                  )}
                />
              </ListWrapper>
            ) : (
              <MovieCard
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="poster"
                    src={
                      movieToCompare.Poster === "N/A"
                        ? noImageUrl
                        : movieToCompare.Poster
                    }
                    height={300}
                  />
                }
              >
                <Meta
                  title={movieToCompare.Title}
                  description={`${movieToCompare.Year} | ${movieToCompare.Type}`}
                />
              </MovieCard>
            )}
          </ModalContentWrapper>
        </Modal>
      </Body>
    </UpperBody>
  );
}

export default App;
