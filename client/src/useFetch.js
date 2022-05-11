import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            const response = await fetch(url)
                .catch(error => {
                    setError(error);
                    setIsPending(false);
                    return;
                });

            if (response && !response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                setError(message);
                setIsPending(false);
                return;
            } else if (response) {
                const data = await response.json();
                setData(data)
                setIsPending(false)
            }
        }

        getData();

        return;
    }, [url])

    return { data, isPending, error }
}

export default useFetch;
