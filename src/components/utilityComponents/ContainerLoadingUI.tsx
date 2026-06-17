import { Spinner } from "../ui/spinner";

export default function ContainerLoadingUI({width="full", height="full"}:any){
    return <div className={`w-${width} h-${height} flex justify-center items-center`}>
        <Spinner className="size-8"/>
    </div>
}