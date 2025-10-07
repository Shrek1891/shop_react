import {Link} from "react-router-dom";

const Paginate = ({pages, page, keyword = '', isAdmin = false}: {
    pages: number,
    page: number,
    keyword: string | null,
    isAdmin?: boolean
}) => {
    return (pages > 1 && (
        <div className="flex justify-center items-center">
            {
                [...Array(pages).keys()].map(x => (
                    <Link
                        key={x + 1}
                        className={x + 1 === page ? 'mx-2 px-2 py-1 rounded bg-green-500 text-white' : 'mx-2 px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'}
                        to={isAdmin ? `/products/?keyword=${keyword}&page=${x + 1}` : `/?keyword=${keyword}&page=${x + 1}`}
                    >
                        {x + 1}
                    </Link>
                ))
            }

        </div>
    ))
}

export default Paginate
