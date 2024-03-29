import { useSelector } from "react-redux"
import './NotFound.css'



const NotFound = () => {

    const { error } = useSelector((state) => state.login);
    console.log('error:', error)

    return (
        <div className="notFound">
            {error ?
                <h1 className="notFound-text">{error}</h1>
                :
                <h1 className="notFound-text">Error 404 page not found</h1>
            }
        </div>
    )
}

export default NotFound