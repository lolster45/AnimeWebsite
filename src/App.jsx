//componenets...
import {HashRouter, Routes, Route, Outlet} from "react-router-dom"
  //React-redux...
    import {Provider} from "react-redux"
    import { Store } from "./store"

//Pages...
import Home from "./Home-Folder/Home"
  import AnimePage from "./pages/Anime"
  import Manga from "./pages/Manga"
  import ManhwaPage from "./pages/Manhwa"
  import ManhuaPage from "./pages/Manhua"
  import MoreInfo from "./pages/MoreInfoFolder/MoreInfo"

import Discovery from "./pages/Discovery"
import Community from "./pages/createPost/CommunityFolder/Community"
import Collection from "./pages/CollectionFldr/Collection"
import Search from "./pages/SearchFolder/Search"
import Login from "./pages/Login"

//Components...
import Nav from "./components/Nav"
import AddMenu from "./components/srch-advertise"

//styles...
import "./styles/index.scss"

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <HashRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/discovery" element={<Discovery/>}>
              <Route path="anime" element={<AnimePage/>}/>
              <Route path="manga" element={<Manga/>}/>
              <Route path="manhwa" element={<ManhwaPage/>}/>
              <Route path="manhua" element={<ManhuaPage/>}/>
              <Route path="anime/moreInfo/:id" element={<MoreInfo/>}/>
              <Route path="manga/moreInfo/:id" element={<MoreInfo/>}/>
              <Route path="manhwa/moreInfo/:id" element={<MoreInfo/>}/>
              <Route path="manhua/moreInfo/:id" element={<MoreInfo/>}/>
            </Route>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/community" element={<Community/>}></Route>
            <Route path="/bookmarks" element={<Collection/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
          <AddMenu/>
        </HashRouter>
      </Provider>
    </div>
  )
}

export default App
