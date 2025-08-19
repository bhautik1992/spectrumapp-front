import logo from "@src/assets/images/logo/logo.png";
import bouncingdots from "@src/assets/images/logo/bouncing_dots.svg";

const SpinnerComponent = () => {
    return (
        <div className="fallback-spinner app-loader">
            <img className="fallback-logo" src={bouncingdots} alt="logo" />
            {/* <div className="loading">
                <div className="effect-1 effects"></div>
                <div className="effect-2 effects"></div>
                <div className="effect-3 effects"></div>
            </div> */}
        </div>
    );
};

export default SpinnerComponent;


