import { useEffect, useState } from "react";

export function useFetch(url, retryTime) {
    const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDetails() {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setFinalData(json);
            setLoading(false);
        }

        getDetails();

        if (retryTime) {
            const fetchRetryTime = setInterval(() => {
                getDetails();
            }, retryTime);
            return () => clearInterval(fetchRetryTime);
        }
    }, [url, retryTime]);

    return {
        finalData,
        loading
    };
}