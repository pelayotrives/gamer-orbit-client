import "./App.cs";
import "boostrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";


function SearchOption() {

    const navigate = useNavigate()

    const [games, setGames] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [searchbar, setSearchbar] = useState("");

    const getSearch = async () => {
    
        try {

            const response = await listGamesService(response.data);

        } catch (error) {
            Navigate("/error")
        }
    }
        return (
        <div className="App">

        </div>
    );

}

export default SearchOption;