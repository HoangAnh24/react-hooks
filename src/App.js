import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import queryString from 'query-string';

function App() {
  const [ postList, setPostLista ] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });

  const [filters,setfilters] = useState({
    _limit: 10,
    _page: 1
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJson = await response.json();
        console.log(responseJson);
        const { data, pagination } = responseJson;
        setPostLista(data);
        setPagination(pagination);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostList();
  },[filters]);

  function handlePageChange(newPage) {
    console.log(newPage)
    setfilters({
      ...filters,
      _page: newPage
    });
  }

  return (
    <div className="">
      <h1>fetch API</h1>
      <PostList posts={postList} />
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
