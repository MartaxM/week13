import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Book() {

    const [book, setBook] = useState({ msg: "empty" });
    let { id } = useParams();

    let bookDetails = <h2 id="404">404: This is not the webpage you are looking for"</h2>;

    useEffect(() => {
        fetch("/api/book/" + encodeURIComponent(id))
            .then(response => response.json())
            .then(response => {
                setBook({ response, msg: "ok" });
            }).catch((e) => {
                console.log(e);
                setBook({ msg: "404: This is not the webpage you are looking for" });
            })
    }, [id,]);

    if (book.msg === "ok") {
        bookDetails = <div>
            <p id="name">{book.response.name}</p>
            <p id="author">{book.response.author}</p>
            <p id="pages">{book.response.pages}</p>
        </div>
    }

    return (
        <div>
            <h1>Books</h1>
            {bookDetails}
        </div>
    );
}

export default Book;
