import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks.ts'
import { amountAdded } from "./features/counter/counter-slice.ts";
import { useFetchBreedsQuery } from "./features/dogs/dogs-api-slice.ts";
import {useState} from "react";

function App() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const [numDogs, setNumDogs] = useState(1)
    const { data = [] } = useFetchBreedsQuery(numDogs)

    const onClick = () => dispatch(amountAdded(2))

    return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>
          count is {count}
        </button>

          <div>
              <p>Dogs to fetch:</p>
              {/* @ts-expect-error not typed e.target.value */}
              <select value={numDogs} onClick={(e) => setNumDogs(Number(e.target.value))}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
              </select>
          </div>

          <div>Number of dogs fetched: {data.length}</div>
          <table>
              <thead>
              <tr>
                  <th>Name</th>
                  <th>Body</th>
              </tr>
              </thead>
              <tbody>{
                  data.map((breed) => (
                      <tr key={breed.id}>
                          <td>{breed.name}</td>
                          <td><img src={breed.image.url} height={250} /></td>
                      </tr>
                  ))
              }</tbody>
          </table>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
