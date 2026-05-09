import { Suspense } from "react"
import ImageComponent from "./ImageComponent"
import LoginForm from "./LoginForm"
import SmallLoadingUI from "../utilityComponents/SmallLoadingUI"
import assetsApiServiceInstance from "@/services/AssetsApiService";
import { ErrorBoundary } from "react-error-boundary";
import ErrorUI from "../utilityComponents/ErrorUI";

export default function LoginPage() {
    const imagesListPromise = assetsApiServiceInstance.getLoginPageImagesList();

    return <div className="flex container">
        <div className="w-8/12 h-screen">
            <ErrorBoundary fallback={<ErrorUI />}>
                <Suspense fallback={<SmallLoadingUI />}>
                    <ImageComponent imagesListPromise={imagesListPromise} />
                </Suspense>
            </ErrorBoundary>
        </div>
        <div className="w-4/12 h-screen">
            <LoginForm />
        </div>
    </div>
}


