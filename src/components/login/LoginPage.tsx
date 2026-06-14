import ImageComponent from "./ImageComponent"
import LoginForm from "./LoginForm"
import './LoginPage.css'

export default function LoginPage() {
    return <div className="flex container h-screen overflow-hidden">
        <ImageComponent />
        <LoginForm />
    </div>
}


