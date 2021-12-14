import { useIsFetching } from "react-query";

export default function GlobalIndicators(){
    const isFetching=useIsFetching()
    return(
        <div>
            {isFetching?"Fetching...":""}
        </div>
    )
}