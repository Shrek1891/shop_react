import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import SimpleBtn from "./ui/simpleBtn.tsx";

const SearchBox = () => {
    const {} = useParams()
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
            setKeyword('')
        } else {
            navigate('/')
        }
    }
    return (
        <form className="flex items-center gap-2" onSubmit={e => submitHandler(e)}>
            <input
                type="text"
                name="q"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setKeyword(e.target.value)}
            />
            <SimpleBtn
                onClick={() => {
                }}
                text="Search"
                type="submit"
            />
        </form>
    )
}

export default SearchBox
