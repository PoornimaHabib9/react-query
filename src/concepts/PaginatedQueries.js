import React, { useState } from "react";
import { hydrate } from "react-dom";
import { dehydrate, QueryClient, QueryClientProvider, useMutation, useQuery } from "react-query";

let queryClient = new QueryClient()
export default function PaginatedQueries() {

    return (
        <QueryClientProvider client={queryClient}>
            <FetchData />
        </QueryClientProvider>
    )

}

function FetchData() {

    // let mutation = useMutation('addNote')
    // mutation.mutate({ note: "note", description: "description" })
    // const state = dehydrate(queryClient)
    // hydrate(queryClient, state)
    // queryClient.resumePausedMutations()
    
    const [page, setPage] = useState(0)
    const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(['airlines', page], () => getAirlinesByPagination(page), { keepPreviousData: true })

    return (
        <div>
            {isLoading ? (<p>Loading...</p>) :
                isError ? (<p>{Error}</p>) :
                    <>
                        {data.data.map((item) => (
                            <div key={item._id}>
                                <h1>{item.name}</h1>
                                <p>{item.trips}</p>
                            </div>

                        ))}

                        <div>
                            <button onClick={(e) => setPage(page - 1)}>Prev</button>
                            <button onClick={(e) => setPage(page + 1)}>Next</button>
                        </div>
                    </>
            }
        </div>
    )

    function getAirlinesByPagination(page) {
        return fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`).then((res) => res.json())
    }
}