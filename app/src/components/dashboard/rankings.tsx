import { handleInputChange } from "@/lib/handleInputChange";
import { useEffect, useState } from "react";
import { Dropdown } from "../Dropdown";
import { notify, ToastType } from "../header";
import { InputField } from "../InputField";
import OutlineButton from "../OutlineButton";
import { useSession } from "../SessionProvider";
import { Spinner } from "../Spinner";
import { useToasts } from "../ToastProvider";

export const RankingsSection = ({}) => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [data, setData] = useState({ cutoff: -1, userInd: -1, submissions: [], rankings: [] })
  const [input, setInput] = useState({
    selectionId: ''
  })

  const [selections, setSelections] = useState([])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/selection', options).then(res => res.json()).then((data) => {
      setSelections(data.selections)
      setInput({...input, selectionId: data.selections.length > 0 ? data.selections[0].id : null})
    })
  }, [session])


  useEffect(() => {
    if (!session || !input.selectionId || input.selectionId.length <= 0) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
    }
    fetch(`/api/ranking?selectionId=${input.selectionId}`, options).then(res => res.json()).then((data) => {
      setData(data);
      // notify(toastDispatch, "", `Calculated your ranking for selection ${selections.filter(s => s.id == input.selectionId)[0].name}`);
    })

  }, [session, input.selectionId])

  return (
    <div className='relative mt-4 p-2 w-full flex flex-col items-center'>
      <h1 className='text-white text-center text-3xl font-black'>Rankings</h1>
      <Spinner className="absolute -top-16 left-1/2 -ml-8 h-16 w-16 mx-auto my-0" show={input.selectionId && input.selectionId.length == 0} />

      <div className='mt-12 w-full flex flex-wrap justify-evenly items-start'>
        <div className=''>
          <table className='text-white text-center'>
            <thead>
              <tr>
                <th className='p-4'>TST</th>
                <th className='p-4'>Index</th>
                <th className='p-4'>Solves</th>
              </tr>
            </thead>
            <tbody>
              {data.submissions?.filter(sub => sub.tst.name.includes('2023')).map(sub =>
                <tr key={sub.id} className='border-t-2 border-solid'>
                  <th key={sub.id + 'name'} className='p-4'>{sub.tst.name}</th>
                  <th key={sub.id + 'index'} className='p-4'>{sub.index.toFixed(2)}</th>
                  <th key={sub.id + 'distib'} className='p-4'>{sub.answers.map((ans, index) => ans == 1 ? <span className = 'text-green-300'>{sub.tst.solves[index]} </span> : <span className = 'text-pink'>{sub.tst.solves[index]} </span>)}</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <div className=''>
          <Dropdown
            id="selectionId"
            label="Selection:"
            options={selections
              .filter(s => s.name.includes(''))
              .map(s => ({ label: s.name, value: s.id }))
            }
            value={input.selectionId}
            onChange={(e) => handleInputChange(e, input, setInput)}
            className='mt-2'
          />
          {data.cutoff >= 0 ? <p className='mt-2 text-white'>Cutoff: {data.cutoff}</p> : null}

          <table className='text-white text-center mt-2 mb-8'>
            <thead>
              <tr>
                <th className='p-2'>Rank</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Index</th>
              </tr>
            </thead>
            <tbody>
              {data.rankings?.map((r, i) =>
                <tr key={i} className={`border-y border-solid ${i == data.userInd ? ' bg-pink' : 'bg-navy-light'}`}>
                  <td className='p-2'>{r.index < 0 ? '...' : r.rank}</td>
                  <td className='p-2'>{r.index < 0 ? '...' : r.name}</td>
                  <td className='p-2'>{r.index >= 0 ? r.index.toFixed(2) : '...'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}