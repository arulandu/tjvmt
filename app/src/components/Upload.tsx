export const Upload = ({ id, label, onChange, accept, className = '' }) => {
    return (
        <div className={`relative w-full mt-6 group ${className}`}>
            <label htmlFor={id} className="text-white text-xl">{label} </label>
            <input type='file' name={id} id={id} onChange={onChange} accept={accept} className='text-white' />
        </div>
    );
}