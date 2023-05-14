import {useCallback, useEffect, useState} from "react";
import {AXIOS_METHOD, doApiCall} from "./useApi";

function compareTxs(a,b) {
    let db = new Date(b.created_at);
    let da = new Date(a.created_at);

    return db - da;
}

export default function useTxs(wallet_id = "", limit = 5) {
    const [cursor, setCursor] = useState("");
    const [txs, setTxs] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const apiCallCallback = useCallback((newCursor) => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.POST, '/transactions', (responseData) => {
            setTxs(oldTxs => {
                if (oldTxs === false || newCursor === "") {
                    return responseData?.transactions.sort(compareTxs);
                }
                return [...oldTxs, ...responseData?.transactions].sort(compareTxs)
            });
            setCursor(responseData?.cursor);
            setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setTxs(false);
            setHasMore(true);
            setCursor("");
            setLoading(false);
        }, {
            wallet_id,
            limit,
            cursor: newCursor
        });
    }, [setTxs, setError, setLoading, setHasMore, wallet_id, limit]);

    const resetTxList = useCallback(() => {
        apiCallCallback("");
    }, [apiCallCallback]);

    useEffect(() => {
        resetTxList();
    }, [resetTxList]);


    const onLoadMore = useCallback(() => {
        apiCallCallback(cursor);
    }, [apiCallCallback, cursor]);


    return [txs, loading, error, onLoadMore, hasMore, resetTxList];
}
