import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPostsRequested } from "../_redux/actions/postActions";

export const HomePage = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getPostsRequested({page: 1, pageSize: 10}))
    }, [])

    
    return <>Home</>
}