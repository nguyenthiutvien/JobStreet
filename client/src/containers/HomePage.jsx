import { useEffect } from "react";

export const HomePage = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getPostsRequested({page: 1, pageSize: 10}))
    }, [])

    
    return <>Home</>
}