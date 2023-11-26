import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";

export default function LawyerList({ modal }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Call lawyer delete api By Lawyer Id
  const deleteLawyer = async (id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZlMTc4MjMyMzIwNmVmMjViOWJiOSIsImlhdCI6MTcwMDk2OTEzMSwiZXhwIjoxNzAxMjI4MzMxfQ.uq_XPlMmdPMGrFIvltPi3sHehK6qyKDj_JXv9eYKbm0"; // Replace 'YOUR_AUTH_TOKEN' with your actual authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // Other headers if needed
        },
      };
      const userResponse = window.confirm("Are you sure");
      if (userResponse) {
        const response = await axios.delete(
          `https://shlok-mittal-lawyer-backend.vercel.app/api/v1/admin/User/${id}`,
          config
        );
        console.log(response);
        alert(response.data.msg);
        setData([]);
        setRefresh(!refresh);
      }
    } catch (error) {}
  };

  //Call lawyer list api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZlMTc4MjMyMzIwNmVmMjViOWJiOSIsImlhdCI6MTcwMDk2OTEzMSwiZXhwIjoxNzAxMjI4MzMxfQ.uq_XPlMmdPMGrFIvltPi3sHehK6qyKDj_JXv9eYKbm0"; // Replace 'YOUR_AUTH_TOKEN' with your actual authorization token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        };
        const response = await axios.get(
          "https://shlok-mittal-lawyer-backend.vercel.app/api/v1/admin/lawyer",
          config
        ); // Replace with your API endpoint
        setData(response.data.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh, modal]);
  return (
    <Container className="mt--7" fluid>
      {/* Table */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0"></CardHeader>
            {data.length > 0 ? (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Lawyer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Total Consultations</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((lawyer, ind) => {
                    return (
                      <tr>
                        <td>
                          <Badge color="" className="bg-green mr-4">
                            New
                          </Badge>
                        </td>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={
                                  lawyer.image !== ""
                                    ? lawyer.image
                                    : require("../../../assets/img/theme/team-4-800x800.jpg")
                                }
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">
                                {lawyer.fullName}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{lawyer.email}</td>
                        <td>{lawyer.phone}</td>
                        <td>12</td>
                        <td>
                          <Button className="">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </Button>
                          <Button
                            className=""
                            onClick={() => {
                              deleteLawyer(lawyer._id);
                            }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div class="text-center mb-5">
                <div class="spinner-border" role="status"></div>
              </div>
            )}
          </Card>
        </div>
      </Row>
    </Container>
  );
}
