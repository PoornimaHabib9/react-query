import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Link } from "react-router-dom";

var queryClient = new QueryClient()

export default function List() {
    return (
        <QueryClientProvider client={queryClient}>
            <ListNotes />
        </QueryClientProvider>
    )
}

function ListNotes() {

    const results = queryClient.getQueryData("notes")
    const { isIdle, isLoading, error, data, isFetching } = useQuery("notes", () =>
        fetch("http://localhost:3001/notes/notes").then((res) => res.json()), { enabled: results ? false : true }
    )

    return (
        <div>
            {
                isIdle ? ("Loading") :
                    isLoading ? (<p>Loading...</p>) :
                        error ? (<p>{error}</p>) :
                            <>
                                <div style={{ padding: 20 }}>
                                    {data.map((item) => (
                                        <Link to={"/view?id=" + item.id} key={item.id} style={{ borderBottom: 1, borderBottomColor: 'black' }}>
                                            <h1>{item.note}</h1>
                                            <p>{item.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </>
            }
        </div>
    )


    // if (isLoading) return <p>Loading...</p>

    // if (error) return <p>{error}</p>

    // console.log(data)
    // return (
    //     <div style={{ padding: 20 }}>
    //         {data.map((item) => (
    //             <div key={item.id}>
    //                 <h1>{item.note}</h1>
    //                 <p>{item.description}</p>
    //             </div>
    //         ))}
    //     </div>
    // )
}