import ImageComponent from "./ImageComponent"
import LoginForm from "./LoginForm"

export default function LoginPage(){
    return <div className="flex container">
        <div className="w-8/12 h-screen">
            <ImageComponent/>
        </div>
        <div className="w-4/12 h-screen">
            <LoginForm/>
        </div>
    </div>
}


