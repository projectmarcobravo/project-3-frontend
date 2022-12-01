import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Searchbar from "../../components/Searchbar";


const apiURL = 'http://localhost:8000/api/classes'

export default function Classes() {
    const [classes, setClasses] = useState([])
    const [filterClasses, setFilterClasses] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const res = await axios.get(apiURL)
            setClasses(res.data)
            setFilterClasses(res.data)
        }

        apiCall()
    }, [])

    const searchHandler = (search) => {
        const searchThis = classes.filter((one) =>
            one.title.toLowerCase().includes(search.toLowerCase())
        ); 
        setFilterClasses(searchThis)
    };


    return (
        <div>
            <h1>Classes List</h1>
            <div className="searchBar">
                <Searchbar onSearch={searchHandler} />
            </div>

            {filterClasses.map((element) => {
                return (
                    <div key={element._id}>
                        <Link className="cardLink flex" to={`/classes/${element._id}`}>
                            <div className="CardStyle">
                                <img className="photoCard" src={element.picture} alt="instrument" />
                                {element.creator && <Link className="cardLink" to={`/profile/${element.creator._id}`}>
                                    <div className="userFlex">
                                        {element.creator && <img className="userImage" src={element.creator.picture} />}
                                        <p className="userNameStyle">{element.creator && element.creator.name}</p>
                                    </div>
                                </Link>}
                                <h3 className="textStyle">{element.title}</h3>
                                <p className="textStyle">{element.instruments}</p>
                                <p className="textStyle"><i>{element.description}</i></p>
                                <h4 className="priceStyleLits textStyle">price: <span className="spanPrice">${element.price}</span></h4>
                                <img className="smallLogo" src="https://s.tmimgcdn.com/scr/800x500/271800/equalizer-music-sound-logo-symbol-vector-v26_271868-original.jpg" alt="logo" />
                            </div>
                        </Link >
                    </div>

                )
            })}
        </div>
    )
}

