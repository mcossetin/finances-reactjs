import { useState, useEffect } from 'react';

// interface Indicator{
//     label: String,
//     value: Number,
//     subValue: Number
// }

interface Props{
    label: String[]
}


function Indicators({label}: Props) {

    const [numbers, setNumbers] = useState(label);
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );

    useEffect(() => {
        fetch("https://api.example.com/items")
          .then(res => res.json())
          .then(
            (result) => {
                setNumbers(['o', 'k', 'l'])
            //   setIsLoaded(true);
            //   setItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setNumbers(['ER', 'ERR', 'ERRR5'])

            //   setIsLoaded(true);
            //   setError(error);
            }
          )
      }, [])

  
    return (
        <ul>{listItems}</ul>
    );
}

export default Indicators