import Button from "../components/common/Button"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import InputText from "../components/common/InputText"
import Title from "../components/common/Title"

function Home() {
    return (
    <>
    <Title size="large" color="background">title</Title>
    <Button size="large" scheme="primary">button test</Button>
    <InputText placeholder="input here." />
    <div>
        home body
    </div>
    
    </>
        
    )
}

export default Home