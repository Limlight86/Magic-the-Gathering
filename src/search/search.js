import React, { useState, useEffect } from 'react';

const MTGSearch = () => {

    const [term, setTerm] = useState('');

    const [db, setDb] = useState([]);

    let qLoop = setInterval(() => {
        
        let query = db.pop();
        
        if(query){
            fetch(`https://api.scryfall.com/cards/search?=${ db.pop() }`).then((res)=>{
                console.log(res);
            }).catch(err => console.log(err));
        }
        
    }, 100);

    let searchApi = (q) => {
        console.log(q);
        setDb([...db, q]);
    }

    useEffect(() => {
        searchApi(term);
    }, [term]);

    return (
        <div>
            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        </div>
    )
}

export default MTGSearch;
