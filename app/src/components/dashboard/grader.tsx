import { handleInputChange } from "@/lib/handleInputChange";
import { useEffect, useState } from "react";
import { Dropdown } from "../Dropdown";
import { notify, ToastType } from "../header";
import { InputField } from "../InputField";
import { Upload } from "../Upload";
import OutlineButton from "../OutlineButton";
import { useSession } from "../SessionProvider";
import { Spinner } from "../Spinner";
import { useToasts } from "../ToastProvider";
import Papa from 'papaparse';

// GRADER
const ViewTSTs = ({ tsts }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts()

  const grade = async (tstId) => {
    await fetch('/api/tst/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ tstId })
    })

    notify(toastDispatch, "", `Re-computed ${tsts.filter(t => t.id == tstId)[0].name} indices`)
  }

  return (
    <div>
      <h3 className='ml-2 text-white text-2xl font-bold text-start'>TSTs</h3>
      <div className='flex flex-wrap justify-start items-center'>
        {tsts.map(tst =>
          <div key={tst.id} className='m-2 p-2 md:p-4 bg-navy-light bg-opacity-50'>
            <h4 className='text-white text-xl'>{tst.name}</h4>
            <p className='text-white text-md'>Grading Type: {tst.weighted ? "Weighted" : "Un-Weighted"}</p>
            <OutlineButton name='Grade' onClick={() => grade(tst.id)} className='mt-2' />
          </div>
        )}
      </div>
    </div>
  );
}

const CreateTST = () => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();
  const [input, setInput] = useState({
    name: "",
    weighted: "NO",
  })

  const create = async () => {
    const res = await fetch('/api/tst', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        weighted: input.weighted == "YES"
      })
    })

    notify(toastDispatch, "", `Created ${input.name} TST`, ToastType.SUCCESS)
  }

  return (
    <div className='my-4 w-full p-2 md:p-4 bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a TST</h1>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <Dropdown id="weighted" label="Weighted" options={[{ label: 'Yes', value: "YES" }, { label: 'No', value: 'NO' }]} value={input.weighted} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />

      <div className='mt-2'>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>
    </div>
  );
}

const CreateSelection = () => {
  const { session } = useSession();
  const { toastDispatch } = useToasts();

  const [input, setInput] = useState({
    name: "",
    weights: "",
    size: 0,
    drops: 0
  })

  const create = async () => {
    const ws = {}
    input.weights.split(';').map(e => e.trim().split(',').map(t => t.trim())).forEach(c => ws[c[0]] = parseFloat(c[1]))

    const res = await fetch('/api/selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        size: parseInt(String(input.size)),
        drops: parseInt(String(input.drops)),
        weights: ws
      })
    })
    notify(toastDispatch, "", `Created selection: ${input.name}`, ToastType.SUCCESS)
  }

  return (
    <div className='p-4 md:p-4 w-full bg-navy-light bg-opacity-50'>
      <h1 className='text-white text-2xl font-bold'>Create a Selection</h1>
      <p className='text-white text-sm'>For each TST weight, write the TST name exactly followed by a comma followed by the weight as a decimal. Seperate each TST weight combination with a semicolon (;).</p>
      <br></br>
      <p className='text-white text-sm'>Example: Duke 1, 0.25; Duke 2, 0.25; Duke 3, 0.5</p>
      <div className='mt-6'>
        <InputField id="name" name="Name" value={input.name} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="size" name="Number of competitors" value={input.size} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="drops" name="Drops" value={input.drops} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>
      <div className='mt-6'>
        <InputField id="weights" name="Weights" value={input.weights} onChange={(e) => handleInputChange(e, input, setInput)} />
      </div>

      <div className='mt-3'>
        <OutlineButton className="content-center" name='Create' onClick={create} />
      </div>

    </div>
  );
}


const ViewSelections = ({ selections }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts();

  const grade = async (selectionId) => {
    const name = selections.filter(s => s.id == selectionId)[0].name
    notify(toastDispatch, "", `Queued re-computation for ${name}...`)
    await fetch('/api/selection/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ selectionId })
    })

    notify(toastDispatch, "", `Re-computed rankings for ${name}`)
  }

  return (
    <div>
      <h3 className='ml-2 text-white text-2xl font-bold'>Selections</h3>
      <div className='flex flex-wrap justify-start items-center'>
        {selections.map(selection =>
          <div key={selection.id} className='m-2 p-2 md:p-4 bg-navy-light bg-opacity-50'>
            <h4 className='text-white text-xl'>{selection.name}</h4>
            <p className='text-white text-md'>{selection.drops} drop{selection.drops > 1 ? "s" : ""}</p>
            <p className='text-white text-md'>Weights: {Object.entries(selection.weights).map(([k, v], h) => `${k} (${v})`).reduce((a, b) => `${a}, ${b}`)}</p>
            <OutlineButton name='Grade' onClick={() => grade(selection.id)} className='mt-2' />
          </div>
        )}
      </div>
    </div>
  );
}

const SubmitGrade = ({ tsts, users }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts()
  const [input, setInput] = useState({
    answers: '',
    tstId: '',
    userId: '',
    writer: false
  })

  useEffect(() => {
    if (tsts.length > 0) setInput({ ...input, tstId: tsts[0].id })
  }, [tsts])
  useEffect(() => {
    if (users.length > 0) setInput({ ...input, userId: users[0].id })
  }, [users])


  const submit = async () => {
    const res = await fetch('/api/tst/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        writer: input.writer,
        answers: input.answers.split(' ').map(e => parseInt(e.trim())),
        tstId: input.tstId,
        userId: input.userId
      })
    })
    notify(toastDispatch, "", `Graded ${tsts.filter(t => t.id == input.tstId)[0].name} for ${users.filter(u => u.id == input.userId)[0].ionUsername}`)
    setInput({ ...input, answers: '' })
  }

  return (
    <div className='mt-2 w-full bg-navy-light bg-opacity-50 p-4'>
      <h3 className='text-white text-2xl font-bold'>Submit Grade</h3>
      <p className='text-white mt-2 text-md'>Key in answers using space to separate.</p>
      <Dropdown id="tstId" label="TST" options={tsts.map(tst => ({ label: tst.name, value: tst.id }))} value={input.tstId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <Dropdown id="userId" label="ION" options={users.map(user => ({ label: user.ionUsername, value: user.id }))} value={input.userId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <Dropdown id="writer" label="Writer?" options={[{ label: 'YES', value: true }, { label: 'NO', value: false }]} value={input.writer} onChange={(e) => handleInputChange(e, input, setInput)} />
      <InputField id='answers' name='Answers' value={input.answers} onChange={(e) => handleInputChange(e, input, setInput)} />
      {/* <InputField id='tstId' name='Choices' value={input.tstId} onChange={(e) => handleInputChange(e, input, setInput)} /> */}
      <OutlineButton name='Submit' className='mt-4' onClick={submit} />
    </div>
  );
}

const CSVSubmitGrade = ({ tsts }) => {
  const { session } = useSession()
  const { toastDispatch } = useToasts()
  const [input, setInput] = useState({
    file: null,
    tstId: '',
  })

  const handleFileChange = (event) => {
    setInput({ ...input, file: event.target.files[0] })
  }

  // useEffect(() => {
  //   if (tsts.length > 0) setInput({ ...input, tstId: tsts[0].id })
  // }, [tsts])

  const submit = () => {
    const results = []

    // Read the CSV file
    const reader = new FileReader()
    reader.readAsText(input.file)
    reader.onload = () => {
      const csvData = reader.result
      const parsed = Papa.parse(csvData, { header: true })

      // Create a request for each row in the CSV file with valid userId (24 bit hex)
      parsed.data.forEach(row => {
        if (row.userId && row.userId.length === 24) {
          results.push(rowRequest(row))
        }
      })

      // Wait for all requests to complete
      Promise.all(results)
        .then(() => {
          notify(toastDispatch, "", `Graded ${tsts.filter(t => t.id == input.tstId)[0].name}`)
          setInput({ ...input, file: null })
        })
        .catch((error) => {
          // console.error('Whoops!')
          console.error(error)
        })

    }
  }

  const rowRequest = async (row) => {

    // create answers array and fill in missing values with 0
    const ans = []
    for (const key in row) {
      if (key.startsWith('P')) {
        ans[parseInt(key[1]) - 1] = row[key] ? row[key] : '0'
      }
    }

    const { ObjectId } = require('bson')
    const res = await fetch('/api/tst/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        writer: false,
        answers: ans.map(e => parseInt(e.trim())),
        tstId: input.tstId,
        userId: ObjectId.createFromHexString(row.userId),
        // index: row.index
      })
    })
    // console.log('res:' + res)
    return res
  }

  return (
    <div className='mt-2 w-full bg-navy-light bg-opacity-50 p-4'>
      <h3 className='text-white text-2xl font-bold'>Submit Grade (with CSV)</h3>
      <p className='text-white mt-2 text-md'>Include user hash values under header 'userId'. <br />Headers for each problem should be labelled 'P#'. <br />Only for non-writers scores.</p>
      <Dropdown id="tstId" label="TST" options={tsts.filter(tst => tst.name.includes('test') || tst.name.includes('2023')).map(tst => ({ label: tst.name, value: tst.id }))} value={input.tstId} onChange={(e) => handleInputChange(e, input, setInput)} className='mt-2' />
      <Upload id='tstUpload' label='Upload CSV' onChange={handleFileChange} accept='.csv' className='mt-2' />
      <OutlineButton name='Submit' className='mt-4' onClick={submit} />
    </div>
  )

}

export const GraderSection = () => {
  const { session } = useSession();
  const [tsts, setTsts] = useState([])
  const [users, setUsers] = useState([])
  const [selections, setSelections] = useState([])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/selection', options).then(res => res.json()).then((data) => setSelections(data.selections))
  }, [session])

  useEffect(() => {
    if (!session) return
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    }
    fetch('/api/tst', options).then(res => res.json()).then((data) => setTsts(data.tsts))

    let pageNum = 0
    const cb = (data) => {
      setUsers(users => [...users, ...data.users])
      if (data.users.length == 100)
        fetch(`/api/user?competitor=true&limit=100&page=${++pageNum}`, options).then(res => res.json()).then(cb)
    }

    fetch(`/api/user?competitor=true&limit=100&page=${pageNum}`, options).then(res => res.json()).then(cb)
  }, [session])

  return (
    <div className='relative my-6 p-2 w-full flex flex-col items-center'>
      <h3 className='text-white text-center text-3xl font-black'>TST Grading</h3>
      <Spinner className="absolute -top-16 left-1/2 -ml-8 h-16 w-16 mx-auto my-0" show={tsts.length <= 0} />

      <div className='mt-12 w-full flex flex-wrap items-start justify-evenly'>
        <div className='max-w-lg'>
          <ViewTSTs tsts={tsts} />
          <ViewSelections selections={selections} />
          <SubmitGrade tsts={tsts} users={users} />
          <CSVSubmitGrade tsts={tsts} />
        </div>
        <div className='ml-2 max-w-lg'>
          <CreateTST />
          <CreateSelection />
        </div>
      </div>
    </div>
  );
}
