// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col sm='10'>
                <h1>All lawyer</h1>
              </Col>
              <Col sm='2' className="">
                <Button>Add New Lawyer</Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
