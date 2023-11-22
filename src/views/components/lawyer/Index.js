import { useState } from "react";
import {
    Button,
    Container,
    Row,
    Col,
} from "reactstrap";
import LawyerList from "./LawyerList";
import NewLawyer from "./NewLawyer";

const Index = (props) => {
    const [modal, setModal] = useState(false)

    const addNewLawyer = () => {
        setModal(true)
    }

    return (
        <>
            {modal && <NewLawyer modal={modal} setModal={setModal} />}
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        <Row>
                            <Col sm='10'>
                                <h1>All lawyer</h1>
                            </Col>
                            <Col sm='2' className="">
                                <Button onClick={addNewLawyer}>Add New Lawyer</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            <LawyerList modal={modal} />
        </>
    );
};

export default Index;
