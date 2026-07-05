import { Toaster } from "../ui/sonner"
import ImageComponent from "./ImageComponent"
import LoginForm from "./LoginForm"
import './LoginPage.css'

export default function LoginPage({loginMode}:any) {
    return <div className="flex h-screen overflow-hidden">
        <Toaster />
        <ImageComponent />
        <LoginForm loginMode={loginMode}/>
    </div>
}


