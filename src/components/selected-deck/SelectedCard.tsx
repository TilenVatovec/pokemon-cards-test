import './SelectedCard.css'
function SelectedCard() {
    return <div className='selected-card'>
         <img width='100%' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' alt='pokemon-type'/>
         <div className='selected-card-data'>
            <div className='selected-card-info-frame'>
                <h1>Raticate</h1>
                <div className='selected-card-type'><h3>Rock</h3></div>
                <div className='selected-card-type'><h3>Rock</h3></div>
            </div>
            <h4><span>#</span>132</h4>
        </div>
        <div className='selected-card-info-frame-2'>
            <h4>30<span>KG</span></h4>
            <h4>186<span>CM</span></h4>
        </div>
    </div>
}

export default SelectedCard;