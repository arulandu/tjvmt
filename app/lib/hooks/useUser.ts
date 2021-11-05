import { User } from 'lib/api/db/models/User';
import { useSession } from "next-auth/client"
import useSWR from "swr"

export const useCurrentUser = () => {
    const [session, loading] = useSession()
    return { 
        user: session ? session.user as User : null, 
        loading 
    }
}

export const useUser = (id: string) => {
    const fetcher = (url: any) =>
        fetch(url)
            .then(r => r.json())
            .then(data => { user: data?.user || null })

    const { data, error } = useSWR<any, any>(`/api/users/${id}`, fetcher)

    return error ? null : data?.user as User
}