import '../Styles/ErrorPage.css'
const ErrorPage = () => {
    return ( 
        <div className="errorpage">
            {/* <marquee behaviour="scroll" scrollamount="10">
                <h2>Oo-huh😯</h2> 
                <h2>Error 404 Page Not Found😓</h2>
            </marquee> */}
            <p style={{"margin":"0"}}>OOPS! PAGE NOT FOUND</p>
            <h1>404</h1>
            <p style={{"margin":"0"}}>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS <br /> NOT FOUND</p>
            
            {/* <img src="https://th.bing.com/th/id/OIP.nr4sPhGlKBPJbp_IUbcZ8wHaDm?rs=1&pid=ImgDetMain" alt="" /> */}
        </div>
     );
}
 
export default ErrorPage;