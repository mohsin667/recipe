import React,{useEffect,useState} from 'react'
import {CiPizza} from 'react-icons/ci'
import {GiFruitBowl , GiNoodles,GiCheckMark} from 'react-icons/gi'
import {MdOutlineIcecream} from 'react-icons/md'
import { fetchTabData } from '../service'

function Tabs(props) {
    const [active,setActive] = useState('Pizza')
    const [tabData,setTabData] = useState('');
    const [tabLabel,setTabLabel] = useState([
        {
            name:'Pizza',
            renderHtml: () => <CiPizza />,
            id: "c0a7bcf3e996adbf1b3c31d74e07f2f1",
        },
        {
            name:'Noodles',
            renderHtml: () => <GiNoodles />,
            id:"bbfc1a248bd6fe277e35fe01027de91f",
        },
        {
            name:'Desert',
            renderHtml: () => <GiFruitBowl />,
            id: "bc865476ffe2b8a03fbe9aee2f739740",
        },
        {
            name:'Icecream',
            renderHtml: () => <MdOutlineIcecream />,
            id:"f74be31111bbf39de034ee9f58d6f329",
        },
    ])


    useEffect(()=>{
        fetchTabData(tabLabel[0].id).then((res) => {
            setTabData(res)
            props.setLoader(false)
        })
    },[])

    const handleTabClick = (name, id) => {    
        setActive(name);
        fetchTabData(id).then((res) => {
            setTabData(res)
            props.setLoader(false)
        })
    }
    
    return (
        <div className="container">
        <h1 className='recipeHeading'>What would you like to have!</h1>
        <div className="tabs">
            {tabLabel.map((item,index) => (
                <div key={index}  onClick={()=> (handleTabClick(item.name,item.id),props.setLoader(true))} className={`tablist ${active === item.name ? 'active' : ""}`}>
                    {item.renderHtml()}
                    <span>{item.name}</span>
                </div>
            )
            )}
        </div>
        <div className='recipe_banner'>
            {tabData !== '' && <>
                <div className="left-col">
                    <span className='badge'>{tabData.recipe.cuisineType[0].toUpperCase()}</span>
                    <h1>{tabData.recipe.label}</h1>
                    <p><strong>Recipe by:</strong><small>{tabData.recipe.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>
                            {tabData.recipe.ingredientLines.map((lists,index)=> (
                                <li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{lists}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="right-col">
                    <div className="image-wrapper">
                    <img src={tabData.recipe.image} alt="" />
                    </div>
                </div>
            </>}
        </div>
    </div>
  )
}

export default Tabs
