import PreLoaderGif from '../assets/preloader.gif'
import './style.css'

const PreLoader = () => {
    return (
        <div className="pre-loader">
            <img src={PreLoaderGif} alt="preloader" />
        </div>
    );
}

export default PreLoader