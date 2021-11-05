import { useCurrentUser } from 'lib/hooks/useUser'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Header from '../components/header'

const Login: NextPage<any> = () => {
    const { user, loading } = useCurrentUser()

    return (
        <>
            <Header />

            <section className="flex items-center justify-center pt-24">
                <div className="text-center w-4/5 md:w-1/2 xl:w-1/3">
                    <h2 className="m-auto font-adam text-5xl gradient-text text-center">Login</h2>
                    {
                        !loading ?
                            user ?
                                <>
                                    <p>{JSON.stringify(user)}</p>
                                    <p className="m-auto my-3 text-center text-blue-500 hover:underline">
                                        <button onClick={() => signOut()}>Logout</button>
                                    </p>                                </>
                                :
                                <p className="m-auto my-3 text-center text-blue-500 hover:underline">
                                    <button onClick={() => signIn('ion')}>Click here to log in with ION.</button>
                                </p>
                            :
                            <p>still loading..</p>
                    }
                </div>
            </section>

        </>
    )
}

export default Login
