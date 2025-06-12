import { handleInputChange } from "@/lib/handleInputChange";
import { useEffect, useState } from "react";
import { notify, ToastType } from "../header";
import { InputField } from "../InputField";
import OutlineButton from "../OutlineButton";
import { useSession } from "../SessionProvider";
import { Spinner } from "../Spinner";
import { useToasts } from "../ToastProvider";

const UserCard = ({ user }) => {
  const { session } = useSession()

  return (
    <div className='m-2 max-w-[18rem] flex bg-navy-light bg-opacity-50 rounded-md border'>
      <img alt="Profile Picture" src={user.profilePicData} className='w-16 h-16 object-cover rounded-full border-4 border-solid border-white' />
      <div className='ml-2 text-white'>
        <p className={`${user.admin ? "text-pink" : "text-white"} font-medium`}>{user.name}</p>
        <p className='font-light'>{user.ionUsername} / {user.stats ? `${user.stats.username}` : '???'}</p>
        <p className='text-green-300'>{user.solvedProblemIds.length} solves / Level {user.stats ? user.stats.level : '???'} / XP {user.stats ? user.stats.xp : '???'}</p>
      </div>
    </div>
  );
}

export const Directory = () => {
  const { session, user } = useSession();
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    discordTag: '',
    discordId: ''
  })
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/user', options).then(res => res.json()).then((data) => setUsers(data.users))
  }, [session])
  const link = async () => {
    if (input.discordTag.match(/\w+#\d+/).length == 0 || input.discordId.match(/\d{17,}/).length == 0) {
      notify(toastDispatch, "", "Provide valid discord info", ToastType.DANGER)
      return;
    }

    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        discordTag: input.discordTag,
        discordId: input.discordId
      })
    })

    notify(toastDispatch, "", `Linked Discord: ${input.discordTag} : ${input.discordId}`)
  }

  return (
    <div className='relative mt-4 p-2 w-full flex flex-col justify-center items-center'>
      <h3 className='text-white text-3xl font-black'>Directory</h3>
      <Spinner className="absolute -top-16 left-1/2 -ml-8 h-16 w-16 mx-auto my-0" show={users.length <= 0} />

      <p className='text-white'>Solve more POTDs!</p>
      {!user.discordId || user.discordId.length < 17 ?
        <div className='m-2'>
          <p className='text-white text-center'>Settings ➡️ Copy your Discord Tag ➡️ Advanced ➡️ Enable Developer Mode ➡️ My Account ➡️ (three dots) ➡️ Copy ID</p>
          <InputField id="discordTag" name="Discord Tag" value={input.discordTag} onChange={(e) => handleInputChange(e, input, setInput)} />
          <InputField id="discordId" name="Discord ID" value={input.discordId} onChange={(e) => handleInputChange(e, input, setInput)} />
          <OutlineButton name="Link Discord" onClick={link} className='mt-2' />
        </div>
        : null}
      <div className='mt-4 flex flex-wrap justify-center items-center'>
        {users.map((u) =>
          <UserCard key={u.id} user={u} />
        )}
      </div>
    </div>

  );
}