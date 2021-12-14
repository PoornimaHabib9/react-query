import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',padding:10}}>
      <div><Link to="/list">List</Link></div>
      <div><Link to="/paginateList">Paginated List</Link></div>
      <div><Link to="/loadMore">Load More</Link></div>
      <div><Link to="/add">Add</Link></div>
      <div><Link to="/addOffline">Add Offline</Link></div>
    </div>
  );
}


export default App;
