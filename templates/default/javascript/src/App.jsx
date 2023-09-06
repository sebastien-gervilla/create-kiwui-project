import kiwiLogo from './assets/kiwui-logo.svg'

const App = () => {
    return (
        <div className='app'>
            <p>
                Welcome to Kiw
                <span>
                    ui
                </span>
                {' !'}
            </p>
            <img src={kiwiLogo} alt="kiwui's logo" />
        </div>
    );
};

export default App;