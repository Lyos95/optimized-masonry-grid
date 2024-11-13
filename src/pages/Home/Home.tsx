import Gallery from "../../components/Gallery/Gallery";
import SearchPhotosInput from "../../components/SearchPhotosInput/SearchPhotosInput";
import { ToolBar } from "./Home.styles";

const Home = () => {
  return (
    <>
      <ToolBar>
        <SearchPhotosInput />
      </ToolBar>
      <Gallery />
    </>
  );
};
export default Home;
