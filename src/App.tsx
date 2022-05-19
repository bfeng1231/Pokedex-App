import { useState, useEffect } from 'react';
import './App.css';
import helpers from './helpers'

interface typeInterface {
    gender: string,
    shiny: boolean,
    direction: string
}

function App() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<any>({})
    const [settings, setSettings] = useState<typeInterface>({gender: 'male', shiny: false, direction: 'front'})
    const [isLoading, setIsLoading] = useState(true)
    const [evolution, setEvolution] = useState<any>({})

    /* const fetchPokemon = async (query: string) => {
        setIsLoading(true)
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {method: 'GET'});
            if (res.status === 200) {
                const data = await res.json();
                setSettings({gender: 'male', shiny: false, direction: 'front'})
                setResults(data);              
                setIsLoading(false);
                //fetchEvolution('tes', {test: ()=>console.log('func')})
                return console.log(data); 
            }
            setIsLoading(false);                             
            return console.log('not found');       
        }
        catch {
            setIsLoading(false);
            console.log('API is down');
        }
        
    } */

    const fetchData = async (query: string, stateFunctions: any) => {
        try {
            const res = await fetch(query, {method: 'GET'});
            if (res.status === 200) {
                const data = await res.json();
                stateFunctions(data);
                return console.log(data)
            }                             
            return console.log('not found');       
        }
        catch {
            console.log('API is down');
        }
    }

    const getPokemon = (search: string) => {
        setIsLoading(true);
        // Start fetch chain (Basic info url -> Species info url -> Evolution chain url).
        fetchData(`https://pokeapi.co/api/v2/pokemon/${search}`, (data: any) => {
            setSettings({gender: 'male', shiny: false, direction: 'front'});
            setResults(data);              
            fetchData(data.species.url, (data: any) => fetchData(data.evolution_chain.url, (data: any) => {
                setEvolution(data);
                setIsLoading(false); 
            }))
        });
    }

    useEffect(() => {
        getPokemon('pikachu')
    }, [])

    const imageSelector = (type: typeInterface) => {
        if (type.direction === 'front') {
            if (type.shiny) {
                if (type.gender === 'male') {
                    return <img src={results.sprites.front_shiny} onClick={() => flipImage(type.direction)} alt='' />                 
                }                   
                else {
                    return <img src={results.sprites.front_shiny_female} onClick={() => flipImage(type.direction)} alt='' />
                } 
            }
            else {
                if (type.gender === 'male') {                    
                    return <img src={results.sprites.front_default} onClick={() => flipImage(type.direction)} alt='' /> 
                }                   
                else {
                    return <img src={results.sprites.front_female} onClick={() => flipImage(type.direction)} alt='' />
                }                                       
            }
        }
        else {
            if (type.shiny) {
                if (type.gender === 'male') {
                    return <img src={results.sprites.back_shiny} onClick={() => flipImage(type.direction)} alt='' />                 
                }                   
                else {
                    return <img src={results.sprites.back_shiny_female} onClick={() => flipImage(type.direction)} alt='' />
                } 
            }
            else {
                if (type.gender === 'male') {                    
                    return <img src={results.sprites.back_default} onClick={() => flipImage(type.direction)} alt='' /> 
                }                   
                else {
                    return <img src={results.sprites.back_female} onClick={() => flipImage(type.direction)} alt='' />
                }                                       
            }
        }
    }

    const flipImage = (direction: string) => {
        if (direction === 'front')
            return setSettings({...settings, direction: 'back'})
        else
            return setSettings({...settings, direction: 'front'}) 
    }

    return (
        <div className="App">
            <div>
                <input type='textbox' onChange={event => setInput(event.target.value)} placeholder='Please enter the name of a Pokémon.'/>
                <button onClick={event => {
                    event.preventDefault();
                    /* fetchPokemon(input); */
                    getPokemon(input)
                }}>Search</button>            
            </div>
            {isLoading ? <div></div>: 
            <div>
                <div className='image'>
                    <h2>#{results.id} {results.species.name}</h2>             
                    {imageSelector(settings)}
                    <div>
                        {results.sprites.front_female !== null ?
                            <button onClick={() => {
                                settings.gender === 'male' ? setSettings({...settings, gender: 'female'}) : setSettings({...settings, gender: 'male'})
                            }}>Gender</button> :
                            <button>Gender</button>
                        }
                        <button onClick={() => {
                            setSettings({...settings, shiny: !settings.shiny})
                        }}>Shiny</button>
                    </div>
                </div>
                <div>
                    <div>
                        {results.types.map((elem: any) => <img src={helpers.getType(elem.type.name)} alt='' key={elem.type.name} /> )}
                    </div>
                    <div>
                        <div>Height: {results.height * 10} cm</div>
                        <div>Weight: {results.weight / 10} kg</div>
                    </div>
                    <div>
                        <div>Evolution</div>
                        <div>{evolution.chain.species.name}</div>
                        {evolution.chain.evolves_to.length === 0 ? 
                            <div></div> : 
                            evolution.chain.evolves_to.map((elem: any) => 
                                <div>
                                    <div>{elem.species.name}</div>
                                    {elem.evolves_to.length === 0 ? <div></div> :
                                        elem.evolves_to.map((elem: any) => 
                                            <div>
                                                {elem.species.name}
                                            </div> 
                                        )
                                    }
                                </div>
                            )
                        }  
                    </div> 
                       
                </div>
                           
            </div>
            }
        </div>
    );
}

export default App;
